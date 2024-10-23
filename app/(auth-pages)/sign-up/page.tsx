import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';

export default function Signup() {
  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign Up</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full items-center">
              <Avatar src="/slack_avatar.png" alt="User's Avatar" sx={{ width: 100, height: 100 }}/>
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
        </div>
      </form>
    </>
  );
}
