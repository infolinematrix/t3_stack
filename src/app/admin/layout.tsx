

import React, { type ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";

import { NextAuthProvider } from "@/components/next-auth-provider";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@/server/auth/roles";

interface LayoutProps {
  readonly children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {

  const session = await auth();
  if (!session ) return redirect("/signin");
  // if( session.user.role != UserRole.Admin) return redirect("/signin");
  
  return (
    <main>
      <NextAuthProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="max-w-screen-1xl mx-auto">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Page</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="min-h-svh bg-slate-50 p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </NextAuthProvider>
    </main>
  );
}
