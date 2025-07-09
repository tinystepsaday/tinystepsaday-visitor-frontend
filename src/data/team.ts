export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  hireDate: string;
  location: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  isFeatured: boolean;
  order: number; // For display order
  createdAt: string;
  updatedAt: string;
}

// Mock data based on the existing team members from about page
export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in mindfulness coaching and organizational psychology, Sarah founded Tiny Steps A Day Journey to help people discover their authentic selves and live with greater purpose.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "sarah.johnson@tinystepsaday.com",
    phone: "+1-555-0101",
    department: "Executive",
    status: "active",
    hireDate: "2020-01-15",
    location: "San Francisco, CA",
    skills: ["Leadership", "Mindfulness Coaching", "Organizational Psychology", "Strategic Planning"],
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson"
    },
    isFeatured: true,
    order: 1,
    createdAt: "2020-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Chief Product Officer",
    bio: "Michael brings his background in UX design and behavioral science to create transformative digital experiences that make personal growth accessible and engaging for everyone.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "michael.chen@tinystepsaday.com",
    phone: "+1-555-0102",
    department: "Product",
    status: "active",
    hireDate: "2020-03-20",
    location: "New York, NY",
    skills: ["UX Design", "Behavioral Science", "Product Strategy", "User Research"],
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen"
    },
    isFeatured: true,
    order: 2,
    createdAt: "2020-03-20T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "3",
    name: "Aisha Patel",
    role: "Head of Coaching",
    bio: "A certified mindfulness instructor and therapist, Aisha oversees our coaching programs and ensures they meet the highest standards of practice and care.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "aisha.patel@tinystepsaday.com",
    phone: "+1-555-0103",
    department: "Coaching",
    status: "active",
    hireDate: "2020-05-10",
    location: "Los Angeles, CA",
    skills: ["Mindfulness Instruction", "Therapy", "Program Development", "Team Leadership"],
    social: {
      linkedin: "https://linkedin.com/in/aishapatel",
      twitter: "https://twitter.com/aishapatel"
    },
    isFeatured: true,
    order: 3,
    createdAt: "2020-05-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Chief Technology Officer",
    bio: "David leverages his expertise in software engineering and AI to build the technological foundation that supports our users' personal growth journeys.",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "david.rodriguez@tinystepsaday.com",
    phone: "+1-555-0104",
    department: "Technology",
    status: "active",
    hireDate: "2020-07-15",
    location: "Austin, TX",
    skills: ["Software Engineering", "AI/ML", "System Architecture", "Team Leadership"],
    social: {
      linkedin: "https://linkedin.com/in/davidrodriguez",
      github: "https://github.com/davidrodriguez"
    },
    isFeatured: true,
    order: 4,
    createdAt: "2020-07-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "5",
    name: "Emily Wong",
    role: "Content Director",
    bio: "As an author and meditation teacher, Emily creates and curates our educational content, ensuring it's both scientifically grounded and accessible.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "emily.wong@tinystepsaday.com",
    phone: "+1-555-0105",
    department: "Content",
    status: "active",
    hireDate: "2020-09-01",
    location: "Seattle, WA",
    skills: ["Content Creation", "Meditation Teaching", "Educational Writing", "Content Strategy"],
    social: {
      linkedin: "https://linkedin.com/in/emilywong",
      twitter: "https://twitter.com/emilywong"
    },
    isFeatured: true,
    order: 5,
    createdAt: "2020-09-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Community Manager",
    bio: "James fosters connections within our community, creating spaces for sharing, support, and collective growth among our members.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "james.wilson@tinystepsaday.com",
    phone: "+1-555-0106",
    department: "Community",
    status: "active",
    hireDate: "2021-01-15",
    location: "Portland, OR",
    skills: ["Community Building", "Event Planning", "Social Media", "Member Engagement"],
    social: {
      linkedin: "https://linkedin.com/in/jameswilson",
      twitter: "https://twitter.com/jameswilson"
    },
    isFeatured: false,
    order: 6,
    createdAt: "2021-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "7",
    name: "Olivia Martinez",
    role: "Research Lead",
    bio: "With a PhD in positive psychology, Olivia keeps our approaches aligned with the latest research in wellbeing, habit formation, and personal growth.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef131c1b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "olivia.martinez@tinystepsaday.com",
    phone: "+1-555-0107",
    department: "Research",
    status: "active",
    hireDate: "2021-03-20",
    location: "Boston, MA",
    skills: ["Positive Psychology", "Research Design", "Data Analysis", "Academic Writing"],
    social: {
      linkedin: "https://linkedin.com/in/oliviamartinez",
      twitter: "https://twitter.com/oliviamartinez"
    },
    isFeatured: false,
    order: 7,
    createdAt: "2021-03-20T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "8",
    name: "Nathan Lee",
    role: "Operations Director",
    bio: "Nathan ensures our organization runs smoothly and sustainably, allowing us to focus on our mission of helping people transform their lives.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    email: "nathan.lee@tinystepsaday.com",
    phone: "+1-555-0108",
    department: "Operations",
    status: "active",
    hireDate: "2021-06-01",
    location: "Denver, CO",
    skills: ["Operations Management", "Process Optimization", "Team Coordination", "Strategic Planning"],
    social: {
      linkedin: "https://linkedin.com/in/nathanlee",
      twitter: "https://twitter.com/nathanlee"
    },
    isFeatured: false,
    order: 8,
    createdAt: "2021-06-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  }
];

// Helper functions
export const getAllTeamMembers = (): TeamMember[] => {
  return mockTeamMembers;
};

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return mockTeamMembers.find(member => member.id === id);
};

export const getTeamMembersByDepartment = (department: string): TeamMember[] => {
  return mockTeamMembers.filter(member => member.department === department);
};

export const getTeamMembersByStatus = (status: TeamMember['status']): TeamMember[] => {
  return mockTeamMembers.filter(member => member.status === status);
};

export const getFeaturedTeamMembers = (): TeamMember[] => {
  return mockTeamMembers.filter(member => member.isFeatured);
};

export const addTeamMember = (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember => {
  const newMember: TeamMember = {
    ...member,
    id: (mockTeamMembers.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockTeamMembers.push(newMember);
  return newMember;
};

export const updateTeamMember = (id: string, updates: Partial<TeamMember>): TeamMember | null => {
  const memberIndex = mockTeamMembers.findIndex(member => member.id === id);
  if (memberIndex === -1) return null;
  
  mockTeamMembers[memberIndex] = {
    ...mockTeamMembers[memberIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return mockTeamMembers[memberIndex];
};

export const deleteTeamMember = (id: string): boolean => {
  const memberIndex = mockTeamMembers.findIndex(member => member.id === id);
  if (memberIndex === -1) return false;
  
  mockTeamMembers.splice(memberIndex, 1);
  return true;
};

export const getTeamStats = () => {
  const totalMembers = mockTeamMembers.length;
  const activeMembers = mockTeamMembers.filter(member => member.status === 'active').length;
  const featuredMembers = mockTeamMembers.filter(member => member.isFeatured).length;
  const departments = [...new Set(mockTeamMembers.map(member => member.department))];
  
  return {
    totalMembers,
    activeMembers,
    featuredMembers,
    departments,
  };
};

export const getUniqueDepartments = (): string[] => {
  return [...new Set(mockTeamMembers.map(member => member.department))];
}; 