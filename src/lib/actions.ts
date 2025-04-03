"use server";

import { redirect } from "next/navigation";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema, FormState, ApiErrorDetail, Todo, TodoFormSchema, TodoSubmit, Category } from "@/lib/definitions";
import { getIsTokenValid } from "./auth-helpers";
import { revalidatePath } from "next/cache";

export async function fetchTodosCount(search: string) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const queryParams = new URLSearchParams({
    search: search,
  });
  try {
    const response = await fetch(process.env.API_URL + `/todo/count?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      throw Error;
    }
    return Number(data);
  } catch (error) {}
}

export async function fetchFilteredTodos(search: string, currentPage: number, items_per_page: number, order: string, reverse: boolean, categoryFilter?: number) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const offset = (currentPage - 1) * items_per_page;
  const queryParams = new URLSearchParams({
    search: search,
    limit: String(items_per_page),
    offset: String(offset),
    order: order,
    reverse: String(reverse),
  });
  categoryFilter && queryParams.set("category", String(categoryFilter));
  try {
    const response = await fetch(process.env.API_URL + `/todo/?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      console.log(data);
      throw Error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTodo(id: number) {
  const session = await auth();
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + `/todo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
        console.log(data);
      });
    }
    return data;
  } catch (error) {}
}

export async function createTodo(todo: TodoSubmit, needsRedirect: boolean) {
  const session = await auth();
  if (session?.isGuest === true) {
    await redirect("/dashboard/todos");
    return { message: "You must be logged in to perform this action." };
  }
  const accessToken = session?.accessToken;

  try {
    const response = await fetch(process.env.API_URL + `/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      return { errors: error_details };
    }
    if (!needsRedirect) return data;
  } catch (error) {
    console.error(error);
  }
  if (needsRedirect) await redirect("/dashboard/todos");
}

export async function editTodo(todo: TodoSubmit) {
  const session = await auth();
  if (session?.isGuest === true) {
    await redirect("/dashboard/todos");
    return { message: "You must be logged in to perform this action." };
  }
  const accessToken = session?.accessToken;

  try {
    const response = await fetch(process.env.API_URL + `/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(todo),
    });

    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      console.log(data.detail);
      return { errors: error_details };
    }
  } catch (error) {
    console.error(error);
  }
  await redirect("/dashboard/todos");
}

export async function deleteTodo(id: number) {
  const session = await auth();
  if (session?.isGuest === true) return { message: "You must be logged in to perform this action." };
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + `/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
        console.log(data);
      });
    }
    return data;
  } catch (error) {}
}

export async function deleteTodos(ids: number[]) {
  try {
    const datas = await Promise.all(ids.map((id) => deleteTodo(id)));
    revalidatePath("/dashboard/todos");
    return datas;
  } catch (error) {}
}

export async function fetchCategoriesCount() {
  const session = await auth();
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + "/todo/category/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      throw Error;
    }
    return Number(data);
  } catch (error) {}
}

export async function fetchCategory(id: number) {
  const session = await auth();
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + `/todo/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
        console.log(data);
      });
    }
    return data;
  } catch (error) {}
}

export async function fetchCategories() {
  const session = await auth();
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + "/todo/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status == 404) {
      console.log("not found");
      return;
    }
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      console.log(data);
      throw Error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFilteredCategories({ search, currentPage, items_per_page, ids }: { search?: string; currentPage?: number; items_per_page?: number; ids?: number[] }) {
  const session = await auth();
  const accessToken = session?.accessToken;
  let offset = undefined;
  if (items_per_page && currentPage) {
    offset = (currentPage - 1) * items_per_page;
  }
  const queryParams = new URLSearchParams();
  search && queryParams.set("search", search);
  items_per_page && queryParams.set("limit", String(items_per_page));
  offset && queryParams.set("offset", String(offset));
  ids && queryParams.set("ids", ids.map((id) => String(id)).join(","));

  try {
    const response = await fetch(process.env.API_URL + `/todo/category/?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status == 404) {
      console.log("not found");
      return;
    }
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      console.log(data);
      throw Error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createCategory(category: Category) {
  const session = await auth();
  if (session?.isGuest === true) {
    await redirect("/dashboard/categories");
    return { message: "You must be logged in to perform this action." };
  }
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + `/todo/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      return { errors: error_details };
    }
  } catch (error) {
    console.error(error);
  }
  await redirect("/dashboard/categories");
}

export async function editCategory(category: Category) {
  const session = await auth();
  if (session?.isGuest === true) {
    await redirect("/dashboard/categories");
    return { message: "You must be logged in to perform this action." };
  }
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + `/todo/category/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      return { errors: error_details };
    }
  } catch (error) {
    console.error(error);
  }
  await redirect("/dashboard/categories");
}

export async function deleteCategory(id: number) {
  const session = await auth();
  if (session?.isGuest === true) return { message: "You must be logged in to perform this action." };
  const accessToken = session?.accessToken;
  try {
    const response = await fetch(process.env.API_URL + `/todo/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
        console.log(data);
      });
    }
    return data;
  } catch (error) {}
}

export async function deleteCategories(ids: number[]) {
  try {
    const datas = await Promise.all(ids.map((id) => deleteCategory(id)));
    revalidatePath("/dashboard/categories");
    return datas;
  } catch (error) {}
}

export async function createAccount(State: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password1: formData.get("password1"),
    password2: formData.get("password2"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create an Account.",
    };
  }

  const { email, password1, password2 } = validatedFields.data;
  if (password1 !== password2) {
    return { errors: { password2: ["Passwords do not match"] } };
  }
  try {
    const response = await fetch(process.env.API_URL + "/account/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password1 }),
    });
    if (!response.ok) {
      const data = await response.json();
      let error_details: { [key: string]: string[] } = {};
      data.detail.map(function (detail: ApiErrorDetail) {
        error_details[detail.loc[2]] = detail.msg;
      });
      return { errors: error_details };
    }
  } catch (error) {}
  redirect("/signup/complete");
}

export async function handleLogout() {
  const session = await auth();
  if (session?.refreshToken && getIsTokenValid(session?.refreshToken)) {
    await fetch(process.env.API_URL + "/account/auth/blacklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: session.refreshToken }),
    });
  }
  await signOut(); // NextAuthのセッションを削除
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function guestLogin() {
  try {
    await signIn("credentials", {
      email: process.env.GUEST_EMAIL,
      password: process.env.GUEST_PASSWORD,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
