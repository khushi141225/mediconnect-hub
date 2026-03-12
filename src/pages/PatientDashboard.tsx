import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { patientRecords } from '@/lib/mock-data';
import {
  Heart, FlaskConical, Pill, Video, Calendar, FileText,
  Fingerprint, Stethoscope, Activity, QrCode, CreditCard, Settings, ClipboardList
} from 'lucide-react';

const serviceCards = [
  { icon: Heart, labelKey: 'healthy_bytes', color: 'from-pink-500 to-rose-400', desc: 'Health tips & wellness', path: '/healthy-bytes' },
  { icon: FlaskConical, labelKey: 'lab_tests', color: 'from-blue-500 to-cyan-400', desc: 'Book & view lab tests', path: '/lab-tests' },
  { icon: Pill, labelKey: 'medicines', color: 'from-green-500 to-emerald-400', desc: 'Order medicines online', path: '/medicines' },
  { icon: Video, labelKey: 'teleconsultation', color: 'from-purple-500 to-violet-400', desc: 'Video consult with doctors', path: '/teleconsultation' },
  { icon: Calendar, labelKey: 'appointments', color: 'from-orange-500 to-amber-400', desc: 'Get appointment tokens', path: '/appointments' },
  { icon: FileText, labelKey: 'health_records', color: 'from-teal-500 to-cyan-400', desc: 'View medical history', path: '/health-records' },
  { icon: Fingerprint, labelKey: 'digital_health_id', color: 'from-indigo-500 to-blue-400', desc: 'Your unique health ID', path: '/digital-health-id' },
  { icon: Stethoscope, labelKey: 'health_services', color: 'from-red-500 to-pink-400', desc: 'Other health services', path: '/health-services' },
];

const quickActions = [
  { icon: FileText, label: 'Records' },
  { icon: QrCode, label: 'Scan' },
  { icon: CreditCard, label: 'Pay' },
  { icon: Settings, label: 'Settings' },
];

export default function PatientDashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const record = patientRecords.find(r => r.patientId === user?.patientId);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Welcome card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('welcome')}, {user?.name} 👋</h1>
            <p className="text-sm opacity-90">Patient ID: {user?.patientId}</p>
          </div>
          <div className="flex gap-3">
            {quickActions.map(a => (
              <button key={a.label} className="flex flex-col items-center gap-1 bg-primary-foreground/10 backdrop-blur rounded-xl px-4 py-3 hover:bg-primary-foreground/20 transition-colors">
                <a.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service cards */}
      <h2 className="font-display text-lg font-semibold mb-4">{t('health_services')}</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {serviceCards.map((s, i) => (
          <div key={i} className="service-card text-center">
            <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{t(s.labelKey)}</h3>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Medical History */}
      {record && (
        <>
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            {t('health_records')}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Basic Info */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Age:</span> <span className="font-medium">{record.age}</span></div>
                <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium">{record.gender}</span></div>
                <div><span className="text-muted-foreground">Blood Group:</span> <span className="font-medium">{record.bloodGroup}</span></div>
                <div><span className="text-muted-foreground">Conditions:</span> <span className="font-medium">{record.conditions.join(', ')}</span></div>
              </div>
            </div>

            {/* Digital Health ID */}
            <div className="bg-gradient-to-br from-primary/5 to-accent rounded-2xl p-5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Fingerprint className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold">{t('digital_health_id')}</h3>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{record.patientId}</div>
              <p className="text-xs text-muted-foreground">Share this ID with hospitals and doctors for instant record access</p>
            </div>
          </div>

          {/* Hospital visits */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="text-sm font-semibold mb-3">Hospital Visit History</h3>
            <div className="space-y-3">
              {record.hospitalVisits.map((v, i) => (
                <div key={i} className="flex items-center gap-4 bg-muted/50 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{v.hospital}</div>
                    <div className="text-xs text-muted-foreground">{v.doctor} · {v.diagnosis}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{v.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions & Lab reports */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">Prescriptions</h3>
              {record.prescriptions.map((p, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{p.medicine}</div>
                    <div className="text-xs text-muted-foreground">{p.dosage}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">Lab Reports</h3>
              {record.labReports.map((l, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{l.test}</div>
                    <div className="text-xs text-muted-foreground">{l.result}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{l.date}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
