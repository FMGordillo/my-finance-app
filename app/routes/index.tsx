import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Button from "~/components/Button";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return {};
};

export default function Index() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">My finance app</h1>
      <p>This should be the dashboard</p>
      <section className="flex gap-4">
        <Link to="/accounts/new">
          <Button>Create new account</Button>
        </Link>
        <Link to="/accounts/">
          <Button>Go to my accounts</Button>
        </Link>
      </section>
    </div>
  );
}
