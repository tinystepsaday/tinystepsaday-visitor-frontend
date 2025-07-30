"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Save, ArrowLeft } from "lucide-react";
import { User } from "@/lib/api/users";
import { UserProfileCard } from "./user-details/UserProfileCard";
import { UserOverviewTab } from "./user-details/UserOverviewTab";
import { UserLearningTab } from "./user-details/UserLearningTab";
import { UserFinancialTab } from "./user-details/UserFinancialTab";
import { UserConsultationsTab } from "./user-details/UserConsultationsTab";
import { UserActivityTab } from "./user-details/UserActivityTab";
import { UserSettingsTab } from "./user-details/UserSettingsTab";

interface UserDetailsClientProps {
  user: User;
}

export function UserDetailsClient({ user }: UserDetailsClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSave = () => {
    console.log("Saving user:", editedUser);
    setEditedUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center flex-col w-full gap-4">
        <div className="flex items-center w-full justify-between">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit User
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-start flex-col w-full">
          <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
          <p className="text-muted-foreground">Comprehensive view of user activities and engagement</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <UserProfileCard user={user} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <UserOverviewTab />
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <UserLearningTab />
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <UserFinancialTab />
            </TabsContent>

            <TabsContent value="consultations" className="space-y-6">
              <UserConsultationsTab />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <UserActivityTab />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <UserSettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 