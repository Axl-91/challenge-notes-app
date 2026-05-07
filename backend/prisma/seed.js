import { PrismaClient } from '../generated/prisma/index.js';
import * as userService from '../services/userService.js'
import * as noteService from '../services/noteService.js'


const prisma = new PrismaClient();

async function seed() {
  const adminUser = await userService.createUser({ name: "Admin", email: "admin@admin.com", password: "secret" });
  await noteService.createNote({ title: "Test Note", content: "This is a test note", archived: false, userId: adminUser.id })

  console.log("Seeds created!");
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
