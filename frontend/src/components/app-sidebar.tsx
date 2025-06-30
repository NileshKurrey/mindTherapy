import {  Home, LogOut, Nfc, SettingsIcon, UserIcon} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import logo from "@/logo.png"
import { Link, useNavigate } from "@tanstack/react-router"
import { useUserStore } from "@/store/userStore"
import { useEffect } from "react"
import { toast } from "react-toastify"
// Menu items.
const Dashboard = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Sessions",
    url: "/home/sessions",
    icon: Nfc,
  },
  
]
const User =[
    {
        title: "Profile",
        url: "/home/profile",
        icon: UserIcon,
    },
    {
        title: "Settings",
        url: "/home/settings",
        icon: SettingsIcon,
    }
  ]

export function AppSidebar() {
  const { logoutUser,message,success,clearState } = useUserStore() // Assuming you have a logout function in your user store
  const navigate = useNavigate()
  const handleLogout = async () => {
   try {
     await logoutUser()
     toast.success('Logout successful', {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
     })
     clearState()
     navigate({ to: '/sign-in' })
   } catch (error) {
     console.error('Logout failed:', error)
   }
  }
  useEffect(() => {
    if (message && success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    } else if (message && !success) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    }
  }, [handleLogout])
  return (
    <Sidebar className="bg-white">
      <SidebarHeader>
        <div className="flex items-center">
          <Avatar className="rounded-lg w-12 h-12">
            <AvatarImage src={logo} className='w-12 h-12' alt="Logo" />
            <AvatarFallback className="w-12 h-12">Logo</AvatarFallback>
          </Avatar>
            <h2 className="text-3xl font-extrabold text-gray-700">NeuroAI</h2>
        </div>
        </SidebarHeader>  
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Dashboard.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton className="hover:bg-red-300/25 active:bg-red-300/25 active:text-red-300 hover:text-red-300 transition duration-300 ease-in-out delay-150" asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {User.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild className="hover:bg-red-300/25 active:bg-red-300/25 active:text-red-300 hover:text-red-300 transition duration-300 delay-150 ease-in-out">
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key="logout">
                <SidebarMenuButton onClick={() => handleLogout()} asChild className="hover:bg-red-300/25 active:bg-red-300/25 active:text-red-300 hover:text-red-300 transition duration-300 delay-150 ease-in-out cursor-pointer">
                    <span><LogOut />Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <h1>nilesh</h1>
      </SidebarFooter>
    </Sidebar>
  )
}