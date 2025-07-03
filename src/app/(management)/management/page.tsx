"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { useAnalytics } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DateRangePicker from "@/components/date-range-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, FileText, GraduationCap, Eye } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { data: analytics, isLoading } = useAnalytics(dateRange ? { from: dateRange.from!, to: dateRange.to! } : undefined)

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Page Views",
      value: analytics?.pageViews.toLocaleString() || "0",
      description: "+20.1% from last month",
      icon: Eye,
    },
    {
      title: "Unique Visitors",
      value: analytics?.uniqueVisitors.toLocaleString() || "0",
      description: "+15.3% from last month",
      icon: Users,
    },
    {
      title: "Blog Posts",
      value: "24",
      description: "3 published this week",
      icon: FileText,
    },
    {
      title: "Active Courses",
      value: "12",
      description: "2 new courses added",
      icon: GraduationCap,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Page Views Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={analytics?.topPages || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Visitor sources breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={analytics?.trafficSources || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="visitors"
                >
                  {analytics?.trafficSources?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New blog post published</p>
                  <p className="text-sm text-muted-foreground">&quot;Getting Started with React&quot; went live</p>
                </div>
                <div className="ml-auto font-medium">2h ago</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Course enrollment</p>
                  <p className="text-sm text-muted-foreground">5 new students enrolled in React course</p>
                </div>
                <div className="ml-auto font-medium">4h ago</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Media uploaded</p>
                  <p className="text-sm text-muted-foreground">3 new images added to media library</p>
                </div>
                <div className="ml-auto font-medium">6h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bounce Rate</span>
                <span className="text-sm text-muted-foreground">
                  {((analytics?.bounceRate || 0) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg. Session Duration</span>
                <span className="text-sm text-muted-foreground">
                  {Math.floor((analytics?.avgSessionDuration || 0) / 60)}m {(analytics?.avgSessionDuration || 0) % 60}s
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Media Files</span>
                <span className="text-sm text-muted-foreground">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-muted-foreground">2.4 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
