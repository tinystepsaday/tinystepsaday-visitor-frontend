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
    postedDate: "2025-04-05",
    salary: "$60,000 - $75,000",
    summary: "Create engaging and insightful content for our blog, courses, and programs.",
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
    postedDate: "2025-04-10",
    salary: "$90,000 - $120,000",
    summary: "Design intuitive and engaging user experiences for our web and mobile applications.",
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
    postedDate: "2025-04-15",
    salary: "$85,000 - $115,000",
    summary: "Build beautiful, responsive, and accessible user interfaces for our platform.",
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
    postedDate: "2025-04-18",
    salary: "$60,000 - $80,000",
    summary: "Nurture and grow our community of users, facilitating connections and engagement.",
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
  }
];

export function getCareerById(id: string): Career | undefined {
  return careersData.find(career => career.id === id);
}

export function getAllCareers(): Career[] {
  return careersData;
}
