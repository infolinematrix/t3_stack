"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PowerOff } from "lucide-react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign in failed:", error);

      alert("Sign-in failed, please try again.");
    }
  };
  return (
    <Button variant={"ghost"} onClick={handleSignOut}>
      <PowerOff /> Sign out
    </Button>
  );
}
