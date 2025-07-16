import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Zap, 
  Search, 
  Star,
  ExternalLink,
  CheckCircle,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react'

interface App {
  id: string
  name: string
  description: string
  icon: string
  category: string
  rating: number
  reviews: number
  users: string
  isConnected: boolean
  isPremium: boolean
  triggers: string[]
  actions: string[]
  website: string
}

const mockApps: App[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Send and receive emails, manage your inbox, and organize messages with labels.',
    icon: '📧',
    category: 'Email',
    rating: 4.8,
    reviews: 12500,
    users: '2M+',
    isConnected: true,
    isPremium: false,
    triggers: ['New Email', 'New Label', 'New Attachment', 'Starred Email'],
    actions: ['Send Email', 'Create Draft', 'Add Label', 'Mark as Read'],
    website: 'https://gmail.com'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and collaboration platform for modern workplaces.',
    icon: '💬',
    category: 'Communication',
    rating: 4.7,
    reviews: 8900,
    users: '1.5M+',
    isConnected: false,
    isPremium: false,
    triggers: ['New Message', 'New Channel', 'New Mention', 'Reaction Added'],
    actions: ['Send Message', 'Create Channel', 'Update Status', 'Pin Message'],
    website: 'https://slack.com'
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Visual project management tool that makes it easy to organize anything.',
    icon: '📋',
    category: 'Project Management',
    rating: 4.6,
    reviews: 6700,
    users: '800K+',
    isConnected: true,
    isPremium: false,
    triggers: ['New Card', 'Card Moved', 'Due Date Approaching', 'Card Completed'],
    actions: ['Create Card', 'Move Card', 'Add Comment', 'Set Due Date'],
    website: 'https://trello.com'
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    description: 'Create, edit, and collaborate on spreadsheets online.',
    icon: '📊',
    category: 'Spreadsheets',
    rating: 4.5,
    reviews: 15200,
    users: '3M+',
    isConnected: false,
    isPremium: false,
    triggers: ['New Row', 'Updated Row', 'New Spreadsheet'],
    actions: ['Create Row', 'Update Row', 'Create Spreadsheet', 'Delete Row'],
    website: 'https://sheets.google.com'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'World\'s #1 CRM platform for sales, service, and marketing.',
    icon: '☁️',
    category: 'CRM',
    rating: 4.4,
    reviews: 3400,
    users: '500K+',
    isConnected: false,
    isPremium: true,
    triggers: ['New Lead', 'Opportunity Updated', 'Account Created'],
    actions: ['Create Lead', 'Update Opportunity', 'Send Email', 'Create Task'],
    website: 'https://salesforce.com'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Complete commerce platform that lets you start, grow, and manage a business.',
    icon: '🛍️',
    category: 'E-commerce',
    rating: 4.6,
    reviews: 5600,
    users: '600K+',
    isConnected: false,
    isPremium: false,
    triggers: ['New Order', 'Order Cancelled', 'Product Updated', 'Customer Created'],
    actions: ['Create Product', 'Update Inventory', 'Send Email', 'Create Discount'],
    website: 'https://shopify.com'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Social networking service for sharing thoughts and staying updated.',
    icon: '🐦',
    category: 'Social Media',
    rating: 4.2,
    reviews: 9800,
    users: '1.2M+',
    isConnected: false,
    isPremium: false,
    triggers: ['New Tweet', 'New Mention', 'New Follower', 'Tweet Liked'],
    actions: ['Post Tweet', 'Send DM', 'Like Tweet', 'Retweet'],
    website: 'https://twitter.com'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Cloud storage service that lets you sync files across devices.',
    icon: '📁',
    category: 'File Storage',
    rating: 4.3,
    reviews: 4200,
    users: '400K+',
    isConnected: true,
    isPremium: false,
    triggers: ['New File', 'File Updated', 'Folder Created'],
    actions: ['Upload File', 'Create Folder', 'Share File', 'Move File'],
    website: 'https://dropbox.com'
  },
  {
    id: 'webhook',
    name: 'Webhooks',
    description: 'Receive HTTP requests from any service and trigger automations.',
    icon: '🔗',
    category: 'Developer Tools',
    rating: 4.7,
    reviews: 2100,
    users: '300K+',
    isConnected: false,
    isPremium: false,
    triggers: ['Webhook Received', 'POST Request', 'GET Request'],
    actions: ['Send Webhook', 'HTTP Request', 'Parse JSON'],
    website: 'https://webhook.site'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for notes, tasks, wikis, and databases.',
    icon: '📝',
    category: 'Productivity',
    rating: 4.8,
    reviews: 7800,
    users: '900K+',
    isConnected: false,
    isPremium: true,
    triggers: ['New Page', 'Database Updated', 'Page Updated'],
    actions: ['Create Page', 'Update Database', 'Add Block', 'Create Database'],
    website: 'https://notion.so'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Voice, video and text communication service for communities.',
    icon: '🎮',
    category: 'Communication',
    rating: 4.5,
    reviews: 5400,
    users: '700K+',
    isConnected: false,
    isPremium: false,
    triggers: ['New Message', 'User Joined', 'Reaction Added'],
    actions: ['Send Message', 'Create Channel', 'Ban User', 'Add Role'],
    website: 'https://discord.com'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Part spreadsheet, part database, and entirely flexible.',
    icon: '🗃️',
    category: 'Database',
    rating: 4.6,
    reviews: 3900,
    users: '350K+',
    isConnected: false,
    isPremium: true,
    triggers: ['New Record', 'Record Updated', 'View Updated'],
    actions: ['Create Record', 'Update Record', 'Delete Record'],
    website: 'https://airtable.com'
  }
]

const categories = ['All', 'Email', 'Communication', 'Project Management', 'Spreadsheets', 'CRM', 'E-commerce', 'Social Media', 'File Storage', 'Developer Tools', 'Productivity', 'Database']

export default function AppDirectory() {
  const [apps, setApps] = useState<App[]>(mockApps)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'name'>('popular')

  const filteredApps = apps
    .filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           app.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        case 'popular':
        default:
          return b.reviews - a.reviews
      }
    })

  const toggleConnection = (appId: string) => {
    setApps(apps.map(app => 
      app.id === appId 
        ? { ...app, isConnected: !app.isConnected }
        : app
    ))
  }

  const connectedApps = apps.filter(app => app.isConnected).length
  const totalUsers = apps.reduce((sum, app) => {
    const users = parseInt(app.users.replace(/[^\d]/g, ''))
    const multiplier = app.users.includes('M') ? 1000000 : app.users.includes('K') ? 1000 : 1
    return sum + (users * multiplier)
  }, 0)

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
                <span className="text-primary font-medium">Apps</span>
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
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">App Directory</h1>
          <p className="text-gray-600">Connect your favorite apps and services to create powerful automations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Apps</p>
                  <p className="text-2xl font-bold text-gray-900">{apps.length}</p>
                </div>
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Connected</p>
                  <p className="text-2xl font-bold text-green-600">{connectedApps}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalUsers / 1000000).toFixed(1)}M+</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-6">
                    {categories.slice(0, 6).map(category => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                
                <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="rating">Rating</TabsTrigger>
                    <TabsTrigger value="name">Name</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {app.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{app.name}</span>
                        {app.isPremium && (
                          <Badge variant="secondary" className="text-xs">
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{app.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{app.reviews.toLocaleString()} reviews</span>
                      </div>
                    </div>
                  </div>
                  
                  {app.isConnected && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {app.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline">{app.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-medium">{app.users}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>Triggers:</strong> {app.triggers.slice(0, 2).join(', ')}
                      {app.triggers.length > 2 && ` +${app.triggers.length - 2} more`}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Actions:</strong> {app.actions.slice(0, 2).join(', ')}
                      {app.actions.length > 2 && ` +${app.actions.length - 2} more`}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button
                    variant={app.isConnected ? "outline" : "default"}
                    size="sm"
                    className="flex-1"
                    onClick={() => toggleConnection(app.id)}
                  >
                    {app.isConnected ? 'Connected' : 'Connect'}
                  </Button>
                  
                  <Button variant="ghost" size="sm" asChild>
                    <a href={app.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No apps found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse different categories
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Request App */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Don't see your app?
            </h3>
            <p className="text-gray-600 mb-6">
              Request a new integration and we'll prioritize it based on demand
            </p>
            <Button>
              Request New App
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}