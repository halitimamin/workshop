import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Lightbulb,
  Clock,
  Radio,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Layers,
  ListChecks,
} from 'lucide-react';
import { REQUIREMENT_GUIDES, RequirementGuide } from '../../data/requirementsData';

const STORAGE_KEY = 'gdgc_batna2_reqs_done_v1';

export const RequirementsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'step-by-step' | 'all'>('step-by-step');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load saved completion state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedIds(parsed);
        }
      }
    } catch (_) {
      // Ignore storage errors
    }
  }, []);

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (_) {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleCopy = (code: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 1800);
  };

  const completedCount = completedIds.length;
  const totalCount = REQUIREMENT_GUIDES.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const visibleGuides: RequirementGuide[] =
    viewMode === 'step-by-step' ? [REQUIREMENT_GUIDES[activeIndex]] : REQUIREMENT_GUIDES;

  const renderGuideIcon = (guide: RequirementGuide, isDark: boolean) => {
    if (guide.iconPath) {
      return (
        <img
          src={guide.iconPath}
          alt={guide.name}
          className="w-full h-full object-contain"
        />
      );
    }
    return (
      <Radio
        className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-forest-darkest' : 'text-forest'}`}
      />
    );
  };

  return (
    <section
      id="requirements"
      className="relative w-full py-14 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden bg-forest-surface/35 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-0">
        <div className="hidden sm:block absolute -top-16 -right-16 w-80 h-80 rounded-full border-2 border-forest/15 opacity-60" />
        <div className="hidden sm:block absolute -top-8 -right-8 w-60 h-60 rounded-full border-2 border-forest/15 opacity-60" />
        <div className="hidden sm:block absolute top-0 right-0 w-40 h-40 rounded-full border-2 border-forest/15 opacity-60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-forest text-forest-darkest text-xs font-black shadow-brutal-sm mb-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gdgc-blue" />
              <span className="w-2 h-2 rounded-full bg-gdgc-red" />
              <span className="w-2 h-2 rounded-full bg-gdgc-yellow" />
              <span className="w-2 h-2 rounded-full bg-gdgc-green" />
            </div>
            <span>GDGC Univ. Batna 2 · Pre-Workshop Setup Guide</span>
          </div>

          <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-forest-darkest tracking-tight mb-3 sm:mb-4">
            Requirements{' '}
            <span className="relative inline-block">
              <span className="relative z-10">to Start</span>
              <span className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-3 sm:h-4 bg-neon -z-0 -rotate-1 rounded-sm" />
            </span>
          </h2>

          <p className="text-muted text-sm sm:text-base md:text-lg max-w-2xl font-semibold leading-relaxed px-2">
            Follow each requirement <strong className="text-forest-darkest">1 by 1</strong> to download,
            install, and verify every tool before the session — especially installing{' '}
            <strong className="text-forest-darkest">OpenCode</strong> and connecting it with{' '}
            <code className="px-1.5 py-0.5 rounded bg-forest text-neon font-mono text-xs">/connect</code>.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* PROGRESS TRACKER & STEP SELECTOR BAR                         */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl border-2 sm:border-3 border-forest p-4 sm:p-6 shadow-brutal-sm mb-8 sm:mb-10">
          {/* Top Row: Progress Bar + Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-forest/15">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-black text-forest-darkest mb-1.5">
                <span className="flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4 text-forest" />
                  <span>
                    Your Setup Readiness: {completedCount} / {totalCount} Completed
                  </span>
                </span>
                <span className="font-mono text-forest">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-forest-surface border border-forest/25 overflow-hidden">
                <div
                  className="h-full bg-neon transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Mode Switch: 1-by-1 vs Show All */}
            <div className="flex items-center gap-1.5 self-start sm:self-center flex-shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('step-by-step')}
                className={`px-3 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer min-h-[38px] ${
                  viewMode === 'step-by-step'
                    ? 'bg-forest text-neon border-forest shadow-brutal-sm'
                    : 'bg-forest-surface text-forest-darkest border-forest/20 hover:border-forest'
                }`}
              >
                1-by-1 Guide
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer min-h-[38px] ${
                  viewMode === 'all'
                    ? 'bg-forest text-neon border-forest shadow-brutal-sm'
                    : 'bg-forest-surface text-forest-darkest border-forest/20 hover:border-forest'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Show All ({totalCount})</span>
              </button>
            </div>
          </div>

          {/* 8-Requirement Stepper Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {REQUIREMENT_GUIDES.map((item, idx) => {
              const isSelected = viewMode === 'step-by-step' && activeIndex === idx;
              const isDone = completedIds.includes(item.id);
              const isOpenCode = item.id === 'opencode';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    if (viewMode === 'all') {
                      const el = document.getElementById(`req-card-${item.id}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`flex items-center justify-between gap-2 p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer min-h-[46px] ${
                    isSelected
                      ? 'bg-neon text-forest-darkest border-forest shadow-brutal-sm -translate-y-0.5'
                      : isDone
                      ? 'bg-forest-surface text-forest-darkest border-gdgc-green/50 hover:border-forest'
                      : isOpenCode
                      ? 'bg-neon/15 text-forest-darkest border-forest/50 hover:border-forest'
                      : 'bg-white text-forest-darkest border-forest/20 hover:border-forest'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`font-mono font-black text-[11px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isSelected
                          ? 'bg-forest text-neon'
                          : isDone
                          ? 'bg-gdgc-green text-white'
                          : 'bg-forest-surface text-forest-darkest border border-forest/20'
                      }`}
                    >
                      0{item.number}
                    </span>
                    <span className="font-sans font-black text-xs leading-tight truncate">
                      {item.name}
                    </span>
                  </div>

                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-gdgc-green flex-shrink-0" />
                  ) : isOpenCode ? (
                    <Sparkles className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* REQUIREMENT GUIDE CARDS (1-BY-1 OR ALL)                      */}
        {/* ============================================================ */}
        <AnimatePresence mode="wait">
          <div key={viewMode === 'step-by-step' ? `single-${activeIndex}` : 'all-list'} className="space-y-8">
            {visibleGuides.map((guide) => {
              const isDone = completedIds.includes(guide.id);
              const isHighlighted = Boolean(guide.highlight);

              return (
                <motion.div
                  key={guide.id}
                  id={`req-card-${guide.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl border-3 sm:border-4 p-5 sm:p-8 relative overflow-hidden ${
                    isHighlighted
                      ? 'bg-forest text-white border-neon shadow-brutal-lg'
                      : 'bg-white text-forest-darkest border-forest shadow-brutal'
                  }`}
                >
                  {/* Top 4-Color GDGC Ribbon on OpenCode Highlight Card */}
                  {isHighlighted && (
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gdgc-blue via-gdgc-red via-gdgc-yellow to-gdgc-green" />
                  )}

                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b-2 border-current/15">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-2 border-2 flex items-center justify-center flex-shrink-0 shadow-brutal-sm ${
                          isHighlighted
                            ? 'bg-white border-neon text-forest-darkest'
                            : 'bg-forest-surface border-forest text-forest-darkest'
                        }`}
                      >
                        {renderGuideIcon(guide, isHighlighted)}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`font-mono font-black text-xs px-2.5 py-0.5 rounded-lg border ${
                              isHighlighted
                                ? 'bg-neon text-forest-darkest border-white'
                                : 'bg-forest text-neon border-forest'
                            }`}
                          >
                            REQ 0{guide.number} / 0{totalCount}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase border ${
                              isHighlighted
                                ? 'bg-forest-mid text-neon border-neon/40'
                                : guide.accent
                            }`}
                          >
                            {guide.badge}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-bold ${
                              isHighlighted ? 'text-forest-surface/80' : 'text-muted'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{guide.duration}</span>
                          </span>
                        </div>

                        <h3
                          className={`font-sans font-black text-2xl sm:text-3xl leading-tight ${
                            isHighlighted ? 'text-white' : 'text-forest-darkest'
                          }`}
                        >
                          {guide.name}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-bold mt-0.5 ${
                            isHighlighted ? 'text-neon' : 'text-forest-leaf'
                          }`}
                        >
                          {guide.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Mark Completed Button */}
                    <button
                      type="button"
                      onClick={() => toggleCompleted(guide.id)}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer flex-shrink-0 min-h-[42px] ${
                        isDone
                          ? 'bg-neon text-forest-darkest border-forest shadow-brutal-sm'
                          : isHighlighted
                          ? 'bg-white/10 text-white border-neon/50 hover:bg-neon hover:text-forest-darkest'
                          : 'bg-forest-surface text-forest-darkest border-forest hover:bg-neon'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          <span>Mark as Done</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Why We Need It Banner */}
                  <div
                    className={`rounded-2xl p-3.5 sm:p-4 mb-6 border-2 flex items-start gap-3 ${
                      isHighlighted
                        ? 'bg-white/10 border-neon/35 text-forest-surface'
                        : 'bg-forest-surface border-forest/20 text-forest-darkest'
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isHighlighted ? 'text-neon' : 'text-forest'
                      }`}
                    />
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      <strong className={isHighlighted ? 'text-neon' : 'text-forest-darkest'}>
                        Why you need it:{' '}
                      </strong>
                      {guide.why}
                    </p>
                  </div>

                  {/* Step-by-Step Instructions List */}
                  <div className="space-y-4">
                    {guide.steps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className={`rounded-2xl p-4 sm:p-5 border-2 ${
                          isHighlighted
                            ? 'bg-forest-darkest/65 border-neon/30'
                            : 'bg-forest-surface/45 border-forest/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-7 h-7 rounded-xl font-mono font-black text-xs flex items-center justify-center flex-shrink-0 border ${
                              isHighlighted
                                ? 'bg-neon text-forest-darkest border-white'
                                : 'bg-forest text-neon border-forest'
                            }`}
                          >
                            {sIdx + 1}
                          </span>

                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-sans font-black text-base sm:text-lg mb-1 ${
                                isHighlighted ? 'text-white' : 'text-forest-darkest'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p
                              className={`text-xs sm:text-sm font-medium leading-relaxed mb-3 ${
                                isHighlighted ? 'text-forest-surface/85' : 'text-muted'
                              }`}
                            >
                              {step.description}
                            </p>

                            {/* External Download / Sign-Up Link */}
                            {step.link && (
                              <div className="mb-3">
                                <a
                                  href={step.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neon text-forest-darkest font-black text-xs sm:text-sm border-2 border-forest shadow-brutal-sm hover:bg-neon-light hover:-translate-y-0.5 transition-all min-h-[38px]"
                                >
                                  <span>{step.link.label}</span>
                                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                                </a>
                              </div>
                            )}

                            {/* Terminal Commands / Shortcuts */}
                            {step.commands && step.commands.length > 0 && (
                              <div className="space-y-2 mb-2">
                                {step.commands.map((cmd, cIdx) => {
                                  const copyId = `${guide.id}-${sIdx}-${cIdx}`;
                                  const isCopied = copiedKey === copyId;

                                  return (
                                    <div
                                      key={copyId}
                                      className="rounded-xl bg-[#061A0C] text-white border-2 border-forest/60 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                    >
                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                          <span className="text-[10px] font-black uppercase tracking-wider text-neon bg-white/10 px-2 py-0.5 rounded">
                                            {cmd.label}
                                          </span>
                                          {cmd.note && (
                                            <span className="text-[10px] font-semibold text-forest-surface/70">
                                              {cmd.note}
                                            </span>
                                          )}
                                        </div>
                                        <code className="font-mono text-xs sm:text-sm font-bold text-neon break-all">
                                          {cmd.code}
                                        </code>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => handleCopy(cmd.code, copyId)}
                                        className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-neon hover:text-forest-darkest text-white text-xs font-black border border-white/20 transition-colors cursor-pointer flex-shrink-0 min-h-[34px]"
                                      >
                                        {isCopied ? (
                                          <>
                                            <Check className="w-3.5 h-3.5 text-neon sm:text-current" />
                                            <span>Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Beginner Tip */}
                            {step.tip && (
                              <div
                                className={`mt-2.5 rounded-xl p-2.5 sm:p-3 border flex items-start gap-2 text-xs font-semibold ${
                                  isHighlighted
                                    ? 'bg-white/10 border-neon/30 text-forest-surface'
                                    : 'bg-white border-forest/20 text-forest-darkest'
                                }`}
                              >
                                <Lightbulb
                                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                    isHighlighted ? 'text-neon' : 'text-amber-600'
                                  }`}
                                />
                                <span>{step.tip}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verification Box */}
                  {guide.verify && (
                    <div
                      className={`mt-6 rounded-2xl p-4 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isHighlighted
                          ? 'bg-neon text-forest-darkest border-white'
                          : 'bg-neon/20 text-forest-darkest border-forest'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Terminal className="w-5 h-5 text-forest-darkest flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-sans font-black text-xs sm:text-sm uppercase tracking-wider">
                            {guide.verify.title}
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-forest-darkest/90 mt-0.5">
                            {guide.verify.expected}
                          </p>
                        </div>
                      </div>

                      {guide.verify.command && (
                        <code className="px-3 py-1.5 rounded-xl bg-forest text-neon font-mono text-xs font-black border border-forest flex-shrink-0 self-start sm:self-center">
                          {guide.verify.command}
                        </code>
                      )}
                    </div>
                  )}

                  {/* Step-by-Step Navigation Footer */}
                  {viewMode === 'step-by-step' && (
                    <div className="mt-6 pt-5 border-t-2 border-current/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        type="button"
                        disabled={activeIndex === 0}
                        onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all min-h-[42px] ${
                          activeIndex === 0
                            ? 'opacity-40 cursor-not-allowed border-current/20'
                            : isHighlighted
                            ? 'bg-white/10 text-white border-neon/40 hover:bg-white/20 cursor-pointer'
                            : 'bg-forest-surface text-forest-darkest border-forest hover:bg-neon/30 cursor-pointer'
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous Requirement</span>
                      </button>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        {activeIndex < totalCount - 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (!isDone) toggleCompleted(guide.id);
                              setActiveIndex((prev) => Math.min(totalCount - 1, prev + 1));
                            }}
                            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer min-h-[42px] ${
                              isHighlighted
                                ? 'bg-neon text-forest-darkest border-white shadow-brutal-sm hover:bg-neon-light'
                                : 'bg-forest text-neon border-forest shadow-brutal-sm hover:bg-forest-mid'
                            }`}
                          >
                            <span>
                              Mark Done &amp; Next: 0{REQUIREMENT_GUIDES[activeIndex + 1].number}{' '}
                              {REQUIREMENT_GUIDES[activeIndex + 1].name}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (!isDone) toggleCompleted(guide.id);
                            }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neon text-forest-darkest font-black text-xs sm:text-sm border-2 border-forest shadow-brutal-sm hover:bg-neon-light transition-all cursor-pointer min-h-[42px]"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Finish Setup Checklist</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};
