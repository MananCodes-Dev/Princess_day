/**
 * THE ROYAL EXPERIENCE — Recipient Cinematic Journey (The 7 Scenes)
 * Art-directed haute couture experience: Vector sigils, Archival Folios, Arcana cards.
 */

// Bespoke Royal Vector Sigils (Zero system emojis!)
const ROYAL_SIGILS = {
  crown: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="sigilGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFF9E6"/><stop offset="50%" stop-color="#D4AF37"/><stop offset="100%" stop-color="#94711E"/></linearGradient></defs><path fill="url(#sigilGold)" d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"/></svg>`,
  fleurDeLis: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C11.5 4 10 6.5 7.5 7.5C5.5 8.3 3 8 3 10C3 12 5.5 12 6.5 12C9 12 10.5 10.5 11 9.5C11 11.5 10.5 13.5 8.5 15C6.5 16.5 5 17 5 18.5C5 20.5 7.5 21 9 20C10.5 19 11.5 17.5 12 16C12.5 17.5 13.5 19 15 20C16.5 21 19 20.5 19 18.5C19 17 17.5 16.5 15.5 15C13.5 13.5 13 11.5 13 9.5C13.5 10.5 15 12 17.5 12C18.5 12 21 12 21 10C21 8 18.5 8.3 16.5 7.5C14 6.5 12.5 4 12 2M11 18H13V22H11V18Z"/></svg>`,
  starCorona: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2L14.39 8.26L21 9.27L16.5 14.14L17.77 21L12 17.77L6.23 21L7.5 14.14L3 9.27L9.61 8.26L12 2Z"/></svg>`,
  radiantLotus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C11.5 5.5 9 8 6 9C7 11 9 12.5 12 13C15 12.5 17 11 18 9C15 8 12.5 5.5 12 3M12 14C8 14 4 16 3 19C7 20 17 20 21 19C20 16 16 14 12 14Z"/></svg>`,
  celestialGem: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16 2H8L2 8L12 22L22 8L16 2M14.6 4L18.6 8H14.1L12.9 4H14.6M11.1 4L9.9 8H5.4L9.4 4H11.1M11 9.5V17.5L5.4 9.5H11M13 9.5H18.6L13 17.5V9.5Z"/></svg>`,
  moonflower: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12A8 8 0 0 1 12 20C10.5 20 9.1 19.6 7.9 18.8C9.5 17.7 10.5 15.9 10.5 13.8C10.5 10.6 8.3 8 5.3 7.5C6.9 5.3 9.3 4 12 4Z"/></svg>`
};

class RoyalRecipientJourney {
  constructor(containerId = 'recipient-stage-root', isRecipientView = false) {
    this.containerId = containerId;
    this.isRecipientView = isRecipientView;
    this.container = document.getElementById(containerId);
    this.greeting = null;
    this.currentScene = 1;
    this.totalScenes = 7;
    this.unlockedWhispers = new Set();
    this.envelopeOpened = false;
  }

  init(greetingData) {
    this.greeting = greetingData;
    this.currentScene = 1;
    this.unlockedWhispers.clear();
    this.envelopeOpened = false;
    this.container = document.getElementById(this.containerId);

    // Apply greeting theme & atmosphere
    applyTheme(this.greeting.theme);
    if (window.royalParticles) {
      window.royalParticles.setIntensity(this.greeting.intensity || 'ethereal');
    }

    this.mountStructure();
    this.renderAllScenes();
    this.showScene(1);
    this.setupSceneNavigation();
  }

  mountStructure() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div id="${this.containerId}-scene-1" class="scene-container active-scene"></div>
      <div id="${this.containerId}-scene-2" class="scene-container"></div>
      <div id="${this.containerId}-scene-3" class="scene-container"></div>
      <div id="${this.containerId}-scene-4" class="scene-container"></div>
      <div id="${this.containerId}-scene-5" class="scene-container"></div>
      <div id="${this.containerId}-scene-6" class="scene-container"></div>
      <div id="${this.containerId}-scene-7" class="scene-container"></div>
    `;
  }

  renderAllScenes() {
    this.renderScene1();
    this.renderScene2();
    this.renderScene3();
    this.renderScene4();
    this.renderScene5();
    this.renderScene6();
    this.renderScene7();
    this.updateProgressIndicator();
  }

  // SCENE 1 — THE ARRIVAL
  renderScene1() {
    const el = document.getElementById(`${this.containerId}-scene-1`);
    if (!el) return;

    el.innerHTML = `
      <div class="royal-card royal-card-elevated animate-fade-in-scale" style="max-width: 620px; width: 100%; text-align: center; margin: auto;">
        <div class="filigree-corner filigree-tl"></div>
        <div class="filigree-corner filigree-tr"></div>
        <div class="filigree-corner filigree-bl"></div>
        <div class="filigree-corner filigree-br"></div>

        <div style="width: 54px; height: 54px; margin: 0 auto var(--space-md); fill: var(--color-gold); filter: drop-shadow(0 0 16px var(--color-gold-glow));" class="animate-float">
          ${ROYAL_SIGILS.crown}
        </div>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: var(--space-xs);">
          <span style="height: 1px; width: 30px; background: var(--border-gold);"></span>
          <span class="numeral-roman">DECRETUM IMPERIALE</span>
          <span style="height: 1px; width: 30px; background: var(--border-gold);"></span>
        </div>

        <h1 class="font-display shimmer-text" style="font-size: var(--text-4xl); margin-bottom: var(--space-2xs); line-height: 1.1;">
          ${this.escapeHtml(this.greeting.recipient)}
        </h1>
        
        <p class="font-script" style="font-size: var(--text-2xl); color: var(--color-gold-light); margin-bottom: var(--space-lg);">
          "${this.escapeHtml(this.greeting.recipientNick)}"
        </p>

        <p class="font-editorial" style="font-size: var(--text-lg); color: var(--text-secondary); max-width: 480px; margin: 0 auto var(--space-2xl); line-height: 1.6;">
          An enchanted digital universe has been commissioned and crafted exclusively in your sovereign honor by 
          <strong style="color: var(--color-gold-light); font-weight: 600;">${this.escapeHtml(this.greeting.sender)}</strong>.
        </p>

        <button type="button" class="btn btn-primary btn-lg btn-glow btn-enter-kingdom-action" style="width: 100%; max-width: 340px; margin: 0 auto;">
          <span>Enter Your Realm</span>
          <span style="font-size: 1.1rem; line-height: 0;">✦</span>
        </button>
      </div>
    `;

    const btn = el.querySelector('.btn-enter-kingdom-action');
    if (btn) {
      btn.addEventListener('click', () => {
        window.royalAudio.ensureContext();
        if (window.royalAudio.isMuted) {
          window.royalAudio.toggleMusic();
          const audioHeaderBtn = document.getElementById('global-audio-btn');
          if (audioHeaderBtn) audioHeaderBtn.classList.add('playing');
        } else {
          window.royalAudio.playChime();
        }
        this.nextScene();
      });
    }
  }

  // SCENE 2 — THE ROYAL INVITATION
  renderScene2() {
    const el = document.getElementById(`${this.containerId}-scene-2`);
    if (!el) return;

    el.innerHTML = `
      <div style="max-width: 600px; width: 100%; margin: auto; text-align: center;">
        <span class="numeral-roman" style="margin-bottom: var(--space-2xs);">SCENA II • EPISTULA REGALIS</span>
        <h2 class="font-display" style="font-size: var(--text-2xl); margin-bottom: var(--space-2xs);">
          The Wax-Sealed Decree
        </h2>
        <p style="font-family: var(--font-editorial); font-style: italic; font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-md);">
          Break the royal seal to unfold the handwritten sovereign invitation.
        </p>

        <div class="envelope-stage">
          <div class="royal-envelope ${this.envelopeOpened ? 'opened' : ''}">
            <div class="envelope-ribbon-v"></div>
            <div class="envelope-flap"></div>
            
            <div class="wax-seal" style="${this.envelopeOpened ? 'display: none;' : ''}" title="Break the Sovereign Seal">
              <div class="wax-seal-crest-svg">
                ${ROYAL_SIGILS.fleurDeLis}
              </div>
            </div>

            <div class="parchment-letter">
              <span style="font-family: var(--font-display); font-size: 0.72rem; letter-spacing: 3px; color: #7A5C14; text-transform: uppercase; font-weight: 700;">
                DECREE OF NOBILITY
              </span>
              <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #3A0C16; margin: 6px 0;">
                To Lady ${this.escapeHtml(this.greeting.recipient)}
              </h3>
              <p style="font-family: var(--font-editorial); font-size: 1.05rem; color: #4A1A26; line-height: 1.45; font-style: italic;">
                "You are hereby crowned with love and joy, celebrated for the radiant grace you bestow upon this realm."
              </p>
              <span style="font-family: var(--font-script); font-size: 1.4rem; color: #8C2D3E; margin-top: 6px;">
                — ${this.escapeHtml(this.greeting.sender)}
              </span>
            </div>
          </div>
        </div>

        <div style="margin-top: var(--space-2xl); display: flex; justify-content: center; gap: var(--space-md);">
          <button type="button" class="btn btn-primary btn-unfold-action" style="${this.envelopeOpened ? 'display: inline-flex;' : 'display: none;'}">
            <span>Unfold Full Proclamation</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;

    const envelope = el.querySelector('.royal-envelope');
    const seal = el.querySelector('.wax-seal');
    const unfoldBtn = el.querySelector('.btn-unfold-action');

    const handleOpen = () => {
      if (this.envelopeOpened) return;
      this.envelopeOpened = true;
      window.royalAudio.playSealBreak();

      if (seal) seal.classList.add('breaking-seal');
      setTimeout(() => {
        if (envelope) envelope.classList.add('opened');
        window.royalAudio.playChime();
        if (unfoldBtn) {
          unfoldBtn.style.display = 'inline-flex';
          unfoldBtn.classList.add('animate-fade-in-up');
        }
      }, 350);
    };

    if (seal) seal.addEventListener('click', handleOpen);
    if (envelope) envelope.addEventListener('click', handleOpen);
    if (unfoldBtn) {
      unfoldBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextScene();
      });
    }
  }

  // SCENE 3 — THE REVELATION
  renderScene3() {
    const el = document.getElementById(`${this.containerId}-scene-3`);
    if (!el) return;

    el.innerHTML = `
      <div class="royal-card royal-card-elevated animate-fade-in-scale" style="max-width: 680px; width: 100%; margin: auto; text-align: center;">
        <div class="filigree-corner filigree-tl"></div>
        <div class="filigree-corner filigree-tr"></div>
        <div class="filigree-corner filigree-bl"></div>
        <div class="filigree-corner filigree-br"></div>

        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: var(--space-2xs);">
          <span style="height: 1px; width: 24px; background: var(--border-gold);"></span>
          <span class="numeral-roman">SCENA III • PROCLAMATIO</span>
          <span style="height: 1px; width: 24px; background: var(--border-gold);"></span>
        </div>

        <div style="display: inline-block; padding: 0.35rem 1rem; border: 1px solid var(--border-gold); background: rgba(212, 175, 55, 0.1); margin-bottom: var(--space-sm); border-radius: var(--radius-xs);">
          <span style="font-family: var(--font-display); font-size: var(--text-2xs); letter-spacing: 0.18em; color: var(--color-gold-light); text-transform: uppercase;">
            ${this.escapeHtml(this.greeting.recipientNick)}
          </span>
        </div>

        <h2 class="font-display shimmer-text" style="font-size: var(--text-3xl); margin-bottom: var(--space-md); line-height: 1.15;">
          Happy Princess Day, ${this.escapeHtml(this.greeting.recipient)}!
        </h2>

        <div style="position: relative; padding: var(--space-xl); background: rgba(8, 2, 14, 0.55); border-radius: var(--radius-xs); border-left: 2px solid var(--color-gold); margin-bottom: var(--space-xl); text-align: left; box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);">
          <p class="font-editorial" style="font-size: var(--text-lg); line-height: 1.75; color: var(--text-primary); font-style: italic; white-space: pre-wrap;">${this.escapeHtml(this.greeting.message)}</p>
        </div>

        <p class="font-script" style="font-size: var(--text-2xl); color: var(--color-gold-light); margin-bottom: var(--space-2xl);">
          ${this.escapeHtml(this.greeting.senderSignoff)},<br>${this.escapeHtml(this.greeting.sender)}
        </p>

        <div style="display: flex; justify-content: center; gap: var(--space-md); flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-prev-action">← Previous</button>
          <button type="button" class="btn btn-primary btn-next-action">
            <span>Witness Archival Portrait</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;

    const prevBtn = el.querySelector('.btn-prev-action');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevScene());
    const nextBtn = el.querySelector('.btn-next-action');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextScene());
  }

  // SCENE 4 — THE ARCHIVAL FOLIO
  renderScene4() {
    const el = document.getElementById(`${this.containerId}-scene-4`);
    if (!el) return;

    let imageSrc = '';
    if (this.greeting.photoUrl) {
      imageSrc = this.greeting.photoUrl;
    } else if (this.greeting.recipient && this.greeting.recipient.toLowerCase().includes('suhani')) {
      imageSrc = 'assets/images/suhani.jpg';
    } else {
      const preset = PRESET_PORTRAITS.find(p => p.id === this.greeting.portraitId) || PRESET_PORTRAITS[0];
      imageSrc = preset.svg;
    }

    el.innerHTML = `
      <div style="max-width: 600px; width: 100%; margin: auto; text-align: center;">
        <span class="numeral-roman" style="margin-bottom: var(--space-2xs);">SCENA IV • ARCHIVUM REGIS</span>
        <h2 class="font-display" style="font-size: var(--text-2xl); margin-bottom: var(--space-2xs);">
          The Sovereign Archival Folio
        </h2>
        <p style="font-family: var(--font-editorial); font-style: italic; font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-md);">
          Mounted in gold leaf corners upon heavy hand-pressed vellum.
        </p>

        <div class="archival-folio animate-fade-in-scale">
          <div class="photo-mount-corner mount-tl"></div>
          <div class="photo-mount-corner mount-tr"></div>
          <div class="photo-mount-corner mount-bl"></div>
          <div class="photo-mount-corner mount-br"></div>

          <div class="archival-image-frame">
            <img src="${imageSrc}" alt="Imperial Folio of ${this.escapeHtml(this.greeting.recipient)}" loading="lazy" />
          </div>

          <div class="archival-caption-box">
            <div class="archival-caption-title">
              Her Royal Highness, ${this.escapeHtml(this.greeting.recipient)}
            </div>
            <span class="archival-registry-tag">
              IMPERIAL REGISTRY • DECREE N° VII • SACRED KEEPSAKE
            </span>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-2xl); flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-prev-action">← Previous</button>
          <button type="button" class="btn btn-primary btn-next-action">
            <span>Unveil Arcana of Grace</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;

    const prevBtn = el.querySelector('.btn-prev-action');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevScene());
    const nextBtn = el.querySelector('.btn-next-action');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextScene());
  }

  // SCENE 5 — ARCANA OF GRACE
  renderScene5() {
    const el = document.getElementById(`${this.containerId}-scene-5`);
    if (!el) return;

    const sigilIcons = [ROYAL_SIGILS.starCorona, ROYAL_SIGILS.crown, ROYAL_SIGILS.radiantLotus];
    const romanNumerals = ['I', 'II', 'III'];

    const cardsHtml = this.greeting.virtues.map((v, i) => `
      <div class="arcana-talisman-card animate-fade-in-up delay-${(i + 1) * 100}">
        <span class="numeral-roman" style="margin-bottom: var(--space-xs); font-size: 0.7rem;">ARCANA ${romanNumerals[i]}</span>
        <div class="arcana-sigil-icon">
          ${sigilIcons[i % sigilIcons.length]}
        </div>
        <h3 class="arcana-title">${this.escapeHtml(v.title || 'Virtue')}</h3>
        <p class="arcana-desc">${this.escapeHtml(v.desc || 'A rare sovereign quality that illuminates this realm.')}</p>
      </div>
    `).join('');

    el.innerHTML = `
      <div style="max-width: 860px; width: 100%; margin: auto; text-align: center;">
        <span class="numeral-roman" style="margin-bottom: var(--space-2xs);">SCENA V • TALISMANS OF NOBILITY</span>
        <h2 class="font-display shimmer-text" style="font-size: var(--text-2xl); margin-bottom: var(--space-2xs);">
          The Arcana of ${this.escapeHtml(this.greeting.recipient)}
        </h2>
        <p style="font-family: var(--font-editorial); font-size: var(--text-base); color: var(--text-secondary); max-width: 520px; margin: 0 auto var(--space-lg); line-height: 1.5;">
          Three sacred qualities woven into your spirit that command reverence across the realm.
        </p>

        <div class="arcana-grid">
          ${cardsHtml}
        </div>

        <div style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-xl); flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-prev-action">← Previous</button>
          <button type="button" class="btn btn-primary btn-next-action">
            <span>Enter Astral Conservatory</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;

    const prevBtn = el.querySelector('.btn-prev-action');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevScene());
    const nextBtn = el.querySelector('.btn-next-action');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextScene());
  }

  // SCENE 6 — THE ASTRAL CONSERVATORY
  renderScene6() {
    const el = document.getElementById(`${this.containerId}-scene-6`);
    if (!el) return;

    const whispers = this.greeting.whispers || [
      'My heart chose you before my words could even fathom how.',
      'You are the dream I never knew I was allowed to wish for.',
      'No crown in this world could outshine the beauty of your spirit.'
    ];

    const lanternIcons = [ROYAL_SIGILS.moonflower, ROYAL_SIGILS.starCorona, ROYAL_SIGILS.celestialGem];
    const titles = ['The Midnight Moonflower', 'The Astral Starburst', 'The Celestial Gemstone'];

    const nodesHtml = whispers.map((w, idx) => {
      const isRevealed = this.unlockedWhispers.has(String(idx));
      return `
        <div class="conservatory-node ${isRevealed ? 'revealed' : ''}" data-index="${idx}">
          <div class="conservatory-lantern">
            <div class="conservatory-lantern-svg">
              ${lanternIcons[idx]}
            </div>
          </div>
          <div class="conservatory-label">${titles[idx]}</div>
          <div class="conservatory-whisper-card">
            "${this.escapeHtml(w)}"
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div style="max-width: 800px; width: 100%; margin: auto; text-align: center;">
        <span class="numeral-roman" style="margin-bottom: var(--space-2xs);">SCENA VI • HORTUS SECRETUS</span>
        <h2 class="font-display shimmer-text" style="font-size: var(--text-2xl); margin-bottom: var(--space-2xs);">
          The Astral Conservatory
        </h2>
        <p style="font-family: var(--font-editorial); font-size: var(--text-base); color: var(--text-secondary); margin-bottom: var(--space-xs);">
          Touch each suspended botanical lantern to release a whispered secret into the night.
        </p>

        <div class="whisper-counter" style="font-family: var(--font-display); font-size: var(--text-2xs); letter-spacing: 0.2em; color: var(--color-gold); margin-bottom: var(--space-lg);">
          DISCOVERED: ${this.unlockedWhispers.size} / 3
        </div>

        <div class="conservatory-cluster">
          ${nodesHtml}
        </div>

        <div style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-xl); flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-prev-action">← Previous</button>
          <button type="button" class="btn btn-primary btn-next-action">
            <span>Ascend to Coronation</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;

    const nodes = el.querySelectorAll('.conservatory-node');
    const counter = el.querySelector('.whisper-counter');

    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const idx = node.getAttribute('data-index');
        node.classList.toggle('revealed');

        if (node.classList.contains('revealed')) {
          this.unlockedWhispers.add(idx);
          window.royalAudio.playChime();
        } else {
          this.unlockedWhispers.delete(idx);
        }

        const count = this.unlockedWhispers.size;
        if (counter) counter.textContent = `DISCOVERED: ${count} / 3`;
      });
    });

    const prevBtn = el.querySelector('.btn-prev-action');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevScene());
    const nextBtn = el.querySelector('.btn-next-action');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextScene());
  }

  // SCENE 7 — THE CORONATION & FINALE
  renderScene7() {
    const el = document.getElementById(`${this.containerId}-scene-7`);
    if (!el) return;

    // Recipient View Signoff: Pure intimate devotion, zero marketing/dev buttons
    const recipientDedicationHtml = `
      <div style="padding: var(--space-lg) 0; border-top: 1px solid var(--border-gold-subtle); margin-top: var(--space-xl);">
        <p class="font-script" style="font-size: var(--text-2xl); color: var(--color-gold-light); margin-bottom: 4px;">
          Forever & Always,
        </p>
        <p class="font-display" style="font-size: var(--text-sm); letter-spacing: 0.16em; color: var(--color-gold); text-transform: uppercase;">
          ${this.escapeHtml(this.greeting.sender)}
        </p>
      </div>
    `;

    // Creator Preview Signoff
    const creatorFooterHtml = `
      <hr style="border: 0; border-top: 1px solid var(--border-gold-subtle); margin-bottom: var(--space-lg);" />
      <div style="background: rgba(8, 2, 14, 0.45); padding: var(--space-md); border-radius: var(--radius-xs); border: 1px solid var(--border-glass);">
        <p style="font-family: var(--font-editorial); font-style: italic; font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-2xs);">
          Inspired by this universe?
        </p>
        <a href="index.html" class="btn btn-secondary btn-sm" style="display: inline-flex;">
          <span>Commission a Greeting for Your Princess →</span>
        </a>
      </div>
    `;

    el.innerHTML = `
      <div class="royal-card royal-card-elevated animate-fade-in-scale" style="max-width: 700px; width: 100%; margin: auto; text-align: center;">
        <div class="filigree-corner filigree-tl"></div>
        <div class="filigree-corner filigree-tr"></div>
        <div class="filigree-corner filigree-bl"></div>
        <div class="filigree-corner filigree-br"></div>

        <div class="coronation-crown-box coronation-reveal">
          <div class="coronation-crown-svg">
            ${ROYAL_SIGILS.crown}
          </div>
        </div>

        <span class="numeral-roman" style="margin-bottom: var(--space-2xs);">SCENA VII • CORONATIO SOLEMNIS</span>
        <h2 class="font-display shimmer-text" style="font-size: var(--text-3xl); margin-bottom: var(--space-2xs); line-height: 1.15;">
          Long Live Princess ${this.escapeHtml(this.greeting.recipient)}!
        </h2>

        <p class="font-script" style="font-size: var(--text-xl); color: var(--color-gold-light); margin-bottom: var(--space-md);">
          Crowned in Grace, Sovereign of All Hearts
        </p>

        <p class="font-editorial" style="font-size: var(--text-base); color: var(--text-secondary); max-width: 540px; margin: 0 auto var(--space-xl); line-height: 1.65;">
          May your journey ahead be forever blessed with wonder, enduring devotion, and unbounded light. 
          Remember that true royalty lives within the courage, gentleness, and beauty of your soul.
        </p>

        <div style="display: flex; justify-content: center; gap: var(--space-sm); flex-wrap: wrap; margin-bottom: var(--space-lg);">
          <button type="button" class="btn btn-secondary btn-replay-action">
            <span>↺ Replay Journey</span>
          </button>
          <button type="button" class="btn btn-primary btn-cert-action">
            <span>📜 View Royal Charter Certificate</span>
          </button>
        </div>

        ${this.isRecipientView ? recipientDedicationHtml : creatorFooterHtml}
      </div>
    `;

    const replayBtn = el.querySelector('.btn-replay-action');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        this.envelopeOpened = false;
        this.unlockedWhispers.clear();
        this.renderAllScenes();
        this.showScene(1);
      });
    }

    const certBtn = el.querySelector('.btn-cert-action');
    if (certBtn) certBtn.addEventListener('click', () => this.openCertificateModal());
  }

  showScene(sceneNumber) {
    if (sceneNumber < 1 || sceneNumber > this.totalScenes) return;

    const currentEl = document.getElementById(`${this.containerId}-scene-${this.currentScene}`);
    if (currentEl) {
      currentEl.classList.remove('active-scene');
    }

    this.currentScene = sceneNumber;
    const nextEl = document.getElementById(`${this.containerId}-scene-${this.currentScene}`);
    if (nextEl) {
      nextEl.classList.add('active-scene');
      
      if (this.containerId === 'preview-stage-root') {
        const frame = document.getElementById('preview-device-frame');
        if (frame) frame.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // Sound effect on scene transition
    if (sceneNumber === 7) {
      window.royalAudio.playCoronationFanfare();
    } else if (sceneNumber > 1) {
      window.royalAudio.playChime();
    }

    this.updateProgressIndicator();
  }

  nextScene() {
    this.showScene(this.currentScene + 1);
  }

  prevScene() {
    this.showScene(this.currentScene - 1);
  }

  updateProgressIndicator() {
    const fill = document.getElementById('recipient-progress-fill');
    if (fill) {
      const pct = (this.currentScene / this.totalScenes) * 100;
      fill.style.width = `${pct}%`;
    }

    const dots = document.querySelectorAll('.scene-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === this.currentScene);
    });
  }

  setupSceneNavigation() {
    const dots = document.querySelectorAll('.scene-dot');
    dots.forEach((dot, idx) => {
      dot.onclick = () => this.showScene(idx + 1);
    });
  }

  openCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;

    const dateStr = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const certContainer = document.getElementById('certificate-content-target');
    if (certContainer) {
      certContainer.innerHTML = `
        <div style="background: #FFFDF7; color: #2B070D; padding: 3rem 2.5rem; border-radius: 4px; border: 12px double #D4AF37; box-shadow: 0 15px 50px rgba(0,0,0,0.6); text-align: center; position: relative; background-image: var(--paper-grain-texture);">
          <div style="width: 48px; height: 48px; margin: 0 auto 0.75rem; fill: #D4AF37;">
            ${ROYAL_SIGILS.crown}
          </div>
          <span style="font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 5px; color: #7A5C14; text-transform: uppercase; font-weight: 800;">
            OFFICIAL ROYAL CHARTER • ANNO DOMINI MMXXVI
          </span>
          <h2 style="font-family: var(--font-display); font-size: 1.85rem; color: #3A0710; margin: 0.5rem 0 1.25rem; letter-spacing: 0.05em;">
            Certificate of Sovereign Honor & Royalty
          </h2>
          <p style="font-family: var(--font-editorial); font-size: 1.2rem; color: #4A121E; font-style: italic; max-width: 500px; margin: 0 auto 2rem; line-height: 1.65;">
            Be it solemnly recorded across all realms that <strong>${this.escapeHtml(this.greeting.recipient)}</strong> is hereby coronated as a true Princess of Infinite Grace, Radiance, and Majesty.
          </p>
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem; border-top: 1px solid #E2D3B8; padding-top: 1.5rem;">
            <div style="text-align: left;">
              <p style="font-family: var(--font-script); font-size: 1.7rem; color: #690F20; margin: 0; line-height: 1;">${this.escapeHtml(this.greeting.sender)}</p>
              <span style="font-family: var(--font-display); font-size: 0.65rem; letter-spacing: 2px; color: #7A5C14; text-transform: uppercase; font-weight: 700;">Sovereign Commissioner</span>
            </div>
            
            <div style="width: 60px; height: 60px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #FFF6D6 0%, #D4AF37 55%, #7A5C14 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(122, 92, 20, 0.5); border: 2px solid #FFF;">
              <div style="width: 28px; height: 28px; fill: #2B070D;">
                ${ROYAL_SIGILS.fleurDeLis}
              </div>
            </div>

            <div style="text-align: right;">
              <p style="font-family: var(--font-sans); font-size: 0.85rem; font-weight: 700; color: #3A0710; margin: 0;">${dateStr}</p>
              <span style="font-family: var(--font-display); font-size: 0.65rem; letter-spacing: 2px; color: #7A5C14; text-transform: uppercase; font-weight: 700;">Date of Proclamation</span>
            </div>
          </div>
        </div>
      `;
    }

    modal.classList.add('active');
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.RoyalRecipientJourney = RoyalRecipientJourney;
