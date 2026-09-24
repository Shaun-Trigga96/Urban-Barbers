# Urban Barbers 💈

> **Sharp cuts. Sharper standards.**  
> A modern, premium barbershop web application & booking platform for **Urban Barbers**, located at 24 Kloof Street, Gardens, Cape Town.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Firebase Integration & Hosting](#-firebase-integration--hosting)
- [Shop Information & Services](#-shop-information--services)
- [License](#-license)

---

## ✂️ About The Project

**Urban Barbers** combines old-school barber craft with modern digital convenience. Designed with an editorial, heritage-meets-urban aesthetic (warm amber, brass, rich obsidian, and parchment tones), the platform provides Cape Town clients with a frictionless online appointment booking flow, master barber profiles, a curated portfolio lookbook, and instant WhatsApp communication.

---

## ✨ Key Features

### 📅 Real-Time Appointment Booking Engine
- **Barber Selection**: Choose your preferred master barber (`Sipho "Shaz" Dlamini`, `Ryan Adams`, `Lebo Mokoena`) or pick "Any Available".
- **Dynamic Slot Availability**: Real-time slot calculation that prevents overlapping appointments based on service duration (30 to 75 minutes).
- **Calendar & Vouchers**: Generates downloadable `.ics` calendar events and a shareable appointment voucher featuring a unique confirmation reference (e.g. `BK-582910`).
- **Resilient Dual Storage**: Automatically writes and syncs to **Firebase Firestore** when configured; gracefully falls back to persistent **Browser LocalStorage** if offline or without cloud credentials.

### 📸 Curated Portfolio Lookbook
- High-definition gallery showcasing signature haircuts (Skin Fades, Low Tapers, Scissor Silhouettes, Hot Towel Shaves, and Beard Shaping).
- Interactive category filtering with one-click "Book This Style" triggers that pre-select services in the booking drawer.

### 🎟️ First-Visit Promo Engine
- Elegant, non-intrusive first-time visitor modal offering 15% off first appointments with voucher code `FIRSTCUT15`.
- Cookie / storage persistence ensures it displays only once per user session.

### 💬 WhatsApp & Direct Communication
- Instant WhatsApp appointment confirmation links pre-populated with reference numbers, service titles, date, and barber details.
- One-click phone calling and Google Maps directions targeting the physical shop at 24 Kloof Street, Cape Town.

### 📱 Responsive & Accessible UI
- Fully responsive across desktop, tablet, and mobile displays.
- Built-in accessible dialogs, ARIA labels, smooth micro-interactions powered by `motion`, and keyboard navigation.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [React DOM 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Animations** | [Motion](https://motion.dev/) (Framer Motion v12) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & Cloud** | [Firebase Firestore & Hosting](https://firebase.google.com/) |

---

## 📂 Project Architecture

```plaintext
urban-barbers/
├── public/
│   └── images/              # High-resolution service, barber & gallery assets
├── src/
│   ├── components/
│   │   ├── FirstVisitModal.tsx     # First-visit welcome promo dialog
│   │   ├── Footer.tsx              # Footer with links, hours & shop details
│   │   ├── Header.tsx              # Sticky header with navigation & CTA
│   │   ├── LookbookSection.tsx     # Filterable haircut portfolio gallery
│   │   └── ScrollToTop.tsx         # Route change scroll position manager
│   ├── data/
│   │   └── barbershopData.ts       # Services, barbers, testimonials & lookbook data
│   ├── lib/
│   │   └── bookingStorage.ts       # Firestore + LocalStorage unified persistence layer
│   ├── pages/
│   │   ├── AboutPage.tsx           # Heritage, shop culture & barber story
│   │   ├── ContactBookingPage.tsx  # Interactive multi-step booking engine
│   │   ├── HomePage.tsx            # Hero, quick services, lookbook & reviews
│   │   ├── NotFoundPage.tsx        # 404 handler with redirection
│   │   ├── PrivacyPage.tsx         # POPIA / privacy compliance statement
│   │   ├── ServicesPage.tsx        # Full service menu & pricing matrix
│   │   └── TermsPage.tsx           # Terms of service and booking policies
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces & domain types
│   ├── utils/
│   │   └── dateTime.ts             # Slot math, date formatting & calendar generators
│   ├── App.tsx                     # Main layout & route definitions
│   ├── index.css                   # Tailwind CSS global styles & themes
│   └── main.tsx                    # Application entry point
├── .env.example                    # Environment variable template
├── firebase.json                   # Firebase Hosting configuration
├── firestore.rules                 # Cloud Firestore security rules
├── index.html                      # HTML5 entry with SEO & OpenGraph meta tags
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build and plugins configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shaun-Trigga96/Urban-Barbers.git
   cd Urban-Barbers
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Configuration

Copy `.env.example` to a local `.env` file:

```bash
cp .env.example .env
```

If connecting to your own Firebase project, populate the variables in `.env`:

```env
# Optional Firebase Firestore Configuration
# If omitted, the app automatically falls back to browser localStorage
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
```

> ⚠️ **Security Warning**: Never commit your actual API keys or credentials to public Git repositories. Keep real secrets in `.env` (ignored by `.gitignore`).

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized, minified production build:

```bash
npm run build
```

The output will be placed in the `dist/` directory, ready to deploy to any static host or CDN.

To test the production build locally:

```bash
npm run preview
```

---

## 🔥 Firebase Integration & Hosting

This application is ready to deploy directly to **Firebase Hosting**:

1. Install the Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to your Firebase account:
   ```bash
   firebase login
   ```

3. Deploy Firestore security rules and hosting bundle:
   ```bash
   npm run build
   firebase deploy
   ```

The included `firebase.json` automatically routes all Single Page Application (SPA) paths to `dist/index.html` with cache headers configured for assets.

---

## 💈 Shop Information & Services

- **Address**: 24 Kloof Street, Gardens, Cape Town, 8001, South Africa
- **Phone**: [+27 21 555 4829](tel:+27215554829)
- **WhatsApp**: [+27 21 555 4829](https://wa.me/27215554829)
- **Email**: [appointments@urbanbarbers.co.za](mailto:appointments@urbanbarbers.co.za)

### Operating Hours

| Day | Hours |
| :--- | :--- |
| Monday – Friday | 08:30 – 19:00 |
| Saturday | 08:00 – 17:30 |
| Sunday | 09:30 – 15:30 |

### Signature Services
- **Skin Fade** (45 min) — *R 190*
- **Classic Haircut** (40 min) — *R 180*
- **Taper Fade** (45 min) — *R 180*
- **Scissor Cut & Texture** (50 min) — *R 210*
- **Beard Trim & Razor Shape** (30 min) — *R 140*
- **Hot Towel Traditional Shave** (35 min) — *R 150*
- **Cut + Beard Combo** (60 min) — *R 260*
- **The Full Works (Cut, Beard & Hot Towel)** (75 min) — *R 340*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Urban Barbers branding and imagery are reserved for Urban Barbers.
