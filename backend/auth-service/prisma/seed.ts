import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@finverse.com",
    },
    update: {},
    create: {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@finverse.com",
      phone: "9999999999",
      password,
      role: "ADMIN",
      isActive: true,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
