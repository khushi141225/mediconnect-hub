import { cn } from '@/lib/utils';

type Status = 'available' | 'limited' | 'overloaded' | 'critical' | 'pending' | 'approved' | 'rejected';

const statusStyles: Record<Status, string> = {
  available: 'bg-success/15 text-success border-success/30',
  limited: 'bg-warning/15 text-warning border-warning/30',
  overloaded: 'bg-critical/15 text-critical border-critical/30',
  critical: 'bg-critical/15 text-critical border-critical/30',
  pending: 'bg-warning/15 text-warning border-warning/30',
  approved: 'bg-success/15 text-success border-success/30',
  rejected: 'bg-critical/15 text-critical border-critical/30',
};

export default function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn('px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded border', statusStyles[status], className)}>
      {status}
    </span>
  );
}
