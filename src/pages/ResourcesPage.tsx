import { useState } from 'react';
import { hospitals } from '@/lib/mock-data';
import ResourceCard from '@/components/ResourceCard';
import { Bed, Wind, Ambulance, Scissors, Package } from 'lucide-react';

const myHospital = hospitals[0];

export default function ResourcesPage() {
  const [resources, setResources] = useState({
    icuBeds: { ...myHospital.icuBeds },
    generalBeds: { ...myHospital.generalBeds },
    ventilators: { ...myHospital.ventilators },
    operationTheatres: { ...myHospital.operationTheatres },
    ambulances: { ...myHospital.ambulances },
  });

  const resourceList = [
    { key: 'icuBeds' as const, icon: Bed, label: 'ICU Beds' },
    { key: 'generalBeds' as const, icon: Bed, label: 'General Beds' },
    { key: 'ventilators' as const, icon: Wind, label: 'Ventilators' },
    { key: 'operationTheatres' as const, icon: Scissors, label: 'Operation Theatres' },
    { key: 'ambulances' as const, icon: Ambulance, label: 'Ambulances' },
  ];

  const updateAvailable = (key: keyof typeof resources, delta: number) => {
    setResources(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        available: Math.max(0, Math.min(prev[key].total, prev[key].available + delta)),
      },
    }));
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl mb-1">RESOURCE MANAGEMENT</h1>
        <p className="text-sm text-muted-foreground">{myHospital.name} — Update real-time availability</p>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-8">
        {resourceList.map(r => (
          <ResourceCard key={r.key} icon={r.icon} label={r.label} available={resources[r.key].available} total={resources[r.key].total} />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Package className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-display text-sm tracking-wider">UPDATE AVAILABILITY</h2>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left px-4 py-3">Resource</th>
              <th className="text-center px-4 py-3">Total</th>
              <th className="text-center px-4 py-3">Available</th>
              <th className="text-center px-4 py-3">Occupied</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourceList.map(r => {
              const data = resources[r.key];
              return (
                <tr key={r.key} className="border-b border-border/50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <r.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{r.label}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-foreground">{data.total}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={data.available <= 2 ? 'text-critical font-semibold' : 'text-success font-semibold'}>
                      {data.available}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-foreground">{data.total - data.available}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateAvailable(r.key, -1)}
                        className="w-7 h-7 rounded border border-border text-muted-foreground hover:bg-critical/10 hover:text-critical hover:border-critical/30 transition-colors text-sm"
                      >
                        −
                      </button>
                      <button
                        onClick={() => updateAvailable(r.key, 1)}
                        className="w-7 h-7 rounded border border-border text-muted-foreground hover:bg-success/10 hover:text-success hover:border-success/30 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
