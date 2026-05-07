import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({

    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data,
  });
}


