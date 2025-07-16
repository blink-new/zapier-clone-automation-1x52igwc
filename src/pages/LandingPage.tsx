import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  ArrowRight, 
  Play, 
  Users, 
  BarChart3, 
  Shield,
  Workflow,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react'

const popularApps = [
  { name: 'Gmail', logo: '📧', color: 'bg-red-100 text-red-700' },
  { name: 'Slack', logo: '💬', color: 'bg-purple-100 text-purple-700' },
  { name: 'Trello', logo: '📋', color: 'bg-blue-100 text-blue-700' },
  { name: 'Google Sheets', logo: '📊', color: 'bg-green-100 text-green-700' },
  { name: 'Salesforce', logo: '☁️', color: 'bg-blue-100 text-blue-700' },
  { name: 'Shopify', logo: '🛍️', color: 'bg-green-100 text-green-700' },
  { name: 'Twitter', logo: '🐦', color: 'bg-blue-100 text-blue-700' },
  { name: 'Dropbox', logo: '📁', color: 'bg-blue-100 text-blue-700' },
]

const features = [
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Visual Workflow Builder',
    description: 'Create complex automations with our intuitive drag-and-drop interface'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '500+ App Integrations',
    description: 'Connect all your favorite apps and services in one place'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Real-time Monitoring',
    description: 'Track your automations and get instant notifications'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    content: 'Zapier Clone has saved us 20+ hours per week on manual tasks. Game changer!',
    rating: 5
  },
  {
    name: 'Mike Chen',
    role: 'Operations Manager',
    company: 'StartupXYZ',
    content: 'The visual workflow builder is incredibly intuitive. Set up our first automation in minutes.',
    rating: 5
  }
]

export default function LandingPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">AutoFlow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/apps" className="text-gray-600 hover:text-gray-900">Apps</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Sign in</Link>
              <Button asChild>
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 100,000+ teams worldwide
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automate your work with
              <span className="text-primary block">powerful workflows</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect your apps and automate workflows to save time and eliminate manual tasks. 
              No coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/dashboard">
                  Start automating for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              Free forever for core features • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Popular Apps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connect your favorite apps
            </h2>
            <p className="text-lg text-gray-600">
              Choose from 500+ integrations to automate your workflow
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularApps.map((app, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center mx-auto mb-2 text-2xl`}>
                    {app.logo}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{app.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/apps">
                View all 500+ apps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to automate
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features that make workflow automation simple and accessible for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-none">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100M+</div>
              <div className="text-primary-foreground/80">Tasks automated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">App integrations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-primary-foreground/80">Uptime guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by teams everywhere
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to automate your workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of teams who save hours every week with AutoFlow
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="px-6">
                Get Started
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Free forever • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AutoFlow</span>
              </div>
              <p className="text-gray-400">
                Automate your work with powerful workflows. No coding required.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/apps" className="hover:text-white">Apps</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/templates" className="hover:text-white">Templates</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}