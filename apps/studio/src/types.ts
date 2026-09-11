export type Platform = 'Chaturbate' | 'Stripchat' | 'BongaCams' | 'Cam4' | 'LiveJasmin';

export type TrafficType = 'anonymous' | 'authenticated' | 'ai_chat';

export type DurationTier = '3hours' | '12hours' | '24hours' | '7days' | '30days';

export interface DurationOption {
  key: DurationTier;
  label: string;
  hours: number;
  multiplier: number;
}

export interface PackagePlan {
  id: string;
  name: string;
  category: TrafficType;
  viewers: number;
  pricing: Record<DurationTier, number>;
  features: string[];
  popular?: boolean;
  badge?: string;
  description: string;
}

export interface CampaignLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn';
  message: string;
}

export interface Campaign {
  id: string;
  roomUrl: string;
  roomName: string;
  platform: Platform;
  targetViewers: number;
  currentViewers: number;
  status: 'running' | 'paused' | 'completed' | 'queued';
  trafficType: TrafficType;
  planName: string;
  durationHours: number;
  startedAt: string;
  expiresAt: string;
  geoRegion: string;
  rampSpeed: 'Instant' | 'Smooth (Organic)' | 'Stealth';
  activeProxies: number;
  chatInteractionsPerHour?: number;
  logs: CampaignLog[];
}

export type PaymentMethod =
  | 'card'
  | 'crypto_usdt_trc20'
  | 'crypto_usdt_erc20'
  | 'crypto_btc'
  | 'crypto_eth'
  | 'crypto_sol'
  | 'wallet'
  | 'revolut';

export interface Order {
  id: string;
  date: string;
  planId: string;
  planTitle: string;
  viewers: number;
  duration: DurationTier;
  platform: Platform;
  roomTarget: string;
  amount: number;
  discount: number;
  promoCode?: string;
  paymentMethod: PaymentMethod;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  txHash?: string;
  customerEmail: string;
}

export interface ProxyNode {
  id: string;
  region: string;
  country: string;
  flag: string;
  activeSessions: number;
  maxCapacity: number;
  latency: number;
  status: 'online' | 'degraded' | 'offline';
  ipType: 'Residential 4G/5G' | 'Residential Fiber';
}

export interface UserAccount {
  id: string;
  email: string;
  role: 'admin' | 'client';
  walletBalance: number;
  totalSpent: number;
  activeCampaignsCount: number;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface RoomInspectionResult {
  roomName: string;
  platform: Platform;
  isOnline: boolean;
  currentOrganicViewers: number;
  currentPlatformRank: number;
  topPageRequirement: number;
  algorithmHealthScore: number;
  estimatedBoostJump: number;
  suggestedPackage: string;
}
