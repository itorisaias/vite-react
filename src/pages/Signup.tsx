import * as z from "zod";
import { ActionFunctionArgs } from "react-router-dom";
import { Form } from "~/helpers/ui";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "~/utils";
import { signup } from "~/services";

const schema = z.object({
  email: z.string().min(1, "E-mail is required").email(),
  password: z.string().min(1, "Password is required"),
  confirm_password: z.string().min(1, "Confirm password is required"),
});

const mutation = makeDomainFunction(
  schema.refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })
)(async (values) => {
  const response = await signup(values);
  if (response.status !== 200) {
    throw "Falied on fetch";
  }
  const payload = response.json();
  return { ...values, payload };
});

export function action({ request }: ActionFunctionArgs) {
  return formAction({
    request,
    schema,
    mutation,
    successPath: "/success",
  });
}

export default () => (
  <Form schema={schema}>
    {({ Field, Errors, Button }) => (
      <>
        <Field name="email" type="email" />
        <Field name="password" type="password" />
        <Field name="confirm_password" type="password" />
        <Errors />
        <Button type="submit" />
      </>
    )}
  </Form>
);
