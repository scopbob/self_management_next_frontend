import SignuUpForm from "@/components/ui/auth/signup-form";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return (
    <main>
      <div>
        <Suspense>
          <SignuUpForm />
        </Suspense>
      </div>
    </main>
  );
}
