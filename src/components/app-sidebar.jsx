import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  CommandIcon,
  CalendarSync,
} from "lucide-react";
import { createServer } from "@/app/utils/supabase/server";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: <ListIcon />,
    },
    {
      title: "Automation dates",
      url: "/dashboard/automation",
      icon: <CalendarSync />,
    },
    // {
    //   title: "Blogs",
    //   url: "#",
    //   icon: <FolderIcon />,
    // },
    // {
    //   title: "Members",
    //   url: "#",
    //   icon: <UsersIcon />,
    // },
  ],
};

export async function AppSidebar({ ...props }) {
  const supabase = await createServer();
  const {data: userData} = await supabase.auth.getUser();
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <img src="/images/logo.jpg" alt="ieee" className="size-7"/>
                <span className="text-base font-semibold">IEEE Damietta</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
