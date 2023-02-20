import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { getExpensesByAccount } from "~/models/expense.server";

type LoaderData = {
  // TODO: Improve this type
  expenses: Awaited<ReturnType<typeof getExpensesByAccount>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { accountId } = params;
  invariant(accountId, "account must be specified");
  const expenses = await getExpensesByAccount({ accountId });
  // TODO: Handle if account is not defined
  return json<LoaderData>({
    expenses,
  });
};

export default function AccountIdPage() {
  const { expenses } = useLoaderData() as LoaderData;

  return (
    <div className="flex flex-col items-start gap-4">
      <section className="border px-4 py-2">
        <h1>Expenses</h1>
        <ul>
          {expenses
            .filter((expense) => expense.amount <= 0)
            .map((expense) => (
              <li key={expense.id}>{expense.amount}</li>
            ))}
        </ul>
      </section>
      <section className="border px-4 py-2">
        <h1>Gains</h1>
        <ul>
          {expenses
            .filter((expense) => expense.amount >= 0)
            .map((expense) => (
              <li key={expense.id}>{expense.amount}</li>
            ))}
        </ul>
      </section>
      {/* <section>
        <Form className="flex flex-col justify-center gap-4">
          <h1>Estimate your net worth on a specific time</h1>
          <label>
            Date{" "}
            <input className="bg-green-700 px-4 py-2" type="date" name="date" />
          </label>
          <Button type="submit">Submit</Button>
        </Form>
      </section> */}
    </div>
  );
}
