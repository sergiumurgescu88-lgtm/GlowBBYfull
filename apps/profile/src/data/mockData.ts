import { ProfileData, TemplatePreset } from '../types';

export const DEFAULT_PROFILE: ProfileData = {
  stageName: 'Luna Starlight',
  tagline: '✨ Cozy vibes, high energy & chill conversation ✨',
  status: 'online',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  backgroundPreset: 'neon-violet',
  customBgColor: '#1e1035',
  gradientType: 'linear',
  cardOpacity: 0.75,
  cardBlur: 16,
  titleColor: '#f43f5e',
  textColor: '#f1f5f9',
  accentColor: '#8b5cf6',
  fontFamily: 'sans',
  borderRadius: 16,
  targetPlatform: 'chaturbate',

  showAboutMe: true,
  aboutMeText: "Welcome to my room! I'm a gamer, dancer, and certified coffee enthusiast. Say hi in the chat — I love meeting new friends from around the world! 💕",
  age: '23',
  location: 'Los Angeles, CA',
  languages: 'English & Spanish',
  zodiac: 'Leo ♌',
  interests: 'Gaming, Cosplay, Fitness, Anime',

  showRules: true,
  rules: [
    { id: '1', text: 'Be respectful to me and everyone in the room' },
    { id: '2', text: 'No recording, screenshotting, or redistributing content' },
    { id: '3', text: 'Tips dictate the show — check the tip menu below!' },
    { id: '4', text: 'Private messages are reserved for active tippers' },
    { id: '5', text: 'Good vibes only — relax and enjoy your stay ✨' },
  ],

  showTipMenu: true,
  tipItems: [
    { id: '1', tokens: 25, description: 'Blow a sweet kiss + shoutout' },
    { id: '2', tokens: 50, description: 'Tease & booty shake (30s)' },
    { id: '3', tokens: 100, description: 'Flash smile / favorite pose' },
    { id: '4', tokens: 250, description: 'Song dance request of your choice' },
    { id: '5', tokens: 500, description: 'Spin the mystery token prize wheel' },
    { id: '6', tokens: 1000, description: 'Exclusive 10-min C2C private invite' },
  ],

  showSocials: true,
  socials: [
    { platform: 'twitter', label: 'Twitter / X', username: '@LunaStarlight', enabled: true },
    { platform: 'instagram', label: 'Instagram', username: '@LunaStar_Live', enabled: true },
    { platform: 'onlyfans', label: 'OnlyFans', username: 'lunastarlight', enabled: true },
    { platform: 'fansly', label: 'Fansly', username: 'lunastarlight', enabled: true },
    { platform: 'throne', label: 'Wishlist (Throne)', username: 'lunastarlight', enabled: true },
    { platform: 'telegram', label: 'VIP Telegram', username: 't.me/lunastarlight', enabled: true },
  ],

  showGoal: true,
  goalTitle: '🎯 Goal: 4K 60FPS Streaming Camera Setup',
  goalCurrent: 1450,
  goalTarget: 2000,
  goalUnit: 'Tokens',

  showSchedule: true,
  schedule: [
    { day: 'Mon - Wed', time: '8:00 PM - 1:00 AM EST', active: true },
    { day: 'Thursday', time: 'VIP Private Sessions Only', active: true },
    { day: 'Friday - Sat', time: '9:00 PM - Late Night Party', active: true },
    { day: 'Sunday', time: 'Chill Acoustic Stream', active: true },
  ],

  showDmcaBadge: true,
  dmcaBadgeText: 'Protected by GLOW Models Automated Shield · All Rights Reserved',
};

export const BACKGROUND_PRESETS = [
  { id: 'neon-violet', name: 'Neon Twilight', css: 'linear-gradient(135deg, #2e0854 0%, #17072b 50%, #4a044e 100%)' },
  { id: 'cyber-dark', name: 'Cyberpunk Dark', css: 'linear-gradient(135deg, #0f172a 0%, #020617 50%, #1e1b4b 100%)' },
  { id: 'velvet-rose', name: 'Velvet Rose', css: 'linear-gradient(135deg, #4c0519 0%, #1c0309 60%, #831843 100%)' },
  { id: 'midnight-emerald', name: 'Midnight Emerald', css: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f172a 100%)' },
  { id: 'sunset-fire', name: 'Sunset Aura', css: 'linear-gradient(135deg, #7c2d12 0%, #3b0764 60%, #c026d3 100%)' },
  { id: 'pastel-dream', name: 'Pastel Dream', css: 'linear-gradient(135deg, #fbcfe8 0%, #e9d5ff 50%, #c7d2fe 100%)' },
  { id: 'dark-carbon', name: 'Carbon Stealth', css: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)' },
  { id: 'ocean-deep', name: 'Deep Ocean', css: 'linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #0284c7 100%)' },
  { id: 'gold-royale', name: 'Gold Royale', css: 'linear-gradient(135deg, #292524 0%, #1c1917 50%, #78350f 100%)' },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'velvet-noir',
    name: 'Velvet Noir',
    previewBg: 'linear-gradient(135deg, #4c0519 0%, #831843 100%)',
    data: {
      backgroundPreset: 'velvet-rose',
      titleColor: '#fb7185',
      accentColor: '#f43f5e',
      textColor: '#ffffff',
      cardOpacity: 0.8,
      cardBlur: 16,
      borderRadius: 16,
      fontFamily: 'serif',
    },
  },
  {
    id: 'cyber-neon',
    name: 'Cyberpunk Neon',
    previewBg: 'linear-gradient(135deg, #06b6d4 0%, #d946ef 100%)',
    data: {
      backgroundPreset: 'cyber-dark',
      titleColor: '#22d3ee',
      accentColor: '#e879f9',
      textColor: '#f8fafc',
      cardOpacity: 0.85,
      cardBlur: 20,
      borderRadius: 12,
      fontFamily: 'display',
    },
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald Luxe',
    previewBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    data: {
      backgroundPreset: 'midnight-emerald',
      titleColor: '#34d399',
      accentColor: '#10b981',
      textColor: '#f0fdf4',
      cardOpacity: 0.8,
      cardBlur: 16,
      borderRadius: 16,
      fontFamily: 'sans',
    },
  },
  {
    id: 'clean-mono',
    name: 'Minimal Clean',
    previewBg: 'linear-gradient(135deg, #27272a 0%, #09090b 100%)',
    data: {
      backgroundPreset: 'dark-carbon',
      titleColor: '#ffffff',
      accentColor: '#a1a1aa',
      textColor: '#e4e4e7',
      cardOpacity: 0.9,
      cardBlur: 12,
      borderRadius: 8,
      fontFamily: 'mono',
    },
  },
  {
    id: 'pastel-chic',
    name: 'Pastel Chic',
    previewBg: 'linear-gradient(135deg, #f472b6 0%, #c084fc 100%)',
    data: {
      backgroundPreset: 'pastel-dream',
      titleColor: '#831843',
      accentColor: '#be185d',
      textColor: '#1f2937',
      cardOpacity: 0.85,
      cardBlur: 16,
      borderRadius: 20,
      fontFamily: 'sans',
    },
  },
];

export const FAQS = [
  {
    question: 'Is this profile designer free to use?',
    answer:
      'Yes, 100% free with no hidden charges, watermarks, or subscription requirements. Glow Models provides this tool for creators to help broadcasters build a professional presence and attract more viewers effortlessly.',
  },
  {
    question: 'Do I need to know HTML to use this tool?',
    answer:
      'Not at all! Our visual editor allows you to choose backgrounds, edit tip menus, tweak colors, and toggle components with simple visual controls. When you are done, click "Finalize" to generate the code snippet or download your graphic ready to paste.',
  },
  {
    question: 'Which cam sites does this work with?',
    answer:
      'Our profile designer is calibrated for Chaturbate, MyFreeCams (MFC), Bongacams, Stripchat, Cam4, and any platform supporting custom bio HTML, BBCode, or image uploads.',
  },
  {
    question: 'Can I save my profile design?',
    answer:
      'Yes! Your design automatically saves directly to your browser storage as you make edits. You can also download high-resolution PNG copies or copy the HTML embed code at any moment.',
  },
  {
    question: 'How do I add my design to Chaturbate?',
    answer:
      'Log into your Chaturbate account, navigate to "Bio / About Me" in your broadcaster settings, copy the generated HTML snippet from our Finalize modal, and paste it directly into the About Me editor. Click save, and your new graphic layout will appear on your live room profile instantly!',
  },
];

export const PLATFORMS_DATA = [
  {
    name: 'Chaturbate',
    iconColor: '#ff6600',
    description: 'Chaturbate allows HTML in the "About Me" section. Simply paste the image code we provide to display your custom profile design.',
    tag: 'Full HTML Support',
  },
  {
    name: 'MyFreeCams',
    iconColor: '#0284c7',
    description: 'MFC profiles support HTML images. Upload your design to our hosting and use the provided code in your profile bio section.',
    tag: 'Bio Image Embed',
  },
  {
    name: 'Bongacams',
    iconColor: '#e11d48',
    description: 'Bongacams accepts image-based profiles. Add your custom design URL to create a professional-looking bio page.',
    tag: 'Direct Image Link',
  },
  {
    name: 'Stripchat',
    iconColor: '#7c3aed',
    description: 'Stripchat profiles support custom images. Use our generated code to enhance your profile appearance.',
    tag: 'Optimized 750px',
  },
  {
    name: 'Cam4',
    iconColor: '#ea580c',
    description: 'Cam4 allows profile customization with images. Our designer creates compatible formats for seamless integration.',
    tag: 'Compatible Formats',
  },
];

export const STEP_GUIDE = [
  {
    step: 1,
    title: 'Click "Start Designing"',
    description: 'Begin with a clean canvas or load an existing design. The editor opens with a random background to inspire creativity.',
  },
  {
    step: 2,
    title: 'Choose Your Background',
    description: 'Browse our collection of high-quality backgrounds, from elegant gradients to nature scenes. Click "Random" for instant inspiration.',
  },
  {
    step: 3,
    title: 'Add Components',
    description: 'Build your profile with pre-designed sections: About Me, Room Rules, Tip Menu, Social Media links, and more. Each one is fully customizable.',
  },
  {
    step: 4,
    title: 'Customize Colors & Fonts',
    description: 'Use the Settings panel to adjust title colors, text colors, background opacity, and font sizes to match your brand.',
  },
  {
    step: 5,
    title: 'Finalize & Export',
    description: "Happy with your design? Click 'Finalize' to generate an image. You'll get a URL and HTML code to paste directly into your profile.",
  },
];
