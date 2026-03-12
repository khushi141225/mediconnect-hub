import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Activity, Building2, Ambulance, Stethoscope, Heart, Globe, Mail, Phone, Chrome, Shield } from 'lucide-react';
import type { UserRole } from '@/lib/mock-data';

const roles: { role: UserRole; icon: React.ElementType; color: string }[] = [
  { role: 'hospital_admin', icon: Building2, color: 'from-primary to-primary/80' },
  { role: 'ambulance_coordinator', icon: Ambulance, color: 'from-destructive to-destructive/80' },
  { role: 'doctor', icon: Stethoscope, color: 'from-success to-success/80' },
  { role: 'patient', icon: Heart, color: 'from-warning to-warning/80' },
  { role: 'gov_authority', icon: Shield, color: 'from-indigo-600 to-blue-500' },
];

type LoginMethod = 'email' | 'phone' | 'google';

export default function LoginPage() {
  const { login } = useAuth();
  const { t, lang, setLang, languages } = useI18n();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');

  const handleLogin = () => {
    if (!selectedRole) return;
    login(selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/30 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">MediSync</h1>
            <p className="text-[10px] text-muted-foreground">{t('login_subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <select
            value={lang}
            onChange={e => setLang(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">{t('welcome')}</h2>
            <p className="text-muted-foreground">{t('select_role')}</p>
          </div>

          {/* Role cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {roles.map((r, i) => (
              <motion.button
                key={r.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedRole(r.role)}
                className={`service-card text-center group ${selectedRole === r.role ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''}`}
              >
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <r.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">{t(r.role)}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(`${r.role}_desc`)}</p>
              </motion.button>
            ))}
          </div>

          {/* Login form */}
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              {/* Login method tabs */}
              <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6">
                {([
                  { key: 'email' as LoginMethod, icon: Mail, label: t('email_password') },
                  { key: 'phone' as LoginMethod, icon: Phone, label: t('phone_otp') },
                  { key: 'google' as LoginMethod, icon: Chrome, label: 'Google' },
                ]).map(m => (
                  <button
                    key={m.key}
                    onClick={() => setLoginMethod(m.key)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      loginMethod === m.key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <m.icon className="w-3.5 h-3.5" />
                    {m.label}
                  </button>
                ))}
              </div>

              {loginMethod === 'email' && (
                <div className="space-y-3">
                  <input type="email" placeholder={t('enter_email')} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  <input type="password" placeholder={t('enter_password')} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              )}
              {loginMethod === 'phone' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="tel" placeholder={t('enter_phone')} className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    <button className="px-4 py-3 bg-primary/10 text-primary rounded-xl text-xs font-semibold hover:bg-primary/20 transition-colors whitespace-nowrap">
                      {t('send_otp')}
                    </button>
                  </div>
                  <input type="text" placeholder={t('enter_otp')} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              )}
              {loginMethod === 'google' && (
                <div className="text-center py-4">
                  <button
                    onClick={handleLogin}
                    className="inline-flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-3 text-sm font-medium text-foreground hover:shadow-md transition-all"
                  >
                    <Chrome className="w-5 h-5" />
                    {t('google_login')}
                  </button>
                </div>
              )}

              {loginMethod !== 'google' && (
                <button
                  onClick={handleLogin}
                  className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
                >
                  {t('login')}
                </button>
              )}

              <p className="text-center text-[10px] text-muted-foreground mt-4">
                PROTOTYPE — DEMO CREDENTIALS PRE-CONFIGURED
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
