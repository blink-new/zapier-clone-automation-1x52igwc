import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react'

const recentZaps = [
  {
    id: 1,
    name: 'Gmail to Slack Notifications',
    trigger: 'Gmail',
    action: 'Slack',
    status: 'active',
    runs: 142,
    lastRun: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Trello Card to Google Sheets',
    trigger: 'Trello',
    action: 'Google Sheets',
    status: 'active',
    runs: 89,
    lastRun: '1 hour ago'
  },
  {
    id: 3,
    name: 'Shopify Order to Salesforce',
    trigger: 'Shopify',
    action: 'Salesforce',
    status: 'paused',
    runs: 256,
    lastRun: '3 hours ago'
  },
  {
    id: 4,
    name: 'Twitter Mention to Email',
    trigger: 'Twitter',
    action: 'Email',
    status: 'error',
    runs: 45,
    lastRun: '5 hours ago'
  }
]

const templates = [
  {
    id: 1,
    name: 'Lead Management',
    description: 'Automatically add new leads from forms to your CRM',
    apps: ['Google Forms', 'Salesforce'],
    uses: 1200
  },
  {
    id: 2,
    name: 'Social Media Monitoring',
    description: 'Get notified when your brand is mentioned on social media',
    apps: ['Twitter', 'Slack'],
    uses: 890
  },
  {
    id: 3,
    name: 'E-commerce Automation',
    description: 'Process new orders and update inventory automatically',
    apps: ['Shopify', 'Google Sheets'],
    uses: 2100
  }
]

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalZaps: 12,
    activeZaps: 9,
    totalRuns: 1847,
    successRate: 98.2
  })

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
                <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
                <Link to="/my-zaps" className="text-gray-600 hover:text-gray-900">My Zaps</Link>
                <Link to="/apps" className="text-gray-600 hover:text-gray-900">Apps</Link>
                <Link to="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link to="/builder">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Zap
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your automated workflows</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Zaps</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalZaps}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Zaps</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeZaps}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalZaps - stats.activeZaps} paused
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRuns.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                +0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Zaps</CardTitle>
                <CardDescription>
                  Your most recently active automations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentZaps.map((zap) => (
                    <div key={zap.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">
                            📧
                          </div>
                          <span className="text-sm text-gray-500">→</span>
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm">
                            💬
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-gray-900">{zap.name}</h3>
                          <p className="text-sm text-gray-500">
                            {zap.runs} runs • Last run {zap.lastRun}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={zap.status === 'active' ? 'default' : zap.status === 'paused' ? 'secondary' : 'destructive'}
                        >
                          {zap.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {zap.status === 'paused' && <Pause className="h-3 w-3 mr-1" />}
                          {zap.status === 'error' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {zap.status}
                        </Badge>
                        
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/my-zaps">View All Zaps</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Templates</CardTitle>
                <CardDescription>
                  Get started quickly with these proven automation templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {template.apps.map((app, index) => (
                              <div key={index}>
                                <Badge variant="secondary" className="text-xs">
                                  {app}
                                </Badge>
                                {index < template.apps.length - 1 && (
                                  <span className="mx-1 text-gray-400">→</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {template.uses.toLocaleString()} uses
                          </span>
                          <Button size="sm" asChild>
                            <Link to="/builder">Use Template</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you get the most out of AutoFlow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link to="/builder">
                  <Plus className="h-6 w-6" />
                  <span>Create New Zap</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link to="/apps">
                  <Zap className="h-6 w-6" />
                  <span>Browse Apps</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link to="/analytics">
                  <BarChart3 className="h-6 w-6" />
                  <span>View Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}