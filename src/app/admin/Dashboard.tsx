import { Users, Calendar, Briefcase, Eye } from "lucide-react";

export function Dashboard() {
  const stats = [
    { title: "Toplam Üye", value: "256", change: "+12", icon: Users },
    { title: "Aktif Etkinlikler", value: "4", change: "0", icon: Calendar },
    { title: "Tamamlanan Projeler", value: "18", change: "+2", icon: Briefcase },
    { title: "Aylık Ziyaret", value: "4.2K", change: "+15%", icon: Eye },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-page border border-default p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-[var(--brand-primary)]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-muted'}`}>
                  {stat.change} bu ay
                </span>
              </div>
              <h3 className="text-muted text-sm font-medium mb-1">{stat.title}</h3>
              <div className="text-3xl font-black text-primary tracking-tight">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-default">
          <h2 className="text-lg font-bold">Son Aktiviteler</h2>
        </div>
        <div className="divide-y divide-default">
          {[
            { action: "Yeni Etkinlik Eklendi", target: "Yapay Zeka Zirvesi 2024", time: "2 saat önce" },
            { action: "Proje Güncellendi", target: "Kampüs Haritası", time: "5 saat önce" },
            { action: "Ekip Üyesi Değiştirildi", target: "Ali Yılmaz (Rol: Başkan)", time: "1 gün önce" },
          ].map((activity, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-surface transition-colors">
              <div>
                <p className="text-sm font-bold text-primary mb-1">{activity.action}</p>
                <p className="text-sm text-muted">{activity.target}</p>
              </div>
              <span className="text-xs font-medium text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
