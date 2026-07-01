# 💒 دعوة زفاف ريمون & مادلين

## Wedding Invitation - ريمون & مادلين

A beautiful, animated wedding invitation built with **Next.js**, **React**, **Framer Motion**, and **Tailwind CSS**.

---

## ✨ Features

- 🌟 **Animated Star Opening** - A golden star with the couple's photo in the center
- 🎵 **Background Music** - Auto-plays romantic music after opening (with mute toggle)
- 🌸 **Floating Particles** - Rose petals, hearts, and sparkles floating across the screen
- ⏰ **Live Countdown Timer** - Counting down to the wedding day
- 📅 **Event Cards** - Beautiful cards for church ceremony and reception
- 📸 **Photo Gallery** - Placeholder grid for couple photos
- 📱 **Mobile First** - Fully responsive, optimized for mobile viewing
- 🎨 **Elegant Design** - Gold/amber theme with glassmorphism effects

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
wedding-invitation/
├── app/
│   ├── page.tsx          # Main invitation page
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles & animations
├── public/
│   ├── images/
│   │   ├── couple.jpg    # Couple photo (star center)
│   │   └── photo1-4.jpg  # Gallery photos
│   └── music/
│       └── wedding.mp3   # Background music
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🖼️ Adding Your Photos

1. Replace `/public/images/couple.jpg` with the couple's photo
2. Replace `/public/images/photo1.jpg` through `photo4.jpg` with gallery photos

If images fail to load, fallback Unsplash images will be used automatically.

---

## 🎵 Adding Music

1. Add your wedding music file to `/public/music/wedding.mp3`
2. The music will auto-play after the user opens the invitation
3. A floating music toggle button allows guests to mute/unmute

> **Note:** Due to browser autoplay policies, music only starts after user interaction (clicking the star).

---

## 📝 Customization

### Edit Wedding Details
Open `app/page.tsx` and modify these constants:

```typescript
const WEDDING_DATE = new Date("2026-07-19T19:00:00");
const RECEPTION_DATE = new Date("2026-07-19T20:00:00");
```

### Edit Names & Text
All Arabic text is in `app/page.tsx`. Search and replace:
- "ريمون" → Groom's name
- "مادلين" → Bride's name
- Church and venue details

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the `out` folder
```

### Static Hosting
The project is configured for static export (`output: 'export'`). After building, the `out` folder contains all static files.

---

## 🎨 Design Credits

- **Fonts**: Google Fonts (Great Vibes, Amiri, Cairo)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS

---

## 📅 Wedding Details

| Event | Date | Time | Location |
|-------|------|------|----------|
| Church Ceremony | Sunday, July 19, 2026 | 7:00 PM | St. Mark's Church, Sahl Tama |
| Reception | Sunday, July 19, 2026 | 8:00 PM | Wadi Al-Nakheel Hall, Tama |

---

Made with ❤️ for ريمون & مادلين
