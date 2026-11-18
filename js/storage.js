/**
 * THE ROYAL EXPERIENCE — Storage Manager & Demo Presets
 */

const STORAGE_KEYS = {
  DRAFT: 'royal_creator_draft_v1',
  LAST_SHARE: 'royal_last_share_v1'
};

const DEMO_GREETINGS = [
  {
    id: 'demo-sophia',
    recipient: 'Sophia',
    recipientNick: 'Queen of My Heart',
    sender: 'Alexander',
    senderSignoff: 'Forever Yours',
    relationship: 'romantic',
    theme: 'royal',
    message: 'To the woman who turns every ordinary second into poetry: your laughter is my sanctuary, your courage is my compass, and your grace is sovereign over my soul. Happy Princess Day, my queen.',
    photoUrl: '',
    portraitId: 'portrait-gold',
    virtues: [
      { icon: '✨', title: 'Radiant Laughter', desc: 'A joy so contagious it illuminates the darkest rooms.' },
      { icon: '👑', title: 'Regal Poise', desc: 'Walking through storms with breathtaking grace and strength.' },
      { icon: '🤍', title: 'Boundless Heart', desc: 'Loving everyone around you with tender, fierce authenticity.' }
    ],
    whispers: [
      'My heart chose you before my words could even fathom how.',
      'You are the dream I never knew I was allowed to wish for.',
      'No crown in this world could outshine the beauty of your spirit.'
    ],
    intensity: 'ethereal'
  },
  {
    id: 'demo-mia',
    recipient: 'Mia',
    recipientNick: 'Princess of Sunshine',
    sender: 'Elena',
    senderSignoff: 'With All My Love',
    relationship: 'bestfriend',
    theme: 'fairytale',
    message: 'Happy Princess Day to my partner-in-crime, my midnight call, and the brightest star in my universe! You conquer every dragon life throws at you with unmatched style.',
    photoUrl: '',
    portraitId: 'portrait-fairytale',
    virtues: [
      { icon: '🧚‍♀️', title: 'Pure Magic', desc: 'Turning everyday chaos into unforgettable adventures.' },
      { icon: '🌸', title: 'Fierce Loyalty', desc: 'The truest friend anyone in this realm could ever dream of.' },
      { icon: '🌟', title: 'Infinite Spark', desc: 'Your brilliance makes everyone around you want to shine.' }
    ],
    whispers: [
      'Thank you for always reminding me of who I am.',
      'Our laughs together are my favorite sound in the world.',
      'Always remember: you are unstoppable, your highness!'
    ],
    intensity: 'majestic'
  },
  {
    id: 'demo-clara',
    recipient: 'Clara',
    recipientNick: 'Little Starlight',
    sender: 'Dad & Mom',
    senderSignoff: 'Proudly & Lovingly',
    relationship: 'daughter',
    theme: 'celestial',
    message: 'From the moment you opened your eyes, our whole galaxy changed. Watching you grow into such a kind, wise, and courageous princess is the greatest royal honor of our lives.',
    photoUrl: '',
    portraitId: 'portrait-starlight',
    virtues: [
      { icon: '🌟', title: 'Curious Mind', desc: 'Seeking wonder and truth in every corner of the universe.' },
      { icon: '🕊️', title: 'Gentle Soul', desc: 'A kindness that heals and lifts up everyone you meet.' },
      { icon: '🪐', title: 'Limitless Future', desc: 'Every constellation is yours to explore and claim.' }
    ],
    whispers: [
      'Never lose that wondrous twinkle in your eyes.',
      'You are capable of moving mountains with your heart.',
      'We will always be your greatest cheerleaders.'
    ],
    intensity: 'ethereal'
  }
];

class RoyalStorage {
  static saveDraft(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('Could not save draft to localStorage:', e);
      return false;
    }
  }

  static loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DRAFT);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  static clearDraft() {
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAFT);
    } catch (e) {}
  }

  static getDemo(id = 'demo-sophia') {
    return DEMO_GREETINGS.find(d => d.id === id) || DEMO_GREETINGS[0];
  }
}

window.RoyalStorage = RoyalStorage;
window.DEMO_GREETINGS = DEMO_GREETINGS;
