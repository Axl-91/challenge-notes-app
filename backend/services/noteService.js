import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export async function createNote(data) {
  if (!data.title.trim() || !data.content.trim()) {
    throw new Error("Title and content must not be empty!");
  }

  return prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      archived: data.archived || false,
      userId: data.userId,
      tags: {
        connectOrCreate: (data.tags || []).map(tag => ({
          where: { name: tag },
          create: { name: tag }
        })),
      },
    },
    include: { tags: true },
  });
}

export async function getNoteById(id) {
  return prisma.note.findUnique({
    where: { id },
    include: { tags: true },
  });
}

export async function getNotesByUser(userId) {
  return prisma.note.findMany({
    where: { userId },
    include: { tags: true },
  });
}

export async function updateNote(id, data) {
  if (data.title !== undefined && data.title.trim().length === 0) {
    throw new Error("Title can't be empty");
  }
  if (data.content !== undefined && data.content.trim().length === 0) {
    throw new Error("Content can't be empty");
  }

  let tagOps = {};
  if (data.tags) {
    tagOps = {
      tags: {
        connectOrCreate: data.tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    };

    const note = await prisma.note.findUnique({
      where: { id },
      select: { tags: true },
    });

    const tagsToRemove =
      note.tags
        .filter(tag => !data.tags.includes(tag.name))
        .map(tag => ({ id: tag.id }));

    if (tagsToRemove.length > 0) {
      tagOps = {
        ...tagOps,
        tags: {
          ...tagOps.tags,
          disconnect: tagsToRemove,
        },
      };
    }
  }

  return prisma.note.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      archived: data.archived,
      ...tagOps,
    },
    include: { tags: true },
  });
}

export async function deleteNote(id) {
  return prisma.note.delete({ where: { id } });
}
