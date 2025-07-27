"use client"

import type * as React from "react"
import {
  BarChart3,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  ImageIcon,
  Settings,
  Users,
  ChevronRight,
  Bell,
  Briefcase,
  Calendar,
  MessageCircle,
  ShoppingBag,
  Star,
  MessageSquare,
  DollarSign,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/authStore"

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/management",
      icon: Home,
    },
    {
      title: "Analytics",
      url: "/management/analytics",
      icon: BarChart3,
    },
    {
      title: "Notifications",
      url: "/management/notifications",
      icon: Bell,
    },
  ],
  navContent: [
    {
      title: "Blog",
      icon: FileText,
      items: [
        {
          title: "All Posts",
          url: "/management/blog",
        },
        {
          title: "Create Post",
          url: "/management/blog/create",
        },
        {
          title: "Categories",
          url: "/management/blog/categories",
        },
        {
          title: "Tags",
          url: "/management/blog/tags",
        },
      ],
    },
    {
      title: "Courses",
      icon: GraduationCap,
      items: [
        {
          title: "All Courses",
          url: "/management/courses",
        },
        {
          title: "Create Course",
          url: "/management/courses/create",
        },
        {
          title: "Categories",
          url: "/management/courses/categories",
        },
        {
          title: "Students",
          url: "/management/courses/students",
        },
      ],
    },
    {
      title: "Media",
      icon: ImageIcon,
      items: [
        {
          title: "All Files",
          url: "/management/media",
        },
        {
          title: "Upload",
          url: "/management/gallery",
        },
      ],
    },
    {
      title: "Careers",
      icon: Briefcase,
      items: [
        {
          title: "All Careers",
          url: "/management/careers",
        },
        {
          title: "Create Career",
          url: "/management/careers/create",
        },
      ],
    },
    {
      title: "Quizzes",
      icon: BookOpen,
      items: [
        {
          title: "All Quizzes",
          url: "/management/quizzes",
        },
        {
          title: "Create Quiz",
          url: "/management/quizzes/create",
        },
      ],
    },
    {
      title: "Streaks",
      icon: Calendar,
      items: [
        {
          title: "All Streaks",
          url: "/management/streaks",
        },
        {
          title: "Create Streak",
          url: "/management/streaks/create",
        },
      ],
    },
    {
      title: 'Events',
      icon: Calendar,
      items: [
        {
          title: 'All Events',
          url: '/management/events',
        },
        {
          title: 'Create Event',
          url: '/management/events/create',
        }
      ]
    },
    {
      title: 'Messages',
      icon: MessageCircle,
      items: [
        {
          title: 'All Messages',
          url: '/management/messages',
        },
        {
          title: 'Create Message',
          url: '/management/messages/create',
        },
        {
          title: 'Create Template',
          url: '/management/templates/create',
        }
      ],
    },
    {
      title: 'Messages Templates',
      icon: MessageSquare,
      items: [
        {
          title: 'All Templates',
          url: '/management/templates',
        },
        {
          title: 'Create Template',
          url: '/management/templates/create',
        }
      ]
    },
    {
      title: 'Products',
      icon: ShoppingBag,
      items: [
        {
          title: 'All Products',
          url: '/management/products',
        },
        {
          title: 'Create Product',
          url: '/management/products/create',
        },
        {
          title: 'Categories',
          url: '/management/products/categories',
        }
      ]
    },
    {
      title: 'Orders',
      icon: ShoppingBag,
      items: [
        {
          title: 'All Orders',
          url: '/management/orders',
        },
        {
          title: 'Create Order',
          url: '/management/orders/create',
        }
      ]
    },
    {
      title: 'Team',
      icon: Users,
      items: [
        {
          title: 'All Team',
          url: '/management/team',
        },
        {
          title: 'Add Team Member',
          url: '/management/team/create',
        } 
      ]
    },
    {
      title: 'Sessions',
      icon: Calendar,
      items: [
        {
          title: 'All Sessions',
          url: '/management/sessions',
        },
        {
          title: 'Calendar View',
          url: '/management/sessions/calendar',
        },
        {
          title: 'Scheduled Sessions',
          url: '/management/sessions/scheduled',
        },
        {
          title: 'Set Availability',
          url: '/management/sessions/availability',
        }
      ]
    },
    {
      title: 'Communities',
      icon: Users,
      items: [
        {
          title: 'All Communities',
          url: '/management/communities',
        },
        {
          title: 'Create Community',
          url: '/management/communities/create',
        }
      ]
    },
    {
      title: 'Pricing',
      icon: DollarSign,
      items: [
        {
          title: 'All Pricing',
          url: '/management/pricing-table',
        },
        {
          title: 'Create Pricing',
          url: '/management/pricing-table/create',
        }
      ]
    }
  ],
  navManagement: [
    {
      title: 'Reviews',
      icon: Star,
      url: '/management/reviews',
    },
    {
      title: "Users",
      url: "/management/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/management/settings",
      icon: Settings,
    },
    {
      title: "Account",
      url: "/management/account",
      icon: User,
    },
  ],  
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/management">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BookOpen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Tiny Steps A Day</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarMenu>
            {data.navContent.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            {data.navManagement.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                  <AvatarFallback className="rounded-lg">{user?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.username}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
} 