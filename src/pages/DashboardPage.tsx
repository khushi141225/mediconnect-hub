import { useAuth } from '@/lib/auth-context';
import { hospitals } from '@/lib/mock-data';
import ResourceCard from '@/components/ResourceCard';
import StatusBadge from '@/components/StatusBadge';
import { Bed, Wind, Ambulance, Scissors, Building2, Activity } from 'lucide-react';

const myHospital = hospitals[0]; // City General for admin demo

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl mb-1">DASHBOARD</h1>
        <p className="text-sm text-muted-foreground">
          {user?.role === 'hospital_admin' ? myHospital.name : 'System Overview'} — Live Status
        </p>
      </div>

      {/* Resource cards */}
      {user?.role === 'hospital_admin' && (
        <>
          <div className="grid grid-cols-5 gap-3 mb-6">
            <ResourceCard icon={Bed} label="ICU Beds" available={myHospital.icuBeds.available} total={myHospital.icuBeds.total} />
            <ResourceCard icon={Bed} label="General Beds" available={myHospital.generalBeds.available} total={myHospital.generalBeds.total} />
            <ResourceCard icon={Wind} label="Ventilators" available={myHospital.ventilators.available} total={myHospital.ventilators.total} />
            <ResourceCard icon={Scissors} label="Op. Theatres" available={myHospital.operationTheatres.available} total={myHospital.operationTheatres.total} />
            <ResourceCard icon={Ambulance} label="Ambulances" available={myHospital.ambulances.available} total={myHospital.ambulances.total} />
          </div>
        </>
      )}

      {/* Hospital network overview */}
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-display text-sm tracking-wider">HOSPITAL NETWORK</h2>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-card border-b border-border">
            <tr className="text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left px-4 py-3">Hospital</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-center px-4 py-3">ICU</th>
              <th className="text-center px-4 py-3">Beds</th>
              <th className="text-center px-4 py-3">Ventilators</th>
              <th className="text-center px-4 py-3">Load</th>
              <th className="text-center px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(h => (
              <tr key={h.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{h.name}</td>
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground capitalize">{h.type}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={h.icuBeds.available <= 2 ? 'text-critical font-semibold' : 'text-foreground'}>
                    {h.icuBeds.available}
                  </span>
                  <span className="text-muted-foreground">/{h.icuBeds.total}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-foreground">{h.generalBeds.available}</span>
                  <span className="text-muted-foreground">/{h.generalBeds.total}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={h.ventilators.available <= 2 ? 'text-critical font-semibold' : 'text-foreground'}>
                    {h.ventilators.available}
                  </span>
                  <span className="text-muted-foreground">/{h.ventilators.total}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${h.emergencyLoad >= 90 ? 'bg-critical' : h.emergencyLoad >= 70 ? 'bg-warning' : 'bg-success'}`}
                        style={{ width: `${h.emergencyLoad}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{h.emergencyLoad}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={h.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Emergency capacity indicator */}
      <div className="mt-6 bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="font-display text-xs tracking-wider">NETWORK CAPACITY</h3>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {hospitals.map(h => (
            <div key={h.id} className="text-center">
              <div className="text-xs text-muted-foreground mb-1 truncate">{h.name.split(' ')[0]}</div>
              <div className={`text-lg font-semibold ${
                h.emergencyLoad >= 90 ? 'text-critical' : h.emergencyLoad >= 70 ? 'text-warning' : 'text-success'
              }`}>
                {100 - h.emergencyLoad}%
              </div>
              <div className="text-[10px] text-muted-foreground">available</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
