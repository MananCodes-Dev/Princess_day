/**
 * THE ROYAL EXPERIENCE — Creator Studio & Live Preview Engine
 * Haute Horlogerie aesthetic: Imperial cartouches, orbital gemstone selectors
 */

class RoyalCreatorStudio {
  constructor() {
    this.formData = {
      recipient: '',
      recipientNick: 'Queen of My Heart',
      sender: '',
      senderSignoff: 'Forever Devoted',
      relationship: 'romantic',
      theme: 'royal',
      message: '',
      photoUrl: '',
      portraitId: 'portrait-gold',
      virtues: [
        { icon: '✦', title: 'Radiant Laughter', desc: 'A joy so pure it illuminates every shadowed corner of this world.' },
        { icon: '⚜', title: 'Sovereign Poise', desc: 'Walking through tempest and triumph with breathtaking grace and majesty.' },
        { icon: '🤍', title: 'Boundless Heart', desc: 'Loving everyone in your realm with tender, fierce, and sacred authenticity.' }
      ],
      whispers: [
        'My heart chose you before my words could even fathom how.',
        'You are the dream I never knew I was allowed to wish for.',
        'No crown in this world could outshine the beauty of your spirit.'
      ],
      intensity: 'ethereal'
    };

    this.recipientJourney = null;
  }

  init() {
    this.loadInitialData();
    this.bindFormInputs();
    this.bindThemePicker();
    this.bindRelationshipCartouches();
    this.bindGemstoneIntensity();
    this.bindPhotoHandlers();
    this.bindDeviceViewportToggle();
    this.bindShareGenerator();
    this.bindTemplatesButton();

    // Initialize embedded live preview
    this.initLivePreview();
  }

  loadInitialData() {
    // Check if there is an autosaved draft
    const saved = RoyalStorage.loadDraft();
    if (saved && saved.recipient) {
      this.formData = Object.assign(this.formData, saved);
    } else {
      // Default to demo sample so creator has an inspiring starting point
      const demo = DEMO_GREETINGS[0];
      this.formData = Object.assign(this.formData, demo);
    }

    this.populateFormFields();
  }

  populateFormFields() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('input-recipient', this.formData.recipient);
    setVal('input-nickname', this.formData.recipientNick);
    setVal('input-sender', this.formData.sender);
    setVal('input-signoff', this.formData.senderSignoff);
    setVal('input-message', this.formData.message);

    // Update message char counter
    const counter = document.getElementById('message-char-count');
    if (counter) counter.textContent = (this.formData.message || '').length;

    // Set relationship cartouche
    const cartouches = document.querySelectorAll('.cartouche-option');
    cartouches.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-rel') === this.formData.relationship);
    });

    // Set theme card
    const themes = document.querySelectorAll('.theme-card');
    themes.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-theme-id') === this.formData.theme);
    });

    // Set portrait preset
    const avatars = document.querySelectorAll('.preset-avatar-item');
    avatars.forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-portrait-id') === this.formData.portraitId);
    });

    // Set gemstone intensity
    const gemstones = document.querySelectorAll('.gemstone-radio-card');
    gemstones.forEach(g => {
      g.classList.toggle('active', g.getAttribute('data-intensity') === this.formData.intensity);
    });
  }

  bindFormInputs() {
    const bindSync = (id, propKey) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', (e) => {
        this.formData[propKey] = e.target.value.trim();
        this.clearFieldError(id);
        this.syncLivePreview();
        this.autosave();
      });
    };

    bindSync('input-recipient', 'recipient');
    bindSync('input-nickname', 'recipientNick');
    bindSync('input-sender', 'sender');
    bindSync('input-signoff', 'senderSignoff');
    bindSync('input-message', 'message');

    // Message counter
    const msgInput = document.getElementById('input-message');
    const counter = document.getElementById('message-char-count');
    if (msgInput && counter) {
      msgInput.addEventListener('input', () => {
        counter.textContent = msgInput.value.length;
      });
    }
  }

  bindThemePicker() {
    const cards = document.querySelectorAll('.theme-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const themeId = card.getAttribute('data-theme-id');
        this.formData.theme = themeId;

        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        applyTheme(themeId);
        this.syncLivePreview();
        this.autosave();
      });
    });
  }

  bindRelationshipCartouches() {
    const cartouches = document.querySelectorAll('.cartouche-option');
    cartouches.forEach(cartouche => {
      cartouche.addEventListener('click', () => {
        const relId = cartouche.getAttribute('data-rel');
        this.formData.relationship = relId;

        cartouches.forEach(c => c.classList.remove('active'));
        cartouche.classList.add('active');

        // Automatically suggest appropriate royal title/nickname if user hasn't typed custom one
        const relConfig = RELATIONSHIP_TYPES.find(r => r.id === relId);
        if (relConfig) {
          const nickInput = document.getElementById('input-nickname');
          if (nickInput && (!nickInput.value || nickInput.value === this.formData.recipientNick)) {
            nickInput.value = relConfig.defaultNick;
            this.formData.recipientNick = relConfig.defaultNick;
          }
        }

        this.syncLivePreview();
        this.autosave();
      });
    });
  }

  bindGemstoneIntensity() {
    const gemstones = document.querySelectorAll('.gemstone-radio-card');
    gemstones.forEach(card => {
      card.addEventListener('click', () => {
        const val = card.getAttribute('data-intensity');
        this.formData.intensity = val;

        gemstones.forEach(g => g.classList.remove('active'));
        card.classList.add('active');

        if (window.royalParticles) {
          window.royalParticles.setIntensity(val);
        }
        this.autosave();
      });
    });
  }

  bindPhotoHandlers() {
    // Preset portraits
    const presetItems = document.querySelectorAll('.preset-avatar-item');
    presetItems.forEach(item => {
      item.addEventListener('click', () => {
        const pId = item.getAttribute('data-portrait-id');
        this.formData.portraitId = pId;
        this.formData.photoUrl = ''; // Clear custom upload

        presetItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        this.syncLivePreview();
        this.autosave();
      });
    });

    // Custom File Upload
    const dropzone = document.getElementById('photo-dropzone');
    const fileInput = document.getElementById('photo-file-input');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.processImageFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.processImageFile(e.target.files[0]);
        }
      });
    }

    // Direct Image URL tab
    const urlInput = document.getElementById('input-photo-url');
    if (urlInput) {
      urlInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val.startsWith('http')) {
          this.formData.photoUrl = val;
          presetItems.forEach(i => i.classList.remove('active'));
          this.syncLivePreview();
          this.autosave();
        }
      });
    }
  }

  processImageFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo is larger than 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Optimize and compress via Canvas to max 480x480 thumbnail
        const canvas = document.createElement('canvas');
        const maxDim = 480;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        this.formData.photoUrl = compressedDataUrl;

        // Clear preset selection highlights
        document.querySelectorAll('.preset-avatar-item').forEach(i => i.classList.remove('active'));

        const previewStatus = document.getElementById('upload-status-text');
        if (previewStatus) {
          previewStatus.textContent = `✓ Archival photo mounted (${Math.round(compressedDataUrl.length / 1024)}KB)`;
          previewStatus.style.color = 'var(--color-gold)';
        }

        this.syncLivePreview();
        this.autosave();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  bindDeviceViewportToggle() {
    const buttons = document.querySelectorAll('.device-tab-btn');
    const frame = document.getElementById('preview-device-frame');
    if (!frame) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        frame.className = `device-frame view-${view}`;
      });
    });
  }

  bindTemplatesButton() {
    const btn = document.getElementById('btn-inspire-template');
    if (!btn) return;

    const templates = [
      'To the most radiant princess in the realm: your kindness turns every ordinary moment into starlight. Thank you for making our world gentler and infinitely brighter.',
      'Happy Princess Day to my eternal sovereign! May your year ahead be filled with grand adventures, endless joy, and the boundless love you deserve.',
      'From the depths of my soul, today I honor the grace, resilience, and brilliance that you bring into my life every single day. Long live your beautiful spirit.'
    ];

    btn.addEventListener('click', () => {
      const randomMsg = templates[Math.floor(Math.random() * templates.length)];
      const msgInput = document.getElementById('input-message');
      if (msgInput) {
        msgInput.value = randomMsg;
        this.formData.message = randomMsg;
        const counter = document.getElementById('message-char-count');
        if (counter) counter.textContent = randomMsg.length;
        this.syncLivePreview();
        this.autosave();
      }
    });
  }

  initLivePreview() {
    this.recipientJourney = new RoyalRecipientJourney('preview-stage-root');
    this.recipientJourney.init(this.formData);
  }

  syncLivePreview() {
    if (!this.recipientJourney) return;
    this.recipientJourney.greeting = this.formData;
    this.recipientJourney.renderAllScenes();
  }

  validateForm() {
    let isValid = true;

    if (!this.formData.recipient || this.formData.recipient.trim().length === 0) {
      this.showFieldError('input-recipient', 'Please enter the Princess’s name');
      isValid = false;
    }

    if (!this.formData.sender || this.formData.sender.trim().length === 0) {
      this.showFieldError('input-sender', 'Please enter your name');
      isValid = false;
    }

    if (!this.formData.message || this.formData.message.trim().length < 5) {
      this.showFieldError('input-message', 'Please write a heartfelt royal proclamation (min. 5 characters)');
      isValid = false;
    }

    return isValid;
  }

  showFieldError(inputId, errorText) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const parent = input.closest('.form-group');
    if (parent) {
      parent.classList.add('has-error');
      const errEl = parent.querySelector('.form-error');
      if (errEl) errEl.textContent = errorText;
    }
  }

  clearFieldError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const parent = input.closest('.form-group');
    if (parent) {
      parent.classList.remove('has-error');
    }
  }

  bindShareGenerator() {
    const btn = document.getElementById('btn-generate-share');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (!this.validateForm()) {
        const firstError = document.querySelector('.has-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const shareUrl = RoyalSharingEngine.getShareUrl(this.formData);
      this.openShareModal(shareUrl);
    });
  }

  openShareModal(url) {
    const modal = document.getElementById('share-modal');
    if (!modal) return;

    let activeUrl = url;
    const linkInput = document.getElementById('share-url-input');
    if (linkInput) linkInput.value = activeUrl;

    const qrContainer = document.getElementById('modal-qr-container');
    const updateQR = (targetUrl) => {
      if (qrContainer) {
        qrContainer.innerHTML = RoyalSharingEngine.generateQRCodeSVG(targetUrl);
      }
    };
    updateQR(activeUrl);

    // Detect if running on localhost / 127.0.0.1
    const isLocalhost = window.location.hostname === '127.0.0.1' || 
                        window.location.hostname === 'localhost' || 
                        window.location.protocol === 'file:';
    const localhostBanner = document.getElementById('localhost-warning-banner');
    if (localhostBanner) {
      localhostBanner.style.display = isLocalhost ? 'block' : 'none';
      const customDomainInput = document.getElementById('custom-domain-input');
      const applyBtn = document.getElementById('btn-apply-custom-domain');

      if (applyBtn && customDomainInput) {
        applyBtn.onclick = () => {
          let customDomain = customDomainInput.value.trim();
          if (customDomain) {
            if (!customDomain.startsWith('http://') && !customDomain.startsWith('https://')) {
              customDomain = 'https://' + customDomain;
            }
            activeUrl = RoyalSharingEngine.getShareUrl(this.formData, customDomain);
            if (linkInput) linkInput.value = activeUrl;
            updateQR(activeUrl);
            this.showToast('Public link and QR Code updated! ✦');
          }
        };
      }
    }

    // Shorten Link Button
    const shortenBtn = document.getElementById('btn-modal-shorten');
    if (shortenBtn) {
      shortenBtn.onclick = async () => {
        shortenBtn.textContent = 'Shortening...';
        shortenBtn.disabled = true;
        const short = await RoyalSharingEngine.shortenUrl(activeUrl);
        shortenBtn.disabled = false;
        if (short) {
          activeUrl = short;
          if (linkInput) linkInput.value = activeUrl;
          updateQR(activeUrl);
          shortenBtn.textContent = '✓ Link Shortened';
          this.showToast('Tiny short link created! ✦');
        } else {
          shortenBtn.textContent = 'Shorten Failed';
          setTimeout(() => { shortenBtn.textContent = '✦ Shorten Link'; }, 2000);
        }
      };
    }

    // Copy Button
    const copyBtn = document.getElementById('btn-modal-copy');
    if (copyBtn) {
      copyBtn.onclick = async () => {
        const success = await RoyalSharingEngine.copyShareUrl(activeUrl);
        if (success) {
          copyBtn.textContent = '✓ Sovereign Link Copied!';
          copyBtn.classList.add('btn-primary');
          this.showToast('Royal Link copied to clipboard! ✦');
          setTimeout(() => {
            copyBtn.textContent = 'Copy Unique Link';
          }, 2500);
        }
      };
    }

    // Native Share Button
    const nativeBtn = document.getElementById('btn-modal-native-share');
    if (nativeBtn) {
      if (navigator.share) {
        nativeBtn.style.display = 'inline-flex';
        nativeBtn.onclick = () => {
          RoyalSharingEngine.shareNative(this.formData, activeUrl);
        };
      } else {
        nativeBtn.style.display = 'none';
      }
    }

    // Preview as Her button
    const testBtn = document.getElementById('btn-modal-test-link');
    if (testBtn) {
      testBtn.onclick = () => {
        window.open(activeUrl, '_blank');
      };
    }

    modal.classList.add('active');
  }

  showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'royal-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  autosave() {
    RoyalStorage.saveDraft(this.formData);
  }
}

window.RoyalCreatorStudio = RoyalCreatorStudio;
