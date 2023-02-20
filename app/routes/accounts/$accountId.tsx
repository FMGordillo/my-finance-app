import type { Account } from "@prisma/client";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { getAccount } from "~/models/account.server";

type LoaderData = {
  // TODO: Improve this type
  account: Account;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { accountId } = params;
  invariant(accountId, "account must be specified");
  const account = await getAccount({ id: accountId });
  invariant(account, "account must be created");
  // TODO: Handle if account is not defined
  return json<LoaderData>({
    account,
  });
};

export default function AccountIdPage() {
  const { account } = useLoaderData() as LoaderData;

  return (
    <div>
      <section>
        <h1>Expenses</h1>
      </section>
      <section>
        <h1>Gains</h1>
      </section>
    </div>
  );
}
