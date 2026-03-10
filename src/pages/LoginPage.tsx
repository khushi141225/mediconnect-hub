import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';
import { Activity, Building2, Ambulance, Stethoscope } from 'lucide-react';
import type { UserRole } from '@/lib/mock-data';

const roles: { role: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
  { role: 'hospital_admin', label: 'HOSPITAL ADMIN', icon: Building2, desc: 'Manage resources, respond to sharing requests, monitor capacity.' },
  { role: 'ambulance_coordinator', label: 'EMERGENCY COORDINATOR', icon: Ambulance, desc: 'Submit emergencies, view AI recommendations, coordinate transfers.' },
  { role: 'doctor', label: 'DOCTOR / SPECIALIST', icon: Stethoscope, desc: 'View consultation requests, update availability, telemedicine.' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Activity className="w-10 h-10 text-primary" />
          <h1 className="text-3xl text-primary-foreground">MEDISYNC</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Hybrid Healthcare Resource Coordination System — Real-time hospital network coordination for emergency response.
        </p>
      </motion.div>

      {/* Role selection */}
      <div className="grid gap-4 w-full max-w-3xl md:grid-cols-3">
        {roles.map((r, i) => (
          <motion.button
            key={r.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleLogin(r.role)}
            className="bg-card border border-border rounded-lg p-6 text-left hover:border-primary/50 hover:bg-accent/50 transition-all group"
          >
            <r.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-sm mb-2 text-foreground">{r.label}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            <div className="mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Login →
            </div>
          </motion.button>
        ))}
      </div>

      <p className="mt-8 text-[10px] text-muted-foreground tracking-wider">
        PROTOTYPE — DEMO CREDENTIALS PRE-CONFIGURED
      </p>
    </div>
  );
}
