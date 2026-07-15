"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 characters."),
  lastName: z.string().min(2, "Last name must contain at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
});

export default function RegisterForm({ className, onSubmit, ...props }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      return onSubmit(values);
    }

    console.log("Register form data:", values);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: `${values.firstName} ${values.lastName}`,
        },
      },
    });

    if (error) {
      setError("root", {
        message: error,
      });
    }

    if (error) {
      setError("root", {
        message: error,
      });
    } else {
      router.push("/");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleFormSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your IEEE account</h1>
          <p className="text-sm text-muted-foreground">
            We collect your information for future events, workshops. Your data
            will remain secret.
          </p>
        </div>

        <FieldGroup className="grid grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input
              id="first-name"
              placeholder="Jordan"
              {...register("firstName")}
              aria-invalid={errors.firstName ? "true" : undefined}
            />
            <FieldError errors={errors.firstName ? [errors.firstName] : []} />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input
              id="last-name"
              placeholder="Lee"
              {...register("lastName")}
              aria-invalid={errors.lastName ? "true" : undefined}
            />
            <FieldError errors={errors.lastName ? [errors.lastName] : []} />
          </Field>
        </FieldGroup>

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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative flex items-center justify-end">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-background"
              {...register("password")}
              aria-invalid={errors.password ? "true" : undefined}
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={togglePassword}
                className="absolute mr-3.5"
              />
            ) : (
              <FaEye onClick={togglePassword} className="absolute mr-3.5" />
            )}
          </div>
          <FieldError errors={errors.password ? [errors.password] : []} />
        </Field>

        <FieldError errors={errors.root ? [errors.root.message] : []} />

        <Field>
          <Button type="submit" disabled={isSubmitting}>
            Create Account
          </Button>
        </Field>

        <FieldDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Signin</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
