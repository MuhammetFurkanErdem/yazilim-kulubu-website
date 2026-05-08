import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Gelecekte gerçek veritabanına (Supabase vb.) göndermek üzere kullanılacak fonksiyon
const recordPageView = (path: string, sessionId: string) => {
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const historyKey = 'ygk_traffic_history';
  
  try {
    const rawHistory = localStorage.getItem(historyKey);
    const history = rawHistory ? JSON.parse(rawHistory) : {};
    
    if (!history[today]) {
      history[today] = { views: 0, unique: 0, visitors: [], paths: {} };
    }
    
    // Geriye dönük uyumluluk için paths yoksa ekle
    if (!history[today].paths) {
      history[today].paths = {};
    }
    
    // Sayfa görüntülenme sayısını artır
    history[today].views += 1;
    
    // Hangi sayfanın tıklandığını kaydet
    if (!history[today].paths[path]) {
      history[today].paths[path] = 0;
    }
    history[today].paths[path] += 1;
    
    // Eğer bu ziyaretçi (session) bugün ilk kez sayfaya giriyorsa tekil (unique) sayısını artır
    if (!history[today].visitors.includes(sessionId)) {
      history[today].visitors.push(sessionId);
      history[today].unique += 1;
    }
    
    localStorage.setItem(historyKey, JSON.stringify(history));
    console.log(`[Analytics] Yeni trafik kaydedildi: ${path} (Tarih: ${today})`);
  } catch (e) {
    console.error("Trafik kaydedilemedi:", e);
  }
};

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Benzersiz bir ziyaretçi kimliği (Session ID) oluştur veya mevcut olanı getir
    let sessionId = sessionStorage.getItem('ygk_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('ygk_session_id', sessionId);
    }

    // Kullanıcının her sayfa (route) değiştirişini backend'e bildirir gibi kaydet
    recordPageView(location.pathname, sessionId);
  }, [location.pathname]);

  // Bu bileşen arayüzde (UI) görünmez, sadece arkaplanda sessizce çalışır
  return null;
}
