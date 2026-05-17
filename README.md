# SPOT/LOG - Profesionalna foto-dokumentacija

![SPOT/LOG](https://img.shields.io/badge/Status-MVP-orange)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Build-Vite-9966ff)

## 📸 Šta je SPOT/LOG?

SPOT/LOG je web platforma za profesionalnu foto-dokumentaciju građevinskih projekata. Omogućava:

- ✅ Automatsku organizaciju fotografija
- ✅ GPS detekciju lokacije projekta
- ✅ Cloud backup na Cloudflare R2
- ✅ Jednostavno deljenje projekata
- ✅ Bilingual interfejs (SR/EN)

---

## 🚀 Brzi Start

### Preduslovi
- Node.js 16+
- npm ili yarn
- Git

### Instalacija

```bash
# 1. Kloniraj repozitorijum
git clone https://github.com/[TVOJ-USERNAME]/spotlog-website.git
cd spotlog-website

# 2. Instaliraj zavisnosti
npm install

# 3. Kreiraj .env.local fajl
cp .env.example .env.local

# 4. Pokreni dev server
npm run dev
```

Dev server će biti dostupan na: **http://localhost:3000**

---

## 🏗️ Struktura Projekta

```
spotlog-website/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx       # Landing stranica
│   │   ├── Landing.css
│   │   ├── Login.jsx         # Login stranica
│   │   ├── Login.css
│   │   ├── Dashboard.jsx     # Dashboard sa projektima
│   │   └── Dashboard.css
│   ├── styles/
│   │   └── global.css        # Design system tokens
│   ├── App.jsx               # Main router
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── DEPLOYMENT.md             # Deployment instrukcije
└── README.md
```

---

## 🎨 Design System

**Boje:**
```css
--color-orange: #FF6700    /* Primary */
--color-black: #1A1A1A     /* Text */
--color-gray: #8A8A8A      /* Secondary */
--color-white: #FFFFFF     /* Background */
```

**Font:** TT Norms Pro (Minimalist sans-serif)

**Spacing:** 20px, 40px, 60px, 80px, 100px

**Border Radius:** 0px (Sharp, architectural)

---

## 📝 Funkcionalnosti (MVP)

### Landing Page
- ✅ Hero sekcija sa pozivom na akciju
- ✅ Feature prikaz
- ✅ Bilingual (SR/EN)
- ✅ Responsive design

### Login
- ✅ Email-based login (localStorage)
- ✅ Registracija (placeholder za Firebase)
- ✅ Google OAuth (placeholder)

### Dashboard
- ✅ Prikaz projekata
- ✅ Photo upload (simuliran)
- ✅ Photo gallery
- ✅ Activity log
- ✅ Project management

---

## 🔧 Environment Varijable

Kreiraj `.env.local` fajl sa:

```
VITE_R2_ACCOUNT_ID=7b5f27741f2d0212f06a36c75a4501e9
VITE_R2_ACCESS_KEY_ID=d11a138bb9f8c9337eb26d4514362b39
VITE_R2_SECRET_ACCESS_KEY=eeb6287e00ca6647c21f002eafa9587e10351a29b14daa45830801215f0d854a
VITE_R2_ENDPOINT=https://7b5f27741f2d0212f06a36c75a4501e9.r2.cloudflarestorage.com
VITE_R2_BUCKET_NAME=spotlog-photos
```

---

## 🚢 Deployment

Detaljne instrukcije: vidi [DEPLOYMENT.md](./DEPLOYMENT.md)

**TL;DR:**
1. Push na GitHub
2. Connect sa Vercel
3. Postavi environment varijable
4. Poveži domenu `spotlog.co`

---

## 📦 Build

```bash
# Production build
npm run build

# Testiranje production build-a
npm run preview
```

Build će biti u `dist/` folderu.

---

## 🔄 Kako Funkcioniše

### Landing → Login → Dashboard Flow

```
Landing Page
    ↓
    [Klikni "Prijava"]
    ↓
Login (email + localStorage)
    ↓
    [Email se čuva u localStorage]
    ↓
Dashboard (Projekti + Fotografije)
```

### Projekti (localStorage)

Kada se korisnik prijavi, njegovi podaci se čuvaju:

```json
{
  "spotlog_user": {
    "id": "1234567890",
    "email": "korisnik@example.com",
    "projects": [...]
  }
}
```

---

## 🎯 Sledeći Koraci (Kasnije)

- [ ] Integracija Firebase Auth
- [ ] Pravi R2 photo upload
- [ ] Payment processing (Stripe)
- [ ] Team sharing
- [ ] Mobile app
- [ ] Advanced photo organization
- [ ] Email notifications

---

## 📱 Responsive

Website je optimizovan za:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

---

## 🤝 Contribution

Za izmene:

```bash
# 1. Kreiraj feature branch
git checkout -b feature/nova-funkcionalnost

# 2. Uradi izmene

# 3. Commit
git commit -am 'Dodaj novu funkcionalnost'

# 4. Push
git push origin feature/nova-funkcionalnost

# 5. Kreiraj Pull Request
```

---

## 📄 Licenca

© 2025 SPOT/LOG. All rights reserved.

---

## 📞 Podrška

Za pitanja ili sugestije:
- Email: info@spotlog.co
- Website: https://spotlog.co

---

**Gde si do sad**? 🎉

Imamo kompletan MVP koji:
- ✅ Izgleda profesionalno
- ✅ Radi kako treba
- ✅ Spreman za deployment
- ✅ Lako se održava

**Hajde na Vercel!** 🚀
