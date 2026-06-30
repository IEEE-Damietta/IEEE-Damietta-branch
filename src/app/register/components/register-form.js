"use client";

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
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 characters."),
  lastName: z.string().min(2, "Last name must contain at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
  phone: z
    .string()
    .regex(/^[+]?\d{7,15}$/, "Enter a valid phone number with country code."),
  nationalId: z.string().min(4, "National Id is required."),
  universityId: z.string().min(4, "University Id is required."),
  faculty: z
    .string()
    .nonempty("Required")
    .refine((val) => ["cs", "engineering", "other"].includes(val), {
      message: "Required",
    }),

  year: z
    .string()
    .nonempty("Required")
    .refine(
      (val) => ["first", "second", "third", "fourth", "fifth"].includes(val),
      {
        message: "Required",
      },
    ),
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
      phone: "",
      nationalId: "",
      universityId: "",
      faculty: "",
      year: "",
    },
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      return onSubmit(values);
    }

    console.log("Register form data:", values);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setError('root', {
        message: error,
      })
    }

    if (data.user) {
      const {error} = await supabase.from("users").insert({
        id: data.user.id,
        first_name: values.firstName,
        last_name: values.lastName,
        faculty: values.faculty,
        academic_year: values.year,
        phone: values.phone,
        university_id: values.universityId,
        national_id: values.nationalId,
      });

      if (error) {
        setError("root", {
          message: error,
        });
      } else {
         router.push("/");
      }

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
          <Input
            id="password"
            type="password"
            className="bg-background"
            {...register("password")}
            aria-invalid={errors.password ? "true" : undefined}
          />
          <FieldError errors={errors.password ? [errors.password] : []} />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="+201234567890"
            className="bg-background"
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : undefined}
          />
          <FieldError errors={errors.phone ? [errors.phone] : []} />
        </Field>

        <FieldGroup className="grid grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="nation-id">National Id</FieldLabel>
            <Input
              id="nation-id"
              {...register("nationalId")}
              aria-invalid={errors.nationalId ? "true" : undefined}
            />
            <FieldError errors={errors.nationalId ? [errors.nationalId] : []} />
          </Field>
          <Field>
            <FieldLabel htmlFor="uni-id">University Id</FieldLabel>
            <Input
              id="uni-id"
              {...register("universityId")}
              aria-invalid={errors.universityId ? "true" : undefined}
            />
            <FieldError
              errors={errors.universityId ? [errors.universityId] : []}
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="faculty">Faculty</FieldLabel>
            <Controller
              name="faculty"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.faculty ? [errors.faculty] : []} />
          </Field>
          <Field>
            <FieldLabel htmlFor="year">Year</FieldLabel>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="first">First year</SelectItem>
                      <SelectItem value="second">Second year</SelectItem>
                      <SelectItem value="third">Third year</SelectItem>
                      <SelectItem value="fourth">Fourth year</SelectItem>
                      <SelectItem value="fifth">Fifth year</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.year ? [errors.year] : []} />
          </Field>
        </FieldGroup>

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
