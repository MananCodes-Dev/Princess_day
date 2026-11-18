/**
 * THE ROYAL EXPERIENCE — Shareable Greeting Engine & QR Generator
 * Ultra-compact URL encoding, authentic standard scannable QR generation, localhost detection.
 */

class RoyalSharingEngine {
  // Compress and encode greeting payload to an ultra-compact URL-safe string
  static encodeGreeting(greeting) {
    try {
      // Safety check: Prevent massive base64 data URIs from blowing up URL length
      let safePhoto = greeting.portraitId || 'portrait-gold';
      if (greeting.photoUrl && greeting.photoUrl.startsWith('http')) {
        safePhoto = greeting.photoUrl;
      }

      // Build ultra-compact object by omitting default boilerplate
      const compact = {
        r: greeting.recipient || 'Princess',
        s: greeting.sender || 'A Devoted Heart',
        m: greeting.message || ''
      };

      if (greeting.recipientNick && greeting.recipientNick !== 'Queen of My Heart' && greeting.recipientNick !== 'Her Royal Highness') {
        compact.n = greeting.recipientNick;
      }
      if (greeting.senderSignoff && greeting.senderSignoff !== 'Forever Devoted' && greeting.senderSignoff !== 'With Devotion') {
        compact.so = greeting.senderSignoff;
      }
      if (greeting.relationship && greeting.relationship !== 'romantic') {
        compact.rel = greeting.relationship;
      }
      if (greeting.theme && greeting.theme !== 'royal') {
        compact.t = greeting.theme;
      }
      if (safePhoto && safePhoto !== 'portrait-gold') {
        compact.p = safePhoto;
      }
      if (greeting.intensity && greeting.intensity !== 'ethereal') {
        compact.i = greeting.intensity;
      }

      // Check if virtues are custom (differ from defaults)
      const defaultVirtues = [
        { icon: '✦', title: 'Radiant Laughter', desc: 'A joy so pure it illuminates every shadowed corner of this world.' },
        { icon: '⚜', title: 'Sovereign Poise', desc: 'Walking through tempest and triumph with breathtaking grace and majesty.' },
        { icon: '🤍', title: 'Boundless Heart', desc: 'Loving everyone in your realm with tender, fierce, and sacred authenticity.' }
      ];
      const isDefaultVirtues = JSON.stringify(greeting.virtues || []) === JSON.stringify(defaultVirtues) || (greeting.virtues || []).length === 0;
      if (!isDefaultVirtues && Array.isArray(greeting.virtues) && greeting.virtues.length > 0) {
        compact.v = greeting.virtues;
      }

      // Check if whispers are custom
      const defaultWhispers = [
        'My heart chose you before my words could even fathom how.',
        'You are the dream I never knew I was allowed to wish for.',
        'No crown in this world could outshine the beauty of your spirit.'
      ];
      const isDefaultWhispers = JSON.stringify(greeting.whispers || []) === JSON.stringify(defaultWhispers) || (greeting.whispers || []).length === 0;
      if (!isDefaultWhispers && Array.isArray(greeting.whispers) && greeting.whispers.length > 0) {
        compact.w = greeting.whispers;
      }

      const json = JSON.stringify(compact);

      // Safe UTF-8 to Base64URL
      const utf8Bytes = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
      });
      const base64 = btoa(utf8Bytes)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      return base64;
    } catch (err) {
      console.error('Failed to encode greeting:', err);
      return null;
    }
  }

  // Decode URL-safe string back to a validated greeting payload (100% backward compatible!)
  static decodeGreeting(encodedStr) {
    if (!encodedStr) return null;
    try {
      // Revert base64url to standard base64
      let base64 = encodedStr.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }

      const binaryStr = atob(base64);
      const json = decodeURIComponent(binaryStr.split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const compact = JSON.parse(json);

      // Validate schema
      if (!compact || typeof compact !== 'object') return null;

      // Provide defaults for any omitted properties
      const defaultNick = compact.rel ? (RELATIONSHIP_TYPES.find(r => r.id === compact.rel)?.defaultNick || 'Queen of My Heart') : 'Queen of My Heart';

      const fullGreeting = {
        recipient: String(compact.r || 'Princess'),
        recipientNick: String(compact.n || defaultNick),
        sender: String(compact.s || 'A Devoted Heart'),
        senderSignoff: String(compact.so || 'Forever Devoted'),
        relationship: String(compact.rel || 'romantic'),
        theme: ROYAL_THEMES[compact.t] ? compact.t : (compact.t === 'garden' ? 'garden' : 'royal'),
        message: String(compact.m || ''),
        photoUrl: compact.p && (compact.p.startsWith('http') || compact.p.startsWith('data:') || compact.p.includes('/') || compact.p.endsWith('.jpg') || compact.p.endsWith('.png')) ? compact.p : '',
        portraitId: compact.p && PRESET_PORTRAITS.find(p => p.id === compact.p) ? compact.p : 'portrait-gold',
        virtues: Array.isArray(compact.v) && compact.v.length > 0 ? compact.v : [
          { icon: '✦', title: 'Radiant Laughter', desc: 'A joy so pure it illuminates every shadowed corner of this world.' },
          { icon: '⚜', title: 'Sovereign Poise', desc: 'Walking through tempest and triumph with breathtaking grace and majesty.' },
          { icon: '🤍', title: 'Boundless Heart', desc: 'Loving everyone in your realm with tender, fierce, and sacred authenticity.' }
        ],
        whispers: Array.isArray(compact.w) && compact.w.length > 0 ? compact.w : [
          'My heart chose you before my words could even fathom how.',
          'You are the dream I never knew I was allowed to wish for.',
          'No crown in this world could outshine the beauty of your spirit.'
        ],
        intensity: compact.i || 'ethereal'
      };

      return fullGreeting;
    } catch (err) {
      console.warn('Malformed or corrupt greeting parameter:', err);
      return null;
    }
  }

  // Generate full shareable URL
  static getShareUrl(greeting, customBaseUrl = null) {
    const code = this.encodeGreeting(greeting);
    let base = customBaseUrl;
    if (!base) {
      base = (window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'file://')
        ? (window.location.origin + window.location.pathname)
        : window.location.href.split('?')[0];
    }
    return `${base}?g=${code}`;
  }

  // Copy URL with clipboard API & fallback
  static async copyShareUrl(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (e) {}
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      return false;
    }
  }

  // Native share dialog on mobile
  static async shareNative(greeting, url) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Royal Proclamation for ${greeting.recipient}`,
          text: `A personalized Princess Day royal decree has been prepared for Her Royal Highness, ${greeting.recipient}! 👑✦`,
          url: url
        });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  // Automatic free URL shortener (TinyURL)
  static async shortenUrl(longUrl) {
    try {
      const endpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const shortUrl = (await res.text()).trim();
        if (shortUrl.startsWith('http')) {
          return shortUrl;
        }
      }
    } catch (e) {
      console.warn('URL shortener fallback:', e);
    }
    return null;
  }

  // Generate 100% Real, Standard Scannable QR Code SVG
  static generateQRCodeSVG(text) {
    try {
      if (window.QRCodeGenerator) {
        const qr = window.QRCodeGenerator.create(text, 1); // Level L for crisp fast scanning
        return qr.createSvg(5, 4);
      }
    } catch (e) {
      console.error('Standard QR generator error:', e);
    }
    // Fallback if not loaded
    return `<div style="padding: 20px; color: #10051B;">QR Generator initializing...</div>`;
  }
}

window.RoyalSharingEngine = RoyalSharingEngine;
