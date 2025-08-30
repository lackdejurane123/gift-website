// Application data
const appData = {
  "welcomeText": "ଆଇ ହୋପ୍ ଦାଟ ୟୁ ଆର୍ ୱେଲ୍ ମଇ ଲୋଭ",
  "buttonText": "click here for the same regular thingy😝 ",
  "surpriseMainText": "you held my shirt that day,\n like the world would slip\n if you let go.\n \nfunny.. \nit's almost september now\n but my chest\n still remembers \nthe weight \of your hands.",
  "spoilerHiddenText": "please hold my shirt again.",
  "spoilerRevealedText": " I love you, Sandhya. Always. Forever. I think this is understood.",
  "footerText": "",
  "gift1Title": "I FOUND NEW FLOWERS TODAY!!!! 💐",
  "voucherCode": "0pi5xe38zxyd5",
  "colors": {
    "beige": "#F5F5DC",
    "pastelPink": "#FFB6C1",
    "lightPink": "#FFC0CB",
    "gold": "#FFD700",
    "softGold": "#F4A460",
    "lightGrey": "#888888"
  }
};

// Audio Context for Web Audio API
let audioContext = null;
let backgroundMusic = null;

// Initialize audio context
function initAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  } catch (error) {
    console.log('Audio context not available:', error);
    return null;
  }
}

// Create chime sound using Web Audio API
function playChime() {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create a gentle chime sound
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5 + index * 0.2);
      
      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + 2 + index * 0.2);
    });
  } catch (error) {
    console.log('Chime sound not available:', error);
  }
}

// Create ambient background music
function startBackgroundMusic() {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create a gentle, ambient background tone
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode1 = ctx.createGain();
    const gainNode2 = ctx.createGain();
    
    oscillator1.connect(gainNode1);
    oscillator2.connect(gainNode2);
    gainNode1.connect(ctx.destination);
    gainNode2.connect(ctx.destination);
    
    // Soft, harmonic frequencies
    oscillator1.frequency.setValueAtTime(220, ctx.currentTime); // A3
    oscillator2.frequency.setValueAtTime(330, ctx.currentTime); // E4
    
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    // Very gentle volume
    gainNode1.gain.setValueAtTime(0, ctx.currentTime);
    gainNode2.gain.setValueAtTime(0, ctx.currentTime);
    gainNode1.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
    gainNode2.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 3);
    
    oscillator1.start();
    oscillator2.start();
    
    // Store references for potential cleanup
    backgroundMusic = { oscillator1, oscillator2, gainNode1, gainNode2 };
  } catch (error) {
    console.log('Background music not available:', error);
  }
}

// Petals animation system
class PetalsManager {
  constructor() {
    this.container = document.getElementById('petalsContainer');
    this.petals = [];
    this.isIntense = false;
    this.isRunning = false;
  }
  
  createPetal() {
    if (!this.container) return null;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Random properties
    const isGold = Math.random() < 0.3;
    const size = Math.random() < 0.3 ? 'large' : Math.random() < 0.5 ? 'small' : '';
    
    if (isGold) petal.classList.add('gold');
    if (size) petal.classList.add(size);
    
    // Random position and timing
    const leftPosition = Math.random() * 100;
    const animationDuration = this.isIntense ? 4 + Math.random() * 3 : 8 + Math.random() * 6;
    const delay = Math.random() * 1;
    
    petal.style.left = leftPosition + '%';
    petal.style.animationDuration = animationDuration + 's';
    petal.style.animationDelay = delay + 's';
    
    // Add some horizontal drift
    const drift = (Math.random() - 0.5) * 40;
    petal.style.setProperty('--drift', drift + 'px');
    
    this.container.appendChild(petal);
    this.petals.push(petal);
    
    // Remove petal after animation
    setTimeout(() => {
      if (petal && petal.parentNode) {
        petal.parentNode.removeChild(petal);
        const index = this.petals.indexOf(petal);
        if (index > -1) {
          this.petals.splice(index, 1);
        }
      }
    }, (animationDuration + delay + 1) * 1000);
    
    return petal;
  }
  
  startAnimation() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    const animate = () => {
      if (!this.isRunning) return;
      
      this.createPetal();
      
      // Create new petals at intervals
      const interval = this.isIntense ? 200 : 1000;
      const randomDelay = Math.random() * 500;
      
      setTimeout(animate, interval + randomDelay);
    };
    
    // Start the animation loop
    animate();
    
    // Create initial petals immediately
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.createPetal(), i * 300);
    }
  }
  
  makeIntense() {
    this.isIntense = true;
    this.container.classList.add('petals-intense');
    
    // Create burst of petals
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        this.createPetal();
      }, i * 80);
    }
  }
  
  stop() {
    this.isRunning = false;
  }
}

// Application controller
class HeartfeltApp {
  constructor() {
    this.petalsManager = new PetalsManager();
    this.isTransitioning = false;
    this.spoilerRevealed = false;
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    this.loadContent();
    this.bindEvents();
    
    // Start petals animation after a short delay
    setTimeout(() => {
      this.petalsManager.startAnimation();
    }, 500);
    
    // Initialize audio context on first user interaction
    const initAudioOnce = () => {
      initAudio();
      document.removeEventListener('click', initAudioOnce);
    };
    document.addEventListener('click', initAudioOnce);
  }
  
  loadContent() {
    const elements = {
      'welcomeText': appData.welcomeText,
      'surpriseMainText': appData.surpriseMainText,
      'footerText': appData.footerText,
      'voucherCode': appData.voucherCode
    };
    
    Object.keys(elements).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = elements[id];
      }
    });
    
    // Set spoiler text
    const spoilerText = document.getElementById('spoilerText');
    if (spoilerText) {
      spoilerText.textContent = appData.spoilerHiddenText;
    }
  }
  
  bindEvents() {
    const tapButton = document.getElementById('tapButton');
    if (tapButton) {
      tapButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleTransition();
      });
    }
    
    // Spoiler button
    const spoilerButton = document.getElementById('spoilerButton');
    if (spoilerButton) {
      spoilerButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSpoilerReveal();
      });
    }
    
    // Single Gift button
    const giftButton = document.getElementById('giftButton');
    if (giftButton) {
      giftButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.showGiftScreen('gift1');
      });
    }
    
    // Back from Gift
    const backFromGift1 = document.getElementById('backFromGift1');
    if (backFromGift1) {
      backFromGift1.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSurpriseScreen();
      });
    }
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !this.isTransitioning) {
        const surpriseScreen = document.getElementById('surpriseScreen');
        if (surpriseScreen && !surpriseScreen.classList.contains('visible')) {
          e.preventDefault();
          this.handleTransition();
        }
      }
    });
  }
  
  async handleTransition() {
    if (this.isTransitioning) return;
    
    console.log('Starting transition...'); // Debug log
    this.isTransitioning = true;
    
    const welcomeScreen = document.getElementById('welcomeScreen');
    const surpriseScreen = document.getElementById('surpriseScreen');
    const tapButton = document.getElementById('tapButton');
    
    if (!welcomeScreen || !surpriseScreen) {
      console.error('Screen elements not found');
      this.isTransitioning = false;
      return;
    }
    
    console.log('Elements found, proceeding with transition'); // Debug log
    
    // Disable button
    if (tapButton) {
      tapButton.disabled = true;
      tapButton.style.cursor = 'default';
    }
    
    // Play chime sound
    playChime();
    
    // Make petals intense
    this.petalsManager.makeIntense();
    
    // Fade out welcome screen
    welcomeScreen.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'translateY(-20px)';
    
    // Wait for fade out
    await this.sleep(800);
    
    // Hide welcome screen
    welcomeScreen.style.display = 'none';
    
    // Show and animate surprise screen
    surpriseScreen.style.display = 'flex';
    surpriseScreen.classList.remove('hidden');
    
    // Force reflow
    surpriseScreen.offsetHeight;
    
    // Animate in
    surpriseScreen.style.opacity = '1';
    surpriseScreen.style.transform = 'translateY(0)';
    surpriseScreen.classList.add('visible');
    
    console.log('Transition completed'); // Debug log
    
    // Start background music after a moment
    setTimeout(() => {
      startBackgroundMusic();
    }, 1500);
    
    this.isTransitioning = false;
  }
  
  handleSpoilerReveal() {
    if (this.spoilerRevealed) return;
    
    console.log('Spoiler reveal triggered'); // Debug log
    
    const spoilerButton = document.getElementById('spoilerButton');
    const spoilerText = document.getElementById('spoilerText');
    
    if (!spoilerButton || !spoilerText) return;
    
    this.spoilerRevealed = true;
    
    // Add revealed class for styling
    spoilerButton.classList.add('revealed');
    
    // Change the text with animation
    spoilerText.style.transition = 'opacity 0.3s ease';
    spoilerText.style.opacity = '0';
    
    setTimeout(() => {
      spoilerText.textContent = appData.spoilerRevealedText;
      spoilerText.style.opacity = '1';
    }, 300);
    
    // Disable further clicks
    spoilerButton.style.cursor = 'default';
    spoilerButton.disabled = true;
  }
  
  async showGiftScreen(giftType) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    console.log('Showing gift screen:', giftType); // Debug log
    
    const surpriseScreen = document.getElementById('surpriseScreen');
    const giftScreen = document.getElementById(giftType + 'Screen');
    
    if (!surpriseScreen || !giftScreen) {
      console.error('Gift screen elements not found');
      this.isTransitioning = false;
      return;
    }
    
    // Fade out surprise screen
    surpriseScreen.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
    surpriseScreen.style.opacity = '0';
    surpriseScreen.style.transform = 'translateY(-20px)';
    
    await this.sleep(400);
    
    // Hide surprise screen
    surpriseScreen.style.display = 'none';
    surpriseScreen.classList.remove('visible');
    
    // Show gift screen
    giftScreen.style.display = 'flex';
    giftScreen.classList.remove('hidden');
    
    // Force reflow
    giftScreen.offsetHeight;
    
    // Animate in
    giftScreen.style.opacity = '1';
    giftScreen.style.transform = 'translateY(0)';
    giftScreen.classList.add('visible');
    
    this.isTransitioning = false;
  }
  
  async showSurpriseScreen() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    console.log('Returning to surprise screen'); // Debug log
    
    const surpriseScreen = document.getElementById('surpriseScreen');
    const gift1Screen = document.getElementById('gift1Screen');
    
    // Find the currently visible gift screen
    let currentGiftScreen = null;
    if (gift1Screen && gift1Screen.classList.contains('visible')) {
      currentGiftScreen = gift1Screen;
    }
    
    if (!currentGiftScreen || !surpriseScreen) {
      this.isTransitioning = false;
      return;
    }
    
    // Fade out current gift screen
    currentGiftScreen.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
    currentGiftScreen.style.opacity = '0';
    currentGiftScreen.style.transform = 'translateY(-20px)';

    await this.sleep(400);
    
    // Hide gift screen
    currentGiftScreen.style.display = 'none';
    currentGiftScreen.classList.remove('visible');
    
    // Show surprise screen
    surpriseScreen.style.display = 'flex';
    surpriseScreen.classList.remove('hidden');
    
    // Force reflow
    surpriseScreen.offsetHeight;
    
    // Animate in
    surpriseScreen.style.opacity = '1';
    surpriseScreen.style.transform = 'translateY(0)';
    surpriseScreen.classList.add('visible');
    
    this.isTransitioning = false;
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global app instance
let app;

// Initialize the application
function initApp() {
  if (!app) {
    console.log('Initializing heartfelt app...');
    app = new HeartfeltApp();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Handle visibility change to pause/resume audio
document.addEventListener('visibilitychange', () => {
  if (audioContext) {
    if (document.hidden) {
      if (audioContext.state === 'running') {
        audioContext.suspend();
      }
    } else {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }
  }
});

// Add dynamic CSS for better petal animations
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
  .petal {
    animation-fill-mode: forwards;
    will-change: transform, opacity;
  }
  
  @keyframes float {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(50vh) translateX(var(--drift, 0px)) rotate(180deg);
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-10vh) translateX(var(--drift, 0px)) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes floatIntense {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg) scale(1);
      opacity: 0;
    }
    15% {
      opacity: 0.9;
    }
    50% {
      transform: translateY(50vh) translateX(var(--drift, 0px)) rotate(180deg) scale(1.3);
      opacity: 0.9;
    }
    85% {
      opacity: 0.9;
    }
    100% {
      transform: translateY(-10vh) translateX(var(--drift, 0px)) rotate(360deg) scale(1);
      opacity: 0;
    }
  }
  
  .petals-intense .petal {
    animation-name: floatIntense;
  }
`;

// Add the style when DOM is ready
if (document.head) {
  document.head.appendChild(dynamicStyle);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.head.appendChild(dynamicStyle);
  });
}