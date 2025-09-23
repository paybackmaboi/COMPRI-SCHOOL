import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  HardDrive, 
  Wifi,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Activity = () => {
  const cpuFindings = [
    {
      id: 1,
      title: 'High CPU usage detected',
      description: 'Chrome.exe consuming 23% CPU resources',
      severity: 'warning',
      timestamp: '2 minutes ago',
      solution: 'Consider closing unused browser tabs or restarting the application'
    },
    {
      id: 2,
      title: 'CPU temperature optimal',
      description: 'Processor running within normal temperature range',
      severity: 'good',
      timestamp: '5 minutes ago',
      solution: 'No action required'
    }
  ];

  const memoryFindings = [
    {
      id: 3,
      title: 'Memory leak detected',
      description: 'Application nodejs.exe showing increasing memory usage',
      severity: 'critical',
      timestamp: '1 minute ago',
      solution: 'Restart the Node.js application to free up memory'
    },
    {
      id: 4,
      title: 'Available RAM sufficient',
      description: '8.2GB of 16GB RAM available for new processes',
      severity: 'good',
      timestamp: '3 minutes ago',
      solution: 'No action required'
    }
  ];

  const networkFindings = [
    {
      id: 5,
      title: 'Unusual outbound traffic',
      description: 'High bandwidth usage to unknown endpoint 192.168.1.1',
      severity: 'critical',
      timestamp: '30 seconds ago',
      solution: 'Monitor network activity and consider firewall rules'
    },
    {
      id: 6,
      title: 'Network latency normal',
      description: 'Average ping time: 12ms to primary DNS server',
      severity: 'good',
      timestamp: '4 minutes ago',
      solution: 'No action required'
    }
  ];

  const securityFindings = [
    {
      id: 7,
      title: 'Antivirus definitions updated',
      description: 'Latest security definitions downloaded and applied',
      severity: 'good',
      timestamp: '1 hour ago',
      solution: 'No action required'
    },
    {
      id: 8,
      title: 'Suspicious file execution',
      description: 'Unknown executable attempted to run: temp_installer.exe',
      severity: 'critical',
      timestamp: '10 minutes ago',
      solution: 'Quarantine file and run full system scan'
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

  const FindingsList = ({ findings }: { findings: any[] }) => (
    <div className="space-y-4">
      {findings.map((finding) => (
        <Card key={finding.id} className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
          <div className="flex items-start gap-3">
            {getSeverityIcon(finding.severity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-foreground">{finding.title}</h3>
                {getSeverityBadge(finding.severity)}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {finding.timestamp}
                </div>
              </div>
              <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <p className="text-sm">
                  <strong className="text-accent">AI Recommendation:</strong> {finding.solution}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Activity</h1>
          <p className="text-muted-foreground">Categorized findings and AI recommendations</p>
        </div>

        {/* Categorized Findings */}
        <Tabs defaultValue="cpu" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger value="cpu" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              CPU
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Memory
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Network
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cpu" className="mt-6">
            <FindingsList findings={cpuFindings} />
          </TabsContent>

          <TabsContent value="memory" className="mt-6">
            <FindingsList findings={memoryFindings} />
          </TabsContent>

          <TabsContent value="network" className="mt-6">
            <FindingsList findings={networkFindings} />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <FindingsList findings={securityFindings} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Activity;