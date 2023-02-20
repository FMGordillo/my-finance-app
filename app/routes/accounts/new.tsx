import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import Button from "~/components/Button";
import { createAccount } from "~/models/account.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      {
        errors: {
          title: "Name is required",
          body: null,
        },
      },
      { status: 400 }
    );
  }

  await createAccount({ name, userId });
  return redirect("/accounts");
};

export default function NewAccountPage() {
  const transition = useTransition();

  return (
    <div>
      <Form method="post" className="flex flex-col items-center gap-4">
        <label className="flex gap-2">
          <span>Account name</span>
          <input
            className="bg-transparent"
            type="text"
            name="name"
            placeholder="My awesome account"
          />
        </label>
        <Button disabled={transition.state !== "idle"} type="submit">
          Create account
        </Button>
      </Form>
    </div>
  );
}
