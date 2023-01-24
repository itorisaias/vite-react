import { createForm } from "remix-forms";
import {
  Form as RouterForm,
  useActionData,
  useSubmit,
  useNavigation,
} from "react-router-dom";

export const Form = createForm({
  component: RouterForm,
  useNavigation,
  useSubmit,
  useActionData,
});
