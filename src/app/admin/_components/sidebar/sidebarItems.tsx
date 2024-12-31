import {
  File,
  Inbox,
  Send,
  Receipt,
  KeySquare,
  LucideIcon,
  PanelsTopLeft,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

const basePath = "/admin";

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        path: basePath,
        icon: PanelsTopLeft,
        isActive: true,
      },
    ],
  },
  {
    id: 2,
    label: "Apps & Pages",
    items: [
      {
        title: "Users",
        path: `#`,
        icon: Inbox,
        subItems:[
          { title: "All", path: `${basePath}/user` },
          { title: "Active", path: `${basePath}/user` },
          { title: "Inactive", path: `${basePath}/user` },
          { title: "Suspended", path: `${basePath}/user` },
        ]
      },
      {
        title: "Inbox",
        path: `${basePath}/inbox`,
        icon: Inbox,
      },
      {
        title: "Invoice",
        path: "#",
        icon: Receipt,
        subItems: [
          { title: "List", path: `${basePath}/invoice/list-preview` },
          { title: "View", path: `${basePath}/invoice/view` },
          { title: "Add", path: `${basePath}/invoice/add` },
          { title: "Edit", path: `${basePath}/invoice/edit` },
        ],
      },
      {
        title: "Auth",
        path: "#",
        icon: KeySquare,
        subItems: [
          { title: "Unauthorized", path: `${basePath}/unauthenticated` },
        ],
      },
      {
        title: "Drafts",
        path: `${basePath}/drafts`,
        icon: File,
      },
      {
        title: "Sent",
        path: `${basePath}/sent`,
        icon: Send,
      },
    ],
  },
  {
    id: 3,
    label: "Billing",
    items: [
      {
        title: "Billing",
        path: `${basePath}/billing`,
        icon: Receipt,
      },
    ],
  },
];
