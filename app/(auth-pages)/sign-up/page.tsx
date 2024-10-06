import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Avatar } from "flowbite-react";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign Up</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full items-center">
              <Avatar img="/protected/slack_avatar.png" alt="User's Avatar" rounded-full size="xl"/>
            </div>
          </div>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <p className="text-sm text-center">
            <Link className=" font-medium text-blue-600" href="/sign-in">
              You already have an account?
            </Link>
            <br></br>
            <Link className=" font-medium text-blue-600" href="/sign-in">
              Sign In
            </Link>
          </p>
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
