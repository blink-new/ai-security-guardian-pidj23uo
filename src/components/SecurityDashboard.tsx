import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { ThreatMap } from './ThreatMap'
import { SecurityAlerts } from './SecurityAlerts'
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Wifi, 
  Eye, 
  Zap,
  Globe,
  Server,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  BarChart3,
  Settings,
  Download
} from 'lucide-react'

interface SecurityDashboardProps {
  user: any
  blink: any
}

interface ThreatData {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  source: string
  timestamp: number
  blocked: boolean
  description: string
}

interface NetworkActivity {
  id: string
  ip: string
  location: string
  activity: string
  timestamp: number
  suspicious: boolean
}

export function SecurityDashboard({ user, blink }: SecurityDashboardProps) {
  const [threats, setThreats] = useState<ThreatData[]>([])
  const [networkActivity, setNetworkActivity] = useState<NetworkActivity[]>([])
  const [securityStatus, setSecurityStatus] = useState({
    level: 'secure',
    score: 95,
    activeThreats: 0,
    blockedToday: 12,
    scanProgress: 100
  })
  const [isScanning, setIsScanning] = useState(false)
  const [protectionEnabled, setProtectionEnabled] = useState(true)

  // Simulate real-time threat detection
  useEffect(() => {
    const generateThreat = () => {
      const threatTypes = ['Malware', 'Phishing', 'DDoS', 'Intrusion', 'Suspicious Traffic']
      const sources = ['192.168.1.100', '10.0.0.45', '172.16.0.23', '203.0.113.5', '198.51.100.14']
      const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical']
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        timestamp: Date.now(),
        blocked: Math.random() > 0.2,
        description: `Detected suspicious ${threatTypes[Math.floor(Math.random() * threatTypes.length)].toLowerCase()} activity`
      }
    }

    const generateNetworkActivity = () => {
      const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Berlin, DE']
      const activities = ['HTTP Request', 'SSH Connection', 'FTP Transfer', 'DNS Query', 'Port Scan']
      const ips = ['192.168.1.100', '10.0.0.45', '172.16.0.23', '203.0.113.5', '198.51.100.14']
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        ip: ips[Math.floor(Math.random() * ips.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        activity: activities[Math.floor(Math.random() * activities.length)],
        timestamp: Date.now(),
        suspicious: Math.random() > 0.7
      }
    }

    // Initial data
    setThreats(Array.from({ length: 5 }, generateThreat))
    setNetworkActivity(Array.from({ length: 8 }, generateNetworkActivity))

    // Real-time updates
    const threatInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat = generateThreat()
        setThreats(prev => [newThreat, ...prev.slice(0, 9)])
        
        if (newThreat.severity === 'critical' || newThreat.severity === 'high') {
          setSecurityStatus(prev => ({
            ...prev,
            activeThreats: prev.activeThreats + (newThreat.blocked ? 0 : 1),
            blockedToday: prev.blockedToday + (newThreat.blocked ? 1 : 0),
            level: newThreat.blocked ? prev.level : 'warning'
          }))
        }
      }
    }, 3000)

    const activityInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newActivity = generateNetworkActivity()
        setNetworkActivity(prev => [newActivity, ...prev.slice(0, 19)])
      }
    }, 2000)

    return () => {
      clearInterval(threatInterval)
      clearInterval(activityInterval)
    }
  }, [])

  const runSecurityScan = async () => {
    setIsScanning(true)
    setSecurityStatus(prev => ({ ...prev, scanProgress: 0 }))
    
    // Simulate scan progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setSecurityStatus(prev => ({ ...prev, scanProgress: i }))
    }
    
    setIsScanning(false)
    setSecurityStatus(prev => ({
      ...prev,
      score: Math.floor(Math.random() * 20) + 80,
      level: 'secure'
    }))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'secure': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'danger': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-background security-grid">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-accent" />
                <h1 className="text-xl font-bold">AI Security Guardian</h1>
              </div>
              <Badge variant="outline" className="text-xs">
                v2.1.0
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${securityStatus.level === 'secure' ? 'bg-green-400' : securityStatus.level === 'warning' ? 'bg-yellow-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className={`text-sm font-medium ${getStatusColor(securityStatus.level)}`}>
                  {securityStatus.level.toUpperCase()}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => blink.auth.logout()}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{securityStatus.score}%</div>
              <Progress value={securityStatus.score} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{securityStatus.activeThreats}</div>
              <p className="text-xs text-muted-foreground">
                {securityStatus.activeThreats === 0 ? 'All clear' : 'Requires attention'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Today</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{securityStatus.blockedToday}</div>
              <p className="text-xs text-muted-foreground">
                Threats neutralized
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protection Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${protectionEnabled ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-sm font-medium">
                  {protectionEnabled ? 'ACTIVE' : 'DISABLED'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => setProtectionEnabled(!protectionEnabled)}
              >
                {protectionEnabled ? 'Disable' : 'Enable'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="threats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="threats">Threat Monitor</TabsTrigger>
            <TabsTrigger value="network">Network Activity</TabsTrigger>
            <TabsTrigger value="scanner">AI Scanner</TabsTrigger>
            <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
            <TabsTrigger value="map">Threat Map</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span>Real-time Threat Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {threats.map((threat) => (
                      <div
                        key={threat.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`}></div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{threat.type}</span>
                              <Badge variant="outline" className="text-xs">
                                {threat.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{threat.description}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {threat.source} • {new Date(threat.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {threat.blocked ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              BLOCKED
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              <XCircle className="w-3 h-3 mr-1" />
                              ACTIVE
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5 text-accent" />
                  <span>Network Activity Monitor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {networkActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          activity.suspicious 
                            ? 'bg-red-500/10 border-red-500/30' 
                            : 'bg-secondary/50 border-border'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium font-mono">{activity.ip}</span>
                                {activity.suspicious && (
                                  <AlertCircle className="w-4 h-4 text-red-400" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{activity.activity}</p>
                              <p className="text-xs text-muted-foreground">
                                {activity.location} • {new Date(activity.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Badge variant={activity.suspicious ? "destructive" : "outline"}>
                          {activity.suspicious ? 'SUSPICIOUS' : 'NORMAL'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-accent" />
                  <span>AI-Powered Security Scanner</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <div className="w-full h-full rounded-full border-4 border-accent/20"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"
                      style={{ display: isScanning ? 'block' : 'none' }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{securityStatus.scanProgress}%</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">
                    {isScanning ? 'Scanning System...' : 'System Scan Complete'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isScanning 
                      ? 'AI is analyzing your system for vulnerabilities and threats'
                      : 'Last scan completed successfully with no critical issues found'
                    }
                  </p>
                  
                  <Button
                    onClick={runSecurityScan}
                    disabled={isScanning}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {isScanning ? 'Scanning...' : 'Run Full Scan'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <Server className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-medium">System Health</h4>
                    <p className="text-sm text-muted-foreground">Optimal</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium">Access Control</h4>
                    <p className="text-sm text-muted-foreground">Secure</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-medium">Last Update</h4>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <SecurityAlerts />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <ThreatMap />
          </TabsContent>

          <TabsContent value="controls" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-accent" />
                    <span>Emergency Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      setSecurityStatus(prev => ({ ...prev, level: 'secure', activeThreats: 0 }))
                    }}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Emergency Lockdown
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Block All Traffic
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Reset Firewall
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-accent" />
                    <span>System Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-block threats</span>
                    <Button variant="outline" size="sm">
                      {protectionEnabled ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time monitoring</span>
                    <Button variant="outline" size="sm">ON</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <Button variant="outline" size="sm">ON</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quarantine mode</span>
                    <Button variant="outline" size="sm">OFF</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-sm">
                        <strong>Update Available:</strong> Security patch v2.1.1 is ready for installation.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <p className="text-sm">
                        <strong>Recommendation:</strong> Enable two-factor authentication for enhanced security.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                      <p className="text-sm">
                        <strong>Good Practice:</strong> Your password strength is excellent. Keep it up!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}