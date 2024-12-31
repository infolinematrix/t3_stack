import Link from "next/link";

import { siteConfig } from "@/config/site";
import { CommandMenu } from "./command-menu";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import { ModeSwitcher } from "./mode-switcher";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { auth } from "@/server/auth";

export async function SiteHeader() {
  const session = await auth();
  // console.log("User-----", session?.user.name);

  return (
    <header className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-0.5">
              {/* <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button> */}
              {/* <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link href={"#"} rel="noreferrer">
                  <Icons.logo className="h-4 w-4" />
                  <span className="sr-only">User</span>
                </Link>
              </Button> */}
              <UserDropdownMenu user={session?.user} />
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
