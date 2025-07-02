export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  salary: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
}

export const careersData: Career[] = [
  {
    id: "mindfulness-coach",
    title: "Mindfulness Coach",
    department: "Coaching",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-01",
    salary: "$65,000 - $85,000",
    summary: "Guide clients through our mindfulness programs and provide personalized support on their journey.",
    description: "We are looking for a compassionate and experienced Mindfulness Coach to join our team. In this role, you will guide clients through our mindfulness programs, provide personalized support, and help them develop sustainable practices for wellbeing.",
    responsibilities: [
      "Guide clients through structured mindfulness programs via one-on-one and group sessions",
      "Develop personalized mindfulness practice plans tailored to individual needs",
      "Track client progress and adjust approaches based on feedback and outcomes",
      "Collaborate with our content team to develop mindfulness exercises and educational materials",
      "Stay updated on the latest research and techniques in mindfulness and meditation",
      "Participate in team meetings and contribute to the evolution of our programs"
    ],
    requirements: [
      "Certification in mindfulness teaching, meditation instruction, or related field",
      "3+ years of experience teaching mindfulness practices in individual or group settings",
      "Excellent communication and interpersonal skills",
      "Experience with online coaching and virtual instruction methods",
      "Personal mindfulness practice and commitment to ongoing learning",
      "Ability to create safe, inclusive spaces for diverse participants"
    ],
    preferred: [
      "Background in psychology, counseling, or related behavioral health field",
      "Experience with trauma-sensitive mindfulness approaches",
      "Knowledge of various contemplative traditions and practices",
      "Experience with program development and curriculum design",
      "Familiarity with digital coaching platforms and tools"
    ]
  },
  {
    id: "content-writer",
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-05",
    salary: "$60,000 - $75,000",
    summary: "Create engaging and insightful content for our blog, courses, and programs.",
    description: "We're seeking a talented Content Writer to create engaging, informative, and inspiring content for our blog, courses, and programs. You'll be instrumental in communicating our approach to personal growth and mindfulness in ways that resonate with our audience.",
    responsibilities: [
      "Create high-quality written content for our blog, newsletters, and social media channels",
      "Develop educational materials for our online courses and programs",
      "Collaborate with subject matter experts to ensure content accuracy and depth",
      "Edit and proofread content from other team members",
      "Research and stay updated on topics related to mindfulness, well-being, and personal development",
      "Optimize content for SEO and audience engagement"
    ],
    requirements: [
      "Bachelor's degree in English, Communications, Journalism, or related field",
      "3+ years of professional writing experience, preferably in wellness, personal development, or related fields",
      "Excellent writing, editing, and proofreading skills",
      "Ability to adapt writing style for different formats and audiences",
      "Basic understanding of SEO principles",
      "Strong research skills and attention to detail"
    ],
    preferred: [
      "Personal interest or experience with mindfulness practices",
      "Knowledge of psychology, neuroscience, or contemplative traditions",
      "Experience with educational content writing",
      "Familiarity with content management systems",
      "Portfolio demonstrating versatility in writing styles"
    ]
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    department: "Product",
    location: "Hybrid (San Francisco)",
    type: "Full-time",
    postedDate: "2025-04-10",
    salary: "$90,000 - $120,000",
    summary: "Design intuitive and engaging user experiences for our web and mobile applications.",
    description: "We are looking for a skilled UX Designer to create intuitive and engaging user experiences for our web and mobile applications. You'll work closely with our product and engineering teams to design interfaces that support our users' personal growth journeys.",
    responsibilities: [
      "Design user-centered interfaces for our web and mobile applications",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing to inform design decisions",
      "Develop and maintain our design system and component library",
      "Collaborate with engineers to ensure proper implementation of designs",
      "Work with product managers to understand requirements and translate them into effective designs"
    ],
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "4+ years of experience in UX/UI design for digital products",
      "Proficiency with design tools such as Figma, Sketch, or Adobe XD",
      "Experience with responsive design and mobile-first approaches",
      "Understanding of accessibility standards and inclusive design principles",
      "Strong portfolio demonstrating user-centered design process"
    ],
    preferred: [
      "Experience designing for wellness, health, or educational applications",
      "Knowledge of design psychology and behavioral design principles",
      "Familiarity with front-end technologies (HTML, CSS, JavaScript)",
      "Experience with animation and micro-interactions",
      "Background in or passion for mindfulness and personal growth"
    ]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-15",
    salary: "$85,000 - $115,000",
    summary: "Build beautiful, responsive, and accessible user interfaces for our platform.",
    description: "We're looking for a talented Frontend Developer to build beautiful, responsive, and accessible user interfaces for our platform. You'll work with our design and engineering teams to create seamless experiences that help our users engage with our mindfulness and personal growth content.",
    responsibilities: [
      "Implement responsive and accessible user interfaces using React and TypeScript",
      "Collaborate with designers to bring mockups to life with attention to detail",
      "Write clean, maintainable code and participate in code reviews",
      "Optimize applications for performance and cross-browser compatibility",
      "Work with our backend team to integrate APIs and services",
      "Contribute to our component library and frontend architecture"
    ],
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency with React, TypeScript, and modern CSS",
      "Experience with responsive design and accessibility practices",
      "Understanding of state management patterns and solutions",
      "Familiarity with version control systems (Git) and CI/CD workflows",
      "Good problem-solving skills and attention to detail"
    ],
    preferred: [
      "Experience with Next.js or similar React frameworks",
      "Knowledge of testing frameworks like Jest and React Testing Library",
      "Experience with animation libraries (Framer Motion, GSAP)",
      "Understanding of performance optimization techniques",
      "Interest in wellness, mindfulness, or personal development"
    ]
  },
  {
    id: "community-manager",
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-18",
    salary: "$60,000 - $80,000",
    summary: "Nurture and grow our community of users, facilitating connections and engagement.",
    description: "We are seeking a passionate Community Manager to nurture and grow our community of users, facilitating connections, engagement, and shared learning. You'll be responsible for fostering a supportive environment where members can share their growth journeys and support each other.",
    responsibilities: [
      "Develop and implement community engagement strategies across various platforms",
      "Moderate community discussions and ensure a safe, inclusive environment",
      "Create and manage community content calendars and events",
      "Respond to community questions and provide support",
      "Collect and analyze community feedback to inform product improvements",
      "Collaborate with marketing, product, and content teams to align community initiatives"
    ],
    requirements: [
      "3+ years of experience in community management or related role",
      "Excellent written and verbal communication skills",
      "Experience moderating online communities and fostering positive interactions",
      "Ability to empathize with users and understand their needs",
      "Organizational skills and ability to manage multiple priorities",
      "Familiarity with community management tools and platforms"
    ],
    preferred: [
      "Experience with wellness, personal growth, or educational communities",
      "Knowledge of event planning and facilitation (virtual and in-person)",
      "Background in customer success or support",
      "Understanding of analytics and data-driven community building",
      "Personal interest in mindfulness and holistic well-being"
    ]
  }
];

export function getCareerById(id: string): Career | undefined {
  return careersData.find(career => career.id === id);
}

export function getAllCareers(): Career[] {
  return careersData;
}
