import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterForm({ className, ...props }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your IEEE account</h1>
          <p className="text-sm text-muted-foreground">
            We collect your information for future events, workshops. Your data
            will remain secret.
          </p>
        </div>

        <FieldGroup className="grid grid-cols-2">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input id="first-name" placeholder="Jordan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input id="last-name" placeholder="Lee" />
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            type="number"
            placeholder="+20"
            required
            className="bg-background"
          />
        </Field>

        <FieldGroup className="grid grid-cols-2">
          <Field>
            <FieldLabel htmlFor="nation-id">National Id</FieldLabel>
            <Input id="nation-id" placeholder="Jordan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="uni-id">Univesity Id</FieldLabel>
            <Input id="uni-id" placeholder="Lee" />
          </Field>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-2">
          <Field>
            <FieldLabel htmlFor="faculty">Faculty</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="other">other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="faculty">Year</FieldLabel>
            <Select className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="first year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="first">First Yeare</SelectItem>
                  <SelectItem value="second">Second year</SelectItem>
                  <SelectItem value="third">Third year</SelectItem>
                  <SelectItem value="fourth">Fourth year</SelectItem>
                  <SelectItem value="fifth">Fifth year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>

        <FieldDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Signin</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
