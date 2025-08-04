import type React from "react"
import Providers from "@/components/providers"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import GlobalSearch from "@/components/global-search"
import Notifications from "@/components/notifications"
import ModeToggle from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb"
import { Suspense } from "react"
import UserMenu from "@/components/user-menu"
import AuthGuard from "@/components/auth/AuthGuard"
import TokenManager from "@/components/auth/TokenManager"

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <TokenManager>
        <AuthGuard requireAuth={true} requireManagementAccess={true}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Suspense fallback={<div className="h-4 w-32 animate-pulse bg-muted rounded" />}>
                    <DynamicBreadcrumb />
                  </Suspense>
                </div>
                <div className="ml-auto flex items-center gap-2 px-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <GlobalSearch />
                  </Suspense>
                  <Notifications />
                  <ModeToggle />
                  <UserMenu />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </AuthGuard>
      </TokenManager>
    </Providers>
  )
}
