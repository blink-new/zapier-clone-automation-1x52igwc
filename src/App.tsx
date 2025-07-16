import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import WorkflowBuilder from './pages/WorkflowBuilder'
import AppDirectory from './pages/AppDirectory'
import MyZaps from './pages/MyZaps'
import Analytics from './pages/Analytics'

const blink = createClient({
  projectId: 'zapier-clone-automation-1x52igwc',
  authRequired: false
})

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<WorkflowBuilder />} />
          <Route path="/apps" element={<AppDirectory />} />
          <Route path="/my-zaps" element={<MyZaps />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App