import { cn } from '@/lib/utils';

interface ResourceCardProps {
  icon: React.ElementType;
  label: string;
  available: number;
  total: number;
  compact?: boolean;
}

export default function ResourceCard({ icon: Icon, label, available, total, compact }: ResourceCardProps) {
  const pct = total > 0 ? ((total - available) / total) * 100 : 100;
  const status = pct >= 90 ? 'critical' : pct >= 70 ? 'warning' : 'success';

  const barColor = {
    critical: 'bg-critical',
    warning: 'bg-warning',
    success: 'bg-success',
  }[status];

  return (
    <div className={cn('bg-card border border-border rounded-lg', compact ? 'p-3' : 'p-4')}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn('w-4 h-4', status === 'critical' ? 'text-critical' : status === 'warning' ? 'text-warning' : 'text-success')} />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-semibold text-foreground">{available}</span>
        <span className="text-xs text-muted-foreground">/ {total}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground mt-1 block">{pct.toFixed(0)}% utilized</span>
    </div>
  );
}
