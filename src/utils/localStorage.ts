/* eslint-disable @typescript-eslint/no-explicit-any */

// User authentication data
export const setUserAuth = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', 'true');
};

export const getUserAuth = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.setItem('isLoggedIn', 'false');
};

// Reading list
export const addToReadingList = (article: any) => {
  const readingList = getReadingList();
  const exists = readingList.some((item: any) => item.id === article.id);
  if (!exists) {
    readingList.push(article);
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }
};

export const removeFromReadingList = (articleId: number) => {
  const readingList = getReadingList();
  const updatedList = readingList.filter((item: any) => item.id !== articleId);
  localStorage.setItem('readingList', JSON.stringify(updatedList));
};

export const getReadingList = () => {
  const list = localStorage.getItem('readingList');
  return list ? JSON.parse(list) : [];
};

// Course progress
export const updateCourseProgress = (courseId: number, progress: number) => {
  const coursesProgress = getCourseProgress();
  coursesProgress[courseId] = progress;
  localStorage.setItem('coursesProgress', JSON.stringify(coursesProgress));
};

export const getCourseProgress = () => {
  const progress = localStorage.getItem('coursesProgress');
  return progress ? JSON.parse(progress) : {};
};

// Streak data
export const updateStreakCheckin = (streakId: string) => {
  const streaks = getStreaks();
  const streak = streaks.find((s: any) => s.id === streakId);
  
  if (streak) {
    const today = new Date();
    streak.lastCheckIn = today.toISOString();
    streak.currentStreak += 1;
    streak.checkIns = streak.checkIns || [];
    streak.checkIns.push(today.toISOString());
    
    localStorage.setItem('streaks', JSON.stringify(streaks));
  }
};

export const enrollInStreak = (streak: any) => {
  const streaks = getStreaks();
  const exists = streaks.some((s: any) => s.id === streak.id);
  
  if (!exists) {
    streak.enrolled = true;
    streak.startDate = new Date().toISOString();
    streak.currentStreak = 0;
    streak.checkIns = [];
    
    streaks.push(streak);
    localStorage.setItem('streaks', JSON.stringify(streaks));
  }
};

export const getStreaks = () => {
  const streaks = localStorage.getItem('streaks');
  return streaks ? JSON.parse(streaks) : [];
};

// Quiz results
export const saveQuizResult = (quizId: string, result: any) => {
  const quizResults = getQuizResults();
  quizResults[quizId] = {
    ...result,
    date: new Date().toISOString()
  };
  localStorage.setItem('quizResults', JSON.stringify(quizResults));
};

export const getQuizResults = () => {
  const results = localStorage.getItem('quizResults');
  return results ? JSON.parse(results) : {};
};

// Scheduled consultations
export const saveConsultation = (consultation: any) => {
  const consultations = getConsultations();
  consultations.push({
    ...consultation,
    id: Date.now(),
    bookedOn: new Date().toISOString()
  });
  localStorage.setItem('consultations', JSON.stringify(consultations));
};

export const getConsultations = () => {
  const consultations = localStorage.getItem('consultations');
  return consultations ? JSON.parse(consultations) : [];
};

// Payment history
export const addPaymentRecord = (payment: any) => {
  const payments = getPaymentHistory();
  payments.push({
    ...payment,
    id: Date.now(),
    date: new Date().toISOString()
  });
  localStorage.setItem('paymentHistory', JSON.stringify(payments));
};

export const getPaymentHistory = () => {
  const history = localStorage.getItem('paymentHistory');
  return history ? JSON.parse(history) : [];
};

// User subscription
export const updateSubscription = (tier: string, billingCycle: string, price: number) => {
  localStorage.setItem('subscriptionType', tier.toLowerCase());
  localStorage.setItem('subscriptionBillingCycle', billingCycle);
  localStorage.setItem('subscriptionStartDate', new Date().toISOString());
  localStorage.setItem('subscriptionPrice', price.toString());
};

export const getSubscription = () => {
  return {
    type: localStorage.getItem('subscriptionType') || 'free',
    billingCycle: localStorage.getItem('subscriptionBillingCycle') || 'monthly',
    startDate: localStorage.getItem('subscriptionStartDate'),
    price: localStorage.getItem('subscriptionPrice')
  };
};

// Account sessions
export const recordSession = () => {
  if (typeof navigator === 'undefined') return;
  
  const sessions = getSessions();
  sessions.push({
    id: Date.now(),
    startTime: new Date().toISOString(),
    device: navigator.userAgent,
    ip: '127.0.0.1' // Mock IP address (in a real app, this would come from the server)
  });
  localStorage.setItem('sessions', JSON.stringify(sessions));
};

export const endSession = (sessionId: number) => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex((s: any) => s.id === sessionId);
  
  if (sessionIndex !== -1) {
    sessions[sessionIndex].endTime = new Date().toISOString();
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }
};

export const getSessions = () => {
  const sessions = localStorage.getItem('sessions');
  return sessions ? JSON.parse(sessions) : [];
};

// Courses taken
export const enrollInCourse = (course: any) => {
  const courses = getEnrolledCourses();
  const exists = courses.some((c: any) => c.id === course.id);
  
  if (!exists) {
    courses.push({
      ...course,
      enrolledOn: new Date().toISOString(),
      progress: 0,
      completed: false
    });
    localStorage.setItem('enrolledCourses', JSON.stringify(courses));
  }
};

export const getEnrolledCourses = () => {
  const courses = localStorage.getItem('enrolledCourses');
  return courses ? JSON.parse(courses) : [];
};
