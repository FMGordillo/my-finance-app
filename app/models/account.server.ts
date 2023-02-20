import type { Account } from "@prisma/client";
import { prisma } from "~/db.server";

export function getAccounts({ userId }: Pick<Account, "userId">) {
  return prisma.account.findMany({
    where: { userId },
  });
}

export function getAccount({ id }: Pick<Account, "id">) {
  return prisma.account.findFirst({ where: { id } });
}
