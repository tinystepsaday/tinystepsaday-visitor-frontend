
import { Home, 
  // BookOpen, 
  // Heart, Calendar, 
  // CreditCard, 
  // Activity, 
  ChevronUp, 
  User, 
//  List 
} from "lucide-react";

export const dashboardNavItems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />
  },
  // {
  //   title: "My Courses",
  //   path: "/dashboard/courses",
  //   icon: <BookOpen className="h-5 w-5" />
  // },
  // {
  //   title: "Reading List",
  //   path: "/dashboard/reading-list",
  //   icon: <Heart className="h-5 w-5" />
  // },
  // {
  //   title: "Mentorship Sessions",
  //   path: "/dashboard/sessions",
  //   icon: <Calendar className="h-5 w-5" />
  // },
  // {
  //   title: "Scheduled Consultations",
  //   path: "/dashboard/consultations",
  //   icon: <Calendar className="h-5 w-5" />
  // },
  // {
  //   title: "Payment History",
  //   path: "/dashboard/payments",
  //   icon: <CreditCard className="h-5 w-5" />
  // },
  // {
  //   title: "Account & Billing",
  //   path: "/dashboard/account",
  //   icon: <User className="h-5 w-5" />
  // },
  // {
  //   title: "My Streaks",
  //   path: "/dashboard/streaks",
  //   icon: <Activity className="h-5 w-5" />
  // },
  {
    title: "Quiz Results",
    path: "/dashboard/quiz-results",
    icon: <ChevronUp className="h-5 w-5" />
  },
  // {
  //   title: "Recommendations",
  //   path: "/dashboard/recommendations",
  //   icon: <List className="h-5 w-5" />
  // },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <User className="h-5 w-5" />
  }
];
