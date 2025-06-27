import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/_authenticated/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='bg-red-50/50'>
          <header className="bg-white flex h-16 shrink-0 items-center gap-2 border-b px-4 mb-6">
            <SidebarTrigger className="-ml-1 cursor-pointer text-red-300 hover:bg-red-50 hover:text-red-400" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
