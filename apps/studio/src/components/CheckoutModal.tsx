import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { PackagePlan, PaymentMethod, Platform, DurationTier } from '../types';
import { CRYPTO_WALLETS, DURATION_OPTIONS } from '../data/mockData';
import {
  CreditCard,
  QrCode,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  X,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface CheckoutModalProps {
  plan: PackagePlan;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ plan, onClose }) => {
  const {
    selectedDuration,
    selectedPlatform,
    createOrder,
    currentUser,
    formatPrice,
    language,
    setActiveTab,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [roomTarget, setRoomTarget] = useState('');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [txHashInput, setTxHashInput] = useState('');
  const [isVerifyingCrypto, setIsVerifyingCrypto] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('STREAM PERFORMER');

  // Crypto network selection
  const [cryptoCurrency, setCryptoCurrency] = useState<'usdt_trc20' | 'usdt_erc20' | 'btc' | 'eth' | 'sol'>('usdt_trc20');

  // Price calculations
  const basePrice = plan.pricing[selectedDuration] || plan.pricing['3hours'];
  const discountAmount = (basePrice * discountPercent) / 100;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  // Promo code handler
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'GLOW10') {
      setDiscountPercent(10);
      setPromoSuccess(language === 'ro' ? 'Cod 10% reducere aplicat cu succes!' : '10% discount code applied!');
      setPromoError('');
    } else if (code === 'LAUNCH20') {
      setDiscountPercent(20);
      setPromoSuccess(language === 'ro' ? 'Cod 20% reducere aplicat cu succes!' : '20% discount code applied!');
      setPromoError('');
    } else if (code === 'VIP30') {
      setDiscountPercent(30);
      setPromoSuccess(language === 'ro' ? 'Reducere VIP de 30% activată!' : '30% VIP discount activated!');
      setPromoError('');
    } else {
      setPromoError(language === 'ro' ? 'Cod promoțional invalid sau expirat.' : 'Invalid or expired promo code.');
      setPromoSuccess('');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCompleteOrder = (forcedTxHash?: string) => {
    if (!roomTarget.trim()) {
      alert(language === 'ro' ? 'Te rugăm să introduci numele camerei țintă!' : 'Please enter target room name!');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        plan,
        duration: selectedDuration,
        platform: selectedPlatform,
        roomTarget: roomTarget.trim(),
        amount: Number(finalPrice.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        promoCode: discountPercent > 0 ? promoCode.toUpperCase() : undefined,
        paymentMethod,
        customerEmail: customerEmail.trim() || currentUser.email,
        txHash: forcedTxHash || (paymentMethod.startsWith('crypto_') ? txHashInput : undefined),
      });

      setIsProcessing(false);
      setCompletedOrderId(order.id);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981'],
        });
      } catch {
        // silent fail if confetti unavailable
      }
    }, 1200);
  };

  const handleVerifyCryptoTx = () => {
    setIsVerifyingCrypto(true);
    setTimeout(() => {
      setIsVerifyingCrypto(false);
      const generatedHash = txHashInput || `0x${Math.random().toString(16).substr(2, 32)}`;
      handleCompleteOrder(generatedHash);
    }, 1600);
  };

  const selectedWalletInfo = CRYPTO_WALLETS[cryptoCurrency];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c0d12] border border-purple-500/40 rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.25)] overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                {language === 'ro' ? 'Finalizare Plată Securizată' : 'Secure Checkout Gateway'}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {plan.name} • <span className="text-purple-400 font-mono font-medium">{plan.viewers} Privitori</span>
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

        {/* Modal Body */}
        <div className="p-6">
          {completedOrderId ? (
            /* Success Receipt View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'ro' ? 'Plată Confirmată cu Succes!' : 'Payment Successfully Confirmed!'}
                </h3>
                <p className="text-sm text-zinc-400">
                  {language === 'ro'
                    ? `Comanda ${completedOrderId} a fost procesată, iar campania de trafic este acum activă.`
                    : `Order ${completedOrderId} processed and your traffic campaign is now live.`}
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 max-w-md mx-auto text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Număr Comandă:</span>
                  <span className="font-mono text-purple-300 font-bold">{completedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Pachet:</span>
                  <span className="text-white font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Platformă & Cameră:</span>
                  <span className="text-cyan-400 font-mono font-medium">
                    {selectedPlatform} / {roomTarget}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Durată:</span>
                  <span className="text-white font-medium">
                    {DURATION_OPTIONS.find((d) => d.key === selectedDuration)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Metodă Plată:</span>
                  <span className="uppercase text-zinc-300 font-mono">{paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-2 text-sm font-bold">
                  <span className="text-white">Total Achitat:</span>
                  <span className="text-emerald-400 font-mono">{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  id="btn-goto-campaign-after-payment"
                  onClick={() => {
                    onClose();
                    setActiveTab('dashboard');
                  }}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>{language === 'ro' ? 'Vezi Campania în Direct' : 'View Campaign in Live Dashboard'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800"
                >
                  {language === 'ro' ? 'Închide' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Flow */
            <div className="space-y-6">
              {/* Target Room Input */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  {language === 'ro' ? 'Nume sau Link Cameră Țintă' : 'Target Room Name or URL'}
                </label>
                <div className="flex gap-2">
                  <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-purple-400 font-mono flex items-center shrink-0">
                    {selectedPlatform.toLowerCase()}.com/
                  </div>
                  <input
                    type="text"
                    value={roomTarget}
                    onChange={(e) => setRoomTarget(e.target.value)}
                    placeholder="ex: amber_glow"
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 font-mono"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  {language === 'ro' ? 'Alege Metoda de Plată Integrată' : 'Choose Integrated Payment Method'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-bold text-white">Card Bancar</span>
                    <span className="text-[10px] text-zinc-400">Visa / Mastercard</span>
                  </button>

                  {/* Crypto */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod(`crypto_${cryptoCurrency}` as PaymentMethod)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod.startsWith('crypto_')
                        ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-bold text-white">Crypto Instant</span>
                    <span className="text-[10px] text-zinc-400">USDT / BTC / SOL</span>
                  </button>

                  {/* Wallet Balance */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'wallet'
                        ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <Wallet className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-bold text-white">Portofel Glow</span>
                    <span className="text-[10px] text-zinc-400">{formatPrice(currentUser.walletBalance)}</span>
                  </button>

                  {/* Revolut */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('revolut')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'revolut'
                        ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <Zap className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-bold text-white">Revolut Pay</span>
                    <span className="text-[10px] text-zinc-400">Transfer Rapid</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Details Box */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                {/* 1. Credit Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                      <span className="font-semibold text-white">Plată Securizată 256-bit SSL</span>
                      <span className="text-[11px] text-zinc-400 font-mono">Discreet: GS DIGITAL SERV</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 space-y-1">
                        <label className="text-[11px] text-zinc-400">Număr Card</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400">Expirare (LL/AA)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400">CVV / CVC</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Crypto Gateway */}
                {paymentMethod.startsWith('crypto_') && (
                  <div className="space-y-4">
                    {/* Coin Selector */}
                    <div className="flex flex-wrap gap-1.5 pb-2 border-b border-zinc-800">
                      {(
                        [
                          { key: 'usdt_trc20', label: 'USDT (TRC-20)' },
                          { key: 'usdt_erc20', label: 'USDT (ERC-20)' },
                          { key: 'btc', label: 'Bitcoin (BTC)' },
                          { key: 'eth', label: 'Ethereum (ETH)' },
                          { key: 'sol', label: 'Solana (SOL)' },
                        ] as const
                      ).map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => {
                            setCryptoCurrency(c.key);
                            setPaymentMethod(`crypto_${c.key}` as PaymentMethod);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                            cryptoCurrency === c.key
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    {/* QR Code & Address Display */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                      {/* Stylized QR Code Box */}
                      <div className="w-28 h-28 bg-white rounded-xl p-2 flex items-center justify-center shrink-0 shadow-lg">
                        <div className="w-full h-full border-2 border-slate-900 flex flex-col items-center justify-center text-black font-mono text-[9px] font-bold text-center leading-tight">
                          <QrCode className="w-16 h-16 text-slate-900" />
                          <span className="text-[8px] mt-0.5">{cryptoCurrency.toUpperCase()}</span>
                        </div>
                      </div>

                      <div className="flex-1 text-left space-y-2 w-full">
                        <div>
                          <span className="text-[11px] text-zinc-400 block mb-1">
                            Adresă Depozit {selectedWalletInfo.name}:
                          </span>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                            <span className="text-xs font-mono text-purple-300 truncate select-all">
                              {selectedWalletInfo.address}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedWalletInfo.address)}
                              className="p-1 rounded hover:bg-zinc-800 text-zinc-300 hover:text-white shrink-0"
                              title="Copiază adresa"
                            >
                              {copiedAddress ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-400">
                          <span>Confirmări: {selectedWalletInfo.confirmations}</span>
                          <span>Comision Rețea: {selectedWalletInfo.networkFee}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Hash / Verify Section */}
                    <div className="pt-2 border-t border-zinc-800 space-y-2">
                      <label className="text-[11px] text-zinc-400 block">
                        Introduceți Hash-ul Tranzacției (TxID) după trimitere:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={txHashInput}
                          onChange={(e) => setTxHashInput(e.target.value)}
                          placeholder="ex: 0x8f27c8a167098e910..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyCryptoTx}
                          disabled={isVerifyingCrypto}
                          className="px-4 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          {isVerifyingCrypto ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          <span>Verifică & Activează</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Wallet Balance */}
                {paymentMethod === 'wallet' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Sold Portofel Curent:</span>
                      <span className="text-base font-extrabold text-purple-400 font-mono">
                        {formatPrice(currentUser.walletBalance)}
                      </span>
                    </div>

                    {currentUser.walletBalance < finalPrice ? (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          Sold insuficient. Ai nevoie de încă{' '}
                          <span className="font-mono font-bold">
                            {formatPrice(finalPrice - currentUser.walletBalance)}
                          </span>
                          . Poți alimenta portofelul sau alege plata directă prin card/crypto.
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Soldul este suficient. Campania va porni instant la un singur clic!</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Revolut Pay */}
                {paymentMethod === 'revolut' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center text-zinc-300 pb-2 border-b border-zinc-800">
                      <span>Tag Revolut Beneficiar:</span>
                      <span className="text-purple-400 font-mono font-bold">@glowstudio.official</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>Referință Obligatorie:</span>
                      <span className="bg-zinc-800 px-2 py-0.5 rounded font-mono text-white">
                        GS-{plan.viewers}-{selectedDuration}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Include referința la plata prin Revolut pentru activare automată în mai puțin de 60 de secunde.
                    </p>
                  </div>
                )}
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Cod Reducere (ex: GLOW10 sau LAUNCH20)"
                  className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-zinc-800 transition-colors"
                >
                  Aplică
                </button>
              </form>
              {promoSuccess && <p className="text-xs text-emerald-400">{promoSuccess}</p>}
              {promoError && <p className="text-xs text-rose-400">{promoError}</p>}

              {/* Order Total Breakdown */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-400">
                  <span>Preț Pachet ({plan.viewers} Privitori):</span>
                  <span className="font-mono text-zinc-300">{formatPrice(basePrice)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Reducere Promo ({discountPercent}%):</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total de Plată:</span>
                  <span className="text-purple-400 font-mono text-base">{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Final Submit CTA */}
              <button
                type="button"
                id="btn-complete-checkout"
                disabled={isProcessing || (paymentMethod === 'wallet' && currentUser.walletBalance < finalPrice)}
                onClick={() => handleCompleteOrder()}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/30"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin fill-white" />
                    <span>Se procesează plata...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>
                      {paymentMethod === 'wallet'
                        ? `Plătește ${formatPrice(finalPrice)} din Portofel`
                        : `Achită ${formatPrice(finalPrice)} & Pornește Traficul`}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
