import type { Expense } from "@prisma/client";
import { prisma } from "~/db.server";

export function getExpensesByAccount({
  accountId,
}: Pick<Expense, "accountId">) {
  return prisma.expense.findMany({
    where: { accountId },
    orderBy: {
      amount: "asc",
    },
  });
}
