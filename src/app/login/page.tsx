import LoginForm from "@/components/ui/auth/login-form";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main>
      <div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
