import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Globe, MapPin, AlertTriangle } from 'lucide-react'

interface ThreatLocation {
  id: string
  country: string
  city: string
  lat: number
  lng: number
  threatCount: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  lastActivity: number
}

export function ThreatMap() {
  const [threats, setThreats] = useState<ThreatLocation[]>([])

  useEffect(() => {
    const locations = [
      { country: 'Russia', city: 'Moscow', lat: 55.7558, lng: 37.6176 },
      { country: 'China', city: 'Beijing', lat: 39.9042, lng: 116.4074 },
      { country: 'North Korea', city: 'Pyongyang', lat: 39.0392, lng: 125.7625 },
      { country: 'Iran', city: 'Tehran', lat: 35.6892, lng: 51.3890 },
      { country: 'Brazil', city: 'São Paulo', lat: -23.5505, lng: -46.6333 },
      { country: 'Nigeria', city: 'Lagos', lat: 6.5244, lng: 3.3792 },
      { country: 'Romania', city: 'Bucharest', lat: 44.4268, lng: 26.1025 },
      { country: 'India', city: 'Mumbai', lat: 19.0760, lng: 72.8777 }
    ]

    const generateThreats = () => {
      return locations.map((location, index) => ({
        id: `threat-${index}`,
        ...location,
        threatCount: Math.floor(Math.random() * 50) + 1,
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
        lastActivity: Date.now() - Math.floor(Math.random() * 3600000) // Last hour
      }))
    }

    setThreats(generateThreats())

    const interval = setInterval(() => {
      setThreats(prev => prev.map(threat => ({
        ...threat,
        threatCount: Math.max(0, threat.threatCount + Math.floor(Math.random() * 10) - 5),
        lastActivity: Math.random() > 0.7 ? Date.now() : threat.lastActivity
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getActivityStatus = (lastActivity: number) => {
    const timeDiff = Date.now() - lastActivity
    if (timeDiff < 300000) return 'ACTIVE' // 5 minutes
    if (timeDiff < 1800000) return 'RECENT' // 30 minutes
    return 'IDLE'
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-accent" />
          <span>Global Threat Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* World Map Visualization (Simplified) */}
          <div className="relative h-64 bg-secondary/30 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            
            {/* Threat Indicators */}
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${((threat.lng + 180) / 360) * 100}%`,
                  top: `${((90 - threat.lat) / 180) * 100}%`
                }}
              >
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)} animate-pulse`}>
                  <div className={`w-6 h-6 rounded-full ${getSeverityColor(threat.severity)} opacity-30 animate-ping absolute -top-1.5 -left-1.5`}></div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-card border border-border rounded-lg p-2 text-xs whitespace-nowrap shadow-lg">
                    <div className="font-medium">{threat.city}, {threat.country}</div>
                    <div className="text-muted-foreground">{threat.threatCount} threats</div>
                    <div className="text-muted-foreground">{getActivityStatus(threat.lastActivity)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Threat List */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {threats
              .sort((a, b) => b.threatCount - a.threatCount)
              .slice(0, 6)
              .map((threat) => (
                <div
                  key={threat.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{threat.city}, {threat.country}</div>
                      <div className="text-sm text-muted-foreground">
                        {threat.threatCount} active threats
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`${getSeverityColor(threat.severity)} text-white border-0`}>
                      {threat.severity.toUpperCase()}
                    </Badge>
                    <div className={`w-2 h-2 rounded-full ${
                      getActivityStatus(threat.lastActivity) === 'ACTIVE' ? 'bg-red-400 animate-pulse' :
                      getActivityStatus(threat.lastActivity) === 'RECENT' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}