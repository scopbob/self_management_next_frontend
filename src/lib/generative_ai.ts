import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { TodoGenerateSchema } from "./definitions";
import { Todo } from "./definitions";
import { fetchCategories } from "./actions";

const google = createGoogleGenerativeAI({
  // custom settings
});
const model = google("gemini-2.0-flash-001");

export async function generateTodayTodo() {
  const categories = await fetchCategories();
  console.log(new Date().toDateString());
  const { object } = await generateObject({ model: model, schema: TodoGenerateSchema, prompt: `generate a ${new Date().toDateString()}'s todo. Due, start's format is datetime iso. Progress is 0 - 100 %. Choose category's id in ${categories}` });
  console.log(object);
  return object;
}
