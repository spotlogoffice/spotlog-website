# SPOT/LOG Website - Deployment na Vercel i Domain Setup

## 📋 Pregled

Ovaj dokument objašnjava kako da:
1. Deployuješ website na Vercel (BESPLATNO)
2. Povežeš domenu `spotlog.co` (BESPLATNO)
3. Postaviš environment varijable za R2 storage

---

## **KORAK 1: Pripremi GitHub repozitorijum**

### 1a. Kreiraj GitHub račun (ako nemamo)
- Idi na https://github.com
- Klikni "Sign up"
- Kreiraj nalog

### 1b. Kreiraj novi repozitorijum
- Klikni "New repository"
- Imenuj ga: `spotlog-website`
- Opis: "SPOT/LOG Professional Photo Documentation"
- Klikni "Create repository"

### 1c. Push koda na GitHub
U terminalu na tvoj mašini:

```bash
# Kloniraj repo
git clone https://github.com/[TVOJ-USERNAME]/spotlog-website.git
cd spotlog-website

# Dodaj sve fajlove
git add .

# Kreiraj commit
git commit -m "Initial commit: SPOT/LOG website MVP"

# Pushuj na GitHub
git push -u origin main
```

---

## **KORAK 2: Deployuj na Vercel (5 minuta)**

### 2a. Kreiraj Vercel nalog
- Idi na https://vercel.com
- Klikni "Sign Up"
- Odaberi "Continue with GitHub"
- Autentifikuj GitHub nalog

### 2b. Importuj projekt
- Na Vercel dashboardu, klikni "New Project"
- Odaberi `spotlog-website` repozitorijum
- Klikni "Import"

### 2c. Postavi environment varijable
Vercel će te pitati za "Environment Variables". Dodaj sledeće:

```
VITE_R2_ACCOUNT_ID = 7b5f27741f2d0212f06a36c75a4501e9
VITE_R2_ACCESS_KEY_ID = d11a138bb9f8c9337eb26d4514362b39
VITE_R2_SECRET_ACCESS_KEY = eeb6287e00ca6647c21f002eafa9587e10351a29b14daa45830801215f0d854a
VITE_R2_ENDPOINT = https://7b5f27741f2d0212f06a36c75a4501e9.r2.cloudflarestorage.com
VITE_R2_BUCKET_NAME = spotlog-photos
```

**VAŽNO:** Ove varijable su u `.env.example` fajlu. Vercel će je videti automatski.

### 2d. Deploy
- Klikni "Deploy"
- Čekaj 2-3 minuta
- **✅ GOTOVO!** Dobio si URL: `https://spotlog-website.vercel.app`

---

## **KORAK 3: Poveži domenu spotlog.co (5 minuta)**

### 3a. U Vercel dashboardu
- Otvori projekat `spotlog-website`
- Klikni "Settings" → "Domains"
- Klikni "Add Domain"
- Unesi: `spotlog.co`
- Klikni "Add"

### 3b. Vercel će ti dati DNS records
Vercel će prikazati nešto kao:

```
Type: CNAME
Name: spotlog.co (ili @)
Value: cname.vercel-dns.com
```

### 3c. U Cloudflare DNS (gde je tvoj domain)
- Otvori Cloudflare dashboard
- Odaberi domenu `spotlog.co`
- Klikni "DNS"
- Dodaj novi CNAME record:
  - Name: `@` (ili ostavi kako Vercel kaže)
  - Content: `cname.vercel-dns.com`
  - TTL: Auto
  - Proxy status: DNS only
- Klikni "Save"

### 3d. Čekaj DNS propagaciju
- Propagacija obično traje 5-30 minuta
- Posle: `spotlog.co` će voditi na tvoj Vercel projekat

---

## **KORAK 4: SSL sertifikat (Automatski)**

Vercel automatski generiše besplatni SSL sertifikat za tvoj domain.
Nije potrebna dodatna konfiguracija!

---

## **VERIFIKACIJA**

Nakon što je DNS propagiran:

```bash
# Testiraj u terminalu
curl -I https://spotlog.co

# Trebao bi da vidim HTTP 200 odgovor
```

---

## **KASNIJE: Firebase Setup (nije potreban za MVP)**

Kada želiš da dodam Firebase za pravo auth:

```bash
npm install firebase
```

Trebala bi će ti sledeća polja:
- Firebase API Key
- Firebase Project ID
- Firebase Auth Domain

Mogu to dodati kasnije bez problema.

---

## **TROUBLESHOOTING**

### Problem: "Domain je već u upotrebi"
- Vercel → Settings → Domains
- Klikni "X" pored domene
- Čekaj 24h
- Dodaj ponovno

### Problem: DNS ne propagira
- Cloudflare → DNS
- Verifikuj da je CNAME record ispravno dodat
- Čekaj do 48h

### Problem: "Cannot GET /"
- Vercel → Deployments
- Verifikuj da je build bio uspešan (zelena čekica)
- Ako ne, proverim kod u repozitorijumu

---

## **KADA TREBAŠ NOVO DEPLOY**

Svaki put kada pushuješ kod na GitHub:
1. Vercel automatski pravi novi build
2. Ako je build uspešan, automatski deployuje
3. Domenu ne trebaš ponovo postavljati

---

## **BRZI CHECKLIST**

- [ ] GitHub repozitorijum kreiram
- [ ] Kod pushujem na GitHub
- [ ] Kreiram Vercel nalog
- [ ] Importujem projekt na Vercel
- [ ] Postavljam R2 environment varijable
- [ ] Deploy je završen
- [ ] Domenu `spotlog.co` dodajem u Vercel
- [ ] CNAME record dodajem u Cloudflare
- [ ] DNS propagira (čekam 5-30 min)
- [ ] ✅ `https://spotlog.co` radi!

---

**PITANJA?** Slobodno me pošalji poruku! 🚀
