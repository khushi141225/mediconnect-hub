import { hospitals } from '@/lib/mock-data';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface Alert {
  hospital: string;
  type: 'understock' | 'overstock';
  resource: string;
  count: number;
  message: string;
}

const alerts: Alert[] = [
  { hospital: 'District Public Hospital', type: 'understock', resource: 'Ventilators', count: 0, message: 'CRITICAL — 0 ventilators available. Request resources immediately.' },
  { hospital: 'District Public Hospital', type: 'understock', resource: 'ICU Beds', count: 0, message: 'CRITICAL — 0 ICU beds available. Divert incoming patients.' },
  { hospital: 'Metro Private Medical Center', type: 'understock', resource: 'Ventilators', count: 1, message: 'WARNING — Only 1 ventilator available. Pre-emptive sharing recommended.' },
  { hospital: 'Sunrise Multispecialty Hospital', type: 'overstock', resource: 'Ventilators', count: 12, message: 'SURPLUS — 12 idle ventilators. Available for redistribution.' },
  { hospital: 'Sunrise Multispecialty Hospital', type: 'overstock', resource: 'General Beds', count: 80, message: 'SURPLUS — 80 general beds available. Capacity for patient transfers.' },
  { hospital: 'City General Hospital', type: 'overstock', resource: 'Ambulances', count: 4, message: 'SURPLUS — 4 ambulances idle. Can support nearby emergencies.' },
];

export default function EquipmentPage() {
  const understockAlerts = alerts.filter(a => a.type === 'understock');
  const overstockAlerts = alerts.filter(a => a.type === 'overstock');

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl mb-1">EQUIPMENT MONITORING</h1>
        <p className="text-sm text-muted-foreground">Automated understock and overstock alerts across the network</p>
      </div>

      {/* Understock */}
      <div className="flex items-center gap-2 mb-3">
        <TrendingDown className="w-4 h-4 text-critical" />
        <h2 className="font-display text-sm tracking-wider">UNDERSTOCK ALERTS</h2>
        <span className="text-[10px] bg-critical/20 text-critical px-1.5 py-0.5 rounded-sm ml-1">{understockAlerts.length}</span>
      </div>
      <div className="space-y-2 mb-8">
        {understockAlerts.map((a, i) => (
          <div key={i} className="bg-critical/5 border border-critical/20 rounded-lg p-4 flex items-center gap-4">
            <AlertTriangle className="w-5 h-5 text-critical shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-foreground font-medium">{a.hospital} — {a.resource}</div>
              <div className="text-xs text-muted-foreground">{a.message}</div>
            </div>
            <button className="text-xs bg-critical/10 text-critical border border-critical/30 px-3 py-1.5 rounded hover:bg-critical/20 transition-colors">
              Request Resources
            </button>
          </div>
        ))}
      </div>

      {/* Overstock */}
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-success" />
        <h2 className="font-display text-sm tracking-wider">SURPLUS ALERTS</h2>
        <span className="text-[10px] bg-success/20 text-success px-1.5 py-0.5 rounded-sm ml-1">{overstockAlerts.length}</span>
      </div>
      <div className="space-y-2">
        {overstockAlerts.map((a, i) => (
          <div key={i} className="bg-success/5 border border-success/20 rounded-lg p-4 flex items-center gap-4">
            <TrendingUp className="w-5 h-5 text-success shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-foreground font-medium">{a.hospital} — {a.resource}</div>
              <div className="text-xs text-muted-foreground">{a.message}</div>
            </div>
            <button className="text-xs bg-success/10 text-success border border-success/30 px-3 py-1.5 rounded hover:bg-success/20 transition-colors">
              Offer to Network
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
