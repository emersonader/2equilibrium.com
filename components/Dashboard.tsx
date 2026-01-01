import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Calendar, MessageSquare, Star, ArrowUpRight, Lock, X, Send, CheckCircle, Video, Activity, LogOut } from 'lucide-react';
import { ChartDataPoint } from '../types';
import { checkInAPI, progressAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [checkInStep, setCheckInStep] = useState<'form' | 'success'>('form');
  const [progressData, setProgressData] = useState<ChartDataPoint[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const [checkInData, setCheckInData] = useState({
    weight: '',
    energyLevel: '',
    notes: ''
  });

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      setLoadingProgress(true);
      const data = await progressAPI.getData();
      setProgressData(data.length > 0 ? data : [
        { day: 'Mon', weight: 0, energy: 0 },
        { day: 'Tue', weight: 0, energy: 0 },
        { day: 'Wed', weight: 0, energy: 0 },
        { day: 'Thu', weight: 0, energy: 0 },
        { day: 'Fri', weight: 0, energy: 0 },
        { day: 'Sat', weight: 0, energy: 0 },
        { day: 'Sun', weight: 0, energy: 0 },
      ]);
    } catch (error) {
      console.error('Failed to load progress data:', error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const submitCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await checkInAPI.submit(
        parseFloat(checkInData.weight),
        parseInt(checkInData.energyLevel),
        checkInData.notes
      );
      setCheckInStep('success');
      setCheckInData({ weight: '', energyLevel: '', notes: '' });
      loadProgressData();
      setTimeout(() => {
        setIsCheckInOpen(false);
        setCheckInStep('form');
      }, 4000);
    } catch (error) {
      console.error('Check-in failed:', error);
      alert('Failed to submit check-in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy font-sans selection:bg-brand-gold selection:text-white">
      {/* Top Banner - Sophisticated Header */}
      <div className="bg-white border-b border-brand-navy/5 p-6 md:p-8 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative group cursor-pointer shrink-0">
            <div className="absolute -inset-1 rounded-full bg-brand-gold/20 blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2776&auto=format&fit=crop" 
              alt="Graziella" 
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white object-cover shadow-lg"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-3xl md:text-4xl text-brand-navy mb-2">
              Good morning, {user?.name || 'Member'}.
            </h1>
            <div className="bg-brand-blue/30 inline-block px-4 py-3 rounded-r-xl border-l-4 border-brand-gold">
              <p className="font-serif italic text-brand-navy/80 text-lg">
                "Another 1.6 kg down this week. Keep trusting the process. I’m proud of you."
              </p>
            </div>
            <p className="text-xs text-brand-gold mt-2 tracking-widest uppercase font-bold">— Graziella</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsCheckInOpen(true)}
              className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-gold transition-all duration-300 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold shadow-lg shadow-brand-navy/10"
            >
              <CheckCircle className="w-4 h-4" />
              Weekly Check-In
            </button>
            {user?.isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-navy text-white transition-all duration-300 px-8 py-3 uppercase tracking-widest text-xs font-bold"
              >
                <Star className="w-4 h-4" />
                Admin Panel
              </button>
            )}
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-white border border-brand-navy/10 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 text-brand-navy px-8 py-3 uppercase tracking-widest text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Graziella's Personal Feedback Card - High Priority */}
          <div className="bg-white border border-brand-gold shadow-sm p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
              Priority Review
            </div>
            <h3 className="font-serif text-2xl mb-4 text-brand-navy flex items-center gap-2">
              Personal Feedback
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:bg-brand-navy hover:text-white transition-colors text-brand-navy">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <div className="flex-1">
                <p className="text-brand-navy/70 leading-relaxed mb-4 font-serif text-lg italic border-l-2 border-brand-gold/30 pl-4">
                  "I reviewed your logs from Tuesday. The metabolic shift is happening exactly as we planned. I've recorded a personal video explaining the nutrient timing adjustment for next week."
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-brand-navy/40 uppercase tracking-widest text-xs font-bold">Recorded 2h ago</span>
                  <button className="text-brand-gold underline underline-offset-4 hover:text-brand-navy transition-colors font-semibold">
                    Watch Video (3:42)
                  </button>
                </div>
              </div>
            </div>
          </div>

           {/* This Week From Graziella - General */}
           <div className="bg-white border border-brand-navy/5 p-6 flex items-center gap-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative shrink-0 overflow-hidden w-32 h-20 bg-brand-navy">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Video thumbnail" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <Video className="w-3 h-3 text-brand-navy" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-brand-gold uppercase tracking-widest text-[10px] font-bold mb-1">Weekly Guidance</h4>
                <h3 className="font-serif text-xl text-brand-navy mb-1 group-hover:text-brand-gold transition-colors">Mastering Social Events</h3>
                <p className="text-brand-navy/50 text-sm">Graziella's strategy for dining out this weekend.</p>
              </div>
           </div>

          {/* Progress Chart */}
          <div className="bg-white border border-brand-navy/5 p-6 md:p-8 relative overflow-hidden shadow-sm">
             {/* GDS Watermark */}
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                <span className="font-serif text-[10rem] md:text-[15rem] text-brand-navy leading-none tracking-tighter">GDS</span>
             </div>

             <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-serif text-xl text-brand-navy flex items-center gap-2">
                      <Activity className="w-5 h-5 text-brand-gold" />
                      Physiological Trend
                    </h3>
                    <span className="text-[10px] text-brand-navy/40 uppercase tracking-widest font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Live Data
                    </span>
                </div>
                <div className="h-[300px] w-full">
                  {loadingProgress ? (
                    <div className="flex items-center justify-center h-full text-brand-navy/40">
                      Loading data...
                    </div>
                  ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#0F172A', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#BFA15F' }}
                        cursor={{ stroke: '#BFA15F', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#0B1C33" 
                        strokeWidth={2} 
                        dot={{ fill: '#FFFFFF', stroke: '#0B1C33', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#BFA15F', stroke: 'none' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  )}
                </div>
             </div>
          </div>

          {/* Resource Vault */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-navy text-white p-6 cursor-pointer group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                 <Lock className="w-16 h-16" />
               </div>
               <h4 className="font-serif text-xl mb-2 flex items-center gap-2 relative z-10">
                 Graziella's Vault
               </h4>
               <p className="text-sm text-white/60 relative z-10">Exclusive recipes and protocols.</p>
               <div className="mt-4 w-8 h-px bg-brand-gold group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="bg-white border border-brand-navy/5 p-6 hover:border-brand-gold transition-colors cursor-pointer group">
               <h4 className="font-serif text-xl text-brand-navy mb-2 flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                 <Calendar className="w-5 h-5 text-brand-gold" />
                 Coffee with G
               </h4>
               <p className="text-sm text-brand-navy/50">Live in 2 days. Prepare questions.</p>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Spotlight Card */}
           <div className="bg-brand-blue/50 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 transform rotate-12">
                <Star className="w-32 h-32 text-brand-navy" />
              </div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4 relative z-10 border-b border-brand-navy/10 pb-4">Client Spotlight</h3>
              <p className="text-brand-navy/80 text-lg font-serif italic mb-6 relative z-10 leading-relaxed">
                "It’s not just about the body. It’s about the standard you hold for yourself."
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-brand-navy text-white rounded-full flex items-center justify-center font-serif font-bold text-lg">G</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-navy/60">From Graziella</div>
              </div>
           </div>

           {/* Next Milestone */}
           <div className="bg-white border border-brand-navy/5 p-6 relative shadow-sm">
              <h4 className="text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-4">Next Target</h4>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-5xl font-serif text-brand-navy">62.0</span>
                <span className="text-brand-navy/40 mb-2 text-sm font-medium">kg</span>
              </div>
              <div className="w-full bg-brand-navy/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-gold h-full w-[75%] rounded-full"></div>
              </div>
              <p className="text-xs text-brand-navy/50 mt-4 flex items-center gap-2">
                <ArrowUpRight className="w-3 h-3 text-brand-gold" />
                1.2 kg to go. Graziella is watching.
              </p>
           </div>
        </div>
      </div>

      {/* Check-In Modal */}
      {isCheckInOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-white p-8 relative shadow-2xl">
              <button 
                onClick={() => setIsCheckInOpen(false)} 
                className="absolute top-4 right-4 text-brand-navy/30 hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>

              {checkInStep === 'form' ? (
                <>
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl text-brand-navy mb-2">Weekly Report</h3>
                    <p className="text-xs text-brand-navy/50 uppercase tracking-widest font-bold">Strictly Private • For Graziella's Eyes Only</p>
                  </div>
                  <form onSubmit={submitCheckIn} className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-brand-navy font-bold mb-2">Current Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={checkInData.weight}
                        onChange={(e) => setCheckInData({...checkInData, weight: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 p-4 text-brand-navy focus:border-brand-gold focus:outline-none font-serif text-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-brand-navy font-bold mb-2">Energy Level (1-10)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={checkInData.energyLevel}
                        onChange={(e) => setCheckInData({...checkInData, energyLevel: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 p-4 text-brand-navy focus:border-brand-gold focus:outline-none font-serif text-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-brand-navy font-bold mb-2">Notes for Graziella</label>
                      <textarea
                        rows={4}
                        value={checkInData.notes}
                        onChange={(e) => setCheckInData({...checkInData, notes: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 p-4 text-brand-navy focus:border-brand-gold focus:outline-none placeholder:text-brand-navy/30 text-sm"
                        placeholder="Be honest. How was your adherence?"
                      />
                    </div>
                    <button type="submit" className="w-full bg-brand-navy text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-colors shadow-lg">
                      Submit to Graziella
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12 space-y-6 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mx-auto text-brand-navy">
                     <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-brand-navy">Received.</h3>
                  <div className="w-12 h-px bg-brand-gold mx-auto"></div>
                  <p className="text-brand-navy/70 leading-relaxed px-4 font-serif italic text-lg">
                    "I have your report. I'm reviewing it personally and will send your feedback within 24 hours."
                  </p>
                  <p className="text-xs text-brand-navy/40 uppercase tracking-widest font-bold">— Graziella</p>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;