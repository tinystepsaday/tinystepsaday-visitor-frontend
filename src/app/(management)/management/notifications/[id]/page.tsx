"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { storage } from "@/lib/storage"
import type { Notification } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertCircle, Info, AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow, format } from "date-fns"

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-6 w-6 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-6 w-6 text-yellow-500" />
    case "error":
      return <AlertCircle className="h-6 w-6 text-red-500" />
    default:
      return <Info className="h-6 w-6 text-blue-500" />
  }
}

const getNotificationBadgeVariant = (type: string) => {
  switch (type) {
    case "success":
      return "default"
    case "warning":
      return "secondary"
    case "error":
      return "destructive"
    default:
      return "outline"
  }
}

export default function NotificationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNotification = () => {
      try {
        const id = params.id as string
        const foundNotification = storage.getNotification(id)

        if (!foundNotification) {
          router.push("/notifications")
          return
        }

        setNotification(foundNotification)

        // Mark as read if not already read
        if (!foundNotification.read) {
          storage.markNotificationAsRead(id)
          setNotification({ ...foundNotification, read: true })
        }
      } catch (error) {
        console.error("Error loading notification:", error)
        router.push("/notifications")
      } finally {
        setIsLoading(false)
      }
    }

    loadNotification()
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Loading notification...</div>
      </div>
    )
  }

  if (!notification) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Notification not found</div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notification Details</h2>
          <p className="text-muted-foreground">View notification information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start space-x-4">
            {getNotificationIcon(notification.type)}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{notification.title}</CardTitle>
                <Badge variant={getNotificationBadgeVariant(notification.type)}>{notification.type}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{formatDistanceToNow(notification.createdAt, { addSuffix: true })}</span>
                <span>•</span>
                <span>{format(notification.createdAt, "PPP 'at' p")}</span>
                {notification.read && (
                  <>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      Read
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Message</h3>
            <CardDescription className="text-base leading-relaxed">{notification.message}</CardDescription>
          </div>

          {notification.actionUrl && (
            <div>
              <h3 className="font-medium mb-2">Related Action</h3>
              <Link href={notification.actionUrl}>
                <Button className="w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Related Content
                </Button>
              </Link>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Type:</span>
                <div className="mt-1">
                  <Badge variant={getNotificationBadgeVariant(notification.type)}>
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Status:</span>
                <div className="mt-1">
                  <Badge variant={notification.read ? "outline" : "secondary"}>
                    {notification.read ? "Read" : "Unread"}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Created:</span>
                <div className="mt-1 text-sm">{format(notification.createdAt, "PPP 'at' p")}</div>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">ID:</span>
                <div className="mt-1 text-sm font-mono">{notification.id}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
