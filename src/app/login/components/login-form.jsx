"use client";

import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
});

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();


  const handleFormSubmit = async (values) => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setError("root", {
        message: error,
      });
      return;
    }

    router.push("/");

  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-background"
            {...register("email")}
            aria-invalid={errors.email ? "true" : undefined}
          />
          <FieldError errors={errors.email ? [errors.email] : []} />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            className="bg-background"
            {...register("password")}
            aria-invalid={errors.password ? "true" : undefined}
          />
          <FieldError errors={errors.password ? [errors.password] : []} />
        </Field>
        <FieldError errors={errors.root ? [errors.root.message] : []} />
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldDescription className="px-6 text-center">
          Don't have account? <Link href="/register">Register</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
