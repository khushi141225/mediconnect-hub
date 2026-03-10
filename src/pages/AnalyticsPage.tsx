import { analyticsData } from '@/lib/mock-data';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(220, 35%, 10%)',
  border: '1px solid hsl(220, 20%, 18%)',
  borderRadius: '6px',
  color: 'hsl(0, 0%, 88%)',
  fontSize: '12px',
};

export default function AnalyticsPage() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl mb-1">ANALYTICS</h1>
        <p className="text-sm text-muted-foreground">Healthcare network performance metrics</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* ICU Utilization */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-display text-xs tracking-wider text-muted-foreground mb-4">ICU UTILIZATION BY HOSPITAL</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData.icuUtilization}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="utilization" radius={[3, 3, 0, 0]}>
                {analyticsData.icuUtilization.map((entry, i) => (
                  <Cell key={i} fill={entry.utilization >= 90 ? 'hsl(4, 74%, 57%)' : entry.utilization >= 70 ? 'hsl(37, 90%, 51%)' : 'hsl(145, 63%, 49%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Load */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-display text-xs tracking-wider text-muted-foreground mb-4">NETWORK LOAD (24H)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analyticsData.hourlyLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
              <XAxis dataKey="hour" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="load" stroke="hsl(221, 91%, 64%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ambulance Response Time */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-display text-xs tracking-wider text-muted-foreground mb-4">AVG AMBULANCE RESPONSE TIME</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData.responseTimeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
              <XAxis dataKey="day" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} unit=" min" />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="avgMinutes" fill="hsl(37, 90%, 51%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Usage */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-display text-xs tracking-wider text-muted-foreground mb-4">EQUIPMENT USAGE ACROSS NETWORK</h3>
          <div className="space-y-4 mt-2">
            {analyticsData.equipmentUsage.map(eq => {
              const pct = (eq.used / eq.total) * 100;
              return (
                <div key={eq.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{eq.name}</span>
                    <span className="text-muted-foreground">{eq.used}/{eq.total} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 90 ? 'bg-critical' : pct >= 70 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
