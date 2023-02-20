import type { LoaderFunction } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return {};
};

export default function Index() {
  return (
    <main>
      <>
        <h1>My finance app</h1>
        <p>This should be the dashboard</p>
      </>
    </main>
  );
}
