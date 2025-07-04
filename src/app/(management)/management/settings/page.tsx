"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, Trash2, Bell, Shield, Globe, Palette } from "lucide-react"
import { MediaSelector } from "@/components/media-selector"
import Image from "next/image"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Content Hub",
    siteDescription: "Your content management platform",
    siteUrl: "https://contenthub.com",
    logo: "",
    favicon: "",
    adminEmail: "admin@contenthub.com",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    language: "en",
    emailNotifications: true,
    pushNotifications: false,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxFileSize: 10,
    allowedFileTypes: "jpg,jpeg,png,gif,pdf,doc,docx",
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Here you would typically call an API to save the settings
  }

  const updateSetting = (key: string, value: string | boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Information
              </CardTitle>
              <CardDescription>Basic information about your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => updateSetting("siteUrl", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting("siteDescription", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => updateSetting("adminEmail", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Localization</CardTitle>
              <CardDescription>Configure language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </CardTitle>
              <CardDescription>Customize your site&apos;s visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4"> 
                <div className="space-y-2">
                  <Label>Site Logo</Label>
                  {settings.logo ? (
                    <div className="flex items-center space-x-4">
                      <Image src={settings.logo || "/placeholder.svg"} alt="Site logo" className="h-12 w-auto" width={100} height={100} />
                      <Button variant="outline" size="sm" onClick={() => updateSetting("logo", "")}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <MediaSelector
                      onSelect={(media) => updateSetting("logo", media.url)}
                      trigger={
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                      }
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  {settings.favicon ? (
                    <div className="flex items-center space-x-4">
                      <Image src={settings.favicon || "/placeholder.svg"} alt="Favicon" className="h-8 w-8" width={100} height={100} />
                      <Button variant="outline" size="sm" onClick={() => updateSetting("favicon", "")}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <MediaSelector
                      onSelect={(media) => updateSetting("favicon", media.url)}
                      trigger={
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Favicon
                        </Button>
                      }
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => updateSetting("allowRegistration", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Require users to verify their email address</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => updateSetting("requireEmailVerification", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Settings</CardTitle>
              <CardDescription>Configure file upload and media handling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => updateSetting("maxFileSize", Number.parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.allowedFileTypes}
                  onChange={(e) => updateSetting("allowedFileTypes", e.target.value)}
                  placeholder="jpg,jpeg,png,gif,pdf,doc,docx"
                />
                <p className="text-xs text-muted-foreground">Comma-separated list of allowed file extensions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Danger Zone</h4>
                <div className="rounded-lg border border-destructive/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Reset All Settings</p>
                      <p className="text-xs text-muted-foreground">
                        This will reset all settings to their default values
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Reset Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
