import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { hospitals, doctors, resourceRequests } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import {
  Shield, Building2, Stethoscope, Bed, AlertTriangle, BarChart3,
  CheckCircle2, XCircle, Eye, FileText, Bell, TrendingUp, Users, Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const complianceData = [
  { hospital: 'City General', score: 94 },
  { hospital: 'Metro Private', score: 78 },
  { hospital: 'District Public', score: 85 },
  { hospital: 'Sunrise Multi', score: 97 },
  { hospital: 'National Trauma', score: 91 },
];

const auditAlerts = [
  { id: 1, type: 'warning', message: 'Metro Private: Ventilator count changed from 2 to 18 — flagged for review', time: '12 min ago' },
  { id: 2, type: 'critical', message: 'District Public: Doctor marked busy with no active patient case', time: '25 min ago' },
  { id: 3, type: 'info', message: 'Sunrise Multi: Routine audit completed — all data verified', time: '1 hr ago' },
  { id: 4, type: 'warning', message: 'City General: ICU capacity reporting delayed by 30+ minutes', time: '2 hr ago' },
];

const surgeryRecords = [
  { doctor: 'Dr. Aanya Sharma', patient: 'P-2024-001', type: 'Cardiac Bypass', hospital: 'City General', status: 'Completed', time: '08:00 - 12:30' },
  { doctor: 'Dr. Rajesh Patel', patient: 'P-2024-015', type: 'Craniotomy', hospital: 'Metro Private', status: 'In Progress', time: '10:00 - ongoing' },
  { doctor: 'Dr. Arjun Reddy', patient: 'P-2024-008', type: 'Hip Replacement', hospital: 'District Public', status: 'Completed', time: '06:00 - 09:45' },
];

const PIE_COLORS = ['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--destructive))', 'hsl(var(--success))'];

export default function GovernmentDashboard() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'overview' | 'compliance' | 'audit' | 'surgeries'>('overview');

  const totalICU = hospitals.reduce((a, h) => a + h.icuBeds.total, 0);
  const availICU = hospitals.reduce((a, h) => a + h.icuBeds.available, 0);
  const totalDocs = doctors.length;
  const availDocs = doctors.filter(d => d.available).length;
  const totalAmb = hospitals.reduce((a, h) => a + h.ambulances.total, 0);
  const activeAmb = hospitals.reduce((a, h) => a + (h.ambulances.total - h.ambulances.available), 0);

  const statusDist = [
    { name: 'Available', value: hospitals.filter(h => h.status === 'available').length },
    { name: 'Limited', value: hospitals.filter(h => h.status === 'limited').length },
    { name: 'Overloaded', value: hospitals.filter(h => h.status === 'overloaded').length },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'compliance', label: 'Compliance', icon: Shield },
    { key: 'audit', label: 'Audit & Fraud', icon: AlertTriangle },
    { key: 'surgeries', label: 'Surgery Records', icon: FileText },
  ] as const;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Government Health Authority
        </h1>
        <p className="text-sm text-muted-foreground">National Healthcare Network Monitoring Dashboard</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { icon: Building2, label: 'Hospitals', value: hospitals.length, sub: 'Connected' },
              { icon: Users, label: 'Doctors', value: `${availDocs}/${totalDocs}`, sub: 'Available' },
              { icon: Bed, label: 'ICU Beds', value: `${availICU}/${totalICU}`, sub: 'Available' },
              { icon: Activity, label: 'Ambulances', value: `${activeAmb}/${totalAmb}`, sub: 'Active' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon className="w-4 h-4 text-primary" /></div>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <span className="text-xs text-muted-foreground">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">Hospital Load Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={hospitals.map(h => ({ name: h.name.split(' ')[0], load: h.emergencyLoad }))}>
                  <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} />
                  <Tooltip /><Bar dataKey="load" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">Hospital Status Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={statusDist} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {statusDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie><Tooltip /></PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* All hospitals */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-border"><h3 className="text-sm font-semibold">All Hospitals</h3></div>
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-xs text-muted-foreground"><th className="text-left px-5 py-3">Hospital</th><th className="text-center px-5 py-3">Type</th><th className="text-center px-5 py-3">ICU</th><th className="text-center px-5 py-3">Vent</th><th className="text-center px-5 py-3">Load</th><th className="text-center px-5 py-3">Status</th><th className="text-center px-5 py-3">Actions</th></tr>
              </thead>
              <tbody>
                {hospitals.map(h => (
                  <tr key={h.id} className="border-t border-border hover:bg-accent/30">
                    <td className="px-5 py-3 font-medium">{h.name}</td>
                    <td className="px-5 py-3 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${h.type === 'government' ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'}`}>{h.type}</span></td>
                    <td className="px-5 py-3 text-center">{h.icuBeds.available}/{h.icuBeds.total}</td>
                    <td className="px-5 py-3 text-center">{h.ventilators.available}/{h.ventilators.total}</td>
                    <td className="px-5 py-3 text-center">{h.emergencyLoad}%</td>
                    <td className="px-5 py-3 text-center"><StatusBadge status={h.status} /></td>
                    <td className="px-5 py-3 text-center flex gap-1 justify-center">
                      <button className="text-xs text-primary hover:underline">Inspect</button>
                      <button className="text-xs text-warning hover:underline">Warn</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'compliance' && (
        <div>
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="text-sm font-semibold mb-4">Hospital Compliance Scores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="hospital" tick={{ fontSize: 10 }} /><YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip /><Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {complianceData.map((d, i) => <Cell key={i} fill={d.score >= 90 ? 'hsl(var(--success))' : d.score >= 80 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {complianceData.map((d, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                {d.score >= 90 ? <CheckCircle2 className="w-5 h-5 text-success" /> : <AlertTriangle className="w-5 h-5 text-warning" />}
                <div className="flex-1"><div className="text-sm font-medium">{d.hospital}</div><div className="text-xs text-muted-foreground">Compliance Score</div></div>
                <span className={`text-lg font-bold ${d.score >= 90 ? 'text-success' : d.score >= 80 ? 'text-warning' : 'text-destructive'}`}>{d.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-warning" /> Fraud Detection Alerts</h3>
          <div className="space-y-3 mb-6">
            {auditAlerts.map(a => (
              <div key={a.id} className={`rounded-xl p-4 border ${a.type === 'critical' ? 'glass-alert' : a.type === 'warning' ? 'bg-warning/5 border-warning/20' : 'bg-card border-border'}`}>
                <div className="flex items-center gap-2">
                  {a.type === 'critical' ? <XCircle className="w-4 h-4 text-destructive" /> : a.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-warning" /> : <CheckCircle2 className="w-4 h-4 text-success" />}
                  <span className="text-sm text-foreground flex-1">{a.message}</span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Eye className="w-4 h-4 text-primary" /> Recent Resource Requests</h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50"><tr className="text-xs text-muted-foreground"><th className="text-left px-4 py-3">From</th><th className="text-left px-4 py-3">To</th><th className="text-left px-4 py-3">Resource</th><th className="text-center px-4 py-3">Qty</th><th className="text-center px-4 py-3">Status</th></tr></thead>
              <tbody>
                {resourceRequests.map(r => (
                  <tr key={r.id} className="border-t border-border"><td className="px-4 py-3">{r.fromHospital}</td><td className="px-4 py-3">{r.toHospital}</td><td className="px-4 py-3">{r.resourceType}</td><td className="px-4 py-3 text-center">{r.quantity}</td><td className="px-4 py-3 text-center"><StatusBadge status={r.status as any} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'surgeries' && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Stethoscope className="w-4 h-4 text-primary" /> Surgery & Emergency Records</h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50"><tr className="text-xs text-muted-foreground"><th className="text-left px-4 py-3">Doctor</th><th className="text-left px-4 py-3">Patient ID</th><th className="text-left px-4 py-3">Surgery</th><th className="text-left px-4 py-3">Hospital</th><th className="text-center px-4 py-3">Time</th><th className="text-center px-4 py-3">Status</th></tr></thead>
              <tbody>
                {surgeryRecords.map((s, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{s.doctor}</td><td className="px-4 py-3">{s.patient}</td><td className="px-4 py-3">{s.type}</td><td className="px-4 py-3">{s.hospital}</td><td className="px-4 py-3 text-center text-xs">{s.time}</td>
                    <td className="px-4 py-3 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
