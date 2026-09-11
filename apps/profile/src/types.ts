export interface TipItem {
  id: string;
  tokens: number;
  description: string;
}

export interface RuleItem {
  id: string;
  text: string;
}

export interface SocialLinkItem {
  platform: 'twitter' | 'instagram' | 'onlyfans' | 'fansly' | 'tiktok' | 'telegram' | 'throne';
  label: string;
  username: string;
  enabled: boolean;
}

export interface ScheduleItem {
  day: string;
  time: string;
  active: boolean;
}

export interface ProfileData {
  stageName: string;
  tagline: string;
  status: 'online' | 'offline' | 'private' | 'away';
  avatarUrl: string;
  backgroundPreset: string;
  customBgColor: string;
  gradientType: 'linear' | 'radial' | 'mesh';
  cardOpacity: number; // 0.1 to 1.0
  cardBlur: number; // 0 to 24px
  titleColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'display' | 'mono';
  borderRadius: number; // 0 to 24px
  targetPlatform: 'chaturbate' | 'mfc' | 'stripchat' | 'bongacams' | 'cam4';
  
  // Section Toggles
  showAboutMe: boolean;
  aboutMeText: string;
  age: string;
  location: string;
  languages: string;
  zodiac: string;
  interests: string;

  showRules: boolean;
  rules: RuleItem[];

  showTipMenu: boolean;
  tipItems: TipItem[];

  showSocials: boolean;
  socials: SocialLinkItem[];

  showGoal: boolean;
  goalTitle: string;
  goalCurrent: number;
  goalTarget: number;
  goalUnit: string;

  showSchedule: boolean;
  schedule: ScheduleItem[];

  showDmcaBadge: boolean;
  dmcaBadgeText: string;
}

export interface ProfileLayoutTemplate {
  id: string;
  name: string;
  category: 'gaming' | 'luxury' | 'cozy' | 'party' | 'minimal';
  categoryLabel: string;
  tagline: string;
  description: string;
  previewBg: string;
  badge: string;
  accentColor: string;
  titleColor: string;
  fontFamily: 'sans' | 'serif' | 'display' | 'mono';
  highlights: string[];
  fullProfile: ProfileData;
  styleOnly: Partial<ProfileData>;
}

export interface TemplatePreset {
  id: string;
  name: string;
  previewBg: string;
  data: Partial<ProfileData>;
}

