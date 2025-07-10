"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { AccessControl } from "@/data/pricing";

interface AccessControlManagerProps {
  accessControl: AccessControl;
  onChange: (accessControl: AccessControl) => void;
  readOnly?: boolean;
}

export default function AccessControlManager({ 
  accessControl, 
  onChange, 
  readOnly = false 
}: AccessControlManagerProps) {
  const handleChange = (section: keyof AccessControl, field: string, value: unknown) => {
    if (readOnly) return;
    
    onChange({
      ...accessControl,
      [section]: {
        ...accessControl[section],
        [field]: value
      }
    });
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'vip': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'premium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'none': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Courses Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Courses Access</span>
            <Badge className={getAccessLevelColor(accessControl.courses.access)}>
              {accessControl.courses.access.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Access Level</Label>
                                <Select 
                    value={accessControl.courses.access} 
                    onValueChange={(value: string) => handleChange('courses', 'access', value)}
                disabled={readOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Max Courses</Label>
              <Input
                type="number"
                value={accessControl.courses.maxCourses || ''}
                onChange={(e) => handleChange('courses', 'maxCourses', parseInt(e.target.value) || undefined)}
                placeholder="Leave empty for unlimited"
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="instructorFeedback"
              checked={accessControl.courses.includeInstructorFeedback}
              onCheckedChange={(checked) => handleChange('courses', 'includeInstructorFeedback', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="instructorFeedback">Include instructor feedback</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="personalizedTutoring"
              checked={accessControl.courses.personalizedTutoring}
              onCheckedChange={(checked) => handleChange('courses', 'personalizedTutoring', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="personalizedTutoring">Personalized tutoring</Label>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Access */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Max Posts Per Month</Label>
              <Input
                type="number"
                value={accessControl.blogPosts.maxPerMonth || ''}
                onChange={(e) => handleChange('blogPosts', 'maxPerMonth', parseInt(e.target.value) || undefined)}
                placeholder="Leave empty for unlimited"
                disabled={readOnly}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unlimitedBlogPosts"
                checked={accessControl.blogPosts.unlimited}
                onCheckedChange={(checked) => handleChange('blogPosts', 'unlimited', checked)}
                disabled={readOnly}
              />
              <Label htmlFor="unlimitedBlogPosts">Unlimited posts</Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="priorityPublishing"
              checked={accessControl.blogPosts.priorityPublishing}
              onCheckedChange={(checked) => handleChange('blogPosts', 'priorityPublishing', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="priorityPublishing">Priority publishing</Label>
          </div>
        </CardContent>
      </Card>

      {/* Streaks Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Streaks Access</span>
            <Badge className={getAccessLevelColor(accessControl.streaks.access)}>
              {accessControl.streaks.access.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Access Level</Label>
                              <Select 
                    value={accessControl.streaks.access} 
                    onValueChange={(value: string) => handleChange('streaks', 'access', value)}
              disabled={readOnly}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="retrospectiveAnalysis"
              checked={accessControl.streaks.retrospectiveAnalysis}
              onCheckedChange={(checked) => handleChange('streaks', 'retrospectiveAnalysis', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="retrospectiveAnalysis">Retrospective analysis</Label>
          </div>
        </CardContent>
      </Card>

      {/* Community Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Community Access</span>
            <Badge className={getAccessLevelColor(accessControl.community.access)}>
              {accessControl.community.access.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Access Level</Label>
                              <Select 
                    value={accessControl.community.access} 
                    onValueChange={(value: string) => handleChange('community', 'access', value)}
              disabled={readOnly}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="leader">Leader</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="canCreateEvents"
              checked={accessControl.community.canCreateEvents}
              onCheckedChange={(checked) => handleChange('community', 'canCreateEvents', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="canCreateEvents">Can create events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="canModerate"
              checked={accessControl.community.canModerate}
              onCheckedChange={(checked) => handleChange('community', 'canModerate', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="canModerate">Can moderate community</Label>
          </div>
        </CardContent>
      </Card>

      {/* Support Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Support Level</span>
            <Badge className={getAccessLevelColor(accessControl.support.level)}>
              {accessControl.support.level.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Support Type</Label>
                                <Select 
                    value={accessControl.support.level} 
                    onValueChange={(value: string) => handleChange('support', 'level', value)}
                disabled={readOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Response Time</Label>
              <Input
                value={accessControl.support.responseTime || ''}
                onChange={(e) => handleChange('support', 'responseTime', e.target.value)}
                placeholder="e.g., 24 hours, 4 hours"
                disabled={readOnly}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentorship */}
      <Card>
        <CardHeader>
          <CardTitle>Mentorship</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Sessions Per Quarter</Label>
              <Input
                type="number"
                value={accessControl.mentorship.sessionsPerQuarter || ''}
                onChange={(e) => handleChange('mentorship', 'sessionsPerQuarter', parseInt(e.target.value) || 0)}
                min="0"
                disabled={readOnly}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unlimitedMentorship"
                checked={accessControl.mentorship.unlimited}
                onCheckedChange={(checked) => handleChange('mentorship', 'unlimited', checked)}
                disabled={readOnly}
              />
              <Label htmlFor="unlimitedMentorship">Unlimited sessions</Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emergencySessions"
              checked={accessControl.mentorship.emergencySessions}
              onCheckedChange={(checked) => handleChange('mentorship', 'emergencySessions', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="emergencySessions">Emergency sessions</Label>
          </div>
        </CardContent>
      </Card>

      {/* Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Assessments</span>
            <Badge className={getAccessLevelColor(accessControl.assessments.type)}>
              {accessControl.assessments.type.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Assessment Type</Label>
                              <Select 
                    value={accessControl.assessments.type} 
                    onValueChange={(value: string) => handleChange('assessments', 'type', value)}
              disabled={readOnly}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
                <SelectItem value="in-depth">In-depth</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="progressTracking"
              checked={accessControl.assessments.progressTracking}
              onCheckedChange={(checked) => handleChange('assessments', 'progressTracking', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="progressTracking">Progress tracking</Label>
          </div>
        </CardContent>
      </Card>

      {/* Events */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Discount Percentage</Label>
              <Input
                type="number"
                value={accessControl.events.discountPercentage || ''}
                onChange={(e) => handleChange('events', 'discountPercentage', parseInt(e.target.value) || 0)}
                min="0"
                max="100"
                disabled={readOnly}
              />
            </div>
            <div>
              <Label>Free Tickets Per Year</Label>
              <Input
                type="number"
                value={accessControl.events.freeTicketsPerYear || ''}
                onChange={(e) => handleChange('events', 'freeTicketsPerYear', parseInt(e.target.value) || 0)}
                min="0"
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="priorityBooking"
              checked={accessControl.events.priorityBooking}
              onCheckedChange={(checked) => handleChange('events', 'priorityBooking', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="priorityBooking">Priority booking</Label>
          </div>
        </CardContent>
      </Card>

      {/* Growth Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Growth Plan</span>
            <Badge className={getAccessLevelColor(accessControl.growthPlan.type)}>
              {accessControl.growthPlan.type.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Plan Type</Label>
                              <Select 
                    value={accessControl.growthPlan.type} 
                    onValueChange={(value: string) => handleChange('growthPlan', 'type', value)}
              disabled={readOnly}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="customized">Customized</SelectItem>
                <SelectItem value="transformational">Transformational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="quarterlyReviews"
              checked={accessControl.growthPlan.quarterlyReviews}
              onCheckedChange={(checked) => handleChange('growthPlan', 'quarterlyReviews', checked)}
              disabled={readOnly}
            />
            <Label htmlFor="quarterlyReviews">Quarterly reviews</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 