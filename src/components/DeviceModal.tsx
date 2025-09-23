import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  Laptop, 
  Monitor, 
  Tablet,
  Wifi,
  WifiOff,
  Cpu,
  HardDrive,
  Thermometer,
  Shield,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { DetectedDevice } from '@/hooks/useDeviceDetection';

interface DeviceModalProps {
  device: DetectedDevice | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DeviceMetrics {
  cpu: { usage: number; temperature: number; cores: number };
  memory: { used: number; total: number; available: number };
  storage: { used: number; total: number; type: string };
  network: { speed: number; latency: number; signal: number };
  security: { status: string; threats: number; lastScan: string };
  battery?: { level: number; charging: boolean; health: string };
}

const DeviceModal = ({ device, isOpen, onClose }: DeviceModalProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [metrics, setMetrics] = useState<DeviceMetrics | null>(null);

  const getDeviceIcon = () => {
    if (!device) return <Monitor className="w-6 h-6" />;
    
    switch (device.type) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      case 'laptop':
        return <Laptop className="w-6 h-6" />;
      case 'desktop':
        return <Monitor className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  const runDetection = async () => {
    setIsScanning(true);
    
    // Simulate device detection with realistic delays
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic metrics based on device type
    const isMobile = device?.type === 'mobile' || device?.type === 'tablet';
    
    const mockMetrics: DeviceMetrics = {
      cpu: {
        usage: Math.floor(Math.random() * 60) + 20,
        temperature: Math.floor(Math.random() * 30) + 35,
        cores: isMobile ? 8 : 4
      },
      memory: {
        used: Math.floor(Math.random() * 6) + 2,
        total: isMobile ? 8 : 16,
        available: 0
      },
      storage: {
        used: Math.floor(Math.random() * 200) + 100,
        total: isMobile ? 256 : 512,
        type: isMobile ? 'Flash' : 'SSD'
      },
      network: {
        speed: Math.floor(Math.random() * 100) + 50,
        latency: Math.floor(Math.random() * 50) + 10,
        signal: Math.floor(Math.random() * 30) + 70
      },
      security: {
        status: Math.random() > 0.3 ? 'Secure' : 'Warning',
        threats: Math.floor(Math.random() * 3),
        lastScan: '2 minutes ago'
      }
    };

    if (isMobile) {
      mockMetrics.battery = {
        level: Math.floor(Math.random() * 40) + 60,
        charging: Math.random() > 0.5,
        health: 'Good'
      };
    }

    mockMetrics.memory.available = mockMetrics.memory.total - mockMetrics.memory.used;
    
    setMetrics(mockMetrics);
    setIsScanning(false);
  };

  useEffect(() => {
    if (isOpen && device) {
      runDetection();
    } else {
      setMetrics(null);
      setIsScanning(false);
    }
  }, [isOpen, device]);

  if (!device) return null;

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value > thresholds.critical) return 'text-destructive';
    if (value > thresholds.warning) return 'text-warning';
    return 'text-success';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              {getDeviceIcon()}
            </div>
            <div>
              <span className="text-xl">{device.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="text-xs">
                  {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                </Badge>
                {device.isOnline ? (
                  <div className="flex items-center gap-1 text-success text-sm">
                    <Wifi className="w-3 h-3" />
                    <span>Online</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <WifiOff className="w-3 h-3" />
                    <span>Offline</span>
                  </div>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Device Info */}
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Device Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">OS</span>
                <p className="font-medium">{device.os}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Browser</span>
                <p className="font-medium">{device.browser}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Screen Size</span>
                <p className="font-medium">{device.screenSize}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Seen</span>
                <p className="font-medium">{device.lastSeen}</p>
              </div>
            </div>
          </Card>

          {/* Detection Results */}
          {isScanning ? (
            <Card className="p-6">
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5 animate-spin text-primary" />
                <span className="text-lg">Running device detection...</span>
              </div>
              <div className="mt-4">
                <Progress value={Math.random() * 100} className="h-2" />
              </div>
            </Card>
          ) : metrics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CPU */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  CPU Performance
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Usage</span>
                      <span className={getStatusColor(metrics.cpu.usage, { warning: 70, critical: 90 })}>
                        {metrics.cpu.usage}%
                      </span>
                    </div>
                    <Progress value={metrics.cpu.usage} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className={getStatusColor(metrics.cpu.temperature, { warning: 70, critical: 85 })}>
                      {metrics.cpu.temperature}°C
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cores</span>
                    <span>{metrics.cpu.cores}</span>
                  </div>
                </div>
              </Card>

              {/* Memory */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Memory Usage
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used</span>
                      <span className={getStatusColor((metrics.memory.used / metrics.memory.total) * 100, { warning: 70, critical: 90 })}>
                        {metrics.memory.used}GB / {metrics.memory.total}GB
                      </span>
                    </div>
                    <Progress value={(metrics.memory.used / metrics.memory.total) * 100} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available</span>
                    <span>{metrics.memory.available}GB</span>
                  </div>
                </div>
              </Card>

              {/* Storage */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Storage
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used</span>
                      <span className={getStatusColor((metrics.storage.used / metrics.storage.total) * 100, { warning: 80, critical: 95 })}>
                        {metrics.storage.used}GB / {metrics.storage.total}GB
                      </span>
                    </div>
                    <Progress value={(metrics.storage.used / metrics.storage.total) * 100} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span>{metrics.storage.type}</span>
                  </div>
                </div>
              </Card>

              {/* Network */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  Network
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Speed</span>
                    <span>{metrics.network.speed} Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency</span>
                    <span>{metrics.network.latency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signal</span>
                    <span>{metrics.network.signal}%</span>
                  </div>
                </div>
              </Card>

              {/* Security */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <div className="flex items-center gap-1">
                      {metrics.security.status === 'Secure' ? (
                        <CheckCircle className="w-3 h-3 text-success" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-warning" />
                      )}
                      <span className={metrics.security.status === 'Secure' ? 'text-success' : 'text-warning'}>
                        {metrics.security.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Threats Detected</span>
                    <span className={metrics.security.threats > 0 ? 'text-warning' : 'text-success'}>
                      {metrics.security.threats}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Scan</span>
                    <span>{metrics.security.lastScan}</span>
                  </div>
                </div>
              </Card>

              {/* Battery (Mobile/Tablet only) */}
              {metrics.battery && (
                <Card className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Battery
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Level</span>
                        <span className={getStatusColor(100 - metrics.battery.level, { warning: 80, critical: 90 })}>
                          {metrics.battery.level}%
                        </span>
                      </div>
                      <Progress value={metrics.battery.level} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span>{metrics.battery.charging ? 'Charging' : 'Not Charging'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Health</span>
                      <span>{metrics.battery.health}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ) : null}

          <div className="flex justify-between">
            <Button variant="outline" onClick={runDetection} disabled={isScanning}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
              Run Detection
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceModal;