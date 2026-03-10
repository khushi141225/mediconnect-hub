import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard, Ambulance, Users, Package, ArrowLeftRight,
  BarChart3, Map, AlertTriangle, LogOut, Stethoscope, Activity
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['hospital_admin', 'ambulance_coordinator', 'doctor'] },
  { icon: Ambulance, label: 'Emergency', path: '/emergency', roles: ['ambulance_coordinator', 'hospital_admin'] },
  { icon: Package, label: 'Resources', path: '/resources', roles: ['hospital_admin'] },
  { icon: ArrowLeftRight, label: 'Sharing', path: '/sharing', roles: ['hospital_admin'] },
  { icon: AlertTriangle, label: 'Equipment', path: '/equipment', roles: ['hospital_admin'] },
  { icon: Stethoscope, label: 'Doctors', path: '/doctors', roles: ['hospital_admin', 'doctor', 'ambulance_coordinator'] },
  { icon: Map, label: 'Network Map', path: '/map', roles: ['hospital_admin', 'ambulance_coordinator'] },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['hospital_admin'] },
];

export default function NavRail() {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredItems = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <motion.nav
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
      animate={{ width: expanded ? 220 : 64 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border gap-3">
        <Activity className="w-7 h-7 text-primary shrink-0" />
        {expanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-sm text-primary-foreground tracking-wider"
          >
            MEDISYNC
          </motion.span>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 flex flex-col gap-1 px-2">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${
                isActive
                  ? 'bg-sidebar-accent text-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {expanded && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* User section at bottom */}
      <div className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Users className="w-3 h-3 text-primary" />
          </div>
          {expanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">
              <div className="text-foreground text-sm truncate">{user?.name}</div>
              <div className="text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</div>
            </motion.div>
          )}
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Logout</motion.span>}
        </button>
      </div>
    </motion.nav>
  );
}
