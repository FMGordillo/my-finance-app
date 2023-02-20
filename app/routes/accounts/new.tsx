import { Form } from "@remix-run/react";

export default function NewAccountPage() {
  return (
    <div>
      <Form className="flex flex-col gap-4">
        <label>
          Account name{" "}
          <input type="text" name="name" placeholder="My awesome account" />
        </label>
        <input type="submit" value="Create account" />
      </Form>
    </div>
  );
}
