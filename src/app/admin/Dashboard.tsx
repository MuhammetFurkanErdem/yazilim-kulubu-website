import { Users, Calendar, Briefcase, Inbox, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  const stats = [
    { title: "Toplam Üye", value: "256", change: "+12", icon: Users },
    { title: "Aktif Etkinlikler", value: "4", change: "0", icon: Calendar },
    { title: "Tamamlanan Projeler", value: "18", change: "+2", icon: Briefcase },
    { title: "Proje Başvurusu", value: "3", change: "Bekliyor", icon: Inbox, highlight: true },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-page border p-6 rounded-2xl shadow-sm ${stat.highlight ? 'border-amber-500/30' : 'border-default'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.highlight ? 'bg-amber-500/10 text-amber-500' : 'bg-surface text-[var(--brand-primary)]'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-bold ${
                  stat.highlight ? 'text-amber-500' :
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-muted'
                }`}>
                  {stat.change}{stat.highlight ? '' : ' bu ay'}
                </span>
              </div>
              <h3 className="text-muted text-sm font-medium mb-1">{stat.title}</h3>
              <div className="text-3xl font-black text-primary tracking-tight">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Submissions Card */}
        <Link
          to="/admin/basvurular"
          className="bg-page border border-amber-500/20 rounded-2xl shadow-sm p-6 hover:bg-surface transition-colors group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary">Bekleyen Başvurular</h3>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-[var(--brand-primary)] transition-colors" />
          </div>
          <p className="text-sm text-muted">3 proje başvurusu incelemenizi bekliyor.</p>
        </Link>

        {/* Recent Activity Summary */}
        <div className="bg-page border border-default rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-primary mb-3">Son Aktiviteler</h3>
          <div className="space-y-3">
            {[
              { text: "Proje Başvurusu — Kampüs Haritası", time: "2 saat önce" },
              { text: "Yeni Etkinlik — Yapay Zeka Zirvesi", time: "5 saat önce" },
              { text: "Ekip Güncelleme — Feyzullah As", time: "1 gün önce" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted font-medium truncate pr-4">{a.text}</span>
                <span className="text-xs text-muted flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
