import { z } from "zod";

export const SignupFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password1: z.string({ required_error: "Password is required" }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
  password2: z.string({ required_error: "Password is required" }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
});

export const SigninFormSchema = SignupFormSchema.omit({ password1: true, password2: true }).extend({
  password: SignupFormSchema.shape.password1,
});

const PRIORITY_CHOICES = {
  high: 1,
  middle: 2,
  low: 3,
} as const;

const priorityEnum = z.nativeEnum(PRIORITY_CHOICES);

// `Todo` の `validateObject` をzodで作成
export const TodoFormSchema = z.object({
  id: z.number(),
  title: z.string().max(50, "Title cannot be longer than 50 characters"), // 最大50文字
  text: z.string().max(500, "Text cannot be longer than 500 characters").optional(), // 最大500文字、空でもOK
  due: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid due date format",
  }), // 日付のフォーマット検証
  start: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date format",
  }), // 日付のフォーマット検証
  progress: z.number().min(0, "Progress cannot be less than 0").max(100, "Progress cannot be more than 100"), // 0~100の間
  category: z.string().optional(), // OptionalなカテゴリーID
  priority: priorityEnum, // 高, 中, 低のいずれか
});

export type FormState =
  | {
      errors: { [key: string]: string[] };
      message?: string | null;
    }
  | undefined;

export type TodoState = {
  id: number;
  category: number;
  title: string;
  text: string;
  due: string;
  start: string;
  progress: number;
  priority: number;
};

export type ApiErrorDetail = {
  type: string;
  loc: string[];
  msg: string[];
};
