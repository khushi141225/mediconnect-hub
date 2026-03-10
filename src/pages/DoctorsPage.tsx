import { useState } from 'react';
import { doctors } from '@/lib/mock-data';
import { Stethoscope, Video, User, Search } from 'lucide-react';

export default function DoctorsPage() {
  const [filter, setFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));
  const filtered = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(filter.toLowerCase()) || d.specialty.toLowerCase().includes(filter.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || d.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl mb-1">SPECIALIST DIRECTORY</h1>
        <p className="text-sm text-muted-foreground">Live availability across the hospital network</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center bg-card border border-border rounded px-3">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search by name or specialty..."
            className="bg-transparent py-2 text-sm text-foreground outline-none flex-1"
          />
        </div>
        <select
          value={specialtyFilter}
          onChange={e => setSpecialtyFilter(e.target.value)}
          className="bg-card border border-border rounded px-3 py-2 text-sm text-foreground outline-none"
        >
          <option value="all">All Specialties</option>
          {specialties.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Directory */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${doc.available ? 'bg-success/15' : 'bg-muted'}`}>
              <User className={`w-5 h-5 ${doc.available ? 'text-success' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-medium text-foreground truncate">{doc.name}</h3>
                <span className={`w-2 h-2 rounded-full shrink-0 ${doc.available ? 'bg-success' : 'bg-muted-foreground'}`} />
              </div>
              <div className="text-xs text-primary mb-1">{doc.specialty}</div>
              <div className="text-xs text-muted-foreground mb-2">{doc.hospital}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  {doc.consultationMode === 'telemedicine' || doc.consultationMode === 'both' ? (
                    <><Video className="w-3 h-3" /> Telemedicine</>
                  ) : (
                    <><Stethoscope className="w-3 h-3" /> In-person</>
                  )}
                </span>
                {doc.available && (
                  <button className="text-[10px] bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded hover:bg-primary/20 transition-colors ml-auto">
                    Request Consult
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
