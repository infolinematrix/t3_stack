"use client";

import { signIn, useSession } from "next-auth/react";
import { Icons } from "@/app/(app)/_components/icons";
import { Button } from "@/components/ui/button";

export default function SigninGoogleButton() {
  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in failed:", error);

      alert("Sign-in failed, please try again.");
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full py-5"
      onClick={handleSignIn}
    >
      <Icons.google className="mr-2 h-4 w-4 text-red-600" />
      Google
    </Button>
  );
}
