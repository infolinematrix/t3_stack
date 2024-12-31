"use client";
import * as React from "react";
import Link from "next/link";

// import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { signOut, useSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import SignOutButton from "../auth/signout-button";
import { Icons } from "./icons";
import SignOutButton from "./signout-button";
import { User2 } from "lucide-react";
import { signOut } from "@/server/auth";
import Login from "@/app/(auth)/signin/page";
import SigninPopup from "@/app/(auth)/_components/signinPopup";
import { UserRole } from "@/server/auth/roles";

interface AuthDropdownProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
  user: any | null;
}

export function UserDropdownMenu({ className, ...props }: AuthDropdownProps) {
  return {
    ...(props.user ? (
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <AuthDropdownGroup user={props.user} />
      </div>
    ) : (
      <GuestDropDownMenu />
    )),
  };
}

function AuthDropdownGroup({ user }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <User2 /> Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          My Account
          <div className="text-muted-foreground text-xs font-light">{`${user.name}`}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {user.role === UserRole.Admin ? (
            <DropdownMenuItem>
              <Link href="/admin" scroll={true}>
                Administration
              </Link>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <></>
          )}

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function GuestDropDownMenu() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            asChild
            aria-label="Login"
            variant="outline"
            size="sm"
            className="relative"
          >
            <Link href="/auth/signin">
              <Icons.users className="size-4_" aria-hidden="true" />
            </Link>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <SigninPopup />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
