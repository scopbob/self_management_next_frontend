import { z } from "zod";

export const SignupFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password1: z.string({ required_error: "Password is required" }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
  password2: z.string({ required_error: "Password is required" }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
});

export const SigninFormSchema = SignupFormSchema.omit({ password1: true, password2: true }).extend({
  password: SignupFormSchema.shape.password1,
});

export type FormState =
  | {
      errors: { [key: string]: string[] };
      message?: string | null;
    }
  | undefined;

export type TodoState = {
  id: number;
  category_id: number;
  title: string;
  text: string;
  due: Date;
  start: Date;
  progress: number;
  priority: number;
};

export type ApiErrorDetail = {
  type: string;
  loc: string[];
  msg: string[];
};
