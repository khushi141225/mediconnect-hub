import { useState } from 'react';
import { resourceRequests } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { ArrowLeftRight, Check, X } from 'lucide-react';

export default function SharingPage() {
  const [requests, setRequests] = useState(resourceRequests);

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl mb-1">RESOURCE SHARING</h1>
        <p className="text-sm text-muted-foreground">Inter-hospital resource requests and approvals</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-display text-sm tracking-wider">ACTIVE REQUESTS</h2>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left px-4 py-3">From</th>
              <th className="text-left px-4 py-3">To</th>
              <th className="text-left px-4 py-3">Resource</th>
              <th className="text-center px-4 py-3">Qty</th>
              <th className="text-center px-4 py-3">Urgency</th>
              <th className="text-center px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Time</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                <td className="px-4 py-3 text-foreground">{r.fromHospital}</td>
                <td className="px-4 py-3 text-foreground">{r.toHospital}</td>
                <td className="px-4 py-3 text-foreground">{r.resourceType}</td>
                <td className="px-4 py-3 text-center text-foreground">{r.quantity}</td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={r.urgency === 'critical' ? 'critical' : r.urgency === 'high' ? 'limited' : 'available'} />
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 text-center text-xs text-muted-foreground">{r.timestamp}</td>
                <td className="px-4 py-3 text-center">
                  {r.status === 'pending' && (
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => updateStatus(r.id, 'approved')} className="w-7 h-7 rounded border border-success/30 text-success hover:bg-success/10 transition-colors flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => updateStatus(r.id, 'rejected')} className="w-7 h-7 rounded border border-critical/30 text-critical hover:bg-critical/10 transition-colors flex items-center justify-center">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
