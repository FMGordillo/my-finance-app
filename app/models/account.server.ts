import type { Account } from "@prisma/client";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

export function getAccounts({ userId }: Pick<Account, "userId">) {
  return prisma.account.findMany({
    where: { userId },
  });
}

export function getAccount({ id }: Pick<Account, "id">) {
  return prisma.account.findFirst({ where: { id } });
}

export function createAccount(data: Pick<Account, "userId" | "name">) {
  invariant(data.userId, "userId cannot be null");
  return prisma.account.create({
    data: {
      name: data.name,
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
}
