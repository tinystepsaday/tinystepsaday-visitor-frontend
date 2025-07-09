"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, User, Mail, Phone, MapPin, Calendar, Star, Linkedin, Twitter, Github, Globe, Users, Briefcase } from "lucide-react";
import { getTeamMemberById } from "@/data/team";
import type { TeamMember } from "@/data/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DetailPageLoader } from "@/components/ui/loaders";
import Image from "next/image";

export default function TeamMemberDetailsPage() {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  useEffect(() => {
    const loadMember = async () => {
      try {
        const memberData = getTeamMemberById(memberId);
        if (memberData) {
          setMember(memberData);
        }
      } catch (error) {
        console.error("Error loading team member:", error);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      loadMember();
    }
  }, [memberId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      "Executive": "bg-purple-100 text-purple-800",
      "Product": "bg-blue-100 text-blue-800",
      "Coaching": "bg-green-100 text-green-800",
      "Technology": "bg-orange-100 text-orange-800",
      "Content": "bg-pink-100 text-pink-800",
      "Community": "bg-indigo-100 text-indigo-800",
      "Research": "bg-teal-100 text-teal-800",
      "Operations": "bg-gray-100 text-gray-800",
    };
    return colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return <DetailPageLoader 
      title="Team Member Details" 
      subtitle="View and manage team member information"
      backHref="/management/team"
      backText="Back to Team"
    />;
  }

  if (!member) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.push("/management/team")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Team Member Not Found</h3>
              <p className="text-muted-foreground">The team member you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center gap-2 w-full justify-between">
            <Button variant="outline" size="sm" onClick={() => router.push("/management/team")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/management/team/${member.id}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Member
            </Button>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <p className="text-muted-foreground">
              {member.role} • {member.department}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Member Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-lg text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDepartmentColor(member.department)}>
                      {member.department}
                    </Badge>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                    {member.isFeatured && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">{member.phone}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{member.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Hire Date</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(member.hireDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          {(member.social.linkedin || member.social.twitter || member.social.github || member.social.website) && (
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Member Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Department</span>
                <Badge className={getDepartmentColor(member.department)}>
                  {member.department}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(member.status)}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Featured</span>
                <div className="flex items-center">
                  {member.isFeatured ? (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  ) : (
                    <span className="text-sm text-muted-foreground">No</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Display Order</span>
                <span className="text-sm font-medium">{member.order}</span>
              </div>
            </CardContent>
          </Card>

          {/* Team Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Role</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Member Since</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(member.hireDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => router.push(`/management/team/${member.id}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Member
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 