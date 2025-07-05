"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, GraduationCap, X } from "lucide-react";

export type SharingOption = "all-users" | "subscribers-only" | "learners-only" | "none";

interface SharingSettings {
  allUsers: boolean;
  subscribersOnly: boolean;
  learnersOnly: boolean;
  none: boolean;
}

interface SharingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sharingOption: SharingOption) => void;
}

export function SharingSettingsModal({ isOpen, onClose, onConfirm }: SharingSettingsModalProps) {
  const [sharingSettings, setSharingSettings] = useState<SharingSettings>({
    allUsers: false,
    subscribersOnly: false,
    learnersOnly: false,
    none: false,
  });

  const handleSwitchChange = (option: keyof SharingSettings) => {
    // Reset all switches
    const newSettings = {
      allUsers: false,
      subscribersOnly: false,
      learnersOnly: false,
      none: false,
    };
    
    // Set only the selected option to true
    newSettings[option] = true;
    setSharingSettings(newSettings);
  };

  const handleContinue = () => {
    // Determine which option is selected
    if (sharingSettings.allUsers) {
      onConfirm("all-users");
    } else if (sharingSettings.subscribersOnly) {
      onConfirm("subscribers-only");
    } else if (sharingSettings.learnersOnly) {
      onConfirm("learners-only");
    } else if (sharingSettings.none) {
      onConfirm("none");
    } else {
      // Default to none if nothing is selected
      onConfirm("none");
    }
  };

  const getSelectedOption = (): SharingOption => {
    if (sharingSettings.allUsers) return "all-users";
    if (sharingSettings.subscribersOnly) return "subscribers-only";
    if (sharingSettings.learnersOnly) return "learners-only";
    return "none";
  };

  const isOptionSelected = getSelectedOption() !== "none";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Share Your Post
          </DialogTitle>
          <DialogDescription>
            Choose who you want to share this blog post with when it&apos;s published.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">All Users</CardTitle>
                    <CardDescription className="text-xs">
                      Share with everyone who visits your site
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={sharingSettings.allUsers}
                  onCheckedChange={() => handleSwitchChange("allUsers")}
                />
              </div>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Subscribers Only</CardTitle>
                    <CardDescription className="text-xs">
                      Share only with email subscribers
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={sharingSettings.subscribersOnly}
                  onCheckedChange={() => handleSwitchChange("subscribersOnly")}
                />
              </div>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Learners Only</CardTitle>
                    <CardDescription className="text-xs">
                      Share only with course learners
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={sharingSettings.learnersOnly}
                  onCheckedChange={() => handleSwitchChange("learnersOnly")}
                />
              </div>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <X className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">None (Do not share)</CardTitle>
                    <CardDescription className="text-xs">
                      Publish without sharing notifications
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={sharingSettings.none}
                  onCheckedChange={() => handleSwitchChange("none")}
                />
              </div>
            </CardHeader>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleContinue} disabled={!isOptionSelected}>
            Continue to Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 