import { createFormAction } from "remix-forms";
import { redirect, json } from "react-router-dom";

export const formAction = createFormAction({ redirect, json });
