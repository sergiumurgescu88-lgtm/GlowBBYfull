import React, { forwardRef } from 'react';
import { ProfileData } from '../types';
import { Shield, Sparkles, Heart, Check, Clock, Radio, Globe, Twitter, Instagram, Send, Gift, Flame } from 'lucide-react';
import { BACKGROUND_PRESETS } from '../data/mockData';

interface DesignerPreviewProps {
  profile: ProfileData;
  scale?: number;
}

export const DesignerPreview = forwardRef<HTMLDivElement, DesignerPreviewProps>(({ profile, scale = 1 }, ref) => {
  const currentBg = BACKGROUND_PRESETS.find((b) => b.id === profile.backgroundPreset)?.css || profile.customBgColor;

  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    display: 'font-extrabold tracking-tight',
    mono: 'font-mono',
  }[profile.fontFamily];

  // Calculate goal percentage
  const goalPercent = Math.min(100, Math.round((profile.goalCurrent / Math.max(1, profile.goalTarget)) * 100));

  // Platform width container style
  const platformWidths: Record<string, string> = {
    chaturbate: 'max-w-[780px]',
    mfc: 'max-w-[720px]',
    stripchat: 'max-w-[750px]',
    bongacams: 'max-w-[740px]',
    cam4: 'max-w-[760px]',
  };

  return (
    <div
      ref={ref}
      id="profile-preview-canvas"
      className={`w-full ${platformWidths[profile.targetPlatform] || 'max-w-[780px]'} mx-auto overflow-hidden text-slate-100 p-5 sm:p-7 shadow-2xl transition-all duration-200 ${fontClass}`}
      style={{
        background: currentBg,
        borderRadius: `${profile.borderRadius}px`,
        color: profile.textColor,
      }}
    >
      {/* 1. Header Banner & Profile Card */}
      <div
        className="p-6 mb-5 border transition-all"
        style={{
          backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
          backdropFilter: `blur(${profile.cardBlur}px)`,
          borderColor: `rgba(255, 255, 255, 0.12)`,
          borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar with glow ring */}
          <div className="relative group shrink-0">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 p-0.5 shadow-xl"
              style={{ borderColor: profile.accentColor }}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.stageName}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            {profile.status === 'online' && (
              <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white flex items-center gap-1 shadow-md animate-pulse">
                <Radio className="w-2.5 h-2.5" /> Live
              </span>
            )}
          </div>

          {/* Name & Bio Tagline */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: profile.titleColor }}
              >
                {profile.stageName || 'Cam Broadcaster'}
              </h2>
              <span
                className="px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase"
                style={{
                  backgroundColor: `${profile.accentColor}25`,
                  color: profile.accentColor,
                  border: `1px solid ${profile.accentColor}40`,
                }}
              >
                Verified Model
              </span>
            </div>

            <p className="text-sm opacity-90 leading-relaxed max-w-xl">
              {profile.tagline || 'Welcome to my official cam room!'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Token Goal Bar (if enabled) */}
      {profile.showGoal && (
        <div
          className="p-4 sm:p-5 mb-5 border"
          style={{
            backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
            backdropFilter: `blur(${profile.cardBlur}px)`,
            borderColor: `rgba(255, 255, 255, 0.12)`,
            borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold flex items-center gap-2" style={{ color: profile.titleColor }}>
              <Flame className="w-4 h-4" style={{ color: profile.accentColor }} />
              {profile.goalTitle}
            </span>
            <span className="text-xs font-semibold opacity-90">
              {profile.goalCurrent.toLocaleString()} / {profile.goalTarget.toLocaleString()} {profile.goalUnit} ({goalPercent}%)
            </span>
          </div>
          <div className="w-full h-3.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${goalPercent}%`,
                background: `linear-gradient(90deg, ${profile.titleColor}, ${profile.accentColor})`,
              }}
            />
          </div>
        </div>
      )}

      {/* 3. About Me Component */}
      {profile.showAboutMe && (
        <div
          className="p-5 sm:p-6 mb-5 border"
          style={{
            backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
            backdropFilter: `blur(${profile.cardBlur}px)`,
            borderColor: `rgba(255, 255, 255, 0.12)`,
            borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
          }}
        >
          <h3
            className="text-lg font-bold mb-3 flex items-center gap-2 border-b pb-2"
            style={{ color: profile.titleColor, borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <Sparkles className="w-4 h-4" style={{ color: profile.accentColor }} />
            About Me
          </h3>
          <p className="text-sm opacity-90 leading-relaxed mb-4 whitespace-pre-line">
            {profile.aboutMeText}
          </p>

          {/* Quick info tags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {profile.age && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs">
                <span className="block opacity-60 text-[10px] uppercase font-semibold">Age</span>
                <span className="font-medium">{profile.age}</span>
              </div>
            )}
            {profile.location && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs">
                <span className="block opacity-60 text-[10px] uppercase font-semibold">Location</span>
                <span className="font-medium">{profile.location}</span>
              </div>
            )}
            {profile.languages && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs">
                <span className="block opacity-60 text-[10px] uppercase font-semibold">Languages</span>
                <span className="font-medium">{profile.languages}</span>
              </div>
            )}
            {profile.zodiac && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs">
                <span className="block opacity-60 text-[10px] uppercase font-semibold">Zodiac</span>
                <span className="font-medium">{profile.zodiac}</span>
              </div>
            )}
            {profile.interests && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs col-span-2 sm:col-span-2">
                <span className="block opacity-60 text-[10px] uppercase font-semibold">Interests</span>
                <span className="font-medium">{profile.interests}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Tip Menu Component */}
      {profile.showTipMenu && (
        <div
          className="p-5 sm:p-6 mb-5 border"
          style={{
            backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
            backdropFilter: `blur(${profile.cardBlur}px)`,
            borderColor: `rgba(255, 255, 255, 0.12)`,
            borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
          }}
        >
          <h3
            className="text-lg font-bold mb-3 flex items-center justify-between border-b pb-2"
            style={{ color: profile.titleColor, borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <span className="flex items-center gap-2">
              <Gift className="w-4 h-4" style={{ color: profile.accentColor }} />
              Tip Menu
            </span>
            <span className="text-xs font-normal opacity-70">Tips trigger rewards instantly</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {profile.tipItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium pr-2">{item.description}</span>
                <span
                  className="px-2.5 py-1 rounded text-xs font-bold shrink-0 shadow-sm"
                  style={{
                    backgroundColor: `${profile.accentColor}30`,
                    color: profile.titleColor,
                    border: `1px solid ${profile.accentColor}50`,
                  }}
                >
                  {item.tokens} tokens
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Room Rules Component */}
      {profile.showRules && (
        <div
          className="p-5 sm:p-6 mb-5 border"
          style={{
            backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
            backdropFilter: `blur(${profile.cardBlur}px)`,
            borderColor: `rgba(255, 255, 255, 0.12)`,
            borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
          }}
        >
          <h3
            className="text-lg font-bold mb-3 flex items-center gap-2 border-b pb-2"
            style={{ color: profile.titleColor, borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <Heart className="w-4 h-4" style={{ color: profile.accentColor }} />
            Room Rules
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm opacity-90">
            {profile.rules.map((rule) => (
              <li key={rule.id} className="flex items-start gap-2.5">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${profile.accentColor}30`, color: profile.accentColor }}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{rule.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Streaming Schedule */}
      {profile.showSchedule && (
        <div
          className="p-5 sm:p-6 mb-5 border"
          style={{
            backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
            backdropFilter: `blur(${profile.cardBlur}px)`,
            borderColor: `rgba(255, 255, 255, 0.12)`,
            borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
          }}
        >
          <h3
            className="text-lg font-bold mb-3 flex items-center gap-2 border-b pb-2"
            style={{ color: profile.titleColor, borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <Clock className="w-4 h-4" style={{ color: profile.accentColor }} />
            Streaming Schedule
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {profile.schedule.map((slot, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="font-semibold text-slate-300">{slot.day}</span>
                <span className="opacity-90">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Social Links */}
      {profile.showSocials && (
        <div
          className="p-5 sm:p-6 mb-5 border"
          style={{
            backgroundColor: `rgba(15, 23, 42, ${profile.cardOpacity})`,
            backdropFilter: `blur(${profile.cardBlur}px)`,
            borderColor: `rgba(255, 255, 255, 0.12)`,
            borderRadius: `${Math.max(6, profile.borderRadius - 4)}px`,
          }}
        >
          <h3
            className="text-lg font-bold mb-3 flex items-center gap-2 border-b pb-2"
            style={{ color: profile.titleColor, borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <Globe className="w-4 h-4" style={{ color: profile.accentColor }} />
            Find Me Online
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.socials
              .filter((s) => s.enabled)
              .map((soc) => (
                <div
                  key={soc.platform}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold transition-colors"
                >
                  <span style={{ color: profile.titleColor }}>{soc.label}:</span>
                  <span>{soc.username}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 8. GLOW Models DMCA Protection Badge */}
      {profile.showDmcaBadge && (
        <div
          className="p-3 border flex items-center justify-between gap-3 text-xs"
          style={{
            backgroundColor: `rgba(10, 15, 30, ${Math.min(1, profile.cardOpacity + 0.1)})`,
            borderColor: `rgba(139, 92, 246, 0.3)`,
            borderRadius: `${Math.max(4, profile.borderRadius - 8)}px`,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-violet-600/30 border border-violet-500/50 flex items-center justify-center shrink-0">
              <Shield className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div>
              <span className="font-bold text-violet-300 mr-1.5">DMCA PROTECTED</span>
              <span className="opacity-80 text-[11px] hidden sm:inline">
                {profile.dmcaBadgeText}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest shrink-0">
            GLOW MODELS
          </span>
        </div>
      )}
    </div>
  );
});

DesignerPreview.displayName = 'DesignerPreview';
