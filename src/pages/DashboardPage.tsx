import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { hospitals, doctors } from '@/lib/mock-data';
import ResourceCard from '@/components/ResourceCard';
import StatusBadge from '@/components/StatusBadge';
import { Bed, Wind, Ambulance, Scissors, Building2, Activity, Users, Stethoscope, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const myHospital = hospitals[0];

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  const hospitalDoctors = selectedHospital
    ? doctors.filter(d => d.hospitalId === selectedHospital)
    : [];

  const selectedH = hospitals.find(h => h.id === selectedHospital);

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          {t('welcome')}, {user?.name} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          {user?.role === 'hospital_admin' ? myHospital.name : t('dashboard')} — Live Status
        </p>
      </div>

      {/* Resource cards for admin */}
      {user?.role === 'hospital_admin' && (
        <div className="grid grid-cols-5 gap-4 mb-8">
          <ResourceCard icon={Bed} label={t('icu_beds')} available={myHospital.icuBeds.available} total={myHospital.icuBeds.total} />
          <ResourceCard icon={Bed} label={t('general_beds')} available={myHospital.generalBeds.available} total={myHospital.generalBeds.total} />
          <ResourceCard icon={Wind} label={t('ventilators')} available={myHospital.ventilators.available} total={myHospital.ventilators.total} />
          <ResourceCard icon={Scissors} label={t('op_theatres')} available={myHospital.operationTheatres.available} total={myHospital.operationTheatres.total} />
          <ResourceCard icon={Ambulance} label={t('ambulances')} available={myHospital.ambulances.available} total={myHospital.ambulances.total} />
        </div>
      )}

      {/* Hospital network */}
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg font-semibold">{t('hospital_network')}</h2>
      </div>

      <div className="grid gap-4 mb-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-xs text-muted-foreground font-medium">
                <th className="text-left px-5 py-3">{t('hospital_network')}</th>
                <th className="text-left px-5 py-3">Type</th>
                <th className="text-center px-5 py-3">{t('icu_beds')}</th>
                <th className="text-center px-5 py-3">{t('general_beds')}</th>
                <th className="text-center px-5 py-3">{t('ventilators')}</th>
                <th className="text-center px-5 py-3">Load</th>
                <th className="text-center px-5 py-3">{t('status')}</th>
                <th className="text-center px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map(h => (
                <tr key={h.id} className="border-t border-border hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-4 font-medium text-foreground">{h.name}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${h.type === 'government' ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'}`}>
                      {h.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={h.icuBeds.available <= 2 ? 'text-destructive font-semibold' : 'text-foreground'}>
                      {h.icuBeds.available}
                    </span>
                    <span className="text-muted-foreground">/{h.icuBeds.total}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {h.generalBeds.available}<span className="text-muted-foreground">/{h.generalBeds.total}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={h.ventilators.available <= 2 ? 'text-destructive font-semibold' : ''}>
                      {h.ventilators.available}
                    </span>
                    <span className="text-muted-foreground">/{h.ventilators.total}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${h.emergencyLoad >= 90 ? 'bg-destructive' : h.emergencyLoad >= 70 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${h.emergencyLoad}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{h.emergencyLoad}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center"><StatusBadge status={h.status} /></td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => setSelectedHospital(selectedHospital === h.id ? null : h.id)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedHospital === h.id ? 'rotate-90' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hospital detail panel */}
      {selectedHospital && selectedH && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">{selectedH.name}</h3>
            <StatusBadge status={selectedH.status} />
          </div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Stethoscope className="w-4 h-4" /> Doctors at this hospital
          </h4>
          {hospitalDoctors.length === 0 ? (
            <p className="text-sm text-muted-foreground">No doctors found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {hospitalDoctors.map(doc => (
                <div key={doc.id} className="bg-muted/50 rounded-xl p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${doc.available ? 'bg-success/10' : 'bg-muted'}`}>
                    <Users className={`w-5 h-5 ${doc.available ? 'text-success' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{doc.name}</div>
                    <div className="text-xs text-primary">{doc.specialty}</div>
                    <div className="text-xs text-muted-foreground">{doc.degree} · {doc.experience} yrs</div>
                  </div>
                  <span className={`ml-auto w-2 h-2 rounded-full ${doc.available ? 'bg-success' : 'bg-muted-foreground'}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Network capacity */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-display text-base font-semibold">Network Capacity</h3>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {hospitals.map(h => (
            <div key={h.id} className="text-center bg-muted/50 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1 truncate">{h.name.split(' ')[0]}</div>
              <div className={`text-2xl font-bold ${
                h.emergencyLoad >= 90 ? 'text-destructive' : h.emergencyLoad >= 70 ? 'text-warning' : 'text-success'
              }`}>
                {100 - h.emergencyLoad}%
              </div>
              <div className="text-[10px] text-muted-foreground">{t('available')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
