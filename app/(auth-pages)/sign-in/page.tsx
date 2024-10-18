import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Avatar } from "flowbite-react";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign In</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full items-center">
            <Avatar img="/slack_avatar.png" alt="User's Avatar" rounded size="3xl"/>
          </div>
        </div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs  underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <p className="text-sm text-center">
          <Link className=" font-medium text-blue-600" href="/sign-up">
            You don't have an account?
          </Link>
          <br></br>
          <Link className=" font-medium text-blue-600" href="/sign-up">
            Sign Up
          </Link>
        </p>
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign In
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
