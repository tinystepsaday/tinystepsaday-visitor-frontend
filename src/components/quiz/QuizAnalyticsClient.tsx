"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { quizAPI, transformBackendQuizAnalytics } from '@/integration/quiz';
import type { QuizAnalytics } from '@/data/quizzes';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  Activity,
  BarChart3,
  Download,
  FileText
} from 'lucide-react';

interface QuizAnalyticsClientProps {
  quizId: string;
}

export default function QuizAnalyticsClient({ quizId }: QuizAnalyticsClientProps) {
  const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'engagement'>('overview');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const fetchedAnalytics = await quizAPI.getQuizAnalytics(quizId);
        const transformedAnalytics = transformBackendQuizAnalytics(fetchedAnalytics);
        setAnalytics(transformedAnalytics);
      } catch (err: unknown) {
        console.error('Error fetching quiz analytics:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load analytics';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [quizId]);

  const exportToCSV = () => {
    if (!analytics) return;
    
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Attempts', analytics.totalAttempts],
      ['Completed Attempts', analytics.completedAttempts],
      ['Completion Rate', `${analytics.completionRate.toFixed(1)}%`],
      ['Average Score', `${analytics.averageScore.toFixed(1)}%`],
      ['Average Time Spent', `${analytics.averageTimeSpent.toFixed(1)} minutes`],
      [''],
      ['Level Distribution'],
      ['Excellent', analytics.levelDistribution.excellent],
      ['Good', analytics.levelDistribution.good],
      ['Fair', analytics.levelDistribution.fair],
      ['Needs Improvement', analytics.levelDistribution.needsImprovement]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-analytics-${quizId}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // This would integrate with a PDF library like jsPDF or react-pdf
    alert('PDF export functionality will be implemented with jsPDF integration');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">
              {error || 'Unable to load quiz analytics'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const levelDistributionData = [
    { name: 'Excellent', value: analytics.levelDistribution.excellent, color: '#10B981' },
    { name: 'Good', value: analytics.levelDistribution.good, color: '#3B82F6' },
    { name: 'Fair', value: analytics.levelDistribution.fair, color: '#F59E0B' },
    { name: 'Needs Improvement', value: analytics.levelDistribution.needsImprovement, color: '#EF4444' }
  ];

  const timeDistributionData = [
    { name: 'Fast (<5 min)', value: analytics.timeDistribution.fast, color: '#10B981' },
    { name: 'Normal (5-15 min)', value: analytics.timeDistribution.normal, color: '#3B82F6' },
    { name: 'Slow (>15 min)', value: analytics.timeDistribution.slow, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into quiz performance and user engagement
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Export Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={exportToPDF}>
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2 inline" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'performance'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Performance
            </button>
            <button
              onClick={() => setActiveTab('engagement')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'engagement'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Activity className="w-4 h-4 mr-2 inline" />
              Engagement
            </button>
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalAttempts.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.completedAttempts} completed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.completionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.completedAttempts} out of {analytics.totalAttempts}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageScore.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Across all completed attempts
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageTimeSpent.toFixed(1)}m</div>
                <p className="text-xs text-muted-foreground">
                  Average completion time
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Level Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {levelDistributionData.map((level) => (
                    <div key={level.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: level.color }}
                        />
                        <span className="text-sm font-medium">{level.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{level.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {analytics.completedAttempts > 0 
                            ? ((level.value / analytics.completedAttempts) * 100).toFixed(1)
                            : 0
                          }%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={levelDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {levelDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={levelDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Popular Classifications */}
          {analytics.popularClassifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Popular Classifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.popularClassifications.map((classification, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{classification.classification}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${classification.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">
                          {classification.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          {/* Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Completion Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {timeDistributionData.map((time) => (
                    <div key={time.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{time.name}</span>
                      <div className="text-right">
                        <div className="font-semibold">{time.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {analytics.completedAttempts > 0 
                            ? ((time.value / analytics.completedAttempts) * 100).toFixed(1)
                            : 0
                          }%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {timeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dropoff Points */}
          {analytics.dropoffPoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Question Dropoff Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.dropoffPoints.map((point, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Q{point.questionNumber}</Badge>
                        <span className="font-medium">
                          {point.dropoffCount} users dropped off
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{point.dropoffRate}%</div>
                        <div className="text-xs text-muted-foreground">dropoff rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 