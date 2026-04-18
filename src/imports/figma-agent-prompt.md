# Yazılım Geliştirme Kulübü — Figma AI Tasarım Agent Promptu
> Bu promptu Figma AI'a ver. Her sayfa için ayrı ayrı kullanabilirsin.

---

## GENEL BAĞLAM

Sen bir üniversite yazılım geliştirme kulübünün (ÇOMÜ — Çanakkale Onsekiz Mart Üniversitesi) web sitesini Figma'da tasarlıyorsun. Site daha önce HTML prototype olarak geliştirildi, şimdi bu prototipler baz alınarak Figma'da production-ready tasarım çıkarılacak.

**Kulüp adı:** Yazılım Geliştirme Kulübü (kısa: YGK)
**Üniversite:** Çanakkale Onsekiz Mart Üniversitesi (ÇOMÜ)
**Hedef kitle:** Üniversite öğrencileri (18–25 yaş), potansiyel üyeler, ziyaretçiler
**Kulüp yapısı:** 4 kol — Web Geliştirme, Mobil Geliştirme, Oyun Geliştirme, Blockchain
**Üye sayısı:** 120+, 40+ tamamlanmış proje, 3 yıllık aktif kulüp

---

## TASARIM SİSTEMİ — KESİNLEŞMİŞ KARARLAR

### Renk Paleti (Dark Mode — Tek Mode)

**Primitives:**
| Token | Hex |
|---|---|
| purple/50 | #EEEDFE |
| purple/100 | #CECBF6 |
| purple/200 | #AFA9EC |
| purple/400 | #7F77DD |
| purple/600 | #534AB7 |
| purple/800 | #3C3489 |
| purple/900 | #26215C |
| gray/50 | #F9FAFB |
| gray/100 | #F3F4F6 |
| gray/200 | #E5E7EB |
| gray/400 | #9CA3AF |
| gray/500 | #6B7280 |
| gray/700 | #374151 |
| gray/900 | #111827 |
| gray/950 | #0D0D14 |

**Semantic (kullanım rolleri):**
| Token | Hex | Kullanım |
|---|---|---|
| color/brand/primary | #534AB7 | CTA buton, aktif link, vurgu |
| color/brand/hover | #7F77DD | Hover state, accent text |
| color/brand/subtle | #26215C | Badge bg, chip bg |
| color/brand/text | #CECBF6 | Badge text, link text on dark |
| color/text/primary | #FFFFFF | H1, H2, body text |
| color/text/muted | #6B7280 | Subheading, meta, açıklama |
| color/text/subtle | #9CA3AF | Placeholder, hint, ikincil |
| color/bg/page | #0D0D14 | Tüm sayfa arka planı |
| color/bg/surface | #374151 | Card, panel |
| color/bg/elevated | #111827 | Modal, navbar, yüksek yüzey |
| color/border/default | #374151 | Card border, divider |
| color/border/strong | #6B7280 | Input focus, hover |

**Kol renkleri (her kolun kendi accent rengi var):**
| Kol | Primary | Glow |
|---|---|---|
| Web Geliştirme | #534AB7 (mor) | rgba(83,74,183,0.2) |
| Mobil Geliştirme | #1D9E75 (yeşil) | rgba(29,158,117,0.2) |
| Oyun Geliştirme | #D85A30 (turuncu) | rgba(216,90,48,0.2) |
| Blockchain | #BA7517 (altın) | rgba(186,117,23,0.2) |
| Üye Projesi | #D4537E (pembe) | rgba(212,83,126,0.2) |

### Tipografi
**Font:** Space Grotesk (primary), JetBrains Mono (kod, label, monospace)

| Rol | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| hero/h1 | Space Grotesk | 64–72px | 700 | 108% | -3% |
| page/h1 | Space Grotesk | 56–68px | 700 | 108% | -3% |
| section/h2 | Space Grotesk | 42px | 700 | 115% | -2% |
| card/h3 | Space Grotesk | 17–20px | 600–700 | 130% | -1% |
| body/lg | Space Grotesk | 18px | 400 | 165% | 0 |
| body/md | Space Grotesk | 15–16px | 400 | 160% | 0 |
| body/sm | Space Grotesk | 13–14px | 400 | 155% | 0 |
| label | JetBrains Mono | 11–12px | 400–500 | — | +5–8% |
| button | Space Grotesk | 14–15px | 700 | — | 0 |
| code | JetBrains Mono | 12–13px | 400–500 | 185% | 0 |

### Layout
- **Canvas genişliği:** 1440px (desktop)
- **İçerik genişliği:** 1280px (padding: 80px her yanda)
- **Grid:** 12 kolon, gutter: 24px, margin: 80px
- **Navbar yüksekliği:** 64px
- **Section padding:** 100px dikey

### Efektler & Stil Karakteri
- **Glow efektleri:** Elementlerin arkasında radial gradient blur (filter: blur 60–80px)
- **Grid background:** 60×60px noktalı/çizgili ızgara, %6 opaklık, mor renk
- **Noise texture:** Çok hafif grain overlay (%4 opaklık)
- **Card style:** Koyu arka plan (#111827), 1px border (#374151), 16–20px radius
- **Gradient accent lines:** Kartların üst kenarında soldan sağa kaybolan ince mor çizgi
- **Hover:** translateY(-4px) + border-color değişimi + subtle box-shadow glow
- **Kod mockupları:** Gerçek syntax highlight renkleriyle editör görünümlü paneller (purple=keyword, green=function, yellow=string, orange=number, gray=comment)

---

## NAVBAR — TÜM SAYFALARDA AYNI

**Boyut:** 1440×64px
**Arka plan:** #111827, %85 opacity + backdrop blur 16px
**Border bottom:** 1px solid rgba(55,65,81,0.5)
**Fixed position:** Her sayfada sayfanın üstüne yapışık

**İçerik (soldan sağa):**
1. **Logo grubu** (sol, margin-left: 48px)
   - Logo kutusu: 32×32px, #534AB7, 8px radius, "YG" metni JetBrains Mono 13px beyaz
   - Kulüp adı: "Yazılım Geliştirme Kulübü", Space Grotesk 14px 600 weight, beyaz
2. **Nav linkleri** (orta, flex row, gap: 32px)
   - Anasayfa · Hakkımızda · Ekibimiz · Etkinlikler · Projeler · İletişim
   - Style: 14px Regular, #6B7280, hover: #FFFFFF
   - Aktif sayfa: #7F77DD rengi
3. **Sağ grup** (sağ, margin-right: 48px)
   - Dikey divider: 1px solid #374151, yükseklik: 20px
   - "Üye Ol" butonu: #534AB7 bg, beyaz text, 14px Bold, 10×20px padding, 8px radius

---

## SAYFA 1: ANASAYFA (index)

### Hero Section
**Frame:** 1440×900px
**Arka plan:** #0D0D14 + 60×60 grid overlay (mor, %6)
**Glow orb 1:** 500×500px radial blur, rgba(83,74,183,0.14), sağ üst köşe
**Glow orb 2:** 280×280px radial blur, rgba(127,119,221,0.08), sol alt

**İçerik (yatayda ortalanmış, max-width: 800px):**

1. **Eyebrow badge** (üstte)
   - Pill shape: #26215C bg, 0.5px #534AB7 border, 999px radius
   - İçerik: 6×6 #7F77DD nokta + "Yazılım Geliştirme Kulübü · ÇOMÜ" metni
   - Font: 12px Medium, #CECBF6

2. **H1 başlık**
   - "Kod yaz," → beyaz
   - Animasyonlu kelime satırı → #7F77DD (typewriter efekti: "işbirliği yap, / öğren, / inşa et,")
   - "değişim yarat." → beyaz
   - Font: 72px 700, -3% letter spacing, 108% line height

3. **Alt başlık**
   - "Workshop'lar, hackathon'lar ve gerçek projelerle üniversite hayatını deneyime dönüştürüyoruz."
   - Font: 18px Regular, #6B7280, max-width: 560px

4. **CTA Grubu** (yatay, gap: 12px)
   - Primary: "Kulübe Katıl →" — #534AB7 bg, beyaz, 15px Bold, 24×14px padding, 8px radius
   - Secondary: "Projelerimizi Gör" — transparent bg, 1px #534AB7 border, #7F77DD text

5. **Social proof** (yatay, gap: 12px)
   - 4 üst üste binen avatar (28×28, overlap: -8px)
   - "120+ aktif üye · 40+ tamamlanan proje" — 13px #6B7280

6. **Stats bar** (hero alt kısmına yapışık)
   - 4 metrik: 120+ Aktif Üye / 40+ Tamamlanan Proje / 3 Yıllık Deneyim / 10+ Etkinlik/Yıl
   - Yatay bölme çizgileriyle ayrılmış
   - Sayılar: JetBrains Mono, gradient (beyaz→#7F77DD)
   - Border top/bottom: 1px rgba(55,65,81,0.5)

### Geri Sayım Bölümü (Şartlı — Admin girinceye kadar görünmez)
- Mor gradient kart (border: rgba(83,74,183,0.3))
- Sol: Etkinlik adı + meta bilgi
- Orta: DD:HH:MM:SS sayaç (JetBrains Mono, koyu kart arka planlı)
- Sağ: "Kayıt Ol" ve "Tüm Etkinlikler" butonları
- Üst kenar: soldan sağa kaybolan mor ışık çizgisi

### Neden Katılmalısın Section
**Başlık:** "Sadece kod değil, deneyim kazanıyorsun."
**Alt başlık:** "Gerçek projeler, gerçek insanlar, gerçek fırsatlar."
**Grid:** 3×2 kart (6 kart toplam)

Her kart:
- #111827 bg, 1px #374151 border, 16px radius
- 48×48 ikon kutusu: #26215C bg, mor border, 12px radius, emoji ikon
- H3 başlık: 18px 600
- Açıklama: 14px #6B7280
- Hover: translateY(-4px) + mor glow border

Kartlar: 🚀 Gerçek Projeler / 🧠 Workshop & Eğitim / ⚡ Hackathon Kültürü / 🌐 Ağ & Bağlantı / 🤝 Mentor Desteği / 🏆 Tanınırlık

### Öne Çıkan Projeler Section
**3 kart grid:**
Her proje kartı:
- Üst: 160px kod snippet görsel alanı (koyu gradient bg + syntax highlight kod)
- Alt: Tag'ler + proje adı + açıklama + ekip avatarları + "İncele →" link

### Yaklaşan Etkinlikler Section
**Liste formatı (3 etkinlik):**
Her etkinlik satırı:
- Sol: tarih kutusu (mor bg, gün/ay)
- Orta: badge + başlık + meta (saat, yer)
- Sağ: "Kayıt Ol" / "Detay" butonu

### Ekip Section
**4 kart grid:**
Her kart:
- Gradient halka + monogram avatar (72×72)
- İsim, rol badge, bölüm
- GitHub + LinkedIn ikon linkleri

### CTA Strip
- Mor gradient overlay arka plan
- Büyük başlık: "Bir sonraki büyük şey seninle başlıyor."
- 2 buton: "Üyelik Başvurusu →" + "Discord'a Katıl"

---

## SAYFA 2: HAKKIMIZDA

### Hero
- Başlık: "Kod yazan bir **topluluk** inşa ediyoruz."
- Alt: "ÇOMÜ bünyesinde, öğrencilerin teknolojiyi sadece öğrenmekle kalmayıp gerçek ürünler ürettiği bir ortam yaratıyoruz."

### Biz Kimiz (Split Layout)
**Sol (metin, 7 kolon):**
- Section eyebrow: "Biz Kimiz?"
- H2: "Üniversite kulübü değil, mini bir teknoloji şirketi."
- 3 paragraf açıklama (16px #6B7280)
- CTA grubu: "Üye Ol" + "Kollarımızı Keşfet"

**Sağ (görsel, 5 kolon):**
- Kod editörü mockup kartı
- Koyu arka plan (#08080f)
- Editör bar: 3 renkli nokta (kırmızı/sarı/yeşil) + "kulüp.ts" dosya adı
- Syntax highlighted TypeScript kodu:
```
const kulüp = {
  isim: "YGK · ÇOMÜ",
  kuruluş: 2022,
  üyeler: 120,
  projeler: 40,
  kollar: ["Web", "Mobil", "Oyun", "Blockchain"],
  misyon: () => {
    // Gerçek projeler, gerçek deneyim
    return "değer üret";
  }
};
kulüp.üyeOl(sen);
```
- Renk kodlaması: keyword(mor) / string(sarı) / number(turuncu) / comment(koyu gri) / function(yeşil)
- Kart üst köşesinde hafif mor border glow

### Sayaçlar (Count-up animasyonu)
**4 stat kart (yatay band, 1 satır):**
- #111827 bg, her kartın üstünde mor gradient çizgi
- Büyük JetBrains Mono rakamlar (48px, gradient)
- 120+ Aktif Üye / 40+ Tamamlanan Proje / 3 Yıl / 10+ Etkinlik/Yıl
- Sayfa scroll'a gelince 0'dan yukarı sayarak dolar

### Kollarımız (2×2 grid)
Her kol kartı — büyük, horizontal layout (ikon sol, metin sağ):
- **Web:** Mor accent, 🌐 ikon, Next.js/React/Node.js/Supabase/TypeScript tag'leri
- **Mobil:** Yeşil accent, 📱 ikon, Flutter/Dart/Firebase/Android/iOS tag'leri
- **Oyun:** Turuncu accent, 🎮 ikon, Unity/C#/Godot/GDScript/Blender tag'leri
- **Blockchain:** Altın accent, ⛓ ikon, Solidity/Ethereum/Web3.js/Rust/Hardhat tag'leri

Her kart hover'da kendi kol renginde border glow.

### Ne Yapıyoruz (Split)
**Sol (6 aktivite listesi, numaralı):**
01 Haftalık Buluşmalar / 02 Aylık Workshop'lar / 03 Proje Dönemleri / 04 Hackathon'lar / 05 Sektör Konuşmaları / 06 Mentörlük Programı

**Sağ (sticky quote kart):**
- Alıntı metni (büyük tırnak işareti dekoratif element)
- "Burada yazdığım kod sadece ödev değil — gerçek bir ürün..."
- Yazar: avatar + isim + rol
- Alt: 4 değer listesi (🔨 Yaparak öğren / 🤝 Birlikte büyü / 🚀 Canlıya al / 🌍 Açık kaynak)

---

## SAYFA 3: EKİBİMİZ

### Yönetim Kurulu (3 büyük split kart)
Her kart — full-width, 2 kolon:
**Sol (metin):**
- Rol: JetBrains Mono 12px #7F77DD (başında 16px çizgi)
- İsim: 38px Bold (büyük)
- Kol badge: #26215C bg, pill shape
- Bio paragrafı: 15px #6B7280
- Fun fact kutusu: #374151 bg, rounded
- Sosyal butonlar: LinkedIn + GitHub + E-posta (ikon + metin, pill shape)

**Sağ (fotoğraf alanı):**
- Büyük fotoğraf veya gradient monogram (fotoğraf yokken)
- Sol kenarda hafif gradient overlay (içerik üzerine geçiş yumuşatır)

**3 kişi:**
1. Ahmet Kaya — Başkan / Web Kolu / 3. Sınıf
2. Büşra Yılmaz — Başkan Yardımcısı / AI/ML / 4. Sınıf
3. Mert Çelik — Genel Sekreter / Mobil Kolu / 3. Sınıf

**Alternan layout:** 1. ve 3. kart: metin sol / fotoğraf sağ. 2. kart: fotoğraf sol / metin sağ.

### Kol Liderleri (4 kart grid)
Her kart:
- Yuvarlak avatar, kol renginde conic-gradient halka
- Kol badge (kol renginde)
- İsim + unvan + bölüm/sınıf
- GitHub + LinkedIn + e-posta ikon butonları (30×30, rounded)

4 kol lideri:
1. Selin Erdoğan — Web / DevOps
2. Kerem Arslan — Mobil / Flutter
3. Deniz Yıldız — Oyun / Unity
4. Ece Kara — Blockchain / Solidity

### Katılım Formu
**Sol (metin + avantajlar):**
- H2: "Senin kolun hangisi?"
- 4 perk kartı: 🚀 Hemen projeye gir / 🧠 Mentör desteği / 🎟️ Tüm etkinliklere ücretsiz / 🌐 GitHub organizasyonuna giriş

**Sağ (form):**
- Ad + Soyad (yan yana)
- Öğrenci e-postası
- Bölüm + Sınıf (yan yana)
- Kol seçimi (dropdown)
- Kendini tanıt (textarea)
- "Başvuruyu Gönder →" butonu (full width, mor)

---

## SAYFA 4: ETKİNLİKLER

### Filtre Bar
Pill butonlar: Tümü / ⚡ Hackathon / ⚙ Workshop / 🎙 Talk / 🤝 Sosyal
Aktif: #534AB7 bg + beyaz text. Pasif: #111827 bg + #374151 border

### Öne Çıkan Etkinlik (Featured Kart)
**2 kolon, büyük kart:**
**Sol (detay):**
- "Kayıtlar Açık" — yeşil nokta + yeşil text
- Hackathon badge
- Büyük başlık
- Açıklama paragrafı
- Meta bilgiler (tarih / yer / kontenjan) — ikon + metin
- Mini geri sayım: DD:HH:MM:SS
- "Kayıt Ol →" + "Detayları Gör" butonları

**Sağ (afiş/poster alanı):**
- Koyu mor gradient (#1a0f3c → #26215C)
- Büyük beyaz başlık: "İlkbahar / **Hackathon** / '25"
- Tarih badge: JetBrains Mono, koyu kart

### Yaklaşan Etkinlikler (Liste, 4 satır)
Her satır:
- Tarih kutusu (mor bg, büyük gün / küçük ay)
- Badge + başlık + kısa açıklama + saat/yer/kontenjan meta
- Sağda "Kayıt Ol" veya "Hatırlat" butonu
- Hover: translateX(4px) + mor border

### Etkinlik Türleri (3× Split kart)
Dönüşümlü layout (1.sol→sağ, 2.sağ→sol, 3.sol→sağ):
- Sol: fotoğraf alanı (gradient placeholder, kol renginde)
- Sağ: badge + başlık + açıklama + meta + CTA butonu

### Geçmiş Etkinlikler (3×2 grid)
Her kart:
- Üst: 200px afiş alanı (kol renginde gradient + büyük başlık)
- Üst sağ köşe: "Past Event" badge
- Alt: badge + başlık + tarih + katılımcı sayısı

### Kayıt Formu
Sol: 3 etkinlik türü açıklama kutusu (hackathon / workshop / talk)
Sağ form: ad + soyad + e-posta + etkinlik seçimi + sınıf + not

---

## SAYFA 5: PROJELER

### Öne Çıkan Proje (Featured Kart)
**Sol (detay):**
- "★ Kulüp Projesi · Web Kolu" — JetBrains Mono label
- Büyük başlık
- Açıklama
- Tech tag'leri
- Ekip: avatar stack + isimler + kol/dönem
- "Canlı Demo" + "GitHub" butonları

**Sağ (kod editörü):**
- Gerçek proje kodundan snippet (Next.js/Supabase)
- Tam syntax highlight

### Kulüp Projeleri (3×2 grid)
Her proje kartı:
- Üst: 150px kod snippet visual (her kol kendi renk temasında)
- Kol badge
- Başlık + açıklama
- Tech tag'leri
- Alt: ekip avatar + GitHub + Demo ikon butonları

6 proje:
1. Öğrenci Not Takip (Web/React)
2. Kampüs Etkinlik App (Mobil/Flutter)
3. Yemek Tahmin Modeli (AI/Python)
4. Çanakkale Chronicles (Oyun/Unity)
5. YGK Token & DAO (Blockchain/Solidity)
6. Ders Programı Görüntüleyici (Web/Next.js)

### Üye Projeleri Section
**Intro (2 kolon):**
- Sol: başlık + açıklama + "Projenizi Gönderin →" butonu
- Sağ: stat kart ("8 Onaylanmış Üye Projesi") + nasıl çalışır açıklaması

**2×2 kart grid (pembe accent):**
Her kart:
- Pembe border accent
- Kolu tag: "👤 Üye Projesi"
- Başlık + açıklama
- Tech tag'leri
- Alt: yazar avatar + isim + bölüm + GitHub/Demo butonları

### Proje Gönder Formu
**Sol (4 adım):**
01 Formu doldur → 02 Yönetim inceler → 03 Sayfada yayınlanır → 04 Sosyal medyada paylaşılır

**Sağ form:**
- Ad + e-posta (yan yana)
- Proje adı
- Açıklama (300 karakter sayaçlı)
- Teknolojiler
- GitHub + Demo linkleri (yan yana)
- Proje türü dropdown
- "Başvuruyu Gönder →" butonu

---

## SAYFA 6: İLETİŞİM

### Hero
- Başlık: "Bizimle **iletişime geç.**"
- Alt: "Soru, öneri, iş birliği veya sadece merhaba demek için — buradayız."

### Ana Layout (3 Kolon)

**Sol Kolon — İletişim Bilgileri:**
Kart (#111827, mor üst border):
- Adres: 📍 Terzioğlu Kampüsü, 17100 Merkez/Çanakkale
- E-posta: ✉️ ygk@comu.edu.tr
- Discord: 💬 discord.gg/ygkcomu
- Yanıt süresi: ⏰ 1–2 iş günü

Sosyal medya ikonları (4 tane, her biri kendi renginde hover):
Discord (#5865F2) / GitHub (gri) / LinkedIn (#0A66C2) / Instagram (#E1306C)

Hızlı bağlantılar:
- → Üyelik Başvurusu
- → Proje Gönder
- → Etkinlik Kaydı

**Orta Kolon — Mesaj Formu:**
- Ad + Soyad
- E-posta
- Konu dropdown (Üyelik / Etkinlik / Sponsorluk / Proje İş Birliği / Medya / Diğer)
- Mesaj textarea
- "Mesajı Gönder →" butonu

**Sağ Kolon — Harita + SSS:**

Harita kartı:
- Google Maps embed (ÇOMÜ Terzioğlu Kampüsü)
- Filtre: grayscale + koyu ton (dark theme uyumu için)
- Alt: adres + "Haritada Aç" butonu

SSS (accordion):
5 soru, tıklanınca açılan:
1. Kulübe katılmak için ne gerekiyor?
2. Üyelik ücretli mi?
3. Yazılım bilmeden katılabilir miyim?
4. Sponsorluk için kiminle iletişime geçmeliyim?
5. Etkinliklere üye olmadan katılabilir miyim?

### Platform Kartları (4 kart, full width)
Discord / GitHub / LinkedIn / Instagram
Her biri: platform ikonu + adı + handle + aksiyon butonu
Hover: kendi platform renginde border glow + box shadow

---

## FOOTER — TÜM SAYFALARDA AYNI

**3 bölüm:**

**Logo + açıklama (sol):**
- Logo kutusu + kulüp adı
- Kısa açıklama metni (13px #6B7280)

**Link kolonları (sağ, 3 kolon):**
- Keşfet: Projeler / Etkinlikler / Blog / Ekip
- Topluluk: Discord / GitHub / LinkedIn / Instagram
- Kulüp: Hakkımızda / Üyelik / İletişim / Tüzük

**Alt bar:**
- Sol: "© 2025 Yazılım Geliştirme Kulübü · ÇOMÜ"
- Sağ: "Built with ❤️ by YGK" (JetBrains Mono, koyu gri)
- Üst border: 1px #374151

---

## KOMPONENTLEŞTİRME KILAVUZU

Şunları component olarak oluştur:

| Komponent | Varyantlar |
|---|---|
| Button | Primary / Secondary / Ghost / Destructive |
| Badge | Brand / Web / Mobile / Game / Chain / Member |
| Card/Project | Kulüp / Üye |
| Card/Event | Upcoming / Past / Featured |
| Card/Team | Leader (split) / Member (grid) |
| Card/Branch | Web / Mobile / Game / Chain |
| Navbar | Default / Scrolled |
| Footer | — |
| Input | Default / Focus / Error |
| Select | Default / Focus |
| Textarea | Default / Focus |
| Avatar | Small (22px) / Medium (28px) / Large (72px) / XL (100px) |
| Social Button | Discord / GitHub / LinkedIn / Instagram / Email |
| Section Eyebrow | — |
| Code Mockup | Editor / Snippet |
| Stat Card | — |
| Countdown Unit | — |

---

## ÖNEMLİ TASARIM KARARLARI (Geçmiş Tartışmalardan)

1. **Dark mode only** — açık tema yok, tüm tasarım dark mode
2. **Split layout YOK anasayfada** — hero tam genişlikte, tek kolon, aşağı scroll eden
3. **Kod mockupları** — sağ kolon görsel olarak fotoğraf yerine syntax highlighted kod editörü
4. **Sayaç şartlı** — etkinlik girilmemişse geri sayım sayfada görünmez
5. **Üye projeleri ayrı section** — kulüp projelerinden görsel olarak ayrıştırılmış (pembe accent)
6. **Kol renkleri** — her kolun kendi rengi var, kartlarda tutarlı kullanılıyor
7. **Fun fact** — ekip sayfasında her yönetim kurulu üyesinin bir "fun fact" kutusu var
8. **Proje gönder formu** — projeler sayfasında üyelerin proje göndermesi için 4 adımlı süreç
9. **SSS accordion** — iletişim sayfasında 5 soruluk interaktif accordion
10. **Filtre butonlar** — etkinlikler sayfasında tür filtresi (Tümü/Hackathon/Workshop/Talk/Sosyal)

---

## FIGMA AI İÇİN PROMPT ŞEKLİ

Her sayfa için şu formatı kullan:

```
Create a [SAYFA ADI] page for a university software development club website.

Style: Dark mode only. Background #0D0D14. Primary accent #534AB7 (purple). 
Font: Space Grotesk (headings/body) + JetBrains Mono (code/labels).
Visual effects: Subtle grid background (60px, 6% opacity), glow orbs (radial blur), 
gradient accent lines on card tops, noise texture overlay.

Layout: 1440px wide, 80px horizontal padding, 12-column grid.
Navbar: Fixed, 64px, #111827 85% blur, links: Anasayfa/Hakkımızda/Ekibimiz/Etkinlikler/Projeler/İletişim, 
right: "Üye Ol" button (#534AB7).

[SAYFA ÖZEL İÇERİK — yukarıdaki sayfa tanımından ilgili bölümü ekle]

Card style: #111827 background, 1px #374151 border, 16-20px radius, 
subtle top gradient accent line (purple to transparent).
Hover: slight upward lift + colored border glow.
Buttons: Primary (#534AB7 filled) / Secondary (transparent + purple border).
All text in Turkish.
```

---

*Bu dosya Figma AI prompt'u için hazırlanmıştır. Her sayfa için ilgili bölümü kopyalayıp Figma AI'a yapıştır.*
