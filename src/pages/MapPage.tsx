import { hospitals } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { MapPin, Bed, Wind, Ambulance } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl mb-1">NETWORK MAP</h1>
        <p className="text-sm text-muted-foreground">Hospital network visualization and capacity overview</p>
      </div>

      {/* Simulated map area */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 relative overflow-hidden" style={{ height: 400 }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        {/* Hospital markers */}
        {hospitals.map((h, i) => {
          const positions = [
            { left: '25%', top: '35%' },
            { left: '55%', top: '20%' },
            { left: '15%', top: '65%' },
            { left: '70%', top: '55%' },
            { left: '45%', top: '70%' },
          ];
          const pos = positions[i];
          const color = h.status === 'available' ? 'text-success' : h.status === 'limited' ? 'text-warning' : 'text-critical';

          return (
            <div key={h.id} className="absolute group" style={pos}>
              <div className={`relative ${h.status === 'overloaded' ? 'status-pulse' : ''}`}>
                <MapPin className={`w-6 h-6 ${color} drop-shadow-lg`} />
                <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                  h.status === 'available' ? 'bg-success' : h.status === 'limited' ? 'bg-warning' : 'bg-critical'
                }`} />
              </div>
              {/* Tooltip */}
              <div className="absolute left-8 -top-2 bg-card border border-border rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-56">
                <div className="text-xs font-medium text-foreground mb-1">{h.name}</div>
                <div className="text-[10px] text-muted-foreground mb-2 capitalize">{h.type} — {h.distance} km</div>
                <div className="grid grid-cols-3 gap-1 text-[10px]">
                  <div className="text-center"><Bed className="w-3 h-3 mx-auto mb-0.5 text-muted-foreground" /><span className="text-foreground">{h.icuBeds.available}</span></div>
                  <div className="text-center"><Wind className="w-3 h-3 mx-auto mb-0.5 text-muted-foreground" /><span className="text-foreground">{h.ventilators.available}</span></div>
                  <div className="text-center"><Ambulance className="w-3 h-3 mx-auto mb-0.5 text-muted-foreground" /><span className="text-foreground">{h.ambulances.available}</span></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-background/80 border border-border rounded px-3 py-2 text-[10px] flex gap-4">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Available</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Limited</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-critical" /> Overloaded</span>
        </div>
      </div>

      {/* Hospital list */}
      <div className="grid grid-cols-5 gap-3">
        {hospitals.map(h => (
          <div key={h.id} className={`bg-card border rounded-lg p-3 ${
            h.status === 'overloaded' ? 'border-critical/30' : h.status === 'limited' ? 'border-warning/30' : 'border-border'
          }`}>
            <div className="text-xs font-medium text-foreground truncate mb-1">{h.name}</div>
            <StatusBadge status={h.status} />
            <div className="mt-2 text-[10px] text-muted-foreground">
              Load: <span className={`font-semibold ${h.emergencyLoad >= 90 ? 'text-critical' : h.emergencyLoad >= 70 ? 'text-warning' : 'text-success'}`}>{h.emergencyLoad}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
