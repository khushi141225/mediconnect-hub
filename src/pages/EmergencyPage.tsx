import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hospitals, emergencyTypes } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Siren, MapPin, Bed, Wind, Stethoscope, Navigation, CheckCircle2 } from 'lucide-react';

type Phase = 'input' | 'scanning' | 'result';

export default function EmergencyPage() {
  const [phase, setPhase] = useState<Phase>('input');
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('NH-44, Km 23');

  const handleSubmit = () => {
    if (!selectedType) return;
    setPhase('scanning');
    setTimeout(() => setPhase('result'), 2500);
  };

  const recommended = hospitals[0]; // City General — nearest with resources
  const alternatives = hospitals.filter(h => h.id !== recommended.id).slice(0, 3);

  return (
    <div className={`p-6 min-h-screen animate-fade-in ${phase === 'scanning' ? 'heartbeat-active' : ''}`}>
      <div className="mb-6">
        <h1 className="text-xl mb-1">EMERGENCY COORDINATION</h1>
        <p className="text-sm text-muted-foreground">AI-Powered Emergency Decision Engine</p>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Siren className="w-5 h-5 text-critical" />
                <h2 className="font-display text-sm">NEW EMERGENCY</h2>
              </div>

              {/* Emergency type */}
              <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Emergency Type</label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {emergencyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2 text-xs rounded border transition-colors ${
                      selectedType === type
                        ? 'bg-primary/15 border-primary text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Location */}
              <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Patient Location</label>
              <div className="flex gap-2 mb-6">
                <div className="flex-1 flex items-center bg-muted border border-border rounded px-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="bg-transparent py-2 text-sm text-foreground outline-none flex-1"
                    placeholder="Enter location or coordinates"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedType}
                className="w-full bg-critical text-critical-foreground py-3 rounded font-display text-sm tracking-wider hover:bg-critical/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                INITIATE EMERGENCY SCAN
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
            <Siren className="w-16 h-16 text-critical status-pulse mb-6" />
            <h2 className="font-display text-lg mb-2">SCANNING HOSPITALS</h2>
            <p className="text-sm text-muted-foreground mb-8">Analyzing {selectedType} emergency near {location}</p>
            <div className="flex gap-4">
              {hospitals.slice(0, 4).map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.3 }}
                  className="bg-card border border-border rounded px-3 py-2 text-xs text-muted-foreground"
                >
                  {h.name.split(' ').slice(0, 2).join(' ')}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* AI Decision */}
            <div className="bg-success/5 border border-success/30 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <div>
                  <h2 className="font-display text-sm">AI RECOMMENDATION</h2>
                  <p className="text-xs text-muted-foreground">Decision: TREAT AT NEAREST HOSPITAL</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-foreground font-semibold">{recommended.name}</h3>
                    <span className="text-xs text-muted-foreground">{recommended.distance} km away — {recommended.type}</span>
                  </div>
                  <StatusBadge status={recommended.status} />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <Bed className="w-4 h-4 mx-auto mb-1 text-success" />
                    <div className="text-sm font-semibold text-foreground">{recommended.icuBeds.available}</div>
                    <div className="text-[10px] text-muted-foreground">ICU Beds</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-4 h-4 mx-auto mb-1 text-success" />
                    <div className="text-sm font-semibold text-foreground">{recommended.ventilators.available}</div>
                    <div className="text-[10px] text-muted-foreground">Ventilators</div>
                  </div>
                  <div className="text-center">
                    <Stethoscope className="w-4 h-4 mx-auto mb-1 text-success" />
                    <div className="text-sm font-semibold text-foreground">3</div>
                    <div className="text-[10px] text-muted-foreground">Specialists</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-semibold text-foreground">{recommended.distance} km</div>
                    <div className="text-[10px] text-muted-foreground">Distance</div>
                  </div>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-2.5 rounded text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  <Navigation className="w-4 h-4" /> NAVIGATE TO HOSPITAL
                </button>
              </div>
            </div>

            {/* Alternatives */}
            <h3 className="font-display text-xs tracking-wider text-muted-foreground mb-3">ALTERNATIVE HOSPITALS</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {alternatives.map(h => (
                <div key={h.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground truncate pr-2">{h.name}</h4>
                    <StatusBadge status={h.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                    <div><span className="text-foreground font-semibold">{h.icuBeds.available}</span><br/><span className="text-muted-foreground">ICU</span></div>
                    <div><span className="text-foreground font-semibold">{h.ventilators.available}</span><br/><span className="text-muted-foreground">Vent</span></div>
                    <div><span className="text-foreground font-semibold">{h.distance} km</span><br/><span className="text-muted-foreground">Dist</span></div>
                  </div>
                  <button className="w-full border border-border text-muted-foreground py-1.5 rounded text-xs hover:border-primary/50 hover:text-primary transition-colors">
                    Select
                  </button>
                </div>
              ))}
            </div>

            <button onClick={() => setPhase('input')} className="text-xs text-primary hover:underline">
              ← New Emergency
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
