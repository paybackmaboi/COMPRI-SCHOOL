import { useState } from 'react';
import Layout from '@/components/Layout';
import StatusCard from '@/components/StatusCard';
import DeviceCard from '@/components/DeviceCard';
import DeviceModal from '@/components/DeviceModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useDeviceDetection, DetectedDevice } from '@/hooks/useDeviceDetection';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';
import { 
  Cpu, 
  HardDrive, 
  Thermometer,
  Wifi,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Monitor,
  RefreshCw,
  Activity,
  Globe,
  Shield,
  Zap,
  MemoryStick,
  Network,
  HardDriveIcon,
  BarChart3,
  Gauge,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const { connectedDevices } = useDeviceDetection();
  const { metrics, browserMetrics, isLoading, error, getPerformanceColor, getPerformanceStatus, refresh } = useSystemMetrics();
  const [selectedDevice, setSelectedDevice] = useState<DetectedDevice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDeviceClick = (device: DetectedDevice) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Generate system stats from real metrics
  const systemStats = metrics ? [
    {
      title: 'CPU Usage',
      value: Math.round(metrics.cpu.usage),
      unit: '%',
      status: metrics.cpu.usage < 50 ? 'good' as const : metrics.cpu.usage < 75 ? 'warning' as const : 'critical' as const,
      icon: <Cpu className="w-5 h-5" />,
      trend: Math.random() * 10 - 5, // Random trend for demo
      temperature: metrics.cpu.temperature
    },
    {
      title: 'Memory Usage',
      value: Math.round(metrics.memory.usage),
      unit: '%',
      status: metrics.memory.usage < 60 ? 'good' as const : metrics.memory.usage < 80 ? 'warning' as const : 'critical' as const,
      icon: <MemoryStick className="w-5 h-5" />,
      trend: Math.random() * 8 - 4,
      used: metrics.memory.used,
      total: metrics.memory.total
    },
    {
      title: 'Storage Usage',
      value: Math.round(metrics.storage.usage),
      unit: '%',
      status: metrics.storage.usage < 70 ? 'good' as const : metrics.storage.usage < 85 ? 'warning' as const : 'critical' as const,
      icon: <HardDriveIcon className="w-5 h-5" />,
      trend: Math.random() * 6 - 3,
      used: metrics.storage.used,
      total: metrics.storage.total
    },
    {
      title: 'Network Speed',
      value: metrics.network.download,
      unit: 'Mbps',
      status: 'good' as const,
      icon: <Network className="w-5 h-5" />,
      trend: Math.random() * 15 - 7.5,
      latency: metrics.network.latency
    }
  ] : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  if (isLoading && !metrics) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">IU'S Dashboard</h1>
            <p className="text-muted-foreground">Real-time system monitoring and performance insights</p>
          </div>
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Real-time System Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStats.map((stat, index) => (
              <Card key={index} className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="font-medium">{stat.title}</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(stat.status)}`}>
                    {getStatusIcon(stat.status)}
                    <span>{getPerformanceStatus(stat.value)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    {stat.temperature && (
                      <div className="flex items-center gap-1 ml-2 text-xs text-muted-foreground">
                        <Thermometer className="w-3 h-3" />
                        <span>{stat.temperature}°C</span>
                      </div>
                    )}
                  </div>
                  
                  <Progress value={stat.value} className="h-2" />
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    {stat.used && stat.total ? (
                      <span>{stat.used} / {stat.total} GB</span>
                    ) : stat.latency ? (
                      <span>{stat.latency}ms latency</span>
                    ) : (
                      <span>{metrics.cpu.cores} cores</span>
                    )}
                    <div className={`flex items-center gap-1 ${stat.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      <TrendingUp className={`w-3 h-3 ${stat.trend < 0 ? 'rotate-180' : ''}`} />
                      <span>{Math.abs(stat.trend).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Live Temperature Monitor */}
        {metrics && (
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Live Temperature Monitor</h3>
                <p className="text-sm text-muted-foreground">Real-time CPU temperature tracking</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {metrics.cpu.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground">Current Temperature</div>
                <div className={`text-xs mt-1 ${
                  metrics.cpu.temperature < 50 ? 'text-green-600' :
                  metrics.cpu.temperature < 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {metrics.cpu.temperature < 50 ? 'Cool' :
                   metrics.cpu.temperature < 70 ? 'Warm' : 'Hot'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {metrics.cpu.usage.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">CPU Usage</div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {metrics.cpu.cores} cores @ {metrics.cpu.speed.toFixed(1)} GHz
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {metrics.processes.total}
                </div>
                <div className="text-sm text-muted-foreground">Active Processes</div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {metrics.network.connections} network connections
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Browser Activity Integration */}
        {browserMetrics && (
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Browser Activity</h3>
                <p className="text-sm text-muted-foreground">Current tab monitoring from Activity module</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Current Tab</h4>
                {browserMetrics.tabs.filter(tab => !(tab as any).isNotice).map((tab) => (
                  <div key={tab.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="text-lg">{tab.favicon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{tab.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{tab.url}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{tab.memoryUsage} MB</div>
                      <div className="text-xs text-muted-foreground">{tab.cpuUsage.toFixed(1)}% CPU</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Resource Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Memory:</span>
                    <span className="font-medium">{browserMetrics.totalMemory} MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total CPU:</span>
                    <span className="font-medium">{browserMetrics.totalCPU.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Tabs:</span>
                    <span className="font-medium">{browserMetrics.tabCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Updated:</span>
                    <span className="text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Connected Devices */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Connected Devices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onClick={() => handleDeviceClick(device)}
              />
            ))}
          </div>
        </div>

        {/* System Health Overview */}
        {metrics && (
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">System Health Overview</h3>
                <p className="text-sm text-muted-foreground">Comprehensive system status</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="text-2xl font-bold text-green-600 mb-1">Excellent</div>
                <div className="text-sm text-muted-foreground">Overall Health</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="text-2xl font-bold text-blue-600 mb-1">{metrics.security.threats}</div>
                <div className="text-sm text-muted-foreground">Security Threats</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="text-2xl font-bold text-purple-600 mb-1">{metrics.processes.total}</div>
                <div className="text-sm text-muted-foreground">Running Processes</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="text-2xl font-bold text-orange-600 mb-1">{metrics.network.connections}</div>
                <div className="text-sm text-muted-foreground">Network Connections</div>
              </div>
            </div>
          </Card>
        )}

        {/* Device Modal */}
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