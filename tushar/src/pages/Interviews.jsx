import React, { useState } from 'react';
import { Calendar, Users, Target, MessageSquare, Clock, ShieldCheck, ChevronRight, UserPlus, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const domains = [
  { id: 'dsa', name: 'DSA & Algorithms', icon: Target, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  { id: 'web', name: 'Web Development', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 'hr', name: 'HR & Behavioral', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'system', name: 'System Design', icon: Target, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' }
];

const Interviews = () => {
  const { currentUser } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  const mockAvailablePeers = [
    { id: 1, name: "Alex Chen", domain: "Web Dev", level: "Intermediate", rating: 4.8, available: "Today, 4:00 PM" },
    { id: 2, name: "Sarah Miller", domain: "DSA", level: "Advanced", rating: 4.9, available: "Tomorrow, 10:00 AM" },
    { id: 3, name: "Jordan Smith", domain: "HR", level: "Beginner", rating: 4.5, available: "Mon, 2:00 PM" }
  ];

  const handleRequest = () => {
    setBookingStatus('loading');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Domain Selection & Request */}
          <div className="lg:w-2/3">
            <div className="mb-12">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <Users className="w-10 h-10 text-rose-500" />
                Peer-to-Peer Mock Interviews
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                Practice makes perfect. Book a mock interview with a peer, get real-time feedback, and level up your interview game.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Select Your Domain</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {domains.map(domain => {
                  const Icon = domain.icon;
                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${
                        selectedDomain === domain.id
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 shadow-lg shadow-rose-500/20'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-rose-200'
                      }`}
                    >
                      <div className={`p-4 rounded-2xl ${domain.bg} ${domain.color}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 text-center">{domain.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Request a New Session</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Preferred Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="time" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl flex gap-4">
                  <Info className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-400">
                    We'll match you with a student of similar skill level. Both parties must confirm for the session to be scheduled.
                  </p>
                </div>

                <button
                  onClick={handleRequest}
                  disabled={!selectedDomain || bookingStatus === 'loading'}
                  className={`w-full py-5 rounded-2xl font-extrabold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
                    !selectedDomain 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-rose-500 to-red-600 text-white hover:scale-[1.02] shadow-rose-500/30'
                  }`}
                >
                  {bookingStatus === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : bookingStatus === 'success' ? (
                    <>Request Sent Successfully!</>
                  ) : (
                    <>Post Interview Request</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Available Peers & Help */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 p-8 shadow-xl mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                Available Now
              </h2>
              <div className="space-y-4">
                {mockAvailablePeers.map(peer => (
                  <div key={peer.id} className="p-5 rounded-2xl border border-slate-50 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                          <UserPlus className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{peer.name}</h4>
                          <span className="text-xs text-slate-500">{peer.domain} • {peer.level}</span>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-amber-500">★ {peer.rating}</div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {peer.available}
                      </span>
                      <button className="text-rose-500 hover:text-rose-600 font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-all">
                        Invite <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                Browse All Users
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-4">How it works</h3>
                 <ul className="space-y-4 text-indigo-100 text-sm">
                   <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                      <span>Select your domain and pick a time slot.</span>
                   </li>
                   <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                      <span>Matches are made based on skill level similarity.</span>
                   </li>
                   <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                      <span>After the 45-min session, provide detailed feedback.</span>
                   </li>
                 </ul>
                 <button className="w-full mt-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">
                   Read Guidelines
                 </button>
               </div>
               <Users className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
