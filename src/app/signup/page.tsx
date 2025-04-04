import SignuUpForm from "@/components/ui/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return (
    <main>
      <div>
        <SignuUpForm />
      </div>
    </main>
  );
}
