import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Laptop, 
  Monitor, 
  Tablet,
  Wifi,
  WifiOff
} from 'lucide-react';
import { DetectedDevice } from '@/hooks/useDeviceDetection';

interface DeviceCardProps {
  device: DetectedDevice;
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const getDeviceTypeBadge = () => {
    const colors = {
      mobile: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      tablet: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      laptop: 'bg-green-500/10 text-green-500 border-green-500/20',
      desktop: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    };

    return (
      <Badge className={colors[device.type]}>
        {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            {getDeviceIcon()}
          </div>
          <div>
            <h3 className="font-medium text-foreground">{device.name}</h3>
            <p className="text-sm text-muted-foreground">{device.os} • {device.browser}</p>
          </div>
        </div>
        {getDeviceTypeBadge()}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Screen Size</span>
          <span className="text-foreground font-medium">{device.screenSize}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <div className="flex items-center gap-2">
            {device.isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-success" />
                <span className="text-success font-medium">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">Offline</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Seen</span>
          <span className="text-foreground font-medium">{device.lastSeen}</span>
        </div>
      </div>
    </Card>
  );
};

export default DeviceCard;