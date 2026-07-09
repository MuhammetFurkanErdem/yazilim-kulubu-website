<div align="center">
  <img src="public/logo.png" alt="Kulüp Logo" width="150"/>

  # 🚀 Yazılım Kulübü Web Sitesi

  **Modern, Dinamik ve Yenilikçi Topluluk Platformu**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](#)
  [![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](#)
</div>

<br/>

## 📖 Proje Hakkında (Ne İşe Yarar?)

**Yazılım Kulübü Web Sitesi**, üniversitemizdeki teknoloji ve yazılıma ilgi duyan öğrencileri bir araya getiren, kulüp etkinliklerini duyuran, projelerin sergilendiği ve üyelerin etkileşimde bulunmasını sağlayan kapsamlı bir açık kaynak platformdur.

Bu platform sayesinde:
- 📅 **Etkinlik Yönetimi:** Kulüp içi eğitimler, hackathonlar ve seminerler takip edilebilir.
- 💻 **Proje Vitrini:** Üyelerin geliştirdiği projeler ve başarılar herkesle paylaşılır.
- 🤝 **Üye Katılımı:** Yeni üyelerin kayıt olması ve kulüp kollarında görev alması kolaylaşır.
- 📰 **Duyurular:** Önemli haberler anında kullanıcılara iletilir.

---

## 📸 Arayüz & Teknoloji Yığını

Aşağıda projenin hem önyüzünde hem de arka planında kullanılan modern teknolojiler ve uygulama arayüzünden örnekler bulunmaktadır.

<p align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" width="60"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TailwindCSS-Dark.svg" width="60"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Vite-Dark.svg" width="60"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Python-Dark.svg" width="60"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Docker.svg" width="60"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PostgreSQL-Dark.svg" width="60"/>
</p>

### 💻 Ekran Görüntüleri ve GIF'ler

> **Uygulama İçi Görünüm (Örnek Demo)**
> <br/>
> ![Uygulama GIF](https://cdn.dribbble.com/users/121337/screenshots/5885287/media/6b9d62d226a4b1219b6eb8b7c07b4d1b.gif)
> *(Yukarıdaki görsel projenin dinamik yapısını yansıtan bir animasyondur. İlgili kısımlara kendi uygulama içi GIF'lerinizi de sonradan ekleyebilirsiniz.)*

---

## 🗄️ Veri Tabanı Şeması

Aşağıda sistemin kullanıcıları, etkinlikleri ve projeleri arasındaki ilişkileri gösteren ER (Entity-Relationship) veritabanı şemasının görsel diyagramı yer almaktadır:

```mermaid
erDiagram
    USERS ||--o{ PROJECTS : "creates"
    USERS ||--o{ EVENT_ATTENDANCE : "registers"
    USERS {
        int id PK
        string username
        string email
        string password_hash
        string role
        datetime created_at
    }
    PROJECTS {
        int id PK
        string title
        text description
        string repo_url
        int author_id FK
    }
    EVENTS {
        int id PK
        string title
        datetime date
        string location
        text description
    }
    EVENT_ATTENDANCE {
        int id PK
        int user_id FK
        int event_id FK
        datetime registered_at
    }
    ROLES {
        int id PK
        string role_name
    }
    USERS ||--o{ ROLES : "has"
```
*(GitHub üzerinde bu kod bloğu otomatik olarak şık bir veritabanı görseline dönüşmektedir.)*

---

## 🚀 Yerelde Kurulum ve Çalıştırma

Projeyi geliştirme ortamınızda ayağa kaldırmak için aşağıdaki yöntemlerden birini seçebilirsiniz.

### Seçenek 1: Docker ile Hızlı Kurulum (Önerilen 🐳)

Docker ve Docker Compose kullanarak tüm bağımlılıkları (Veritabanı, Backend, Frontend) tek komutla başlatabilirsiniz:

```bash
# Projeyi klonlayın
git clone https://github.com/MuhammetFurkanErdem/yazilim-kulubu-website.git
cd yazilim-kulubu-website

# Docker Compose ile tüm servisleri ayağa kaldırın
docker-compose up --build
```
> Uygulama başarılı bir şekilde ayağa kalktıktan sonra **http://localhost:3000** (veya belirlenen port) üzerinden erişebilirsiniz.

### Seçenek 2: Manuel Kurulum (pip & npm)

Eğer Docker kullanmadan, ortamı tamamen kendiniz kurmak isterseniz:

**1. Backend Kurulumu:**
```bash
# Backend klasörüne gidin (varsa)
cd backend

# Sanal ortam oluşturun ve aktif edin
python -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate

# Gerekli kütüphaneleri yükleyin
pip install -r requirements.txt

# Veritabanı migrasyonlarını yapın ve API sunucusunu başlatın
python manage.py migrate
python manage.py runserver
```

**2. Frontend Kurulumu:**
```bash
# Ana dizine geri dönün
cd ..

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

---

## 🤝 Katkıda Bulunma

Bu proje tüm kulüp üyelerinin katkılarına açıktır! Nasıl katkıda bulunacağınız aşağıda açıklanmıştır:
1. Bu repoyu Fork'layın
2. Yeni bir branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Yaptığınız değişiklikleri commit'leyin (`git commit -m 'Harika bir özellik eklendi'`)
4. Branch'inizi push'layın (`git push origin feature/YeniOzellik`)
5. Bizim repomuza bir **Pull Request** açın!
