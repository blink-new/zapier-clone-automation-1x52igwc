import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Zap, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Activity,
  Calendar,
  Download
} from 'lucide-react'

interface AnalyticsData {
  totalRuns: number
  successfulRuns: number
  failedRuns: number
  successRate: number
  avgExecutionTime: number
  activeZaps: number
  totalZaps: number
  topPerformingZaps: {
    name: string
    runs: number
    successRate: number
    trend: 'up' | 'down' | 'stable'
  }[]
  recentActivity: {
    id: string
    zapName: string
    status: 'success' | 'error'
    timestamp: string
    executionTime: number
  }[]
  dailyStats: {
    date: string
    runs: number
    successes: number
    failures: number
  }[]
}

const mockAnalytics: AnalyticsData = {
  totalRuns: 1847,
  successfulRuns: 1812,
  failedRuns: 35,
  successRate: 98.1,
  avgExecutionTime: 2.3,
  activeZaps: 9,
  totalZaps: 12,
  topPerformingZaps: [
    { name: 'Gmail to Slack Notifications', runs: 342, successRate: 99.1, trend: 'up' },
    { name: 'Shopify Order to Salesforce', runs: 256, successRate: 96.8, trend: 'stable' },
    { name: 'Trello Card to Google Sheets', runs: 189, successRate: 100, trend: 'up' },
    { name: 'Form Submission to CRM', runs: 156, successRate: 94.2, trend: 'down' },
    { name: 'Twitter Mention to Email', runs: 89, successRate: 87.6, trend: 'down' }
  ],
  recentActivity: [
    { id: '1', zapName: 'Gmail to Slack Notifications', status: 'success', timestamp: '2 minutes ago', executionTime: 1.2 },
    { id: '2', zapName: 'Shopify Order to Salesforce', status: 'success', timestamp: '5 minutes ago', executionTime: 3.1 },
    { id: '3', zapName: 'Trello Card to Google Sheets', status: 'success', timestamp: '8 minutes ago', executionTime: 0.9 },
    { id: '4', zapName: 'Form Submission to CRM', status: 'error', timestamp: '12 minutes ago', executionTime: 5.2 },
    { id: '5', zapName: 'Gmail to Slack Notifications', status: 'success', timestamp: '15 minutes ago', executionTime: 1.4 },
    { id: '6', zapName: 'Twitter Mention to Email', status: 'error', timestamp: '18 minutes ago', executionTime: 2.8 },
    { id: '7', zapName: 'Calendar Event to Task', status: 'success', timestamp: '22 minutes ago', executionTime: 1.8 },
    { id: '8', zapName: 'Shopify Order to Salesforce', status: 'success', timestamp: '25 minutes ago', executionTime: 2.9 }
  ],
  dailyStats: [
    { date: '2024-01-15', runs: 89, successes: 87, failures: 2 },
    { date: '2024-01-14', runs: 156, successes: 152, failures: 4 },
    { date: '2024-01-13', runs: 134, successes: 129, failures: 5 },
    { date: '2024-01-12', runs: 178, successes: 174, failures: 4 },
    { date: '2024-01-11', runs: 145, successes: 142, failures: 3 },
    { date: '2024-01-10', runs: 167, successes: 163, failures: 4 },
    { date: '2024-01-09', runs: 123, successes: 119, failures: 4 }
  ]
}

export default function Analytics() {
  const [analytics] = useState<AnalyticsData>(mockAnalytics)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AutoFlow</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/my-zaps" className="text-gray-600 hover:text-gray-900">My Zaps</Link>
                <Link to="/apps" className="text-gray-600 hover:text-gray-900">Apps</Link>
                <span className="text-primary font-medium">Analytics</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              
              <Button asChild>
                <Link to="/builder">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Zap
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">Monitor your automation performance and insights</p>
          </div>
          
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList>
              <TabsTrigger value="7d">7 days</TabsTrigger>
              <TabsTrigger value="30d">30 days</TabsTrigger>
              <TabsTrigger value="90d">90 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalRuns.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.3%</span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Execution Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgExecutionTime}s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+0.2s</span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Zaps</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activeZaps}</div>
              <p className="text-xs text-muted-foreground">
                of {analytics.totalZaps} total zaps
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>
                Daily execution statistics for the last {timeRange}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Chart visualization would go here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing runs, successes, and failures over time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success vs Failure Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Execution Breakdown</CardTitle>
              <CardDescription>
                Success and failure distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Successful</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{analytics.successfulRuns.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{analytics.successRate}%</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${analytics.successRate}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Failed</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{analytics.failedRuns.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{(100 - analytics.successRate).toFixed(1)}%</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Insights</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Most failures occur during peak hours (9-11 AM)</li>
                    <li>• Email integrations have highest success rate (99.2%)</li>
                    <li>• API timeouts account for 60% of failures</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Zaps */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Zaps</CardTitle>
              <CardDescription>
                Your most active automations this period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPerformingZaps.map((zap, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{zap.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{zap.runs} runs</span>
                        <span>•</span>
                        <span>{zap.successRate}% success</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-1 ${getTrendColor(zap.trend)}`}>
                      {getTrendIcon(zap.trend)}
                      <span className="text-xs font-medium">
                        {zap.trend === 'up' ? '+5%' : zap.trend === 'down' ? '-3%' : '0%'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest automation executions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analytics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {activity.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{activity.zapName}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{activity.timestamp}</span>
                          <span>•</span>
                          <span>{activity.executionTime}s</span>
                        </div>
                      </div>
                    </div>
                    
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Usage Insights</CardTitle>
            <CardDescription>
              Recommendations to optimize your automations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Optimization Opportunity</h4>
                </div>
                <p className="text-sm text-blue-800">
                  Consider adding error handling to your "Twitter Mention to Email" zap to improve its 87.6% success rate.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Great Performance</h4>
                </div>
                <p className="text-sm text-green-800">
                  Your "Trello Card to Google Sheets" zap has a perfect 100% success rate. Great job!
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">Performance Tip</h4>
                </div>
                <p className="text-sm text-yellow-800">
                  Peak usage is between 9-11 AM. Consider spreading out triggers to improve response times.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}