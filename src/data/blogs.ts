export interface BlogAuthor {
  name: string;
  bio: string;
  avatar: string;
}

export interface BlogComment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content from rich text editor
  category: string;
  author: BlogAuthor;
  date: string;
  readTime: string;
  image: string;
  comments: BlogComment[];
  likes: number;
  related: number[]; // IDs of related posts
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "finding-inner-peace",
    title: "Finding Inner Peace in a Chaotic World",
    excerpt: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
    content: `
      <p>In today's fast-paced world, finding inner peace can feel like an impossible task. We're constantly bombarded with notifications, deadlines, and responsibilities that leave little room for reflection and tranquility.</p><h2>The Importance of Finding Balance</h2>
      <p>Our modern lifestyles often prioritize productivity and achievement over well-being and balance. We find ourselves caught in a cycle of constant doing, rarely giving ourselves permission to simply be.</p><h2>Practical Methods for Cultivating Inner Peace</h2>
      <h3>1. Mindful Breathing</h3><p>One of the simplest ways to center yourself is through mindful breathing. Take a few moments throughout your day to focus solely on your breath.</p><h3>2. Create Boundaries with Technology</h3>
      <p>Our devices can be wonderful tools, but they can also be significant sources of stress and distraction.</p>
      <h3>3. Connect with Nature</h3><p>Spending time in natural environments has been shown to reduce stress and promote feelings of well-being.</p>
      <h2>Conclusion</h2><p>In a world that often seems designed to keep us distracted and off-balance, choosing peace is a radical act.</p>
    `,
    category: "Mindfulness",
    author: {
      name: "Sarah Johnson",
      bio: "Mindfulness coach and meditation teacher with over 10 years of experience helping people find peace in their daily lives.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    comments: [
      {
        id: 1,
        author: {
          name: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "April 16, 2025",
        content: "This article came at the perfect time for me. I've been feeling overwhelmed lately, and these practices seem doable."
      }
    ],
    likes: 45,
    related: [2, 5, 6],
    tags: ["mindfulness", "inner peace", "stress management", "meditation", "wellness"]
  },
  {
    id: 2,
    slug: "mindful-meditation-techniques",
    title: "5 Mindful Meditation Techniques for Beginners",
    excerpt: "Start your meditation journey with these simple yet powerful techniques anyone can master.",
    content: `
      <p>Meditation is one of the most powerful tools we have for cultivating mindfulness and inner peace. Yet for many people, the idea of meditation can feel intimidating or overwhelming.</p>
      
      <h2>Why Meditation Matters</h2>
      <p>In our busy lives, our minds are constantly jumping from one thought to another, rarely finding a moment of stillness. Meditation helps us train our attention and develop a greater awareness.</p>
      
      <h2>Five Simple Meditation Techniques</h2>
      
      <h3>1. Breath Awareness Meditation</h3>
      <p>This is the foundation of most meditation practices. Find a comfortable seated position and simply focus your attention on your breath.</p>
      
      <h3>2. Body Scan Meditation</h3>
      <p>Lie down in a comfortable position and bring your attention to different parts of your body, starting from your toes and moving up to your head.</p>
      
      <h3>3. Loving-Kindness Meditation</h3>
      <p>This practice involves directing well-wishes toward yourself and others. Start by offering kind thoughts to yourself.</p>
      
      <h2>Getting Started</h2>
      <p>Begin with just 5-10 minutes a day. Consistency is more important than duration. Choose a time that works for you.</p>
      
      <h2>Conclusion</h2>
      <p>Meditation is a journey of self-discovery and inner growth. As you develop your practice, you'll likely notice subtle shifts in your awareness.</p>
    `,
    category: "Meditation",
    author: {
      name: "Michael Chen",
      bio: "Meditation instructor and wellness coach specializing in helping beginners establish sustainable mindfulness practices.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 10, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: [
      {
        id: 3,
        author: {
          name: "Emma Thompson",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "April 11, 2025",
        content: "I've been struggling to start a meditation practice, but these techniques seem so approachable."
      }
    ],
    likes: 32,
    related: [1, 3, 6],
    tags: ["meditation", "mindfulness", "beginners", "breathing", "wellness"]
  },
  {
    id: 3,
    slug: "career-transition-guidance",
    title: "Navigating a Successful Career Transition at Any Age",
    excerpt: "Learn how to make a smooth career change regardless of your life stage or background.",
    content: `
      <p>Career transitions can be both exciting and daunting, regardless of your age or experience level. Whether you're switching industries, starting your own business, or returning to work after a break, the process requires careful planning.</p>
      
      <h2>Understanding Your Motivation</h2>
      <p>Before embarking on a career transition, it's essential to understand your underlying motivations. Are you seeking more meaningful work, better work-life balance, higher compensation, or personal growth?</p>
      
      <h2>Assessing Your Transferable Skills</h2>
      <p>One of the biggest concerns people have when changing careers is whether their existing skills will be relevant in a new field. The good news is that many skills are transferable across industries and roles.</p>
      
      <h2>Building Your Network</h2>
      <p>Networking is crucial during a career transition. Connect with people in your target industry through professional organizations, social media, and informational interviews.</p>
      
      <h2>Managing the Financial Transition</h2>
      <p>Career transitions often involve some financial uncertainty, especially if you're taking a pay cut or starting your own business. Create a financial plan that accounts for potential income changes.</p>
      
      <h2>Conclusion</h2>
      <p>Career transitions are journeys of self-discovery and growth. While they can be challenging, they also offer opportunities to align your work with your values, passions, and life goals.</p>
    `,
    category: "Career",
    author: {
      name: "Lisa Rodriguez",
      bio: "Career coach and former HR executive with 15 years of experience helping professionals navigate career transitions.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 5, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: [
      {
        id: 4,
        author: {
          name: "David Wilson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "April 6, 2025",
        content: "This article really resonated with me. I'm 45 and considering a career change, and it's encouraging to know that age doesn't have to be a barrier."
      }
    ],
    likes: 67,
    related: [1, 4, 5],
    tags: ["career change", "professional development", "networking", "skills", "transition"]
  },
  {
    id: 4,
    slug: "emotional-intelligence",
    title: "Building Emotional Intelligence for Better Relationships",
    excerpt: "Enhance your emotional intelligence and transform the quality of your personal and professional relationships.",
    content: `
      <p>Emotional intelligence (EQ) is often considered more important than IQ for success in life and work. It's the ability to understand, use, and manage emotions effectively in ourselves and others. Developing emotional intelligence can transform our relationships, improve our communication, and enhance our overall well-being.</p>
      
      <h2>What is Emotional Intelligence?</h2>
      <p>Emotional intelligence consists of four main components:</p>
      <ul>
        <li><strong>Self-awareness:</strong> Understanding your emotions, strengths, weaknesses, and values</li>
        <li><strong>Self-management:</strong> Regulating your emotions and behaviors</li>
        <li><strong>Social awareness:</strong> Understanding others' emotions and social dynamics</li>
        <li><strong>Relationship management:</strong> Building and maintaining healthy relationships</li>
      </ul>
      
      <h2>Developing Self-Awareness</h2>
      <p>Self-awareness is the foundation of emotional intelligence. It involves being honest with yourself about your emotions, motivations, and patterns of behavior. Start by paying attention to your emotional responses throughout the day.</p>
      
      <p>Keep an emotion journal to track your feelings and identify patterns. Notice what triggers certain emotions and how you typically respond. This awareness is the first step toward positive change.</p>
      
      <h2>Managing Your Emotions</h2>
      <p>Once you're aware of your emotions, you can learn to manage them more effectively. This doesn't mean suppressing your feelings—it means understanding them and choosing how to express them constructively.</p>
      
      <p>Practice techniques like deep breathing, taking a pause before responding, and reframing negative thoughts. Remember that emotions are temporary and don't define you.</p>
      
      <h2>Understanding Others</h2>
      <p>Social awareness involves empathy—the ability to understand and share the feelings of others. Practice active listening and try to see situations from others' perspectives.</p>
      
      <p>Pay attention to nonverbal cues like body language, tone of voice, and facial expressions. These often communicate more than words alone.</p>
      
      <h2>Building Better Relationships</h2>
      <p>Strong relationships are built on trust, respect, and effective communication. Practice these skills in all your interactions:</p>
      <ul>
        <li>Listen actively and without judgment</li>
        <li>Express your needs and feelings clearly</li>
        <li>Show appreciation and gratitude</li>
        <li>Resolve conflicts constructively</li>
        <li>Maintain appropriate boundaries</li>
      </ul>
      
      <h2>Emotional Intelligence in the Workplace</h2>
      <p>Emotional intelligence is particularly valuable in professional settings. It helps with leadership, teamwork, customer service, and conflict resolution. Leaders with high EQ are better at motivating teams, managing stress, and creating positive work environments.</p>
      
      <h2>Conclusion</h2>
      <p>Developing emotional intelligence is a lifelong journey that requires practice and patience. The benefits—better relationships, improved communication, and greater personal fulfillment—make the effort worthwhile.</p>
      
      <p>Start with small steps: practice self-reflection, listen more attentively, and be more mindful of your emotional responses. Over time, these practices will become natural and transformative.</p>
    `,
    category: "Relationships",
    author: {
      name: "David Wilson",
      bio: "Psychologist and relationship coach specializing in emotional intelligence and communication skills.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "March 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: [
      {
        id: 5,
        author: {
          name: "Jennifer Wright",
          avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "March 29, 2025",
        content: "I've been working on my emotional intelligence for the past year, and the difference it's made in my relationships is incredible. This article provides great practical tips!"
      }
    ],
    likes: 53,
    related: [1, 3, 5],
    tags: ["emotional intelligence", "relationships", "communication", "empathy", "self-awareness"]
  },
  {
    id: 5,
    slug: "anxiety-management",
    title: "Practical Anxiety Management in High-Pressure Situations",
    excerpt: "Discover effective techniques to manage anxiety when facing high-stakes scenarios.",
    content: `
      <p>Anxiety is a natural response to stress and uncertainty, but when it becomes overwhelming, it can interfere with our ability to perform and enjoy life. Learning to manage anxiety effectively is crucial for maintaining mental health and achieving our goals.</p>
      
      <h2>Understanding Anxiety</h2>
      <p>Anxiety is our body's way of preparing for potential threats. It can manifest as worry, restlessness, physical symptoms like rapid heartbeat, or avoidance behaviors. While some anxiety is normal, excessive anxiety can be debilitating.</p>
      
      <p>It's important to distinguish between normal anxiety and anxiety disorders. If anxiety is interfering with your daily life, consider seeking professional help. The techniques discussed here can complement professional treatment.</p>
      
      <h2>Immediate Anxiety Relief Techniques</h2>
      
      <h3>1. Deep Breathing</h3>
      <p>When anxiety strikes, your breathing often becomes shallow and rapid. Deep breathing can help activate your body's relaxation response. Try the 4-7-8 technique: inhale for 4 counts, hold for 7, exhale for 8.</p>
      
      <h3>2. Progressive Muscle Relaxation</h3>
      <p>This technique involves tensing and then relaxing different muscle groups. Start with your toes and work your way up to your head. This can help release physical tension associated with anxiety.</p>
      
      <h3>3. Grounding Techniques</h3>
      <p>Grounding helps you stay present when anxiety pulls you into worry about the future. Try the 5-4-3-2-1 technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.</p>
      
      <h2>Long-term Anxiety Management</h2>
      
      <h3>Regular Exercise</h3>
      <p>Physical activity is one of the most effective natural anxiety relievers. Exercise releases endorphins, reduces stress hormones, and provides a healthy outlet for nervous energy. Aim for at least 30 minutes of moderate exercise most days.</p>
      
      <h3>Mindfulness and Meditation</h3>
      <p>Regular mindfulness practice can help you develop a different relationship with your thoughts and emotions. Instead of getting caught up in anxious thoughts, you learn to observe them without judgment.</p>
      
      <h3>Healthy Sleep Habits</h3>
      <p>Poor sleep can exacerbate anxiety, while good sleep can help regulate mood and stress levels. Establish a consistent sleep schedule and create a relaxing bedtime routine.</p>
      
      <h2>Managing Anxiety in High-Pressure Situations</h2>
      <p>When facing important presentations, interviews, or other high-stakes situations, anxiety can be particularly challenging. Here are some strategies:</p>
      
      <ul>
        <li><strong>Prepare thoroughly:</strong> The more prepared you are, the more confident you'll feel</li>
        <li><strong>Visualize success:</strong> Imagine yourself handling the situation calmly and effectively</li>
        <li><strong>Focus on what you can control:</strong> Let go of things beyond your influence</li>
        <li><strong>Use positive self-talk:</strong> Replace negative thoughts with encouraging ones</li>
      </ul>
      
      <h2>When to Seek Professional Help</h2>
      <p>If anxiety is significantly impacting your life, relationships, or work, consider seeking help from a mental health professional. Therapy can provide valuable tools and support for managing anxiety effectively.</p>
      
      <h2>Conclusion</h2>
      <p>Managing anxiety is a skill that can be developed with practice. Be patient with yourself and remember that progress often comes in small steps. Celebrate your successes and don't be discouraged by setbacks.</p>
      
      <p>With consistent practice of these techniques, you can develop greater resilience and find more peace in your daily life.</p>
    `,
    category: "Mental Health",
    author: {
      name: "Jennifer Wright",
      bio: "Licensed therapist specializing in anxiety disorders and stress management techniques.",
      avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "March 20, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: [
      {
        id: 6,
        author: {
          name: "Alex Thompson",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "March 21, 2025",
        content: "The grounding technique has been a game-changer for me during panic attacks. Thank you for sharing these practical strategies!"
      }
    ],
    likes: 41,
    related: [1, 2, 4],
    tags: ["anxiety", "stress management", "mental health", "breathing", "mindfulness"]
  },
  {
    id: 6,
    slug: "spiritual-growth",
    title: "Integrating Spiritual Practice Into Your Daily Routine",
    excerpt: "Learn how to incorporate spiritual elements into your everyday life for greater fulfillment.",
    content: `
      <p>Spirituality is deeply personal and can take many forms. Whether you follow a specific religious tradition or have your own spiritual beliefs, integrating spiritual practices into your daily routine can bring greater meaning, peace, and fulfillment to your life.</p>
      
      <h2>What is Spirituality?</h2>
      <p>Spirituality involves connecting with something greater than yourself—whether that's a higher power, nature, the universe, or your own inner wisdom. It's about finding meaning and purpose beyond the material aspects of life.</p>
      
      <p>Spiritual practices can include prayer, meditation, reading sacred texts, spending time in nature, journaling, or simply taking moments to reflect on life's deeper questions.</p>
      
      <h2>Creating a Morning Spiritual Practice</h2>
      <p>Starting your day with spiritual practice can set a positive tone for everything that follows. Even 10-15 minutes can make a significant difference.</p>
      
      <h3>Morning Rituals to Consider</h3>
      <ul>
        <li><strong>Gratitude practice:</strong> Begin each day by acknowledging what you're thankful for</li>
        <li><strong>Meditation or prayer:</strong> Take time to center yourself and connect with your spiritual beliefs</li>
        <li><strong>Reading:</strong> Spend a few minutes reading spiritual or inspirational texts</li>
        <li><strong>Setting intentions:</strong> Reflect on how you want to show up in the world today</li>
      </ul>
      
      <h2>Finding Spirituality in Daily Activities</h2>
      <p>You don't need to set aside large blocks of time for spiritual practice. You can infuse spirituality into your everyday activities:</p>
      
      <h3>Mindful Eating</h3>
      <p>Transform mealtime into a spiritual practice by eating slowly and mindfully. Express gratitude for your food and the people who made it possible.</p>
      
      <h3>Walking Meditation</h3>
      <p>Turn your daily walks into opportunities for spiritual connection. Pay attention to the beauty around you and feel connected to the natural world.</p>
      
      <h3>Acts of Service</h3>
      <p>Helping others can be a powerful spiritual practice. Look for opportunities to serve in your community or simply be kind to those around you.</p>
      
      <h2>Creating Sacred Space</h2>
      <p>Having a dedicated space for spiritual practice can help you maintain consistency. This doesn't need to be elaborate—a corner of a room with a cushion, candle, or meaningful objects can suffice.</p>
      
      <p>Your sacred space should feel peaceful and inspiring to you. Consider what elements help you feel connected to your spiritual beliefs.</p>
      
      <h2>Connecting with Community</h2>
      <p>Spiritual growth often happens in community. Whether through religious services, meditation groups, or spiritual study circles, connecting with like-minded people can provide support and inspiration.</p>
      
      <p>If you don't have access to in-person communities, consider online groups or virtual gatherings.</p>
      
      <h2>Overcoming Common Challenges</h2>
      <p>Many people struggle with maintaining spiritual practices due to busy schedules or feelings of inadequacy. Remember that spirituality is a journey, not a destination.</p>
      
      <p>Start small and be consistent rather than trying to do everything at once. Even a few minutes of spiritual practice each day can have profound effects over time.</p>
      
      <h2>Conclusion</h2>
      <p>Integrating spiritual practice into your daily routine is a personal journey that can bring greater meaning and fulfillment to your life. There's no right or wrong way to practice spirituality—what matters is that it resonates with you and helps you feel more connected to yourself and the world around you.</p>
      
      <p>Be patient with yourself and trust the process. Your spiritual practice will evolve over time, and that's perfectly natural.</p>
    `,
    category: "Spirituality",
    author: {
      name: "Omar Hassan",
      bio: "Spiritual teacher and author who helps people integrate spiritual practices into modern life.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "March 15, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: [
      {
        id: 7,
        author: {
          name: "Maria Garcia",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "March 16, 2025",
        content: "I've been looking for ways to bring more spirituality into my busy life, and these suggestions are so practical and accessible. Thank you!"
      }
    ],
    likes: 38,
    related: [1, 2, 5],
    tags: ["spirituality", "daily practice", "mindfulness", "gratitude", "inner peace"]
  }
];

export const categories = [
  "All Categories", 
  "Mindfulness", 
  "Meditation", 
  "Career", 
  "Relationships", 
  "Mental Health", 
  "Spirituality", 
  "Personal Growth"
];

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find(post => post.slug === slug);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  if (category === "All Categories") {
    return blogPosts;
  }
  return blogPosts.filter(post => post.category === category);
}

export async function getRelatedPosts(postId: number): Promise<BlogPost[]> {
  const post = blogPosts.find(p => p.id === postId);
  if (!post || !post.related) {
    return [];
  }
  return blogPosts.filter(p => post.related.includes(p.id));
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
