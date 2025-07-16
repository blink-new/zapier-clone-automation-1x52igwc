import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Plus, 
  Zap, 
  ArrowRight, 
  Settings, 
  Play, 
  Save,
  Trash2,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'

interface WorkflowStep {
  id: string
  type: 'trigger' | 'action'
  app: string
  event: string
  config: Record<string, any>
}

const availableApps = [
  { id: 'gmail', name: 'Gmail', icon: '📧', category: 'Email' },
  { id: 'slack', name: 'Slack', icon: '💬', category: 'Communication' },
  { id: 'trello', name: 'Trello', icon: '📋', category: 'Project Management' },
  { id: 'sheets', name: 'Google Sheets', icon: '📊', category: 'Spreadsheets' },
  { id: 'salesforce', name: 'Salesforce', icon: '☁️', category: 'CRM' },
  { id: 'shopify', name: 'Shopify', icon: '🛍️', category: 'E-commerce' },
  { id: 'twitter', name: 'Twitter', icon: '🐦', category: 'Social Media' },
  { id: 'dropbox', name: 'Dropbox', icon: '📁', category: 'File Storage' },
  { id: 'webhook', name: 'Webhooks', icon: '🔗', category: 'Developer Tools' },
  { id: 'email', name: 'Email', icon: '✉️', category: 'Email' }
]

const appEvents = {
  gmail: {
    triggers: ['New Email', 'New Label', 'New Attachment'],
    actions: ['Send Email', 'Create Draft', 'Add Label']
  },
  slack: {
    triggers: ['New Message', 'New Channel', 'New Mention'],
    actions: ['Send Message', 'Create Channel', 'Update Status']
  },
  trello: {
    triggers: ['New Card', 'Card Moved', 'Due Date Approaching'],
    actions: ['Create Card', 'Move Card', 'Add Comment']
  },
  sheets: {
    triggers: ['New Row', 'Updated Row'],
    actions: ['Create Row', 'Update Row', 'Create Spreadsheet']
  }
}

export default function WorkflowBuilder() {
  const [workflowName, setWorkflowName] = useState('Untitled Zap')
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [selectedApp, setSelectedApp] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<string>('')
  const [stepType, setStepType] = useState<'trigger' | 'action'>('trigger')
  const [isAppDialogOpen, setIsAppDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredApps = availableApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(availableApps.map(app => app.category)))]

  const addStep = () => {
    if (!selectedApp || !selectedEvent) return

    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type: stepType,
      app: selectedApp,
      event: selectedEvent,
      config: {}
    }

    setSteps([...steps, newStep])
    setSelectedApp('')
    setSelectedEvent('')
    setIsAppDialogOpen(false)
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId))
  }

  const openAppDialog = (type: 'trigger' | 'action') => {
    setStepType(type)
    setIsAppDialogOpen(true)
  }

  const getAppIcon = (appId: string) => {
    return availableApps.find(app => app.id === appId)?.icon || '⚡'
  }

  const getAppName = (appId: string) => {
    return availableApps.find(app => app.id === appId)?.name || appId
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
                <span className="text-primary font-medium">Builder</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Test Zap
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-2xl font-bold border-none p-0 h-auto bg-transparent focus-visible:ring-0"
              placeholder="Enter workflow name..."
            />
            <Badge variant="secondary">Draft</Badge>
          </div>
          <p className="text-gray-600">Build your automated workflow step by step</p>
        </div>

        {/* Workflow Builder */}
        <div className="space-y-6">
          {/* Trigger Step */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
            <CardContent className="p-6">
              {steps.length === 0 || !steps.find(step => step.type === 'trigger') ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Choose a Trigger</h3>
                  <p className="text-gray-600 mb-4">
                    This event will start your automation
                  </p>
                  <Button onClick={() => openAppDialog('trigger')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trigger
                  </Button>
                </div>
              ) : (
                <div>
                  {steps.filter(step => step.type === 'trigger').map((step) => (
                    <div key={step.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                          {getAppIcon(step.app)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{getAppName(step.app)}</h3>
                          <p className="text-sm text-gray-600">{step.event}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Arrow */}
          {steps.find(step => step.type === 'trigger') && (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          )}

          {/* Action Steps */}
          {steps.filter(step => step.type === 'action').map((step, index) => (
            <div key={step.id}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                        {getAppIcon(step.app)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{getAppName(step.app)}</h3>
                        <p className="text-sm text-gray-600">{step.event}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {index < steps.filter(step => step.type === 'action').length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Action Button */}
          {steps.find(step => step.type === 'trigger') && (
            <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Add Action</h3>
                  <p className="text-gray-600 mb-4">
                    Do this when the trigger event happens
                  </p>
                  <Button onClick={() => openAppDialog('action')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Action
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* App Selection Dialog */}
        <Dialog open={isAppDialogOpen} onOpenChange={setIsAppDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>
                Choose an App for {stepType === 'trigger' ? 'Trigger' : 'Action'}
              </DialogTitle>
              <DialogDescription>
                Select the app that will {stepType === 'trigger' ? 'start' : 'perform'} your automation
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* App Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {filteredApps.map((app) => (
                  <Card 
                    key={app.id} 
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      selectedApp === app.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedApp(app.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{app.icon}</div>
                      <h3 className="font-medium text-sm">{app.name}</h3>
                      <p className="text-xs text-gray-500">{app.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Event Selection */}
              {selectedApp && appEvents[selectedApp as keyof typeof appEvents] && (
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium">
                    Choose {stepType === 'trigger' ? 'Trigger' : 'Action'} Event
                  </Label>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={`Select ${stepType} event...`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(stepType === 'trigger' 
                        ? appEvents[selectedApp as keyof typeof appEvents]?.triggers 
                        : appEvents[selectedApp as keyof typeof appEvents]?.actions
                      )?.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAppDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={addStep}
                  disabled={!selectedApp || !selectedEvent}
                >
                  Add {stepType === 'trigger' ? 'Trigger' : 'Action'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}