import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User,
  Mail,
  Shield,
  Settings,
  Bell,
  Monitor,
  Calendar,
  Activity
} from 'lucide-react';

const Account = () => {
  const userInfo = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    role: 'System Administrator',
    joinDate: 'January 2024',
    lastLogin: '2 hours ago',
    systemsMonitored: 3,
    alertsReceived: 127,
    issuesResolved: 89
  };

  const recentActivity = [
    { action: 'Logged into dashboard', time: '2 hours ago' },
    { action: 'Resolved memory leak issue', time: '1 day ago' },
    { action: 'Updated security settings', time: '2 days ago' },
    { action: 'Installed system updates', time: '3 days ago' }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{userInfo.name}</h2>
                  <p className="text-muted-foreground">{userInfo.role}</p>
                  <Badge className="mt-1 bg-success/10 text-success border-success/20">Active</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={userInfo.name}
                      className="mt-1 bg-background/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userInfo.email}
                      className="mt-1 bg-background/50 border-border/50"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    defaultValue={userInfo.role}
                    className="mt-1 bg-background/50 border-border/50"
                    disabled
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>

            {/* Account Statistics */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                  <Monitor className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userInfo.systemsMonitored}</div>
                  <div className="text-sm text-muted-foreground">Systems Monitored</div>
                </div>
                
                <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                  <Bell className="w-8 h-8 text-warning mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userInfo.alertsReceived}</div>
                  <div className="text-sm text-muted-foreground">Alerts Received</div>
                </div>
                
                <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                  <Activity className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{userInfo.issuesResolved}</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Account Details */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm text-foreground">{userInfo.joinDate}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm text-foreground">{userInfo.lastLogin}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Preferences
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;