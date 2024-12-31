"use client";

import * as React from "react";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ActivityIcon,
} from "lucide-react";

import { TeamSwitcher } from "@/app/admin/_components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import SidebarFooterMenu from "./sidebarFooterMenu";
import SidebarNavigation from "./sidebarNavigation";
import SidebarProjects from "./sidebarProjects";
import { sidebarItems } from "./sidebarItems";
import { useSession } from "next-auth/react";


const teams = [
  {
    name: "Administrator",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Operator",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Marketting",
    logo: Command,
    plan: "Free",
  },
  {
    name: "Accounts",
    logo: ActivityIcon,
    plan: "Accounts",
  },
];

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const user = {
    id: session?.user.id,
    name: session?.user.name ?? "No Name",
    email: session?.user.email ?? "m@example.com",
    avatar: session?.user.image ?? "/no-image.png",
    role: session?.user.role ?? "No Role",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation sidebarItems={sidebarItems} />
        <SidebarProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
