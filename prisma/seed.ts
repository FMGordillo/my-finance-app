import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@mail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("admin", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      accounts: {
        create: {
          name: "MyAccount",
        },
      },
    },
  });

  const currentAccount = await prisma.account.findFirst({
    where: { userId: user.id },
  });

  invariant(currentAccount, "Account must be created");

  await prisma.expense.create({
    data: {
      name: "An expense",
      accountId: currentAccount.id,
      amount: 1000,
      frequency: "",
      transactedAt: new Date().toISOString(),
    },
  });
  await prisma.expense.create({
    data: {
      name: "A negative expense",
      accountId: currentAccount.id,
      amount: -1000,
      frequency: "",
      transactedAt: new Date().toISOString(),
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
