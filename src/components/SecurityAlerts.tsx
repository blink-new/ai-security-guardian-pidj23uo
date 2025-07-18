import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bell,
  Zap,
  Eye,
  Lock
} from 'lucide-react'

interface SecurityAlert {
  id: string
  title: string
  description: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  timestamp: number
  category: 'malware' | 'intrusion' | 'phishing' | 'ddos' | 'vulnerability' | 'system'
  status: 'active' | 'resolved' | 'investigating'
  source: string
  recommendation?: string
}

export function SecurityAlerts() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all')

  useEffect(() => {
    const generateAlert = (): SecurityAlert => {
      const titles = [
        'Suspicious Login Attempt Detected',
        'Malware Signature Found',
        'Unusual Network Traffic Pattern',
        'Potential DDoS Attack Blocked',
        'Phishing Email Intercepted',
        'Unauthorized Access Attempt',
        'System Vulnerability Detected',
        'Firewall Rule Triggered',
        'Intrusion Detection Alert',
        'Security Policy Violation'
      ]
      
      const descriptions = [
        'Multiple failed login attempts from unknown IP address',
        'Suspicious file behavior detected in system directory',
        'Abnormal data transfer patterns observed',
        'High volume of requests from single source blocked',
        'Email with malicious links quarantined',
        'Attempt to access restricted system resources',
        'Outdated software component poses security risk',
        'Network traffic blocked by security rules',
        'Unauthorized system access attempt detected',
        'User action violates security policy'
      ]

      const categories: SecurityAlert['category'][] = ['malware', 'intrusion', 'phishing', 'ddos', 'vulnerability', 'system']
      const severities: SecurityAlert['severity'][] = ['info', 'warning', 'error', 'critical']
      const statuses: SecurityAlert['status'][] = ['active', 'resolved', 'investigating']
      const sources = ['192.168.1.100', '10.0.0.45', 'user@company.com', 'firewall', 'antivirus', 'ids']

      const titleIndex = Math.floor(Math.random() * titles.length)
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        title: titles[titleIndex],
        description: descriptions[titleIndex],
        severity: severities[Math.floor(Math.random() * severities.length)],
        timestamp: Date.now() - Math.floor(Math.random() * 86400000), // Last 24 hours
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        recommendation: Math.random() > 0.5 ? 'Review security logs and update firewall rules' : undefined
      }
    }

    // Initial alerts
    setAlerts(Array.from({ length: 12 }, generateAlert))

    // Real-time alert generation
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newAlert = generateAlert()
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]) // Keep last 20 alerts
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'info': return <Shield className="w-4 h-4 text-blue-400" />
      default: return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/50 bg-red-500/10'
      case 'error': return 'border-red-500/30 bg-red-500/5'
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5'
      case 'info': return 'border-blue-500/30 bg-blue-500/5'
      default: return 'border-border bg-secondary/50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'investigating': return <Eye className="w-4 h-4 text-yellow-400" />
      case 'active': return <Zap className="w-4 h-4 text-red-400" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'malware': return '🦠'
      case 'intrusion': return '🚪'
      case 'phishing': return '🎣'
      case 'ddos': return '⚡'
      case 'vulnerability': return '🔓'
      case 'system': return '⚙️'
      default: return '🔒'
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true
    return alert.status === filter
  })

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ))
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-accent" />
            <span>Security Alerts</span>
            <Badge variant="outline" className="ml-2">
              {filteredAlerts.filter(a => a.status === 'active').length} Active
            </Badge>
          </CardTitle>
          
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'resolved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('resolved')}
            >
              Resolved
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex items-center space-x-2 mt-1">
                      {getSeverityIcon(alert.severity)}
                      <span className="text-lg">{getCategoryIcon(alert.category)}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="font-mono">{alert.source}</span>
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      
                      {alert.recommendation && (
                        <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs">
                          <strong>Recommendation:</strong> {alert.recommendation}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(alert.status)}
                      <span className="text-xs font-medium">
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                    
                    {alert.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                        className="text-xs"
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}