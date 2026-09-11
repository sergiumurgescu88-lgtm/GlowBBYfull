import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PackagePlan,
  Campaign,
  Order,
  ProxyNode,
  UserAccount,
  DurationTier,
  Platform,
  PaymentMethod,
} from '../types';
import {
  INITIAL_PACKAGES,
  INITIAL_CAMPAIGNS,
  INITIAL_ORDERS,
  INITIAL_PROXY_NODES,
  INITIAL_USERS,
} from '../data/mockData';

interface AppContextType {
  packages: PackagePlan[];
  campaigns: Campaign[];
  orders: Order[];
  proxyNodes: ProxyNode[];
  users: UserAccount[];
  currentUser: UserAccount;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  selectedDuration: DurationTier;
  setSelectedDuration: (duration: DurationTier) => void;
  selectedPlatform: Platform;
  setSelectedPlatform: (platform: Platform) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'USD' | 'EUR' | 'RON';
  setCurrency: (c: 'USD' | 'EUR' | 'RON') => void;
  language: 'ro' | 'en';
  setLanguage: (l: 'ro' | 'en') => void;

  // Modals & checkout
  checkoutPlan: PackagePlan | null;
  setCheckoutPlan: (plan: PackagePlan | null) => void;
  isTrialModalOpen: boolean;
  setIsTrialModalOpen: (open: boolean) => void;
  trialRoomName: string;
  setTrialRoomName: (room: string) => void;
  trialPlatform: Platform;
  setTrialPlatform: (p: Platform) => void;

  // Actions
  formatPrice: (amountInUsd: number) => string;
  startTrial: (room: string, platform: Platform) => void;
  createOrder: (data: {
    plan: PackagePlan;
    duration: DurationTier;
    platform: Platform;
    roomTarget: string;
    amount: number;
    discount: number;
    promoCode?: string;
    paymentMethod: PaymentMethod;
    customerEmail: string;
    txHash?: string;
  }) => Order;
  updateCampaignStatus: (id: string, status: 'running' | 'paused' | 'completed') => void;
  boostCampaign: (id: string, delta: number) => void;
  addFundsToWallet: (amount: number) => void;
  updateUserBalance: (userId: string, delta: number) => void;
  updatePackagePrice: (pkgId: string, duration: DurationTier, price: number) => void;
  addPackage: (pkg: PackagePlan) => void;
  deletePackage: (pkgId: string) => void;
  approvePendingOrder: (orderId: string) => void;
  refundOrder: (orderId: string) => void;
  toggleProxyNode: (nodeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PACKAGES: 'glowstudio_packages_v1',
  CAMPAIGNS: 'glowstudio_campaigns_v1',
  ORDERS: 'glowstudio_orders_v1',
  NODES: 'glowstudio_nodes_v1',
  USERS: 'glowstudio_users_v1',
  CURRENT_USER_ID: 'glowstudio_curr_user_v1',
  LANG: 'glowstudio_lang_v1',
  CURRENCY: 'glowstudio_curr_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence loaders
  const [packages, setPackages] = useState<PackagePlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [proxyNodes, setProxyNodes] = useState<ProxyNode[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NODES);
    return saved ? JSON.parse(saved) : INITIAL_PROXY_NODES;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<DurationTier>('3hours');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('Chaturbate');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'RON'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.CURRENCY) as 'USD' | 'EUR' | 'RON') || 'EUR';
  });
  const [language, setLanguage] = useState<'ro' | 'en'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as 'ro' | 'en') || 'ro';
  });

  // Modals
  const [checkoutPlan, setCheckoutPlan] = useState<PackagePlan | null>(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  const [trialRoomName, setTrialRoomName] = useState<string>('');
  const [trialPlatform, setTrialPlatform] = useState<Platform>('Chaturbate');

  // Current active user
  const currentUser = users.find((u) => (isAdmin ? u.role === 'admin' : u.id === 'usr-model1')) || users[0];

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(proxyNodes));
  }, [proxyNodes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  // Live simulation background loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns((prev) =>
        prev.map((c) => {
          if (c.status !== 'running') return c;

          // Check expiration
          const now = Date.now();
          const exp = new Date(c.expiresAt).getTime();
          if (now >= exp) {
            return {
              ...c,
              status: 'completed',
              currentViewers: 0,
              logs: [
                ...c.logs,
                {
                  id: `log-${Date.now()}`,
                  timestamp: 'Chiar acum',
                  level: 'info',
                  message: 'Campania s-a finalizat conform duratei programate.',
                },
              ],
            };
          }

          // Fluctuate viewers slightly (+- 2% to look organic)
          const variance = Math.floor((Math.random() - 0.5) * (c.targetViewers * 0.04));
          const updatedViewers = Math.max(0, Math.min(c.targetViewers * 1.08, c.currentViewers + variance));

          return {
            ...c,
            currentViewers: Math.round(updatedViewers),
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Format price
  const formatPrice = useCallback(
    (amountInUsd: number) => {
      if (currency === 'EUR') {
        const eur = amountInUsd * 0.92;
        return `${eur.toFixed(2)} €`;
      }
      if (currency === 'RON') {
        const ron = amountInUsd * 4.65;
        return `${ron.toFixed(2)} RON`;
      }
      return `$${amountInUsd.toFixed(2)}`;
    },
    [currency]
  );

  // Start trial
  const startTrial = useCallback((room: string, platform: Platform) => {
    const cleanRoom = room.replace(/https?:\/\/(www\.)?(chaturbate|stripchat|bongacams|cam4|livejasmin)\.com\//gi, '').replace(/\//g, '').trim();
    const newCampaign: Campaign = {
      id: `trial-${Date.now()}`,
      roomUrl: `https://${platform.toLowerCase()}.com/${cleanRoom}`,
      roomName: cleanRoom || 'model_stream',
      platform,
      targetViewers: 50,
      currentViewers: 48,
      status: 'running',
      trafficType: 'anonymous',
      planName: 'Free Trial (50 Privitori Test)',
      durationHours: 0.25,
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      geoRegion: 'Global',
      rampSpeed: 'Instant',
      activeProxies: 52,
      logs: [
        {
          id: `log-${Date.now()}-1`,
          timestamp: 'Chiar acum',
          level: 'info',
          message: 'Test gratuit activat. Alocare 50 proxy-uri rezidențiale de mare viteză.',
        },
        {
          id: `log-${Date.now()}-2`,
          timestamp: 'Chiar acum',
          level: 'success',
          message: `Conexiuni stabilite cu succes pe camera ${platform}/${cleanRoom}.`,
        },
      ],
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
  }, []);

  // Create Order
  const createOrder = useCallback(
    (data: {
      plan: PackagePlan;
      duration: DurationTier;
      platform: Platform;
      roomTarget: string;
      amount: number;
      discount: number;
      promoCode?: string;
      paymentMethod: PaymentMethod;
      customerEmail: string;
      txHash?: string;
    }): Order => {
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const cleanRoom = data.roomTarget.replace(/https?:\/\/(www\.)?(chaturbate|stripchat|bongacams|cam4|livejasmin)\.com\//gi, '').replace(/\//g, '').trim();

      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString(),
        planId: data.plan.id,
        planTitle: `${data.plan.name} (${data.plan.viewers} Privitori)`,
        viewers: data.plan.viewers,
        duration: data.duration,
        platform: data.platform,
        roomTarget: cleanRoom,
        amount: data.amount,
        discount: data.discount,
        promoCode: data.promoCode,
        paymentMethod: data.paymentMethod,
        status: data.paymentMethod.startsWith('crypto_') && !data.txHash ? 'pending' : 'completed',
        txHash: data.txHash,
        customerEmail: data.customerEmail,
      };

      setOrders((prev) => [newOrder, ...prev]);

      // If user paid with wallet balance, deduct from user
      if (data.paymentMethod === 'wallet') {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === currentUser.id
              ? {
                  ...u,
                  walletBalance: Math.max(0, u.walletBalance - data.amount),
                  totalSpent: u.totalSpent + data.amount,
                  activeCampaignsCount: u.activeCampaignsCount + 1,
                }
              : u
          )
        );
      } else {
        // Record spending
        setUsers((prev) =>
          prev.map((u) =>
            u.id === currentUser.id
              ? {
                  ...u,
                  totalSpent: u.totalSpent + data.amount,
                  activeCampaignsCount: u.activeCampaignsCount + 1,
                }
              : u
          )
        );
      }

      // Calculate duration hours
      let hours = 3;
      if (data.duration === '12hours') hours = 12;
      if (data.duration === '24hours') hours = 24;
      if (data.duration === '7days') hours = 168;
      if (data.duration === '30days') hours = 720;

      // Automatically launch the campaign if completed
      if (newOrder.status === 'completed') {
        const newCampaign: Campaign = {
          id: `cmp-${Date.now().toString().slice(-4)}`,
          roomUrl: `https://${data.platform.toLowerCase()}.com/${cleanRoom}`,
          roomName: cleanRoom,
          platform: data.platform,
          targetViewers: data.plan.viewers,
          currentViewers: Math.round(data.plan.viewers * 0.96),
          status: 'running',
          trafficType: data.plan.category,
          planName: `${data.plan.name} (${data.plan.viewers} Privitori)`,
          durationHours: hours,
          startedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + hours * 3600 * 1000).toISOString(),
          geoRegion: 'US / Canada & Europe',
          rampSpeed: 'Smooth (Organic)',
          activeProxies: Math.round(data.plan.viewers * 1.05),
          logs: [
            {
              id: `log-${Date.now()}-1`,
              timestamp: 'Chiar acum',
              level: 'info',
              message: `Comandă ${orderId} achitată prin ${data.paymentMethod.toUpperCase()}. Alocare resurse...`,
            },
            {
              id: `log-${Date.now()}-2`,
              timestamp: 'Chiar acum',
              level: 'success',
              message: `Rulare inițiată pentru camera ${cleanRoom} (${data.platform}).`,
            },
          ],
        };

        setCampaigns((prev) => [newCampaign, ...prev]);
      }

      return newOrder;
    },
    [currentUser]
  );

  // Update Campaign status
  const updateCampaignStatus = useCallback((id: string, status: 'running' | 'paused' | 'completed') => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const logMsg =
          status === 'running'
            ? 'Campanie reluată.'
            : status === 'paused'
            ? 'Campanie pusă pe pauză de utilizator.'
            : 'Campanie oprită manual.';
        return {
          ...c,
          status,
          logs: [
            ...c.logs,
            {
              id: `log-${Date.now()}`,
              timestamp: 'Chiar acum',
              level: status === 'running' ? 'success' : 'warn',
              message: logMsg,
            },
          ],
        };
      })
    );
  }, []);

  // Boost campaign
  const boostCampaign = useCallback((id: string, delta: number) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newTarget = Math.max(10, c.targetViewers + delta);
        return {
          ...c,
          targetViewers: newTarget,
          currentViewers: Math.max(0, c.currentViewers + delta),
          logs: [
            ...c.logs,
            {
              id: `log-${Date.now()}`,
              timestamp: 'Chiar acum',
              level: 'success',
              message: `Boost manual aplicat: ${delta > 0 ? `+${delta}` : delta} privitori adiționali.`,
            },
          ],
        };
      })
    );
  }, []);

  // Wallet top up
  const addFundsToWallet = useCallback((amount: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              walletBalance: Number((u.walletBalance + amount).toFixed(2)),
            }
          : u
      )
    );
  }, [currentUser]);

  // Admin adjustments
  const updateUserBalance = useCallback((userId: string, delta: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              walletBalance: Math.max(0, Number((u.walletBalance + delta).toFixed(2))),
            }
          : u
      )
    );
  }, []);

  const updatePackagePrice = useCallback((pkgId: string, duration: DurationTier, price: number) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === pkgId
          ? {
              ...p,
              pricing: {
                ...p.pricing,
                [duration]: price,
              },
            }
          : p
      )
    );
  }, []);

  const addPackage = useCallback((pkg: PackagePlan) => {
    setPackages((prev) => [...prev, pkg]);
  }, []);

  const deletePackage = useCallback((pkgId: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== pkgId));
  }, []);

  const approvePendingOrder = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return { ...o, status: 'completed' };
      })
    );

    // Also spin up campaign for approved order
    const matchedOrder = orders.find((o) => o.id === orderId);
    if (matchedOrder) {
      let hours = 3;
      if (matchedOrder.duration === '12hours') hours = 12;
      if (matchedOrder.duration === '24hours') hours = 24;
      if (matchedOrder.duration === '7days') hours = 168;
      if (matchedOrder.duration === '30days') hours = 720;

      const newCampaign: Campaign = {
        id: `cmp-${Date.now().toString().slice(-4)}`,
        roomUrl: `https://${matchedOrder.platform.toLowerCase()}.com/${matchedOrder.roomTarget}`,
        roomName: matchedOrder.roomTarget,
        platform: matchedOrder.platform,
        targetViewers: matchedOrder.viewers,
        currentViewers: Math.round(matchedOrder.viewers * 0.95),
        status: 'running',
        trafficType: 'anonymous',
        planName: matchedOrder.planTitle,
        durationHours: hours,
        startedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + hours * 3600 * 1000).toISOString(),
        geoRegion: 'Global',
        rampSpeed: 'Smooth (Organic)',
        activeProxies: Math.round(matchedOrder.viewers * 1.05),
        logs: [
          {
            id: `log-${Date.now()}-1`,
            timestamp: 'Chiar acum',
            level: 'success',
            message: `Plată aprobată de administrator pentru comanda ${orderId}. Trafic activat!`,
          },
        ],
      };

      setCampaigns((prev) => [newCampaign, ...prev]);
    }
  }, [orders]);

  const refundOrder = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'refunded' } : o))
    );
  }, []);

  const toggleProxyNode = useCallback((nodeId: string) => {
    setProxyNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              status: n.status === 'online' ? 'offline' : 'online',
            }
          : n
      )
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        packages,
        campaigns,
        orders,
        proxyNodes,
        users,
        currentUser,
        isAdmin,
        setIsAdmin,
        selectedDuration,
        setSelectedDuration,
        selectedPlatform,
        setSelectedPlatform,
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        language,
        setLanguage,
        checkoutPlan,
        setCheckoutPlan,
        isTrialModalOpen,
        setIsTrialModalOpen,
        trialRoomName,
        setTrialRoomName,
        trialPlatform,
        setTrialPlatform,
        formatPrice,
        startTrial,
        createOrder,
        updateCampaignStatus,
        boostCampaign,
        addFundsToWallet,
        updateUserBalance,
        updatePackagePrice,
        addPackage,
        deletePackage,
        approvePendingOrder,
        refundOrder,
        toggleProxyNode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
