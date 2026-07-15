import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "../utils/hooks/useAuth";

export default async function DashboardLayout({ children }) {
  const { checkAuth } = useAuth();
  await checkAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TooltipProvider>
        <SidebarProvider
          style={{
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          }}
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
