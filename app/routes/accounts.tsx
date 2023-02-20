import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import Button from "~/components/Button";
import { getAccounts } from "~/models/account.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  accounts: Awaited<ReturnType<typeof getAccounts>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const accounts = await getAccounts({ userId });
  return json<LoaderData>({
    accounts,
  });
};

export default function AccountsPage() {
  // @ts-ignore
  const { accounts } = useLoaderData() as LoaderData;

  return (
    <div className="grid h-full grid-rows-4 items-center">
      <header className="row-span-1 flex justify-center gap-4">
        <ul>
          {accounts.map((account) => (
            <Link key={account.id} to={`/accounts/${account.id}`}>
              <li>
                <Button>{account.name}</Button>
              </li>
            </Link>
          ))}
        </ul>
      </header>
      <div className="row-span-3">
        <Outlet />
      </div>
    </div>
  );
}
