/**
 * THE ROYAL EXPERIENCE — Application Router & Lifecycle Coordinator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Audio Header Control
  const audioBtn = document.getElementById('global-audio-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', async () => {
      const isPlaying = window.royalAudio.toggleMusic();
      audioBtn.classList.toggle('playing', isPlaying);
    });
  }

  // Bind Modal Close Buttons and Backdrop Click
  const modals = document.querySelectorAll('.royal-modal-backdrop');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close-btn')) {
        modal.classList.remove('active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.classList.remove('active'));
    }
  });

  // Check URL parameters for Routing
  const urlParams = new URLSearchParams(window.location.search);
  const greetingParam = urlParams.get('g');
  const demoParam = urlParams.get('demo');

  const creatorSection = document.getElementById('creator-experience-section');
  const recipientSection = document.getElementById('recipient-experience-section');
  const errorSection = document.getElementById('corrupted-url-section');
  const brandTitle = document.querySelector('.brand-title');
  const brandEmblem = document.querySelector('.brand-emblem');
  const globalFooter = document.querySelector('footer');

  if (greetingParam) {
    // RECIPIENT MODE via URL
    const decodedGreeting = RoyalSharingEngine.decodeGreeting(greetingParam);

    if (decodedGreeting) {
      document.body.classList.add('recipient-view');
      if (creatorSection) creatorSection.style.display = 'none';
      if (errorSection) errorSection.style.display = 'none';
      if (recipientSection) {
        recipientSection.style.display = 'block';

        // Update brand header to celebrate her exclusively (no developer or creator links!)
        if (brandTitle) {
          brandTitle.textContent = `A PROCLAMATION FOR ${decodedGreeting.recipient.toUpperCase()}`;
        }
        if (brandEmblem) {
          brandEmblem.removeAttribute('href');
          brandEmblem.style.cursor = 'default';
        }

        // Hide generic creator footer in recipient view
        if (globalFooter) {
          globalFooter.style.display = 'none';
        }

        const journey = new RoyalRecipientJourney('recipient-stage-root', true);
        journey.init(decodedGreeting);
      }
    } else {
      // Malformed or corrupt URL
      if (creatorSection) creatorSection.style.display = 'none';
      if (recipientSection) recipientSection.style.display = 'none';
      if (errorSection) {
        errorSection.style.display = 'flex';
      }
    }
  } else if (demoParam) {
    // DEMO RECIPIENT MODE
    const demoGreeting = RoyalStorage.getDemo(demoParam);
    document.body.classList.add('recipient-view');
    if (creatorSection) creatorSection.style.display = 'none';
    if (errorSection) errorSection.style.display = 'none';
    if (recipientSection) {
      recipientSection.style.display = 'block';

      if (brandTitle) {
        brandTitle.textContent = `A PROCLAMATION FOR ${demoGreeting.recipient.toUpperCase()}`;
      }
      if (brandEmblem) {
        brandEmblem.removeAttribute('href');
        brandEmblem.style.cursor = 'default';
      }
      if (globalFooter) {
        globalFooter.style.display = 'none';
      }

      const journey = new RoyalRecipientJourney('recipient-stage-root', true);
      journey.init(demoGreeting);
    }
  } else {
    // CREATOR & LANDING MODE
    if (recipientSection) recipientSection.style.display = 'none';
    if (errorSection) errorSection.style.display = 'none';
    if (creatorSection) {
      creatorSection.style.display = 'block';
      const studio = new RoyalCreatorStudio();
      studio.init();
    }
  }
});
