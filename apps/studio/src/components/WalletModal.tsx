import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  X,
  CreditCard,
  QrCode,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, addFundsToWallet, formatPrice, language } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [method, setMethod] = useState<'card' | 'crypto'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const presets = [
    { amount: 25, bonus: 0 },
    { amount: 50, bonus: 0 },
    { amount: 100, bonus: 5 },
    { amount: 250, bonus: 10 },
  ];

  const bonusAmount = (selectedAmount * (presets.find((p) => p.amount === selectedAmount)?.bonus || 0)) / 100;
  const totalCredited = selectedAmount + bonusAmount;

  const handleTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addFundsToWallet(totalCredited);
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#0c0d12] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                {language === 'ro' ? 'Alimentare Portofel Glow' : 'Top Up Glow Wallet'}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Sold curent: <span className="text-purple-400 font-bold">{formatPrice(currentUser.walletBalance)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {success ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Fonduri Adăugate cu Succes!</h4>
              <p className="text-xs text-zinc-400">
                Portofelul tău a fost creditat cu <span className="font-bold text-white">{formatPrice(totalCredited)}</span>.
              </p>
            </div>
          ) : (
            <>
              {/* Presets */}
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                  Selectează Suma
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.amount}
                      type="button"
                      onClick={() => setSelectedAmount(p.amount)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        selectedAmount === p.amount
                          ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800/40'
                      }`}
                    >
                      <span className="text-base font-bold font-mono text-white">{formatPrice(p.amount)}</span>
                      {p.bonus > 0 ? (
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> +{p.bonus}% Bonus Gratuit
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500">Credit Standard</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                  Metodă Depozit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('card')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      method === 'card'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card Bancar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('crypto')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      method === 'crypto'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Crypto USDT/BTC</span>
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Sumă Depusă:</span>
                  <span className="font-mono text-white">{formatPrice(selectedAmount)}</span>
                </div>
                {bonusAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Bonus Cadou:</span>
                    <span className="font-mono">+{formatPrice(bonusAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-zinc-800">
                  <span>Total Credit Primit:</span>
                  <span className="text-purple-400 font-mono">{formatPrice(totalCredited)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleTopUp}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/30"
              >
                {isProcessing ? (
                  <span>Se procesează alimentarea...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Alimentează {formatPrice(selectedAmount)} Acum</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
