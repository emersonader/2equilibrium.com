import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, CheckCircle, TrendingUp, Calendar, LogOut, User as UserIcon, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface Member {
  id: number;
  name: string;
  email: string;
  tier: string;
  created_at: string;
  total_checkins: number;
  last_checkin: string | null;
}

interface CheckIn {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  weight: number;
  energy_level: number;
  notes: string;
  created_at: string;
}

interface Stats {
  totalMembers: number;
  totalCheckins: number;
  recentCheckins: number;
  membersByTier: { tier: string; count: number }[];
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'overview' | 'members' | 'checkins'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user?.isAdmin) return;

    try {
      setLoading(true);

      // Get all members with check-in counts
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          name,
          tier,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get check-in counts for each member
      const { data: checkInCounts, error: countsError } = await supabase
        .from('check_ins')
        .select('user_id')
        .order('created_at', { ascending: false });

      if (countsError) throw countsError;

      // Get last check-in dates
      const { data: lastCheckIns, error: lastError } = await supabase
        .rpc('get_last_checkins');

      // Calculate members with check-in data
      const membersWithData: Member[] = (profilesData || []).map((profile) => {
        const userCheckIns = checkInCounts?.filter(c => c.user_id === profile.id) || [];
        return {
          id: profile.id as any,
          name: profile.name || profile.email,
          email: profile.email,
          tier: profile.tier,
          created_at: profile.created_at,
          total_checkins: userCheckIns.length,
          last_checkin: null
        };
      });

      setMembers(membersWithData);

      // Get recent check-ins with user info
      const { data: checkinsData, error: checkinsError } = await supabase
        .from('check_ins')
        .select(`
          id,
          user_id,
          weight,
          energy_level,
          notes,
          created_at,
          profiles!inner(name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (checkinsError) throw checkinsError;

      const formattedCheckIns: CheckIn[] = (checkinsData || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        user_name: item.profiles?.name || item.profiles?.email || 'Unknown',
        user_email: item.profiles?.email || '',
        weight: item.weight,
        energy_level: item.energy_level,
        notes: item.notes,
        created_at: item.created_at
      }));

      setCheckins(formattedCheckIns);

      // Calculate stats
      const totalMembers = membersWithData.length;
      const totalCheckins = checkInCounts?.length || 0;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentCheckins = checkInCounts?.filter(c =>
        new Date((checkinsData?.find(ci => ci.id === c.user_id) as any)?.created_at || 0) > oneWeekAgo
      ).length || 0;

      // Group members by tier
      const tierCounts = membersWithData.reduce((acc: any, member) => {
        acc[member.tier] = (acc[member.tier] || 0) + 1;
        return acc;
      }, {});

      const membersByTier = Object.entries(tierCounts).map(([tier, count]) => ({
        tier,
        count: count as number
      }));

      setStats({
        totalMembers,
        totalCheckins,
        recentCheckins,
        membersByTier
      });

    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-brand-navy text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy">
      {/* Header */}
      <div className="bg-brand-navy text-white p-6 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl mb-1">Admin Dashboard</h1>
            <p className="text-brand-gold text-sm uppercase tracking-widest font-bold">
              Welcome, {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              My Dashboard
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-brand-navy/10">
          <button
            onClick={() => setView('overview')}
            className={`px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors border-b-2 ${
              view === 'overview'
                ? 'border-brand-gold text-brand-navy'
                : 'border-transparent text-brand-navy/50 hover:text-brand-navy'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setView('members')}
            className={`px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors border-b-2 ${
              view === 'members'
                ? 'border-brand-gold text-brand-navy'
                : 'border-transparent text-brand-navy/50 hover:text-brand-navy'
            }`}
          >
            Members ({members.length})
          </button>
          <button
            onClick={() => setView('checkins')}
            className={`px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors border-b-2 ${
              view === 'checkins'
                ? 'border-brand-gold text-brand-navy'
                : 'border-transparent text-brand-navy/50 hover:text-brand-navy'
            }`}
          >
            Recent Check-Ins
          </button>
        </div>

        {/* Overview */}
        {view === 'overview' && stats && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-brand-navy/5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-navy/50 font-bold">
                      Total Members
                    </p>
                    <p className="font-serif text-4xl text-brand-navy">{stats.totalMembers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-brand-navy/5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-navy/50 font-bold">
                      Total Check-Ins
                    </p>
                    <p className="font-serif text-4xl text-brand-navy">{stats.totalCheckins}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-brand-navy/5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-navy/50 font-bold">
                      This Week
                    </p>
                    <p className="font-serif text-4xl text-brand-navy">{stats.recentCheckins}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Members by Tier */}
            <div className="bg-white p-6 border border-brand-navy/5 shadow-sm">
              <h3 className="font-serif text-2xl mb-6 text-brand-navy">Members by Tier</h3>
              <div className="space-y-4">
                {stats.membersByTier.map((tierData) => (
                  <div key={tierData.tier} className="flex items-center justify-between">
                    <span className="text-brand-navy font-medium capitalize">{tierData.tier}</span>
                    <span className="text-brand-gold font-bold">{tierData.count} members</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Check-Ins Preview */}
            <div className="bg-white p-6 border border-brand-navy/5 shadow-sm">
              <h3 className="font-serif text-2xl mb-6 text-brand-navy">Latest Check-Ins</h3>
              <div className="space-y-4">
                {checkins.slice(0, 5).map((checkin) => (
                  <div key={checkin.id} className="flex items-start gap-4 pb-4 border-b border-brand-navy/5 last:border-0">
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shrink-0">
                      <UserIcon className="w-5 h-5 text-brand-navy" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-navy">{checkin.user_name}</p>
                      <p className="text-sm text-brand-navy/60">
                        Weight: {checkin.weight}kg | Energy: {checkin.energy_level}/10
                      </p>
                      <p className="text-xs text-brand-navy/40 mt-1">
                        {formatDate(checkin.created_at)} at {formatTime(checkin.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Members List */}
        {view === 'members' && (
          <div className="bg-white border border-brand-navy/5 shadow-sm">
            <table className="w-full">
              <thead className="bg-brand-cream border-b border-brand-navy/10">
                <tr>
                  <th className="text-left p-4 text-xs uppercase tracking-widest font-bold text-brand-navy">
                    Member
                  </th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest font-bold text-brand-navy">
                    Email
                  </th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest font-bold text-brand-navy">
                    Tier
                  </th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest font-bold text-brand-navy">
                    Check-Ins
                  </th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest font-bold text-brand-navy">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-brand-navy/5 hover:bg-brand-cream/50 transition-colors">
                    <td className="p-4 font-medium text-brand-navy">{member.name}</td>
                    <td className="p-4 text-brand-navy/70 text-sm">{member.email}</td>
                    <td className="p-4">
                      <span className="bg-brand-gold/20 text-brand-navy px-3 py-1 text-xs uppercase font-bold">
                        {member.tier}
                      </span>
                    </td>
                    <td className="p-4 text-brand-navy/70">{member.total_checkins}</td>
                    <td className="p-4 text-brand-navy/70 text-sm">{formatDate(member.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Check-Ins List */}
        {view === 'checkins' && (
          <div className="space-y-4">
            {checkins.map((checkin) => (
              <div key={checkin.id} className="bg-white p-6 border border-brand-navy/5 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xl text-brand-navy mb-1">{checkin.user_name}</h4>
                    <p className="text-sm text-brand-navy/50">{checkin.user_email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-brand-navy/70">{formatDate(checkin.created_at)}</p>
                    <p className="text-xs text-brand-navy/40">{formatTime(checkin.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-1">
                      Weight
                    </p>
                    <p className="font-serif text-2xl text-brand-navy">{checkin.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-1">
                      Energy Level
                    </p>
                    <p className="font-serif text-2xl text-brand-navy">{checkin.energy_level}/10</p>
                  </div>
                </div>

                {checkin.notes && (
                  <div className="bg-brand-cream p-4 border-l-4 border-brand-gold">
                    <p className="text-xs uppercase tracking-widest text-brand-navy/50 font-bold mb-2">
                      Notes
                    </p>
                    <p className="text-brand-navy/80 italic">{checkin.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
