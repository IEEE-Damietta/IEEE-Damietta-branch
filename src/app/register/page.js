// import { LoginForm } from "@/app/login/components/login-form";
import RegisterForm from "./components/register-form";

export const metadata = {
  title: "Register",
  description:
    "Register for IEEE Damietta membership and gain access to workshops, events, and student branch activities.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gray-900/95">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md">
              <img src="/images/logo.jpg" alt="ieee" />
            </div>
            IEEE Damietta
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-100">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/join-team.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
