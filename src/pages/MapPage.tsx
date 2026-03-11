import { useI18n } from '@/lib/i18n';
import { hospitals } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { MapPin, Bed, Wind, Ambulance, Navigation } from 'lucide-react';

export default function MapPage() {
  const { t } = useI18n();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('network_map')}</h1>
        <p className="text-sm text-muted-foreground">Hospital network visualization and capacity overview</p>
      </div>

      {/* Simulated map */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 relative overflow-hidden shadow-sm" style={{ height: 420 }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        {hospitals.map((h, i) => {
          const positions = [
            { left: '25%', top: '35%' },
            { left: '55%', top: '20%' },
            { left: '15%', top: '65%' },
            { left: '70%', top: '55%' },
            { left: '45%', top: '70%' },
          ];
          const pos = positions[i];
          const color = h.status === 'available' ? 'text-success' : h.status === 'limited' ? 'text-warning' : 'text-destructive';

          return (
            <div key={h.id} className="absolute group" style={pos}>
              <div className={`relative ${h.status === 'overloaded' ? 'status-pulse' : ''}`}>
                <MapPin className={`w-7 h-7 ${color} drop-shadow-lg`} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                  h.status === 'available' ? 'bg-success' : h.status === 'limited' ? 'bg-warning' : 'bg-destructive'
                }`} />
              </div>
              {/* Tooltip */}
              <div className="absolute left-9 -top-2 glass rounded-2xl p-4 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-60">
                <div className="text-sm font-semibold text-foreground mb-1">{h.name}</div>
                <div className="text-xs text-muted-foreground mb-3 capitalize">{h.type} — {h.distance} km</div>
                <div className="grid grid-cols-3 gap-2 text-xs text-center mb-3">
                  <div><Bed className="w-3.5 h-3.5 mx-auto mb-0.5 text-muted-foreground" /><span className="font-semibold">{h.icuBeds.available}</span></div>
                  <div><Wind className="w-3.5 h-3.5 mx-auto mb-0.5 text-muted-foreground" /><span className="font-semibold">{h.ventilators.available}</span></div>
                  <div><Ambulance className="w-3.5 h-3.5 mx-auto mb-0.5 text-muted-foreground" /><span className="font-semibold">{h.ambulances.available}</span></div>
                </div>
                <button className="w-full flex items-center justify-center gap-1 bg-primary/10 text-primary rounded-lg py-1.5 text-xs font-medium">
                  <Navigation className="w-3 h-3" /> Get Directions
                </button>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 glass rounded-xl px-4 py-2.5 text-xs flex gap-4">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-success" /> {t('available')}</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-warning" /> Limited</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Overloaded</span>
        </div>
      </div>

      {/* Hospital cards */}
      <div className="grid grid-cols-5 gap-4">
        {hospitals.map(h => (
          <div key={h.id} className={`bg-card border rounded-2xl p-4 shadow-sm ${
            h.status === 'overloaded' ? 'border-destructive/30' : h.status === 'limited' ? 'border-warning/30' : 'border-border'
          }`}>
            <div className="text-sm font-semibold text-foreground truncate mb-2">{h.name}</div>
            <StatusBadge status={h.status} />
            <div className="mt-3 text-xs text-muted-foreground">
              Load: <span className={`font-bold ${h.emergencyLoad >= 90 ? 'text-destructive' : h.emergencyLoad >= 70 ? 'text-warning' : 'text-success'}`}>{h.emergencyLoad}%</span>
            </div>
            <button className="mt-2 w-full flex items-center justify-center gap-1 bg-primary/10 text-primary rounded-lg py-1.5 text-xs font-medium hover:bg-primary/20 transition-colors">
              <Navigation className="w-3 h-3" /> Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
