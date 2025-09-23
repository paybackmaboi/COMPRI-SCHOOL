import { useState } from 'react';
import Layout from '@/components/Layout';
import StatusCard from '@/components/StatusCard';
import DeviceCard from '@/components/DeviceCard';
import DeviceModal from '@/components/DeviceModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDeviceDetection, DetectedDevice } from '@/hooks/useDeviceDetection';
import { 
  Cpu, 
  HardDrive, 
  Thermometer,
  Wifi,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Monitor
} from 'lucide-react';

const Dashboard = () => {
  const { connectedDevices } = useDeviceDetection();
  const [selectedDevice, setSelectedDevice] = useState<DetectedDevice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeviceClick = (device: DetectedDevice) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };
  
  const systemStats = [
    {
      title: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'good' as const,
      icon: <Cpu className="w-5 h-5" />,
      trend: -2
    },
    {
      title: 'Memory Usage',
      value: 67,
      unit: '%',
      status: 'warning' as const,
      icon: <HardDrive className="w-5 h-5" />,
      trend: 5
    },
    {
      title: 'Disk Usage',
      value: 23,
      unit: '%',
      status: 'good' as const,
      icon: <HardDrive className="w-5 h-5" />,
      trend: 1
    },
    {
      title: 'Temperature',
      value: 72,
      unit: '°C',
      status: 'warning' as const,
      icon: <Thermometer className="w-5 h-5" />,
      trend: 3
    }
  ];

  const aiFindings = [
    {
      category: 'Performance',
      severity: 'warning',
      message: 'Memory usage trending upward - consider closing unused applications',
      time: '2 minutes ago'
    },
    {
      category: 'Security',
      severity: 'good',
      message: 'All security protocols are functioning normally',
      time: '5 minutes ago'
    },
    {
      category: 'Network',
      severity: 'critical',
      message: 'Unusual network activity detected from port 443',
      time: '8 minutes ago'
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'good': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'good': return <Badge className="bg-success/10 text-success border-success/20">Good</Badge>;
      case 'warning': return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case 'critical': return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring with AI insights</p>
          </div>
          <div className="flex items-center gap-2 text-success">
            <Wifi className="w-5 h-5" />
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>

        {/* System Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <StatusCard key={index} {...stat} />
          ))}
        </div>

        {/* Connected Devices Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Monitor className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Connected Devices</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {connectedDevices.filter(device => device.isCurrent).length} Device
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {connectedDevices
              .filter(device => device.isCurrent) // ✅ only current device
              .map((device) => (
                <DeviceCard 
                  key={device.id} 
                  device={device} 
                  onClick={() => handleDeviceClick(device)}
                />
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Summary */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">AI Summary</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                <h3 className="font-medium text-success mb-2">Overall System Health: Good</h3>
                <p className="text-sm text-muted-foreground">
                  Your system is performing well with minor optimization opportunities detected.
                </p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Key Insights:</strong></p>
                <ul className="space-y-1 text-xs">
                  <li>• CPU performance is optimal with room for additional workload</li>
                  <li>• Memory usage requires attention to prevent slowdowns</li>
                  <li>• Network security protocols are functioning correctly</li>
                </ul>
              </div>

              {/* ✅ Taglines Section */}
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Maintenance Highlights:</strong></p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li>Smart Maintenance Alerts</li>
                  <li>Detect Issues Before They Happen</li>
                  <li>Stay Ahead with Predictive Maintenance</li>
                  <li>Real-Time Device Health Monitoring</li>
                  <li>Automatic Maintenance Detection</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Recent AI Findings */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent AI Findings</h2>
            
            <div className="space-y-3">
              {aiFindings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                  {getSeverityIcon(finding.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{finding.category}</span>
                      {getSeverityBadge(finding.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground">{finding.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{finding.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <DeviceModal 
          device={selectedDevice}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
