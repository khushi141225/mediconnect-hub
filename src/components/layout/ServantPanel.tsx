import { notifications } from '@/lib/mock-data';
import { AlertTriangle, Bell, CheckCircle, Package, Siren, TrendingUp } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  emergency: Siren,
  request: Package,
  shortage: AlertTriangle,
  approval: CheckCircle,
  surplus: TrendingUp,
};

const colorMap: Record<string, string> = {
  emergency: 'text-critical',
  request: 'text-primary',
  shortage: 'text-warning',
  approval: 'text-success',
  surplus: 'text-success',
};

export default function ServantPanel() {
  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-sidebar border-l border-sidebar-border z-40 flex flex-col">
      {/* Emergency Alert Header */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Siren className="w-4 h-4 text-critical status-pulse" />
          <h3 className="font-display text-xs tracking-wider">EMERGENCY ALERTS</h3>
        </div>
      </div>

      {/* Critical alerts */}
      <div className="border-b border-sidebar-border">
        {notifications.filter(n => n.type === 'emergency' && !n.read).map(n => (
          <div key={n.id} className="px-4 py-3 border-b border-border/50 bg-critical/5">
            <div className="flex gap-2">
              <Siren className="w-4 h-4 text-critical shrink-0 mt-0.5 status-pulse" />
              <div>
                <p className="text-xs text-foreground leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-muted-foreground mt-1 block">{n.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-display text-xs tracking-wider">NOTIFICATIONS</h3>
          <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-sm">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.filter(n => n.type !== 'emergency').map(n => {
          const Icon = iconMap[n.type] || Bell;
          return (
            <div key={n.id} className={`px-4 py-3 border-b border-border/30 ${!n.read ? 'bg-accent/30' : ''}`}>
              <div className="flex gap-2">
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${colorMap[n.type]}`} />
                <div>
                  <p className="text-xs text-foreground leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">{n.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="border-t border-sidebar-border px-4 py-3">
        <h3 className="font-display text-[10px] tracking-wider text-muted-foreground mb-2">NETWORK STATUS</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-accent/50 rounded px-2 py-1.5">
            <span className="text-muted-foreground">Hospitals</span>
            <span className="block text-foreground font-semibold">5 Online</span>
          </div>
          <div className="bg-accent/50 rounded px-2 py-1.5">
            <span className="text-muted-foreground">Active Cases</span>
            <span className="block text-critical font-semibold">3 Critical</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
