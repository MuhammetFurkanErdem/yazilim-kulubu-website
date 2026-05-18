import { Users, Calendar, Briefcase, Inbox, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { supabase } from "@/api/config";

const initialTrafficData = [
  { name: '26 Nis', views: 420, unique: 240 },
  { name: '27 Nis', views: 310, unique: 139 },
  { name: '28 Nis', views: 820, unique: 480 },
  { name: '29 Nis', views: 478, unique: 390 },
  { name: '30 Nis', views: 589, unique: 410 },
  { name: '01 May', views: 639, unique: 380 },
  { name: '02 May', views: 849, unique: 530 },
];

export function Dashboard() {
  const [trafficData, setTrafficData] = useState(initialTrafficData);
  const [todayViews, setTodayViews] = useState(849);
  const [topPages, setTopPages] = useState<{ path: string, count: number }[]>([
    { path: "/", count: 320 },
    { path: "/etkinlikler", count: 215 },
    { path: "/projeler", count: 142 },
    { path: "/iletisim", count: 85 },
  ]);

  // Real DB Stats
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeEvents, setActiveEvents] = useState(0);
  const [pendingApps, setPendingApps] = useState(0);
  const [recentActivities, setRecentActivities] = useState<{text: string, time: string}[]>([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Toplam üye (profiles sayısı)
      const { count: membersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      if (membersCount !== null) setTotalMembers(membersCount);

      // Aktif etkinlikler
      const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true }).gte('date', new Date().toISOString());
      if (eventsCount !== null) setActiveEvents(eventsCount);

      // Bekleyen başvurular
      const { count: appsCount } = await supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      if (appsCount !== null) setPendingApps(appsCount);

      // Son aktiviteler (En son eklenen 3 başvuru)
      const { data: recentApps } = await supabase.from('applications').select('full_name, type, created_at').order('created_at', { ascending: false }).limit(3);
      if (recentApps) {
        setRecentActivities(recentApps.map(app => {
          let actionText = "Yeni Başvuru";
          if (app.type === 'join') actionText = "Yeni Üyelik Başvurusu";
          if (app.type === 'project') actionText = "Yeni Proje Fikri";
          if (app.type === 'contact') actionText = "İletişim Mesajı";
          
          return {
            text: `${actionText} — ${app.full_name}`,
            time: new Date(app.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
          };
        }));
      }

    } catch (error) {
      console.error("Dashboard verileri çekilemedi:", error);
    }
  };

  useEffect(() => {
    const updateTrafficData = () => {
      try {
        const rawHistory = localStorage.getItem('ygk_traffic_history');
        if (rawHistory) {
          const history = JSON.parse(rawHistory);
          const todayStr = new Date().toISOString().split('T')[0];

          if (history[todayStr]) {
            const realTodayViews = history[todayStr].views || 0;
            const realTodayUnique = history[todayStr].unique || 0;

            setTodayViews(849 + realTodayViews);

            setTrafficData(prev => {
              const newData = [...prev];
              newData[newData.length - 1] = {
                ...newData[newData.length - 1],
                name: 'Bugün (Canlı)',
                views: 849 + realTodayViews,
                unique: 530 + realTodayUnique,
              };
              return newData;
            });

            if (history[todayStr].paths) {
              const pathsObj = history[todayStr].paths;
              const sortedPaths = Object.entries(pathsObj)
                .map(([path, count]) => ({ path, count: count as number }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

              if (sortedPaths.length > 0) {
                setTopPages(sortedPaths);
              }
            }
          }
        }
      } catch (e) {
        console.error("Traffic verisi okunamadı:", e);
      }
    };

    updateTrafficData();
    const interval = setInterval(updateTrafficData, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: "Toplam Üye", value: totalMembers.toString(), change: "+", icon: Users },
    { title: "Günlük Ziyaretçi", value: todayViews.toString(), change: "Canlı", icon: TrendingUp },
    { title: "Yaklaşan Etkinlik", value: activeEvents.toString(), change: "0", icon: Calendar },
    { title: "Başvuru", value: pendingApps.toString(), change: "Bekliyor", icon: Inbox, highlight: pendingApps > 0 },
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-page border border-default p-6 rounded-md shadow-sm relative overflow-hidden group`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 flex items-center justify-center ${stat.highlight ? 'text-amber-500' : 'text-[var(--brand-primary)]'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs ${stat.highlight ? 'text-amber-500' : stat.change.startsWith('+') ? 'text-green-500' : 'text-muted'}`}>
                  {stat.change}{stat.highlight ? '' : ' bu ay'}
                </span>
              </div>
              <h3 className="text-muted text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-[var(--brand-primary)] opacity-50">&gt;</span> {stat.title}
              </h3>
              <div className="text-3xl text-primary tracking-tight flex items-baseline gap-1">
                {stat.value} <span className="w-3 h-5 bg-[var(--brand-primary)] animate-pulse inline-block opacity-50"></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Chart */}
      <div className="bg-page border border-default rounded-md shadow-sm p-6 relative overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="absolute top-0 left-0 w-full h-6 bg-surface border-b border-default flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-muted ml-4 font-mono">root@ygk-server:~# htop</span>
        </div>

        <div className="flex items-center justify-between mb-8 mt-4">
          <div>
            <h3 className="text-primary text-lg mb-1 flex items-center gap-2">
              <span className="text-[var(--brand-primary)]">&gt;_</span> Sitenin Günlük Trafiği
            </h3>
            <p className="text-xs text-muted">Son 7 gün içindeki sayfa görüntülenmeleri ve tekil ziyaretçiler (Simülasyon + Canlı Veri)</p>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted opacity-20" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'currentColor' }} className="text-muted" dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'currentColor' }} className="text-muted" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: '4px', color: 'var(--brand-primary)', fontFamily: 'monospace', fontSize: '12px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="views" name="Görüntülenme" stroke="var(--brand-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Links & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Submissions Card */}
        <Link
          to="/admin/basvurular"
          className="bg-page border border-amber-500/30 rounded-md shadow-sm p-6 hover:bg-surface transition-colors group flex flex-col relative"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-amber-500">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-amber-500 text-lg flex items-center gap-2">
                <span className="opacity-50">&gt;</span> Bekleyen Başvurular
              </h3>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-amber-500 transition-colors" />
          </div>
          <p className="text-xs text-muted mt-auto">{pendingApps} yeni başvuru ./incelenmeyi_bekliyor.sh</p>
        </Link>

        {/* Top Pages Summary */}
        <div className="bg-page border border-default rounded-md shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--brand-primary)] opacity-20"></div>
          <h3 className="text-primary mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2"><span className="text-[var(--brand-primary)]">&gt;</span> Popüler Sayfalar</span>
            <span className="text-[10px] uppercase tracking-wider bg-surface px-2 py-1 rounded text-[var(--brand-primary)] border border-default">Bugün</span>
          </h3>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div key={i} className="flex items-center justify-between text-xs border-b border-default last:border-0 pb-2 last:pb-0">
                <span className="text-muted font-medium truncate pr-4 flex items-center gap-2">
                  <span className="text-muted opacity-70">[{i+1}]</span> {page.path === '/' ? 'index.html' : page.path}
                </span>
                <span className="text-[var(--brand-primary)] font-bold">
                  {page.count} <span className="text-muted font-normal">reqs</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-page border border-default rounded-md shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 opacity-20"></div>
          <h3 className="text-primary mb-4 flex items-center gap-2">
            <span className="text-cyan-500">&gt;</span> tail -f /var/log/activity
          </h3>
          <div className="space-y-3 font-mono text-[11px]">
            {recentActivities.length > 0 ? recentActivities.map((a, i) => (
              <div key={i} className="flex items-center justify-between border-b border-default last:border-0 pb-2 last:pb-0">
                <span className="text-cyan-600 dark:text-cyan-400 truncate pr-4">{a.text}</span>
                <span className="text-muted flex-shrink-0">{a.time}</span>
              </div>
            )) : (
              <div className="text-muted text-center pt-4 opacity-50">Log kaydı bulunamadı.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
