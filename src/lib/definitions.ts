import { z } from "zod";

export const SignupFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password1: z.string({ required_error: "Password is required" }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
  password2: z.string({ required_error: "Password is required" }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
});

export const SigninFormSchema = SignupFormSchema.omit({ password1: true, password2: true }).extend({
  password: SignupFormSchema.shape.password1,
});

const PRIORITY_CHOICES = ["Hi", "Md", "Lo"] as const;

const priorityEnum = z.enum(PRIORITY_CHOICES);

export const TodoFormSchema = z.object({
  id: z.number(),
  title: z.string({ required_error: "Title is required" }).max(50, "Title cannot be longer than 50 characters"),
  text: z.string().max(500, "Text cannot be longer than 500 characters").optional(), // 最大500文字、空でもOK
  due: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid due date format",
  }), // 日付のフォーマット検証
  start: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalida start date format",
  }), // 日付のフォーマット検証
  progress: z.number().min(0, "Progress cannot be less than 0").max(100, "Progress cannot be more than 100"), // 0~100の間
  category: z.number().nullable(), // OptionalなカテゴリーID
  priority: priorityEnum.array(), // 高, 中, 低のいずれか
});

export type FormState =
  | {
      errors: { [key: string]: string[] };
      message?: string | null;
    }
  | undefined;

export type Category = {
  id: number;
  name: string;
  color: string;
};

export type Todo = {
  id: number;
  category?: Category[];
  title: string;
  text?: string;
  due: string;
  start: string;
  progress: number;
  priority: "Hi" | "Md" | "Lo";
};

export type TodoSubmit = {
  id: number;
  category?: number | null;
  title: string;
  text?: string;
  due: string;
  start: string;
  progress: number;
  priority: "Hi" | "Md" | "Lo";
};

export type TodoForm = {
  id: number;
  category: number | null;
  title: string;
  text?: string;
  due: string;
  start: string;
  progress: number;
  priority: "Hi" | "Md" | "Lo";
};

export type ApiErrorDetail = {
  type: string;
  loc: string[];
  msg: string[];
};
