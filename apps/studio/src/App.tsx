import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { RankChecker } from './components/RankChecker';
import { FeaturesSection } from './components/FeaturesSection';
import { FaqSection } from './components/FaqSection';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminPanel } from './components/AdminPanel';
import { TrialModal } from './components/TrialModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';
import { PackagePlan, Platform } from './types';

const MainContent: React.FC = () => {
  const {
    isAdmin,
    activeTab,
    setActiveTab,
    checkoutPlan,
    setCheckoutPlan,
    isTrialModalOpen,
    setIsTrialModalOpen,
    trialRoomName,
    setTrialRoomName,
    trialPlatform,
    setTrialPlatform,
    packages,
  } = useApp();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Trigger trial modal from Hero
  const handleOpenTrial = (room: string, platform: Platform) => {
    setTrialRoomName(room);
    setTrialPlatform(platform);
    setIsTrialModalOpen(true);
  };

  // Trigger plan checkout from Pricing
  const handleSelectPlan = (plan: PackagePlan) => {
    setCheckoutPlan(plan);
  };

  // Trigger plan checkout from Inspector
  const handleApplyBoostFromInspector = (room: string, suggestedPlanId: string) => {
    const matched = packages.find((p) => p.id === suggestedPlanId) || packages[1];
    setCheckoutPlan(matched);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070708] text-zinc-300 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Navigation Header */}
      <Header onOpenWalletModal={() => setIsWalletModalOpen(true)} />

      {/* Main View Body */}
      <main className="flex-1">
        {isAdmin ? (
          /* Dedicated Admin Panel view */
          <AdminPanel />
        ) : (
          /* Client Views */
          <div>
            {activeTab === 'home' && (
              <>
                <HeroSection onOpenTrialModal={handleOpenTrial} />
                <PricingSection onSelectPlan={handleSelectPlan} />
                <RankChecker onApplyBoostForRoom={handleApplyBoostFromInspector} />
                <FeaturesSection />
                <FaqSection />
              </>
            )}

            {activeTab === 'pricing' && (
              <div className="pt-4">
                <PricingSection onSelectPlan={handleSelectPlan} />
              </div>
            )}

            {activeTab === 'inspector' && (
              <div className="pt-4">
                <RankChecker onApplyBoostForRoom={handleApplyBoostFromInspector} />
              </div>
            )}

            {activeTab === 'dashboard' && (
              <ClientDashboard
                onOpenWalletModal={() => setIsWalletModalOpen(true)}
                onExplorePlans={() => setActiveTab('pricing')}
              />
            )}

            {activeTab === 'features' && (
              <div className="pt-4">
                <FeaturesSection />
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="pt-4">
                <FaqSection />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Modals */}
      {isTrialModalOpen && (
        <TrialModal
          isOpen={isTrialModalOpen}
          onClose={() => setIsTrialModalOpen(false)}
          roomName={trialRoomName}
          platform={trialPlatform}
        />
      )}

      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
        />
      )}

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Footer */}
      {!isAdmin && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
