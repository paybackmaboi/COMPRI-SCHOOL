import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: ReactNode;
  trend?: number;
}

const StatusCard = ({ title, value, unit, status, icon, trend }: StatusCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case 'good': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'critical': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg", getStatusColor(), "bg-current/10")}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-sm font-medium",
            trend > 0 ? "text-destructive" : "text-success"
          )}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted/30 rounded-full h-2">
          <div 
            className={cn("h-2 rounded-full transition-all duration-500", getProgressColor())}
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;