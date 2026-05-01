import { Search, Inbox, Clock, User, Code2, ExternalLink, Github, CheckCircle, XCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useState } from "react";

interface Submission {
  id: number;
  projectName: string;
  submitter: string;
  email: string;
  date: string;
  tech: string[];
  desc: string;
  githubUrl: string;
  demoUrl: string;
  status: "pending" | "approved" | "rejected";
}

export function Submissions() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: number; action: "approved" | "rejected" } | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      projectName: "Kampüs Yemek Menüsü Uygulaması",
      submitter: "Ali Demir",
      email: "ali.demir@comu.edu.tr",
      date: "2 saat önce",
      tech: ["React Native", "Firebase"],
      desc: "Kampüsteki yemekhanelerin günlük menülerini gösteren mobil uygulama. Push notification desteği ile yemek saatleri hatırlatılacak. Ayrıca öğrencilerin yemekleri puanlaması planlanıyor.",
      githubUrl: "https://github.com/alidemir/kampus-yemek",
      demoUrl: "",
      status: "pending",
    },
    {
      id: 2,
      projectName: "Ders Notları Paylaşım Platformu",
      submitter: "Zeynep Kaya",
      email: "zeynep.kaya@comu.edu.tr",
      date: "1 gün önce",
      tech: ["Next.js", "Supabase", "Tailwind CSS"],
      desc: "Öğrencilerin ders notlarını yükleyip paylaşabileceği, diğer öğrencilerin de bu notları değerlendirebileceği bir web platformu. Bölüm ve ders bazlı filtreleme özelliği olacak.",
      githubUrl: "https://github.com/zeynepkaya/ders-notlari",
      demoUrl: "https://ders-notlari.vercel.app",
      status: "pending",
    },
    {
      id: 3,
      projectName: "Blockchain Oylama Sistemi",
      submitter: "Mert Çelik",
      email: "mert.celik@comu.edu.tr",
      date: "3 gün önce",
      tech: ["Solidity", "React", "Hardhat", "Ethers.js"],
      desc: "Kulüp içi oylamaların şeffaf ve güvenilir şekilde yapılabilmesi için blockchain tabanlı bir oylama dApp'i. Ethereum test ağında çalışıyor.",
      githubUrl: "https://github.com/mertcelik/blockchain-vote",
      demoUrl: "",
      status: "pending",
    },
  ]);

  const handleConfirmAction = () => {
    if (!confirmAction) return;
    setSubmissions(prev =>
      prev.map(s => s.id === confirmAction.id ? { ...s, status: confirmAction.action } : s)
    );
    // Close both modals
    setConfirmAction(null);
    setSelectedSubmission(null);
  };

  const filteredSubmissions = filterStatus === "all"
    ? submissions
    : submissions.filter(s => s.status === filterStatus);

  const pendingCount = submissions.filter(s => s.status === "pending").length;

  const statusLabel = (status: string) => {
    switch (status) {
      case "pending": return { text: "Beklemede", cls: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
      case "approved": return { text: "Onaylandı", cls: "bg-green-500/10 text-green-500 border-green-500/20" };
      case "rejected": return { text: "Reddedildi", cls: "bg-red-500/10 text-red-500 border-red-500/20" };
      default: return { text: status, cls: "bg-gray-500/10 text-gray-500 border-gray-500/20" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Proje Başvuruları</h1>
          <p className="text-sm text-muted mt-1">Üyelerin gönderdiği proje tekliflerini buradan yönetin.</p>
        </div>
        {pendingCount > 0 && (
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-sm font-bold">
            {pendingCount} bekliyor
          </span>
        )}
      </div>

      {/* Filters & Search */}
      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-default flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Başvuru ara..."
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "pending", "approved", "rejected"] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterStatus === status
                    ? "bg-[var(--brand-primary)] text-[var(--brand-text)]"
                    : "bg-surface border border-default text-muted hover:text-primary"
                }`}
              >
                {status === "all" ? "Tümü" : statusLabel(status).text}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions List */}
        <div className="divide-y divide-default">
          {filteredSubmissions.map((sub) => {
            const badge = statusLabel(sub.status);
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className="w-full p-6 text-left hover:bg-surface/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <p className="text-sm font-bold text-primary truncate group-hover:text-[var(--brand-primary)] transition-colors">
                        {sub.projectName}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${badge.cls}`}>
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-xs text-muted mb-2 line-clamp-1">{sub.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{sub.submitter}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{sub.date}</span>
                      <span>·</span>
                      <span className="font-mono">{sub.tech.slice(0, 3).join(", ")}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredSubmissions.length === 0 && (
            <div className="p-16 text-center text-muted">
              <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Bu filtreye uygun başvuru bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* Submission Detail Modal */}
      <Modal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        title="Başvuru Detayı"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            {/* Project Name & Status */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-primary">{selectedSubmission.projectName}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusLabel(selectedSubmission.status).cls}`}>
                  {statusLabel(selectedSubmission.status).text}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{selectedSubmission.submitter}</span>
                <span>·</span>
                <span>{selectedSubmission.email}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{selectedSubmission.date}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">Proje Açıklaması</label>
              <p className="text-sm text-primary leading-relaxed bg-surface border border-default rounded-xl p-4">
                {selectedSubmission.desc}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">Teknolojiler</label>
              <div className="flex flex-wrap gap-2">
                {selectedSubmission.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-surface border border-default rounded-full text-xs font-mono font-medium text-primary">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">GitHub</label>
                {selectedSubmission.githubUrl ? (
                  <a href={selectedSubmission.githubUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--brand-primary)] hover:underline font-medium">
                    <Github className="w-4 h-4" /> Repo'yu Aç
                  </a>
                ) : (
                  <span className="text-sm text-muted">Belirtilmedi</span>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">Demo</label>
                {selectedSubmission.demoUrl ? (
                  <a href={selectedSubmission.demoUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--brand-primary)] hover:underline font-medium">
                    <ExternalLink className="w-4 h-4" /> Demo'yu Aç
                  </a>
                ) : (
                  <span className="text-sm text-muted">Belirtilmedi</span>
                )}
              </div>
            </div>

            {/* Actions */}
            {selectedSubmission.status === "pending" && (
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setConfirmAction({ id: selectedSubmission.id, action: "rejected" })}
                  className="text-red-500 hover:bg-red-500/10"
                >
                  <XCircle className="w-4 h-4 mr-2" /> Reddet
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => setConfirmAction({ id: selectedSubmission.id, action: "approved" })}
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Onayla
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirmation Dialog */}
      <Modal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        title={confirmAction?.action === "approved" ? "Başvuruyu Onayla" : "Başvuruyu Reddet"}
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              confirmAction?.action === "approved"
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}>
              {confirmAction?.action === "approved"
                ? <CheckCircle className="w-6 h-6" />
                : <AlertTriangle className="w-6 h-6" />
              }
            </div>
            <div>
              <p className="text-sm text-primary font-bold mb-1">
                {confirmAction?.action === "approved"
                  ? "Bu projeyi onaylamak istediğinize emin misiniz?"
                  : "Bu projeyi reddetmek istediğinize emin misiniz?"
                }
              </p>
              <p className="text-xs text-muted">
                {confirmAction?.action === "approved"
                  ? "Proje onaylandıktan sonra üye projeleri bölümünde yayınlanacaktır."
                  : "Reddedilen projeler listede kalır ancak sitede gösterilmez."
                }
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setConfirmAction(null)}>
              Vazgeç
            </Button>
            <Button
              variant={confirmAction?.action === "approved" ? "primary" : "primary"}
              type="button"
              onClick={handleConfirmAction}
              className={confirmAction?.action === "rejected" ? "!bg-red-500 hover:!bg-red-600 !border-red-500" : ""}
            >
              {confirmAction?.action === "approved" ? "Evet, Onayla" : "Evet, Reddet"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
