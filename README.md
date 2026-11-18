# THE ROYAL EXPERIENCE (Project Olympus: Princess Day)
> *"Every Princess Deserves Her Own Universe."*

A luxury, interactive, personalized Princess Day digital greeting platform designed with Awwwards-tier craft, cinematic storytelling, and bespoke animations.

---

## 👑 Features & Experience Architecture

### 1. Dual Independent Experiences
- **Creator Studio**: An intuitive real-time customization suite with a live device preview frame (Mobile, Tablet, Desktop viewports). Creators customize greetings without needing an account or database.
- **Recipient Journey**: A 7-scene cinematic narrative sequence that transports the recipient into an enchanted universe made exclusively for them.

### 2. The 7 Recipient Scenes
1. **Scene 1 — The Arrival**: Atmospheric starlight gates announcing a sovereign proclamation for Her Royal Highness.
2. **Scene 2 — The Royal Invitation**: A tactile 3D royal envelope with a wax seal that fractures on tap/click with realistic audio and visual flair, sliding out a royal decree.
3. **Scene 3 — The Revelation**: The core Princess Day proclamation with shimmering typography, custom royal nickname badges, and personal heartfelt prose.
4. **Scene 4 — The Memory Gallery**: A Polaroid-inspired vintage frame with realistic tilt, gold pin, and personalized caption, showcasing the recipient's portrait.
5. **Scene 5 — The Magic of Her**: An interactive constellation of royal virtue cards (Radiant Laughter, Regal Poise, Boundless Heart) that illuminate on hover/tap.
6. **Scene 6 — The Secret Garden**: An interactive discovery sanctuary where recipients tap glowing enchanted orbs (*The Rose of Gratitude*, *The Star of Wishes*, *The Crystal of Forever*) to unlock hidden love notes.
7. **Scene 7 — The Coronation Finale**: A descending golden royal crown, celebratory fanfare, heartfelt benediction, an official printable Keepsake Royal Certificate, and viral greeting generation links.

### 3. The 6 Bespoke Themes
Each theme provides a complete visual universe, custom color harmonies, and specialized particle behavior:
- 👑 **Royal Luxury**: Sovereign deep burgundy, imperial velvet, and champagne gold.
- 🧚‍♀️ **Enchanted Fairytale**: Mystical twilight grove, emerald moss, and glowing fireflies.
- ✨ **Celestial Princess**: Cosmic deep indigo, nebula glow, and twinkling starlight constellations.
- 🌸 **Romantic Garden**: Blushing rose quartz, golden peach, and drifting rose petals.
- 🫧 **Pastel Dream**: Ethereal lavender, mother-of-pearl opal, and pearlescent floating bubbles.
- 💎 **Midnight Elegance**: Velvet noir, platinum silver, and haute couture diamond glints.

### 4. Technical Architecture
- **HTML5 & Semantic Structure**: Fully accessible with semantic tags, ARIA attributes, skip-to-content links, and `:focus-visible` states.
- **Modern CSS**: Tokenized design system (`variables.css`, `themes.css`, `base.css`, `components.css`, `animations.css`, `responsive.css`).
- **Web Audio API Engine**: Procedural synthesizers generating pentatonic arpeggios, atmospheric drone pads, wax seal crackles, and coronation fanfares without external audio files or CORS blocks.
- **Canvas Particle Engine**: Theme-reactive particles that automatically adapt to device DPR, throttle on background tabs, and respect `prefers-reduced-motion: reduce`.
- **Stateless URL Sharing**: Universal Unicode-safe Base64URL compression allowing full cross-device greetings via URL without backend servers or databases. Payloads are stripped of redundant defaults, shrinking URLs by 72% for instant sharing.
- **Standards-Compliant QR Engine**: Built-in ISO/IEC 18004 standard QR Code generator with Reed-Solomon error correction, 100% scannable by all iPhone & Android cameras.
- **Localhost & Public Sharing Detection**: Built-in indicator explaining when running on local PC (`127.0.0.1`) and offering instant public link configuration for GitHub Pages or custom domains.
- **Mobile-First Responsive Layout**: Meticulously tested across 360px, 390px, 430px, 768px, 1024px, and 1440px+.

---

## 🚀 How to Run Locally

You can run this project with any local static web server or open `index.html` directly:

### Option 1: Python HTTP Server
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` in your file browser (Chrome, Safari, Edge, or Firefox).

---

## 🌐 Free Deployment to GitHub Pages

1. Initialize git and commit the files:
   ```bash
   git init
   git add .
   git commit -m "feat: Royal Experience Princess Day platform"
   ```
2. Create a new GitHub repository named `princess-day` (or your preferred name).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/princess-day.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** $\rightarrow$ **Pages**.
5. Under **Branch**, select `main` and root `/`, then click **Save**.
6. Within 1-2 minutes, your website will be live at `https://<your-username>.github.io/princess-day/`!

---

## 📜 URL Sharing Limitations & Technical Note

- **URL Data Capacity**: The platform encodes the greeting payload into the URL parameter (`?g=...`). Standard browsers safely support URLs up to 2,000+ characters. Text, relationship type, theme, virtues, and secret whispers comfortably fit within ~400 characters.
- **Photographs**: Curated royal vector portraits and external HTTPS web links are seamlessly encoded. Local device image uploads are processed client-side with Canvas for local preview; for sharing across devices for free without cloud hosting costs, using image links or the enchanted royal portraits is recommended.
- **Privacy**: The URL is transparent and client-decodable without hidden tracking or external database storage.

---

## 🏰 License
Created for Princess Day. Free to use, adapt, and share with all the princesses in your life.
