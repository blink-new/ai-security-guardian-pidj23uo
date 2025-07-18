import { useState, useEffect } from 'react'
import { createClient } from '@blinkdotnew/sdk'
import { SecurityDashboard } from './components/SecurityDashboard'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Shield, Loader2 } from 'lucide-react'

const blink = createClient({
  projectId: 'ai-security-guardian-pidj23uo',
  authRequired: true
})

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto relative">
            <div className="w-full h-full rounded-full border-4 border-accent/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Initializing Security Systems</h2>
            <p className="text-muted-foreground">Please wait while we secure your connection...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background security-grid flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">AI Security Guardian</CardTitle>
              <p className="text-muted-foreground">
                Advanced cybersecurity protection powered by artificial intelligence
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Real-time threat detection</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>AI-powered network monitoring</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Automated threat blocking</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Emergency protection controls</span>
              </div>
            </div>
            
            <Button 
              onClick={() => blink.auth.login()} 
              className="w-full bg-accent hover:bg-accent/90"
            >
              <Shield className="w-4 h-4 mr-2" />
              Secure Login
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Your security is our priority. All data is encrypted and protected.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <SecurityDashboard user={user} blink={blink} />
}

export default App