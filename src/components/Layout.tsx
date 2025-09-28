import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  Activity, 
  MessageSquare, 
  User,
  LogOut,
  UserCircle
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: Monitor, label: 'Dashboard' },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/assistant', icon: MessageSquare, label: 'Assistant' },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Hamburger menu for mobile */}

      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg backdrop-blur-xl"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar (drawer on mobile) */}
      <div
        className={
          `w-64 bg-card border-r border-border flex flex-col fixed md:static top-0 left-0 h-full z-40 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl backdrop-blur-xl`
        }
        style={{ minHeight: '100dvh' }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-secondary/80 text-foreground shadow-lg hover:bg-secondary/90 transition-all"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <span className="sr-only">Close menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
Intelligent User's
          </h1>
        </div>
        
        {/* User Info */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-secondary/50 hover:scale-105",
                location.pathname === path 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 justify-start"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Button>
        </div>

  </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu overlay"
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;