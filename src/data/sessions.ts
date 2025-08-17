export interface SessionRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: "individual" | "couple" | "group" | "initial";
  notes?: string;
  status: "pending" | "confirmed" | "rescheduled" | "cancelled" | "completed";
  assignedTo?: string; // Team member ID
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  cancellationReason?: string;
  rescheduledTo?: {
    date: string;
    time: string;
  };
  responseMessage?: string;
  responseTemplate?: string;
}

export interface ScheduledSession {
  id: string;
  requestId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "individual" | "couple" | "group" | "initial";
  notes?: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  assignedTo: string; // Team member ID
  assignedToName: string;
  meetingLink?: string;
  recordingUrl?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface TeamMemberAvailability {
  id: string;
  memberId: string;
  memberName: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
  maxSessionsPerDay: number;
  createdAt: string;
  updatedAt: string;
}

export interface SessionConflict {
  memberId: string;
  memberName: string;
  conflictingSession: {
    id: string;
    clientName: string;
    date: string;
    time: string;
    duration: number;
  };
}

// Mock data for session requests
export const mockSessionRequests: SessionRequest[] = [
  {
    id: "req_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1-555-0101",
    date: "2025-01-20",
    time: "10:00 AM",
    type: "individual",
    notes: "I'm dealing with anxiety and stress from work. Looking for coping strategies.",
    status: "pending",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z"
  },
  {
    id: "req_002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1-555-0102",
    date: "2025-01-21",
    time: "2:00 PM",
    type: "couple",
    notes: "We're having communication issues and need help improving our relationship.",
    status: "confirmed",
    assignedTo: "3",
    assignedToName: "Aisha Patel",
    confirmedAt: "2025-01-16T14:00:00Z",
    createdAt: "2025-01-15T14:20:00Z",
    updatedAt: "2025-01-16T14:00:00Z"
  },
  {
    id: "req_003",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1-555-0103",
    date: "2025-01-22",
    time: "11:00 AM",
    type: "initial",
    notes: "First time seeking therapy. Not sure what to expect.",
    status: "rescheduled",
    assignedTo: "1",
    assignedToName: "Sarah Johnson",
    rescheduledTo: {
      date: "2025-01-23",
      time: "11:00 AM"
    },
    createdAt: "2025-01-15T16:45:00Z",
    updatedAt: "2025-01-17T09:15:00Z"
  },
  {
    id: "req_004",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1-555-0104",
    date: "2025-01-19",
    time: "3:00 PM",
    type: "group",
    notes: "Interested in joining a group session for stress management.",
    status: "cancelled",
    cancelledAt: "2025-01-18T11:30:00Z",
    cancellationReason: "Client requested cancellation",
    createdAt: "2025-01-15T11:15:00Z",
    updatedAt: "2025-01-18T11:30:00Z"
  },
  {
    id: "req_005",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@example.com",
    phone: "+1-555-0105",
    date: "2025-01-24",
    time: "1:00 PM",
    type: "individual",
    notes: "Need help with career transition and decision-making.",
    status: "pending",
    createdAt: "2025-01-16T08:20:00Z",
    updatedAt: "2025-01-16T08:20:00Z"
  }
];

// Mock data for scheduled sessions
export const mockScheduledSessions: ScheduledSession[] = [
  {
    id: "sess_001",
    requestId: "req_002",
    clientName: "Michael Chen",
    clientEmail: "michael.chen@example.com",
    clientPhone: "+1-555-0102",
    date: "2025-01-21",
    time: "2:00 PM",
    duration: 90,
    type: "couple",
    notes: "We're having communication issues and need help improving our relationship.",
    status: "scheduled",
    assignedTo: "3",
    assignedToName: "Aisha Patel",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    createdAt: "2025-01-16T14:00:00Z",
    updatedAt: "2025-01-16T14:00:00Z"
  },
  {
    id: "sess_002",
    requestId: "req_003",
    clientName: "Emily Davis",
    clientEmail: "emily.davis@example.com",
    clientPhone: "+1-555-0103",
    date: "2025-01-23",
    time: "11:00 AM",
    duration: 45,
    type: "initial",
    notes: "First time seeking therapy. Not sure what to expect.",
    status: "scheduled",
    assignedTo: "1",
    assignedToName: "Sarah Johnson",
    meetingLink: "https://meet.google.com/xyz-uvw-rst",
    createdAt: "2025-01-17T09:15:00Z",
    updatedAt: "2025-01-17T09:15:00Z"
  },
  {
    id: "sess_003",
    requestId: "req_006",
    clientName: "John Smith",
    clientEmail: "john.smith@example.com",
    clientPhone: "+1-555-0106",
    date: "2025-01-20",
    time: "9:00 AM",
    duration: 60,
    type: "individual",
    notes: "Ongoing therapy for depression management.",
    status: "completed",
    assignedTo: "2",
    assignedToName: "Michael Chen",
    meetingLink: "https://meet.google.com/def-ghi-jkl",
    recordingUrl: "https://drive.google.com/recording123",
    createdAt: "2025-01-14T10:00:00Z",
    updatedAt: "2025-01-20T10:00:00Z",
    startedAt: "2025-01-20T09:00:00Z",
    completedAt: "2025-01-20T10:00:00Z"
  }
];

// Mock data for team member availability
export const mockTeamMemberAvailability: TeamMemberAvailability[] = [
  {
    id: "avail_001",
    memberId: "1",
    memberName: "Sarah Johnson",
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    maxSessionsPerDay: 6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_002",
    memberId: "1",
    memberName: "Sarah Johnson",
    dayOfWeek: 2, // Tuesday
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    maxSessionsPerDay: 6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_003",
    memberId: "1",
    memberName: "Sarah Johnson",
    dayOfWeek: 3, // Wednesday
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    maxSessionsPerDay: 6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_004",
    memberId: "1",
    memberName: "Sarah Johnson",
    dayOfWeek: 4, // Thursday
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    maxSessionsPerDay: 6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_005",
    memberId: "1",
    memberName: "Sarah Johnson",
    dayOfWeek: 5, // Friday
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    maxSessionsPerDay: 6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_006",
    memberId: "3",
    memberName: "Aisha Patel",
    dayOfWeek: 1, // Monday
    startTime: "10:00",
    endTime: "18:00",
    isAvailable: true,
    maxSessionsPerDay: 5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_007",
    memberId: "3",
    memberName: "Aisha Patel",
    dayOfWeek: 2, // Tuesday
    startTime: "10:00",
    endTime: "18:00",
    isAvailable: true,
    maxSessionsPerDay: 5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_008",
    memberId: "3",
    memberName: "Aisha Patel",
    dayOfWeek: 3, // Wednesday
    startTime: "10:00",
    endTime: "18:00",
    isAvailable: true,
    maxSessionsPerDay: 5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_009",
    memberId: "3",
    memberName: "Aisha Patel",
    dayOfWeek: 4, // Thursday
    startTime: "10:00",
    endTime: "18:00",
    isAvailable: true,
    maxSessionsPerDay: 5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "avail_010",
    memberId: "3",
    memberName: "Aisha Patel",
    dayOfWeek: 5, // Friday
    startTime: "10:00",
    endTime: "18:00",
    isAvailable: true,
    maxSessionsPerDay: 5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  }
];

// Helper functions
export const getAllSessionRequests = (): SessionRequest[] => {
  return mockSessionRequests;
};

export const getSessionRequestById = (id: string): SessionRequest | undefined => {
  return mockSessionRequests.find(request => request.id === id);
};

export const getSessionRequestsByStatus = (status: SessionRequest['status']): SessionRequest[] => {
  return mockSessionRequests.filter(request => request.status === status);
};

export const getAllScheduledSessions = (): ScheduledSession[] => {
  return mockScheduledSessions;
};

export const getScheduledSessionById = (id: string): ScheduledSession | undefined => {
  return mockScheduledSessions.find(session => session.id === id);
};

export const getSessionsByDate = (date: string): ScheduledSession[] => {
  return mockScheduledSessions.filter(session => session.date === date);
};

export const getSessionsByMember = (memberId: string): ScheduledSession[] => {
  return mockScheduledSessions.filter(session => session.assignedTo === memberId);
};

export const getAllTeamMemberAvailability = (): TeamMemberAvailability[] => {
  return mockTeamMemberAvailability;
};

export const getAvailabilityByMember = (memberId: string): TeamMemberAvailability[] => {
  return mockTeamMemberAvailability.filter(avail => avail.memberId === memberId);
};

export const getAvailabilityByDay = (dayOfWeek: number): TeamMemberAvailability[] => {
  return mockTeamMemberAvailability.filter(avail => avail.dayOfWeek === dayOfWeek);
};

export const checkSessionConflict = (memberId: string, date: string, time: string, duration: number): SessionConflict | null => {
  const memberSessions = getSessionsByMember(memberId);
  const sessionTime = new Date(`${date}T${time}`);
  const sessionEnd = new Date(sessionTime.getTime() + duration * 60000);

  for (const session of memberSessions) {
    if (session.date === date) {
      const existingTime = new Date(`${session.date}T${session.time}`);
      const existingEnd = new Date(existingTime.getTime() + session.duration * 60000);

      // Check for overlap
      if (sessionTime < existingEnd && sessionEnd > existingTime) {
        return {
          memberId,
          memberName: session.assignedToName,
          conflictingSession: {
            id: session.id,
            clientName: session.clientName,
            date: session.date,
            time: session.time,
            duration: session.duration
          }
        };
      }
    }
  }

  return null;
};

export const getAvailableTimeSlots = (memberId: string, date: string): string[] => {
  const dayOfWeek = new Date(date).getDay();
  const availability = getAvailabilityByMember(memberId).find(avail => avail.dayOfWeek === dayOfWeek);
  
  if (!availability || !availability.isAvailable) {
    return [];
  }

  const timeSlots = [];
  const startTime = new Date(`2000-01-01T${availability.startTime}`);
  const endTime = new Date(`2000-01-01T${availability.endTime}`);
  
  // Generate 1-hour slots
  for (let time = new Date(startTime); time < endTime; time.setHours(time.getHours() + 1)) {
    const timeString = time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    // Check if this time slot is already booked
    const conflict = checkSessionConflict(memberId, date, timeString, 60);
    if (!conflict) {
      timeSlots.push(timeString);
    }
  }

  return timeSlots;
};

export const confirmSessionRequest = (requestId: string, memberId: string, memberName: string): SessionRequest | null => {
  const requestIndex = mockSessionRequests.findIndex(request => request.id === requestId);
  if (requestIndex === -1) return null;

  const request = mockSessionRequests[requestIndex];
  
  // Check for conflicts
  const conflict = checkSessionConflict(memberId, request.date, request.time, getSessionDuration(request.type));
  if (conflict) {
    throw new Error(`Conflict detected: ${conflict.memberName} already has a session at ${conflict.conflictingSession.time}`);
  }

  // Update request
  mockSessionRequests[requestIndex] = {
    ...request,
    status: "confirmed",
    assignedTo: memberId,
    assignedToName: memberName,
    confirmedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Create scheduled session
  const scheduledSession: ScheduledSession = {
    id: `sess_${Date.now()}`,
    requestId: request.id,
    clientName: request.name,
    clientEmail: request.email,
    clientPhone: request.phone,
    date: request.date,
    time: request.time,
    duration: getSessionDuration(request.type),
    type: request.type,
    notes: request.notes,
    status: "scheduled",
    assignedTo: memberId,
    assignedToName: memberName,
    meetingLink: generateMeetingLink(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockScheduledSessions.push(scheduledSession);

  return mockSessionRequests[requestIndex];
};

export const rescheduleSession = (requestId: string, newDate: string, newTime: string): SessionRequest | null => {
  const requestIndex = mockSessionRequests.findIndex(request => request.id === requestId);
  if (requestIndex === -1) return null;

  const request = mockSessionRequests[requestIndex];
  
  if (request.assignedTo) {
    // Check for conflicts with the new time
    const conflict = checkSessionConflict(request.assignedTo, newDate, newTime, getSessionDuration(request.type));
    if (conflict) {
      throw new Error(`Conflict detected: ${conflict.memberName} already has a session at ${conflict.conflictingSession.time}`);
    }
  }

  // Update request
  mockSessionRequests[requestIndex] = {
    ...request,
    status: "rescheduled",
    rescheduledTo: {
      date: newDate,
      time: newTime
    },
    updatedAt: new Date().toISOString()
  };

  // Update scheduled session if it exists
  const sessionIndex = mockScheduledSessions.findIndex(session => session.requestId === requestId);
  if (sessionIndex !== -1) {
    mockScheduledSessions[sessionIndex] = {
      ...mockScheduledSessions[sessionIndex],
      date: newDate,
      time: newTime,
      updatedAt: new Date().toISOString()
    };
  }

  return mockSessionRequests[requestIndex];
};

export const cancelSession = (requestId: string, reason?: string): SessionRequest | null => {
  const requestIndex = mockSessionRequests.findIndex(request => request.id === requestId);
  if (requestIndex === -1) return null;

  const request = mockSessionRequests[requestIndex];
  
  // Update request
  mockSessionRequests[requestIndex] = {
    ...request,
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Update scheduled session if it exists
  const sessionIndex = mockScheduledSessions.findIndex(session => session.requestId === requestId);
  if (sessionIndex !== -1) {
    mockScheduledSessions[sessionIndex] = {
      ...mockScheduledSessions[sessionIndex],
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
      cancellationReason: reason,
      updatedAt: new Date().toISOString()
    };
  }

  return mockSessionRequests[requestIndex];
};

export const getSessionStats = () => {
  const totalRequests = mockSessionRequests.length;
  const pendingRequests = mockSessionRequests.filter(req => req.status === "pending").length;
  const confirmedSessions = mockScheduledSessions.filter(session => session.status === "scheduled").length;
  const completedSessions = mockScheduledSessions.filter(session => session.status === "completed").length;
  
  return {
    totalRequests,
    pendingRequests,
    confirmedSessions,
    completedSessions,
  };
};

// Utility functions
export const getSessionDuration = (type: SessionRequest['type']): number => {
  switch (type) {
    case "individual": return 60;
    case "couple": return 90;
    case "group": return 120;
    case "initial": return 45;
    default: return 60;
  }
};

export const getSessionTypeLabel = (type: SessionRequest['type']): string => {
  switch (type) {
    case "individual": return "Individual Session (60 min)";
    case "couple": return "Couple's Session (90 min)";
    case "group": return "Group Session (120 min)";
    case "initial": return "Initial Assessment (45 min)";
    default: return "Individual Session";
  }
};

export const getSessionPrice = (type: SessionRequest['type']): number => {
  switch (type) {
    case "individual": return 99;
    case "couple": return 149;
    case "group": return 199;
    case "initial": return 75;
    default: return 99;
  }
};

const generateMeetingLink = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const code = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.google.com/${code}-${code}-${code}`;
}; 