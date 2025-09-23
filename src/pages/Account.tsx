import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Shield, User, Monitor, Bell, Activity, Calendar } from 'lucide-react';

const Account = () => {
  // 🔹 Load stored user or fallback
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [name, setName] = useState(storedUser.name || '');
  const [email, setEmail] = useState(storedUser.email || '');

  useEffect(() => {
    // keep sync if localStorage changes
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setName(user.name || '');
    setEmail(user.email || '');
  }, []);

  const handleUpdateProfile = () => {
    const updatedUser = { name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser)); // ✅ Save to storage
    alert('Profile updated successfully!');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{name || "No Name Set"}</h2>
                  <p className="text-muted-foreground">System User</p>
                  <Badge className="mt-1 bg-success/10 text-success border-success/20">Active</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile} className="bg-gradient-to-r from-primary to-accent">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
