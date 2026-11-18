/**
 * THE ROYAL EXPERIENCE — Themes & Presets Configuration
 */

const ROYAL_THEMES = {
  royal: {
    id: 'royal',
    name: 'Royal Luxury',
    tagline: 'Imperial Majesty & Champagne Gold',
    icon: '👑',
    swatches: ['#15050A', '#5E1424', '#D4AF37', '#FDFBF7'],
    ambientGrad: 'radial-gradient(circle at 50% 15%, rgba(94, 20, 36, 0.5) 0%, rgba(21, 5, 10, 0.98) 75%)',
    sealText: 'ROYAL',
    defaultProclamation: 'By sovereign decree of love and unwavering devotion, today and for all days ahead, you are celebrated in all your magnificence.'
  },
  fairytale: {
    id: 'fairytale',
    name: 'Enchanted Fairytale',
    tagline: 'Mystical Groves & Starlight Gold',
    icon: '🧚‍♀️',
    swatches: ['#061510', '#14533C', '#6EE7B7', '#E5C365'],
    ambientGrad: 'radial-gradient(circle at 50% 20%, rgba(20, 83, 60, 0.45) 0%, rgba(6, 21, 16, 0.95) 75%)',
    sealText: 'MAGIC',
    defaultProclamation: 'In a kingdom spun of dreams and ancient stars, no fairy tale shines more radiantly than the story of your heart.'
  },
  celestial: {
    id: 'celestial',
    name: 'Celestial Princess',
    tagline: 'Cosmic Nebula & Constellations',
    icon: '✨',
    swatches: ['#080A1A', '#312E81', '#818CF8', '#F1D27E'],
    ambientGrad: 'radial-gradient(circle at 50% 10%, rgba(49, 46, 129, 0.55) 0%, rgba(8, 10, 26, 0.98) 75%)',
    sealText: 'STARS',
    defaultProclamation: 'The galaxies aligned on the day you entered this world, and every star whispers of your grace across the cosmic heavens.'
  },
  garden: {
    id: 'garden',
    name: 'Romantic Garden',
    tagline: 'Blushing Rose & Golden Peach',
    icon: '🌸',
    swatches: ['#17090C', '#881F38', '#FDA4AF', '#E8A598'],
    ambientGrad: 'radial-gradient(circle at 50% 15%, rgba(136, 31, 56, 0.45) 0%, rgba(23, 9, 12, 0.98) 75%)',
    sealText: 'GRACE',
    defaultProclamation: 'Like a rare rose blooming in eternal sunlight, your presence brings warmth, elegance, and beauty to everyone blessed to know you.'
  },
  pastel: {
    id: 'pastel',
    name: 'Pastel Dream',
    tagline: 'Iridescent Lavender & Opal Dew',
    icon: '🫧',
    swatches: ['#12091A', '#581C87', '#D8B4E2', '#FAF5FF'],
    ambientGrad: 'radial-gradient(circle at 50% 15%, rgba(88, 28, 135, 0.45) 0%, rgba(18, 9, 26, 0.98) 75%)',
    sealText: 'DREAM',
    defaultProclamation: 'Soft as morning mist and radiant as pearl, may your universe be filled with gentleness, boundless joy, and wondrous dreams.'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Elegance',
    tagline: 'Haute Couture Noir & Diamond Glints',
    icon: '💎',
    swatches: ['#09090C', '#1E1E2D', '#D4AF37', '#FFFFFF'],
    ambientGrad: 'radial-gradient(circle at 50% 15%, rgba(30, 30, 45, 0.6) 0%, rgba(9, 9, 12, 0.98) 75%)',
    sealText: 'NOIR',
    defaultProclamation: 'Unmatched in style, breathtaking in poise, and commanding the night with the unmistakable confidence of a true queen.'
  }
};

const RELATIONSHIP_TYPES = [
  { id: 'romantic', label: 'Soulmate / Partner', title: 'Queen of My Universe', defaultNick: 'My Beloved' },
  { id: 'bestfriend', label: 'Best Friend', title: 'Cherished Royal Confidante', defaultNick: 'My Forever Princess' },
  { id: 'sister', label: 'Sister', title: 'Treasured Princess of the Realm', defaultNick: 'Darling Sister' },
  { id: 'daughter', label: 'Daughter', title: 'Little Princess Forever', defaultNick: 'My Precious One' },
  { id: 'mother', label: 'Mother', title: 'The Sovereign Queen of Grace', defaultNick: 'Dearest Queen' },
  { id: 'admirer', label: 'Friend / Admirer', title: 'Lady of Infinite Light', defaultNick: 'Sweet Highness' }
];

// Curated royalty-free aesthetic vector portraits (Zero network dependencies!)
const PRESET_PORTRAITS = [
  {
    id: 'portrait-gold',
    name: 'Golden Diadem',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%232b0c16"/><stop offset="100%" stop-color="%230c0308"/></linearGradient><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFF6D6"/><stop offset="50%" stop-color="%23D4AF37"/><stop offset="100%" stop-color="%238C6D1F"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g)"/><circle cx="200" cy="180" r="110" fill="none" stroke="url(%23gold)" stroke-width="2" opacity="0.4"/><path d="M120 180 L160 120 L200 160 L240 120 L280 180 Z" fill="url(%23gold)" opacity="0.9"/><circle cx="200" cy="270" r="45" fill="url(%23gold)" opacity="0.3"/><circle cx="160" cy="115" r="8" fill="%23FFF"/><circle cx="200" cy="155" r="8" fill="%23FFF"/><circle cx="240" cy="115" r="8" fill="%23FFF"/><text x="200" y="340" fill="%23F7E7CE" font-family="serif" font-size="18" letter-spacing="4" text-anchor="middle">SOVEREIGN GRACE</text></svg>`
  },
  {
    id: 'portrait-starlight',
    name: 'Celestial Tiara',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23080A1A"/><stop offset="100%" stop-color="%231E1B4B"/></linearGradient><linearGradient id="star" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23C7D2FE"/><stop offset="100%" stop-color="%23818CF8"/></linearGradient></defs><rect width="400" height="400" fill="url(%23bg)"/><circle cx="200" cy="170" r="95" fill="none" stroke="url(%23star)" stroke-width="1.5" stroke-dasharray="6,4"/><polygon points="200,90 208,115 235,115 212,130 220,155 200,140 180,155 188,130 165,115 192,115" fill="%23F1D27E"/><path d="M140 210 Q200 170 260 210" stroke="%23F1D27E" stroke-width="3" fill="none"/><circle cx="200" cy="190" r="4" fill="%23FFF"/><text x="200" y="340" fill="%23C7D2FE" font-family="serif" font-size="18" letter-spacing="4" text-anchor="middle">CELESTIAL LIGHT</text></svg>`
  },
  {
    id: 'portrait-rose',
    name: 'Enchanted Blossom',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2317090C"/><stop offset="100%" stop-color="%234C0E1D"/></linearGradient><linearGradient id="rose" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFE4E8"/><stop offset="50%" stop-color="%23FDA4AF"/><stop offset="100%" stop-color="%23BA6E71"/></linearGradient></defs><rect width="400" height="400" fill="url(%23rg)"/><circle cx="200" cy="175" r="80" fill="none" stroke="%23E8A598" stroke-width="1.5"/><circle cx="200" cy="165" r="38" fill="url(%23rose)" opacity="0.85"/><circle cx="185" cy="160" r="25" fill="%23FFE4E8" opacity="0.5"/><path d="M200 205 Q200 270 200 280" stroke="%2385A796" stroke-width="3"/><path d="M200 240 Q225 230 230 245 Q215 250 200 240" fill="%2385A796"/><text x="200" y="340" fill="%23FDA4AF" font-family="serif" font-size="18" letter-spacing="4" text-anchor="middle">ETERNAL BLOOM</text></svg>`
  },
  {
    id: 'portrait-fairytale',
    name: 'Emerald Scepter',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23061510"/><stop offset="100%" stop-color="%230F3827"/></linearGradient><linearGradient id="em" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23A7F3D0"/><stop offset="100%" stop-color="%23059669"/></linearGradient></defs><rect width="400" height="400" fill="url(%23fg)"/><polygon points="200,100 240,160 200,220 160,160" fill="url(%23em)" opacity="0.85"/><circle cx="200" cy="160" r="14" fill="%23FFF"/><path d="M200 220 L200 300" stroke="%23E5C365" stroke-width="4"/><circle cx="200" cy="305" r="6" fill="%23E5C365"/><text x="200" y="350" fill="%23A7F3D0" font-family="serif" font-size="18" letter-spacing="4" text-anchor="middle">FAIRYTALE MAGIC</text></svg>`
  }
];

// Helper to switch theme globally
function applyTheme(themeId) {
  const selected = ROYAL_THEMES[themeId] || ROYAL_THEMES.royal;
  document.documentElement.setAttribute('data-theme', selected.id);
  if (window.royalParticles) {
    window.royalParticles.setTheme(selected.id);
  }
  return selected;
}

window.ROYAL_THEMES = ROYAL_THEMES;
window.RELATIONSHIP_TYPES = RELATIONSHIP_TYPES;
window.PRESET_PORTRAITS = PRESET_PORTRAITS;
window.applyTheme = applyTheme;
