import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Zap, 
  Search, 
  Filter, 
  MoreHorizontal,
  Play,
  Pause,
  Settings,
  Copy,
  Trash2,
  Edit,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp
} from 'lucide-react'

interface ZapData {
  id: string
  name: string
  trigger: {
    app: string
    event: string
    icon: string
  }
  actions: Array<{
    app: string
    event: string
    icon: string
  }>
  status: 'active' | 'paused' | 'error' | 'draft'
  runs: number
  successRate: number
  lastRun: string
  created: string
  folder?: string
}

const zaps: ZapData[] = [
  {
    id: '1',
    name: 'Gmail to Slack Notifications',
    trigger: { app: 'Gmail', event: 'New Email', icon: '📧' },
    actions: [{ app: 'Slack', event: 'Send Message', icon: '💬' }],
    status: 'active',
    runs: 142,
    successRate: 98.5,
    lastRun: '2 minutes ago',
    created: '2024-01-15',
    folder: 'Work'
  },
  {
    id: '2',
    name: 'Trello Card to Google Sheets',
    trigger: { app: 'Trello', event: 'New Card', icon: '📋' },
    actions: [{ app: 'Google Sheets', event: 'Create Row', icon: '📊' }],
    status: 'active',
    runs: 89,
    successRate: 100,
    lastRun: '1 hour ago',
    created: '2024-01-12',
    folder: 'Projects'
  },
  {
    id: '3',
    name: 'Shopify Order Processing',
    trigger: { app: 'Shopify', event: 'New Order', icon: '🛍️' },
    actions: [
      { app: 'Salesforce', event: 'Create Lead', icon: '☁️' },
      { app: 'Email', event: 'Send Email', icon: '✉️' }
    ],
    status: 'paused',
    runs: 256,
    successRate: 96.8,
    lastRun: '3 hours ago',
    created: '2024-01-10',
    folder: 'E-commerce'
  },
  {
    id: '4',
    name: 'Twitter Mention Alerts',
    trigger: { app: 'Twitter', event: 'New Mention', icon: '🐦' },
    actions: [{ app: 'Email', event: 'Send Email', icon: '✉️' }],
    status: 'error',
    runs: 45,
    successRate: 88.9,
    lastRun: '5 hours ago',
    created: '2024-01-08'
  },
  {
    id: '5',
    name: 'Lead Qualification Workflow',
    trigger: { app: 'Google Forms', event: 'New Response', icon: '📝' },
    actions: [
      { app: 'Salesforce', event: 'Create Lead', icon: '☁️' },
      { app: 'Slack', event: 'Send Message', icon: '💬' }
    ],
    status: 'active',
    runs: 78,
    successRate: 94.2,
    lastRun: '30 minutes ago',
    created: '2024-01-05',
    folder: 'Sales'
  },
  {
    id: '6',
    name: 'Content Publishing Pipeline',
    trigger: { app: 'Notion', event: 'Database Updated', icon: '📝' },
    actions: [
      { app: 'Twitter', event: 'Post Tweet', icon: '🐦' },
      { app: 'LinkedIn', event: 'Create Post', icon: '💼' }
    ],
    status: 'draft',
    runs: 0,
    successRate: 0,
    lastRun: 'Never',
    created: '2024-01-20',
    folder: 'Marketing'
  }
]

const folders = ['All', 'Work', 'Projects', 'E-commerce', 'Sales', 'Marketing']
const statusOptions = ['All', 'Active', 'Paused', 'Error', 'Draft']

export default function MyZaps() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('recent')

  const filteredZaps = zaps.filter(zap => {
    const matchesSearch = zap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         zap.trigger.app.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === 'All' || zap.folder === selectedFolder
    const matchesStatus = selectedStatus === 'All' || zap.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesFolder && matchesStatus
  })

  const sortedZaps = [...filteredZaps].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.created).getTime() - new Date(a.created).getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      case 'runs':
        return b.runs - a.runs
      case 'success':
        return b.successRate - a.successRate
      default:
        return 0
    }
  })

  const toggleZapStatus = (zapId: string) => {
    // In a real app, this would make an API call
    console.log('Toggle zap status:', zapId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-3 w-3" />
      case 'paused':
        return <Pause className="h-3 w-3" />
      case 'error':
        return <AlertCircle className="h-3 w-3" />
      case 'draft':
        return <Edit className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
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
                <span className="text-primary font-medium">My Zaps</span>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Zaps</h1>
            <p className="text-gray-600">Manage and monitor your automated workflows</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              {sortedZaps.length} total
            </Badge>
            <Badge className="text-sm">
              {sortedZaps.filter(z => z.status === 'active').length} active
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search zaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {folders.map(folder => (
                  <SelectItem key={folder} value={folder}>
                    {folder === 'All' ? 'All Folders' : folder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'All' ? 'All Status' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="runs">Most Runs</SelectItem>
                <SelectItem value="success">Success Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Zaps List */}
        <div className="space-y-4">
          {sortedZaps.map((zap) => (
            <Card key={zap.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Workflow Visual */}
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                        {zap.trigger.icon}
                      </div>
                      
                      {zap.actions.map((action, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-6 h-0.5 bg-gray-300"></div>
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-lg">
                            {action.icon}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Zap Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{zap.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(zap.status)}`}>
                          {getStatusIcon(zap.status)}
                          <span className="ml-1 capitalize">{zap.status}</span>
                        </Badge>
                        {zap.folder && (
                          <Badge variant="outline" className="text-xs">
                            {zap.folder}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{zap.trigger.app} → {zap.actions.map(a => a.app).join(', ')}</span>
                        <span>•</span>
                        <span>{zap.runs} runs</span>
                        <span>•</span>
                        <span>{zap.successRate}% success</span>
                        <span>•</span>
                        <span>Last run {zap.lastRun}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={zap.status === 'active'}
                        onCheckedChange={() => toggleZapStatus(zap.id)}
                        disabled={zap.status === 'error' || zap.status === 'draft'}
                      />
                      <span className="text-sm text-gray-500">
                        {zap.status === 'active' ? 'On' : 'Off'}
                      </span>
                    </div>
                    
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/analytics">
                        <BarChart3 className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/builder">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="h-4 w-4 mr-2" />
                          Test
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedZaps.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No zaps found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedFolder !== 'All' || selectedStatus !== 'All'
                  ? 'Try adjusting your filters or search terms'
                  : 'Create your first automation to get started'
                }
              </p>
              <Button asChild>
                <Link to="/builder">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Zap
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        {sortedZaps.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Runs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sortedZaps.reduce((sum, zap) => sum + zap.runs, 0).toLocaleString()}
                </div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Average Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(sortedZaps.reduce((sum, zap) => sum + zap.successRate, 0) / sortedZaps.length).toFixed(1)}%
                </div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3% this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Zaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sortedZaps.filter(zap => zap.status === 'active').length}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  of {sortedZaps.length} total
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  This month
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}