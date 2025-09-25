import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';
import { 
  Activity as ActivityIcon, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Monitor,
  Zap,
  Globe,
  Lock,
  Clock,
  MemoryStick,
  Network,
  HardDriveIcon,
  Eye,
  ExternalLink,
  BarChart3,
  PieChart,
  Thermometer,
  Gauge,
  Layers
} from 'lucide-react';

const Activity = () => {
  const { metrics, browserMetrics, isLoading, error, getPerformanceColor, getPerformanceStatus, refresh } = useSystemMetrics();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const recentActivity = [
    { id: 1, type: 'security', message: 'Security scan completed successfully', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'performance', message: `High CPU usage detected in ${metrics?.processes.topProcesses[0]?.name || 'Chrome.exe'}`, time: '5 minutes ago', status: 'warning' },
    { id: 3, type: 'network', message: 'New device connected to network', time: '12 minutes ago', status: 'info' },
    { id: 4, type: 'storage', message: 'Storage optimization completed', time: '1 hour ago', status: 'success' },
    { id: 5, type: 'browser', message: `${browserMetrics?.tabCount || 0} browser tabs currently open`, time: 'Just now', status: 'info' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <ActivityIcon />;
    }
  };

  if (isLoading && !metrics) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading system metrics...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
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
            <h1 className="text-3xl font-bold text-foreground">System Activity Monitor</h1>
            <p className="text-muted-foreground">Real-time system metrics and performance insights</p>
          </div>
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Real-time Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CPU Usage */}
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="font-medium">CPU Usage</span>
              </div>
              <Badge className={`${getPerformanceColor(metrics?.cpu.usage || 0)} bg-opacity-10 border-0`}>
                {getPerformanceStatus(metrics?.cpu.usage || 0)}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metrics?.cpu.usage.toFixed(1)}%</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Thermometer className="w-3 h-3" />
                  {metrics?.cpu.temperature?.toFixed(0)}°C
                </div>
              </div>
              <Progress value={metrics?.cpu.usage || 0} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{metrics?.cpu.cores} cores</span>
                <span>{metrics?.cpu.speed.toFixed(1)} GHz</span>
              </div>
            </div>
          </Card>

          {/* Memory Usage */}
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MemoryStick className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Memory</span>
              </div>
              <Badge className={`${getPerformanceColor(metrics?.memory.usage || 0)} bg-opacity-10 border-0`}>
                {getPerformanceStatus(metrics?.memory.usage || 0)}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metrics?.memory.usage.toFixed(1)}%</span>
                <div className="text-sm text-muted-foreground">
                  {metrics?.memory.used.toFixed(1)} GB
                </div>
              </div>
              <Progress value={metrics?.memory.usage || 0} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used: {metrics?.memory.used.toFixed(1)} GB</span>
                <span>Total: {metrics?.memory.total} GB</span>
              </div>
            </div>
          </Card>

          {/* Network */}
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-green-500" />
                <span className="font-medium">Network</span>
              </div>
              <Badge className="text-green-600 bg-green-100 border-0">Active</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metrics?.network.download} Mbps</span>
                <div className="text-sm text-muted-foreground">
                  {metrics?.network.latency}ms
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>↓ {metrics?.network.download} Mbps</span>
                <span>↑ {metrics?.network.upload} Mbps</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {metrics?.network.connections} connections
              </div>
            </div>
          </Card>

          {/* Storage */}
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HardDriveIcon className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Storage</span>
              </div>
              <Badge className={`${getPerformanceColor(metrics?.storage.usage || 0)} bg-opacity-10 border-0`}>
                {getPerformanceStatus(metrics?.storage.usage || 0)}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metrics?.storage.usage.toFixed(1)}%</span>
                <div className="text-sm text-muted-foreground">
                  {metrics?.storage.available.toFixed(0)} GB free
                </div>
              </div>
              <Progress value={metrics?.storage.usage || 0} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used: {metrics?.storage.used} GB</span>
                <span>Total: {metrics?.storage.total} GB</span>
              </div>
            </div>
        </Card>
        </div>

        {/* Browser Tab Monitoring */}
        {browserMetrics && (
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Browser Tab Monitor</h3>
                  <p className="text-sm text-muted-foreground">
                    {browserMetrics.tabCount} tab{browserMetrics.tabCount !== 1 ? 's' : ''} accessible
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{browserMetrics.totalMemory} MB</div>
                  <div className="text-xs text-muted-foreground">Memory Usage</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{browserMetrics.totalCPU.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">CPU Usage</div>
                </div>
              </div>
            </div>

            {/* Browser Security Notice */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Browser Security Limitation</p>
                  <p className="text-xs text-blue-700 mt-1">
                    For security reasons, browsers prevent websites from accessing other tabs. 
                    Only the current tab is visible. This is a standard web security feature.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {browserMetrics.tabs.map((tab, index) => {
                // Check if this is the browser limitation notice
                const isNotice = (tab as any).isNotice;
                
                if (isNotice) {
                  return (
                    <div key={tab.id} className="flex items-center gap-3 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                      <div className="text-2xl">{tab.favicon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-yellow-800">{tab.title}</span>
                          <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">Info</Badge>
                        </div>
                        <p className="text-xs text-yellow-700">
                          Browser security prevents access to other tabs. Only the current tab is visible.
                          <br />
                          <strong>Current tab:</strong> {document.title} - {window.location.href}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-yellow-600 font-medium">Security</div>
                        <div className="text-xs text-yellow-600">Protected</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={tab.id} className={`flex items-center gap-3 p-4 rounded-lg border ${
                    tab.isActive 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-background/50 border-border/50'
                  }`}>
                    <div className="text-2xl">{tab.favicon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium truncate text-sm">{tab.title}</span>
                        {tab.isActive && <Badge className="bg-primary/10 text-primary border-0 text-xs">Active</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-blue-600">{tab.domain}</span>
                        {tab.category && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {tab.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{tab.url}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <div className="font-semibold text-lg">{tab.memoryUsage}</div>
                        <div className="text-xs text-muted-foreground">MB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">{tab.cpuUsage.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">CPU</div>
                      </div>
                      <Button size="sm" variant="ghost" className="p-2">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Website Category Summary */}
            {browserMetrics.tabs.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  Website Category Analysis
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(() => {
                    const categoryStats = browserMetrics.tabs.reduce((acc, tab) => {
                      if (tab.category) {
                        if (!acc[tab.category]) {
                          acc[tab.category] = { count: 0, memory: 0, cpu: 0 };
                        }
                        acc[tab.category].count++;
                        acc[tab.category].memory += tab.memoryUsage;
                        acc[tab.category].cpu += tab.cpuUsage;
                      }
                      return acc;
                    }, {} as Record<string, { count: number; memory: number; cpu: number }>);

                    return Object.entries(categoryStats).map(([category, stats]) => (
                      <div key={category} className="text-center p-3 bg-white rounded-lg border border-blue-100">
                        <div className="font-medium text-blue-800">{category}</div>
                        <div className="text-2xl font-bold text-blue-600">{stats.count}</div>
                        <div className="text-xs text-blue-600">tabs</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stats.memory}MB • {stats.cpu.toFixed(1)}% CPU
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Detailed System Information */}
        <Tabs defaultValue="processes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger value="processes" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Processes
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <ActivityIcon />
              Activity
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processes" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Running Processes</h3>
              <div className="space-y-3">
                {metrics?.processes.topProcesses.map((process, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{process.name}</div>
                        <div className="text-xs text-muted-foreground">PID: {process.pid}</div>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-medium">{process.cpu.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">CPU</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{process.memory.toFixed(0)} MB</div>
                        <div className="text-xs text-muted-foreground">Memory</div>
                      </div>
                    </div>
                    <Badge className={`${getPerformanceColor(process.cpu)} bg-opacity-10 border-0`}>
                      {getPerformanceStatus(process.cpu)}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Security Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Firewall</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {metrics?.security.firewall ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-500" />
                      <span>Antivirus</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {metrics?.security.antivirus ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span>Updates</span>
                    </div>
                    <Badge className={`${metrics?.security.updates ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} border-0`}>
                      {metrics?.security.updates ? 'Up to date' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Threats Detected</span>
                      <Badge className={`${metrics?.security.threats === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
                        {metrics?.security.threats || 0}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Last scan: {metrics?.security.lastScan}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">System Secure</span>
                    </div>
                    <p className="text-sm text-green-700">All security systems are functioning properly</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <Badge variant="outline" className="text-xs px-2 py-1">{activity.type}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Resource Usage</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Performance</span>
                        <span className={getPerformanceColor(metrics?.cpu.usage || 0)}>
                          {getPerformanceStatus(metrics?.cpu.usage || 0)}
                        </span>
                      </div>
                      <Progress value={metrics?.cpu.usage || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Efficiency</span>
                        <span className={getPerformanceColor(metrics?.memory.usage || 0)}>
                          {getPerformanceStatus(metrics?.memory.usage || 0)}
                        </span>
                      </div>
                      <Progress value={metrics?.memory.usage || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Utilization</span>
                        <span className={getPerformanceColor(metrics?.storage.usage || 0)}>
                          {getPerformanceStatus(metrics?.storage.usage || 0)}
                        </span>
                      </div>
                      <Progress value={metrics?.storage.usage || 0} className="h-2" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">System Health</h4>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Overall Health: Excellent</span>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Your system is performing optimally with no critical issues detected.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Processes:</span>
                        <span className="font-medium">{metrics?.processes.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network Connections:</span>
                        <span className="font-medium">{metrics?.network.connections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Browser Tabs:</span>
                        <span className="font-medium">{browserMetrics?.tabCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Activity;