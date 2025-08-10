export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  salary: string;
  summary: string;
  content: string; // HTML content from rich text editor
  // Management fields
  status: 'active' | 'draft' | 'closed' | 'archived';
  applicationsCount: number;
  lastApplicationDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  requirements: string[];
  benefits: string[];
}

export interface JobApplication {
  id: string;
  careerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  heardFrom: string;
  education: string;
  experience: string;
  whyInterested: string;
  startDate: string;
  salary: string;
  workAuth: boolean;
  sponsorship: boolean;
  resumeUrl?: string;
  coverLetterUrl?: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';
  appliedAt: string;
  lastUpdated: string;
  notes?: string;
  rating?: number;
  tags: string[];
}

export const careersData: Career[] = [];

export const careersData2: Career[] = [
  {
    id: "mindfulness-coach",
    title: "Mindfulness Coach",
    department: "Coaching",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-01-01",
    salary: "$65,000 - $85,000",
    summary: "Guide clients through our mindfulness programs and provide personalized support on their journey.",
    status: "active",
    applicationsCount: 12,
    lastApplicationDate: "2025-01-15",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-10",
    tags: ["mindfulness", "coaching", "remote", "wellness"],
    requirements: [
      "Certification in mindfulness teaching, meditation instruction, or related field",
      "3+ years of experience teaching mindfulness practices",
      "Excellent communication and interpersonal skills",
      "Experience with online coaching and virtual instruction methods",
      "Personal mindfulness practice and commitment to ongoing learning"
    ],
    benefits: [
      "Flexible remote work environment",
      "Health insurance and wellness benefits",
      "Professional development opportunities",
      "Generous PTO and mental health days",
      "Competitive salary with performance bonuses"
    ],
    content: `
      <section>
        <h2>Position Overview</h2>
        <p>We are looking for a compassionate and experienced Mindfulness Coach to join our team. In this role, you will guide clients through our mindfulness programs, provide personalized support, and help them develop sustainable practices for wellbeing.</p>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Guide clients through structured mindfulness programs via one-on-one and group sessions</li>
          <li>Develop personalized mindfulness practice plans tailored to individual needs</li>
          <li>Track client progress and adjust approaches based on feedback and outcomes</li>
          <li>Collaborate with our content team to develop mindfulness exercises and educational materials</li>
          <li>Stay updated on the latest research and techniques in mindfulness and meditation</li>
          <li>Participate in team meetings and contribute to the evolution of our programs</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>Certification in mindfulness teaching, meditation instruction, or related field</li>
          <li>3+ years of experience teaching mindfulness practices in individual or group settings</li>
          <li>Excellent communication and interpersonal skills</li>
          <li>Experience with online coaching and virtual instruction methods</li>
          <li>Personal mindfulness practice and commitment to ongoing learning</li>
          <li>Ability to create safe, inclusive spaces for diverse participants</li>
        </ul>
      </section>

      <section>
        <h2>Nice to Have</h2>
        <ul>
          <li>Background in psychology, counseling, or related behavioral health field</li>
          <li>Experience with trauma-sensitive mindfulness approaches</li>
          <li>Knowledge of various contemplative traditions and practices</li>
          <li>Experience with program development and curriculum design</li>
          <li>Familiarity with digital coaching platforms and tools</li>
        </ul>
      </section>
    `
  },
  {
    id: "content-writer",
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-01-05",
    salary: "$60,000 - $75,000",
    summary: "Create engaging and insightful content for our blog, courses, and programs.",
    status: "active",
    applicationsCount: 8,
    lastApplicationDate: "2025-01-14",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-12",
    tags: ["content", "writing", "remote", "wellness"],
    requirements: [
      "Bachelor's degree in English, Communications, Journalism, or related field",
      "3+ years of professional writing experience",
      "Excellent writing, editing, and proofreading skills",
      "Ability to adapt writing style for different formats and audiences",
      "Basic understanding of SEO principles"
    ],
    benefits: [
      "Remote-first work environment",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible working hours",
      "Professional development budget"
    ],
    content: `
      <section>
        <h2>Position Overview</h2>
        <p>We're seeking a talented Content Writer to create engaging, informative, and inspiring content for our blog, courses, and programs. You'll be instrumental in communicating our approach to personal growth and mindfulness in ways that resonate with our audience.</p>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Create high-quality written content for our blog, newsletters, and social media channels</li>
          <li>Develop educational materials for our online courses and programs</li>
          <li>Collaborate with subject matter experts to ensure content accuracy and depth</li>
          <li>Edit and proofread content from other team members</li>
          <li>Research and stay updated on topics related to mindfulness, well-being, and personal development</li>
          <li>Optimize content for SEO and audience engagement</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>Bachelor's degree in English, Communications, Journalism, or related field</li>
          <li>3+ years of professional writing experience, preferably in wellness, personal development, or related fields</li>
          <li>Excellent writing, editing, and proofreading skills</li>
          <li>Ability to adapt writing style for different formats and audiences</li>
          <li>Basic understanding of SEO principles</li>
          <li>Strong research skills and attention to detail</li>
        </ul>
      </section>

      <section>
        <h2>Nice to Have</h2>
        <ul>
          <li>Personal interest or experience with mindfulness practices</li>
          <li>Knowledge of psychology, neuroscience, or contemplative traditions</li>
          <li>Experience with educational content writing</li>
          <li>Familiarity with content management systems</li>
          <li>Portfolio demonstrating versatility in writing styles</li>
        </ul>
      </section>
    `
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    department: "Product",
    location: "Hybrid (San Francisco)",
    type: "Full-time",
    postedDate: "2025-01-10",
    salary: "$90,000 - $120,000",
    summary: "Design intuitive and engaging user experiences for our web and mobile applications.",
    status: "draft",
    applicationsCount: 0,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
    tags: ["design", "ux", "product", "hybrid"],
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "4+ years of experience in UX/UI design for digital products",
      "Proficiency with design tools such as Figma, Sketch, or Adobe XD",
      "Experience with responsive design and mobile-first approaches",
      "Understanding of accessibility standards and inclusive design principles"
    ],
    benefits: [
      "Hybrid work model with flexible office days",
      "Comprehensive health benefits",
      "Stock options and equity",
      "Professional development and conference budget",
      "Modern office space in San Francisco"
    ],
    content: `
      <section>
        <h2>Position Overview</h2>
        <p>We are looking for a skilled UX Designer to create intuitive and engaging user experiences for our web and mobile applications. You'll work closely with our product and engineering teams to design interfaces that support our users' personal growth journeys.</p>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Design user-centered interfaces for our web and mobile applications</li>
          <li>Create wireframes, prototypes, and high-fidelity mockups</li>
          <li>Conduct user research and usability testing to inform design decisions</li>
          <li>Develop and maintain our design system and component library</li>
          <li>Collaborate with engineers to ensure proper implementation of designs</li>
          <li>Work with product managers to understand requirements and translate them into effective designs</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>Bachelor's degree in Design, HCI, or related field</li>
          <li>4+ years of experience in UX/UI design for digital products</li>
          <li>Proficiency with design tools such as Figma, Sketch, or Adobe XD</li>
          <li>Experience with responsive design and mobile-first approaches</li>
          <li>Understanding of accessibility standards and inclusive design principles</li>
          <li>Strong portfolio demonstrating user-centered design process</li>
        </ul>
      </section>

      <section>
        <h2>Nice to Have</h2>
        <ul>
          <li>Experience designing for wellness, health, or educational applications</li>
          <li>Knowledge of design psychology and behavioral design principles</li>
          <li>Familiarity with front-end technologies (HTML, CSS, JavaScript)</li>
          <li>Experience with animation and micro-interactions</li>
          <li>Background in or passion for mindfulness and personal growth</li>
        </ul>
      </section>
    `
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-01-15",
    salary: "$85,000 - $115,000",
    summary: "Build beautiful, responsive, and accessible user interfaces for our platform.",
    status: "closed",
    applicationsCount: 15,
    lastApplicationDate: "2025-01-08",
    createdAt: "2024-12-15",
    updatedAt: "2025-01-08",
    tags: ["engineering", "frontend", "react", "remote"],
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency with React, TypeScript, and modern CSS",
      "Experience with responsive design and accessibility practices",
      "Understanding of state management patterns and solutions",
      "Familiarity with version control systems (Git) and CI/CD workflows"
    ],
    benefits: [
      "Remote-first work environment",
      "Competitive salary with equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO and flexible hours",
      "Home office setup allowance"
    ],
    content: `
      <section>
        <h2>Position Overview</h2>
        <p>We're looking for a talented Frontend Developer to build beautiful, responsive, and accessible user interfaces for our platform. You'll work with our design and engineering teams to create seamless experiences that help our users engage with our mindfulness and personal growth content.</p>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Implement responsive and accessible user interfaces using React and TypeScript</li>
          <li>Collaborate with designers to bring mockups to life with attention to detail</li>
          <li>Write clean, maintainable code and participate in code reviews</li>
          <li>Optimize applications for performance and cross-browser compatibility</li>
          <li>Work with our backend team to integrate APIs and services</li>
          <li>Contribute to our component library and frontend architecture</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>3+ years of experience in frontend development</li>
          <li>Strong proficiency with React, TypeScript, and modern CSS</li>
          <li>Experience with responsive design and accessibility practices</li>
          <li>Understanding of state management patterns and solutions</li>
          <li>Familiarity with version control systems (Git) and CI/CD workflows</li>
          <li>Good problem-solving skills and attention to detail</li>
        </ul>
      </section>

      <section>
        <h2>Nice to Have</h2>
        <ul>
          <li>Experience with Next.js or similar React frameworks</li>
          <li>Knowledge of testing frameworks like Jest and React Testing Library</li>
          <li>Experience with animation libraries (Framer Motion, GSAP)</li>
          <li>Understanding of performance optimization techniques</li>
          <li>Interest in wellness, mindfulness, or personal development</li>
        </ul>
      </section>
    `
  },
  {
    id: "community-manager",
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-01-18",
    salary: "$60,000 - $80,000",
    summary: "Nurture and grow our community of users, facilitating connections and engagement.",
    status: "active",
    applicationsCount: 6,
    lastApplicationDate: "2025-01-13",
    createdAt: "2025-01-18",
    updatedAt: "2025-01-18",
    tags: ["community", "management", "remote", "engagement"],
    requirements: [
      "3+ years of experience in community management or related role",
      "Excellent written and verbal communication skills",
      "Experience moderating online communities and fostering positive interactions",
      "Ability to empathize with users and understand their needs",
      "Organizational skills and ability to manage multiple priorities"
    ],
    benefits: [
      "Remote work with flexible hours",
      "Health and wellness benefits",
      "Community building budget",
      "Professional development opportunities",
      "Mental health and wellness days"
    ],
    content: `
      <section>
        <h2>Position Overview</h2>
        <p>We are seeking a passionate Community Manager to nurture and grow our community of users, facilitating connections, engagement, and shared learning. You'll be responsible for fostering a supportive environment where members can share their growth journeys and support each other.</p>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Develop and implement community engagement strategies across various platforms</li>
          <li>Moderate community discussions and ensure a safe, inclusive environment</li>
          <li>Create and manage community content calendars and events</li>
          <li>Respond to community questions and provide support</li>
          <li>Collect and analyze community feedback to inform product improvements</li>
          <li>Collaborate with marketing, product, and content teams to align community initiatives</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>3+ years of experience in community management or related role</li>
          <li>Excellent written and verbal communication skills</li>
          <li>Experience moderating online communities and fostering positive interactions</li>
          <li>Ability to empathize with users and understand their needs</li>
          <li>Organizational skills and ability to manage multiple priorities</li>
          <li>Familiarity with community management tools and platforms</li>
        </ul>
      </section>

      <section>
        <h2>Nice to Have</h2>
        <ul>
          <li>Experience with wellness, personal growth, or educational communities</li>
          <li>Knowledge of event planning and facilitation (virtual and in-person)</li>
          <li>Background in customer success or support</li>
          <li>Understanding of analytics and data-driven community building</li>
          <li>Personal interest in mindfulness and holistic well-being</li>
        </ul>
      </section>
    `
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "Engineering",
    location: "Hybrid (New York)",
    type: "Full-time",
    postedDate: "2025-01-20",
    salary: "$100,000 - $130,000",
    summary: "Analyze user behavior and platform data to drive product decisions and improve user experience.",
    status: "active",
    applicationsCount: 9,
    lastApplicationDate: "2025-01-16",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    tags: ["data", "analytics", "engineering", "hybrid"],
    requirements: [
      "Master's degree in Statistics, Computer Science, or related field",
      "3+ years of experience in data science or analytics",
      "Proficiency in Python, R, or similar programming languages",
      "Experience with SQL and data visualization tools",
      "Strong statistical analysis and machine learning skills"
    ],
    benefits: [
      "Hybrid work model with flexible office days",
      "Competitive salary with equity",
      "Comprehensive health benefits",
      "Professional development and conference budget",
      "Modern office space in New York"
    ],
    content: `
      <section>
        <h2>Position Overview</h2>
        <p>We're looking for a Data Scientist to analyze user behavior and platform data to drive product decisions and improve user experience. You'll work closely with our product and engineering teams to uncover insights that help us better serve our community.</p>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Analyze user behavior patterns and engagement metrics</li>
          <li>Develop predictive models to understand user needs and preferences</li>
          <li>Create dashboards and reports for stakeholders</li>
          <li>Design and analyze A/B tests to optimize user experience</li>
          <li>Collaborate with product teams to inform feature development</li>
          <li>Build and maintain data pipelines and analytics infrastructure</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>Master's degree in Statistics, Computer Science, or related field</li>
          <li>3+ years of experience in data science or analytics</li>
          <li>Proficiency in Python, R, or similar programming languages</li>
          <li>Experience with SQL and data visualization tools</li>
          <li>Strong statistical analysis and machine learning skills</li>
          <li>Experience with big data technologies and cloud platforms</li>
        </ul>
      </section>

      <section>
        <h2>Nice to Have</h2>
        <ul>
          <li>Experience in wellness, health, or educational technology</li>
          <li>Knowledge of behavioral psychology and user research</li>
          <li>Experience with real-time analytics and streaming data</li>
          <li>Familiarity with MLOps and model deployment</li>
          <li>Interest in mindfulness and personal development</li>
        </ul>
      </section>
    `
  }
];

// Mock applications data
export const applicationsData: JobApplication[] = [
  {
    id: 'app-1',
    careerId: 'mindfulness-coach',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    website: 'https://sarahjohnson.com',
    heardFrom: 'LinkedIn',
    education: 'Master\'s in Psychology, Stanford University',
    experience: '5+ years as a mindfulness instructor and life coach',
    whyInterested: 'Passionate about helping others develop mindfulness practices and excited about Tiny Steps A Day\'s mission.',
    startDate: '2025-02-01',
    salary: '$75,000',
    workAuth: true,
    sponsorship: false,
    status: 'shortlisted',
    appliedAt: '2025-01-10T10:30:00Z',
    lastUpdated: '2025-01-15T14:20:00Z',
    notes: 'Strong background in psychology. Great communication skills. Schedule interview.',
    rating: 4,
    tags: ['experienced', 'psychology background', 'strong communicator']
  },
  {
    id: 'app-2',
    careerId: 'mindfulness-coach',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'Remote',
    heardFrom: 'Company Website',
    education: 'Bachelor\'s in Education, UC Berkeley',
    experience: '3 years teaching meditation and mindfulness in schools',
    whyInterested: 'Love working with diverse populations and want to make mindfulness accessible to everyone.',
    startDate: '2025-01-15',
    salary: '$70,000',
    workAuth: true,
    sponsorship: false,
    status: 'reviewing',
    appliedAt: '2025-01-12T16:45:00Z',
    lastUpdated: '2025-01-12T16:45:00Z',
    rating: 3,
    tags: ['education background', 'diverse experience']
  },
  {
    id: 'app-3',
    careerId: 'mindfulness-coach',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    heardFrom: 'Referral',
    education: 'Certification in Mindfulness-Based Stress Reduction',
    experience: '2 years as a wellness coach',
    whyInterested: 'Believe in the power of small daily practices and want to help others build sustainable habits.',
    startDate: '2025-02-15',
    salary: '$65,000',
    workAuth: true,
    sponsorship: false,
    status: 'new',
    appliedAt: '2025-01-16T09:15:00Z',
    lastUpdated: '2025-01-16T09:15:00Z',
    rating: 2,
    tags: ['certified', 'wellness background']
  },
  {
    id: 'app-4',
    careerId: 'mindfulness-coach',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    heardFrom: 'Job Board',
    education: 'PhD in Contemplative Studies, Naropa University',
    experience: '8 years in mindfulness research and teaching',
    whyInterested: 'Research background in contemplative practices. Want to apply academic knowledge to practical coaching.',
    startDate: '2025-03-01',
    salary: '$85,000',
    workAuth: false,
    sponsorship: true,
    status: 'interviewing',
    appliedAt: '2025-01-08T11:20:00Z',
    lastUpdated: '2025-01-14T10:30:00Z',
    notes: 'Excellent academic background. Second interview scheduled for next week.',
    rating: 5,
    tags: ['PhD', 'research background', 'sponsorship needed']
  },
  {
    id: 'app-5',
    careerId: 'mindfulness-coach',
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    heardFrom: 'LinkedIn',
    education: 'Master\'s in Social Work, University of Washington',
    experience: '4 years in mental health counseling',
    whyInterested: 'Want to transition from clinical work to preventive wellness through mindfulness coaching.',
    startDate: '2025-01-20',
    salary: '$72,000',
    workAuth: true,
    sponsorship: false,
    status: 'rejected',
    appliedAt: '2025-01-09T14:30:00Z',
    lastUpdated: '2025-01-13T16:45:00Z',
    notes: 'Good background but lacks specific mindfulness teaching experience.',
    rating: 3,
    tags: ['clinical background', 'social work']
  },
  {
    id: 'app-6',
    careerId: 'content-writer',
    firstName: 'Alex',
    lastName: 'Martinez',
    email: 'alex.martinez@email.com',
    phone: '+1 (555) 678-9012',
    location: 'Remote',
    heardFrom: 'Company Website',
    education: 'Bachelor\'s in Journalism, Northwestern University',
    experience: '4 years in content marketing and copywriting',
    whyInterested: 'Passionate about wellness content and want to help people through meaningful writing.',
    startDate: '2025-02-01',
    salary: '$68,000',
    workAuth: true,
    sponsorship: false,
    status: 'shortlisted',
    appliedAt: '2025-01-11T13:20:00Z',
    lastUpdated: '2025-01-16T11:45:00Z',
    rating: 4,
    tags: ['journalism background', 'content marketing']
  },
  {
    id: 'app-7',
    careerId: 'content-writer',
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel.green@email.com',
    phone: '+1 (555) 789-0123',
    location: 'Portland, OR',
    linkedin: 'https://linkedin.com/in/rachelgreen',
    heardFrom: 'LinkedIn',
    education: 'Master\'s in Creative Writing, Columbia University',
    experience: '6 years as a freelance writer and editor',
    whyInterested: 'Love the mission of making wellness accessible through clear, engaging content.',
    startDate: '2025-01-25',
    salary: '$72,000',
    workAuth: true,
    sponsorship: false,
    status: 'reviewing',
    appliedAt: '2025-01-13T15:30:00Z',
    lastUpdated: '2025-01-13T15:30:00Z',
    rating: 5,
    tags: ['creative writing', 'freelance experience']
  },
  {
    id: 'app-8',
    careerId: 'frontend-developer',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 890-1234',
    location: 'Remote',
    heardFrom: 'Job Board',
    education: 'Bachelor\'s in Computer Science, MIT',
    experience: '5 years in frontend development with React and TypeScript',
    whyInterested: 'Want to work on products that make a positive impact on people\'s lives.',
    startDate: '2025-02-01',
    salary: '$95,000',
    workAuth: true,
    sponsorship: false,
    status: 'offered',
    appliedAt: '2024-12-20T10:15:00Z',
    lastUpdated: '2025-01-05T14:30:00Z',
    notes: 'Excellent technical skills. Offer letter sent.',
    rating: 5,
    tags: ['MIT graduate', 'senior developer', 'react expert']
  },
  {
    id: 'app-9',
    careerId: 'community-manager',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 901-2345',
    location: 'Miami, FL',
    heardFrom: 'Referral',
    education: 'Bachelor\'s in Communications, University of Miami',
    experience: '3 years managing online communities for wellness brands',
    whyInterested: 'Believe in the power of community to support personal growth and wellness.',
    startDate: '2025-01-30',
    salary: '$65,000',
    workAuth: true,
    sponsorship: false,
    status: 'interviewing',
    appliedAt: '2025-01-14T12:00:00Z',
    lastUpdated: '2025-01-17T09:15:00Z',
    rating: 4,
    tags: ['wellness communities', 'communications background']
  },
  {
    id: 'app-10',
    careerId: 'data-scientist',
    firstName: 'Kevin',
    lastName: 'Park',
    email: 'kevin.park@email.com',
    phone: '+1 (555) 012-3456',
    location: 'New York, NY',
    heardFrom: 'LinkedIn',
    education: 'PhD in Statistics, Columbia University',
    experience: '4 years in data science for healthcare and wellness companies',
    whyInterested: 'Want to apply data science to improve mental health and wellness outcomes.',
    startDate: '2025-02-15',
    salary: '$110,000',
    workAuth: false,
    sponsorship: true,
    status: 'shortlisted',
    appliedAt: '2025-01-16T16:45:00Z',
    lastUpdated: '2025-01-18T11:20:00Z',
    rating: 5,
    tags: ['PhD', 'healthcare data', 'sponsorship needed']
  }
];

export function getCareerById(id: string): Career | undefined {
  return careersData.find(career => career.id === id);
}

export function getAllCareers(): Career[] {
  return careersData;
}

export function getApplicationsByCareerId(careerId: string): JobApplication[] {
  return applicationsData.filter(app => app.careerId === careerId);
}

export function getApplicationById(applicationId: string): JobApplication | undefined {
  return applicationsData.find(app => app.id === applicationId);
}

export function getAllApplications(): JobApplication[] {
  return applicationsData;
}
