/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  IMAGES,
  HERO_SLIDES,
  COUNTDOWN_ENTRIES,
  TRENDING_UNIVERSE_CARDS,
  SHORT_LIST_ARCHIVES,
  GUILD_ESSAYS,
  CountdownEntry,
  TrendingUniverseCard,
  ShortListArchive,
  GuildEssay,
} from './data/azverseData';
import {
  BreakdownModal,
  EssayModal,
  ListExplorerModal,
} from './components/InteractiveModals';
import { SubmitListView, CriticProfileView } from './components/SecondaryViews';

type ActiveRoute =
  | 'discover'
  | 'submit-list'
  | 'user-critic-profile';

export default function App() {
  // Theme State (Light / Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('azverse-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.classList.add('bg-[#131b2e]', 'text-[#eef0ff]');
      document.body.classList.remove('bg-[#f8fafc]', 'text-[#0f172a]');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.classList.remove('bg-[#131b2e]', 'text-[#eef0ff]');
      document.body.classList.add('bg-[#f8fafc]', 'text-[#0f172a]');
    }
    try {
      localStorage.setItem('azverse-theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDarkMode]);

  // Navigation & Route State
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>('discover');
  const [activeNavKey, setActiveNavKey] = useState<string>('discover');

  // Hero Carousel State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const slideStartRef = useRef<number>(Date.now());
  const SLIDE_DURATION = 5500;

  // Hero Universe Filter Pill
  const [heroUniverseFilter, setHeroUniverseFilter] = useState<string>('All Universes');

  // Header Search & Notifications & Toast
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Flagship Listicle Controls
  const [rankingMode, setRankingMode] = useState<'editorial' | 'community'>('editorial');
  const [subFilter, setSubFilter] = useState<'all' | 'imax' | 'score93'>('all');
  const [showExpandedContenders, setShowExpandedContenders] = useState<boolean>(false);
  const [listSaved, setListSaved] = useState<boolean>(false);

  // Countdown Entries & Voting State
  const [entries, setEntries] = useState<CountdownEntry[]>(COUNTDOWN_ENTRIES);
  const [userVotes, setUserVotes] = useState<Record<string, 1 | -1 | 0>>({});

  // Sidebar Poll State
  const [selectedPollIndex, setSelectedPollIndex] = useState<number>(0);
  const [pollVoted, setPollVoted] = useState<boolean>(false);
  const [pollVotes, setPollVotes] = useState<number[]>([18420, 6310, 4012]);

  // Sidebar Short List Filter
  const [shortListFilter, setShortListFilter] = useState<string>('All Short Lists');

  // Section 1: Trending Universes Category Filter & Custom Added Lists
  const [universeCards, setUniverseCards] = useState<TrendingUniverseCard[]>(TRENDING_UNIVERSE_CARDS);
  const [trendingCategoryFilter, setTrendingCategoryFilter] = useState<string>('All Ranked');

  // Section 3: Daily Consensus Arena Head-to-Head State
  const [arenaVotes, setArenaVotes] = useState<{ a: number; b: number }>({
    a: 32490,
    b: 24510,
  });
  const [arenaUserChoice, setArenaUserChoice] = useState<'a' | 'b' | null>(null);

  // Section 4: Spotlight Watchlist State
  const [spotlightSaved, setSpotlightSaved] = useState<boolean>(false);

  // Footer Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  // Active Modals
  const [activeBreakdownEntry, setActiveBreakdownEntry] = useState<CountdownEntry | null>(null);
  const [activeEssay, setActiveEssay] = useState<GuildEssay | null>(null);
  const [activeUniverseExplorer, setActiveUniverseExplorer] = useState<TrendingUniverseCard | null>(null);
  const [activeShortListExplorer, setActiveShortListExplorer] = useState<ShortListArchive | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Hero Carousel Animation Loop
  useEffect(() => {
    slideStartRef.current = Date.now();
    let animId: number;

    const updateTick = () => {
      const elapsed = Date.now() - slideStartRef.current;
      if (elapsed >= SLIDE_DURATION) {
        setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        slideStartRef.current = Date.now();
        setSlideProgress(0);
      } else {
        setSlideProgress((elapsed / SLIDE_DURATION) * 100);
      }
      animId = requestAnimationFrame(updateTick);
    };

    animId = requestAnimationFrame(updateTick);
    return () => cancelAnimationFrame(animId);
  }, [currentSlideIndex]);

  // Keyboard shortcut Cmd+K / Ctrl+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchDropdown(true);
      } else if (e.key === 'Escape') {
        setShowSearchDropdown(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    slideStartRef.current = Date.now();
    setSlideProgress(0);
  };

  // Vote handler for Countdown Entries
  const handleEntryVote = (id: string, delta: 1 | -1) => {
    const current = userVotes[id] || 0;
    let nextVote: 1 | -1 | 0 = delta;
    if (current === delta) {
      nextVote = 0; // toggle off
    }

    setUserVotes((prev) => ({ ...prev, [id]: nextVote }));
    setEntries((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        let up = item.upvotes;
        let down = item.downvotes;
        if (current === 1) up -= 1;
        if (current === -1) down -= 1;
        if (nextVote === 1) up += 1;
        if (nextVote === -1) down += 1;
        return { ...item, upvotes: up, downvotes: down };
      })
    );
  };

  // Sidebar Poll Vote
  const handleCastPollBallot = () => {
    if (pollVoted) {
      triggerToast('Your ballot for the 2024 Sci-Fi Arena is already locked.');
      return;
    }
    setPollVotes((prev) =>
      prev.map((count, idx) => (idx === selectedPollIndex ? count + 1 : count))
    );
    setPollVoted(true);
    triggerToast('Official Arena ballot recorded in Consensus Engine v4.2');
  };

  // Arena Head-to-Head Vote
  const handleArenaVote = (side: 'a' | 'b') => {
    if (arenaUserChoice === side) return;
    setArenaVotes((prev) => {
      const next = { ...prev };
      if (arenaUserChoice === 'a') next.a -= 1;
      if (arenaUserChoice === 'b') next.b -= 1;
      next[side] += 1;
      return next;
    });
    setArenaUserChoice(side);
    triggerToast(
      side === 'a'
        ? 'Voted for Challenger A: Interstellar (2014)'
        : 'Voted for Challenger B: 2001: A Space Odyssey (1968)'
    );
  };

  // Navigation handler supporting smooth section scrolling & secondary screens
  const handleNavigate = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveNavKey(path);

    if (path === 'submit-list') {
      setActiveRoute('submit-list');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (path === 'user-critic-profile') {
      setActiveRoute('user-critic-profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveRoute('discover');

    setTimeout(() => {
      if (path === 'discover') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === 'community-arena') {
        document.getElementById('daily-consensus-arena')?.scrollIntoView({ behavior: 'smooth' });
      } else if (path === 'trending') {
        document.getElementById('trending-universes-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (path === 'category-movies') {
        setTrendingCategoryFilter('Dark Noir & Thrillers');
        document.getElementById('flagship-listicle-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (path === 'category-anime') {
        setTrendingCategoryFilter('Anime & Animation');
        document.getElementById('trending-universes-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (path === 'category-gaming') {
        setTrendingCategoryFilter('Gaming Masterpieces');
        document.getElementById('trending-universes-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (path === 'category-tech') {
        setTrendingCategoryFilter('Prestige TV Epics');
        document.getElementById('guild-journalism-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Computed Flagship Entries based on sort mode and sub-filter
  const sortedEntries = [...entries]
    .filter((entry) => {
      if (subFilter === 'imax') return entry.isImax4k;
      if (subFilter === 'score93') return entry.verdictScore >= 9.3;
      return true;
    })
    .sort((a, b) =>
      rankingMode === 'editorial'
        ? a.editorialRank - b.editorialRank
        : a.communityRank - b.communityRank
    );

  const entry01 = sortedEntries[0] || entries[0];
  const entry02 = sortedEntries[1] || entries[1];
  const entry03 = sortedEntries[2] || entries[2];
  const contenderEntries = sortedEntries.slice(3);
  const visibleContenders = showExpandedContenders
    ? contenderEntries
    : contenderEntries.slice(0, 4);

  // Poll percentages
  const totalPollVotes = pollVotes.reduce((acc, v) => acc + v, 0);
  const pollPercentages = pollVotes.map((v) => Math.round((v / totalPollVotes) * 100));

  // Arena percentages
  const totalArenaVotes = arenaVotes.a + arenaVotes.b;
  const arenaPctA = Math.round((arenaVotes.a / totalArenaVotes) * 100);
  const arenaPctB = 100 - arenaPctA;

  // Filtered Short Lists
  const filteredShortLists = SHORT_LIST_ARCHIVES.filter((item) => {
    if (shortListFilter === 'All Short Lists') return true;
    if (shortListFilter === '🎮 Gaming') return item.filterGroup === 'Gaming';
    if (shortListFilter === '🩸 Horror') return item.filterGroup === 'Horror';
    if (shortListFilter === '🌋 Disasters & History') return item.filterGroup === 'Disasters & History';
    return true;
  });

  // Filtered Trending Universe Cards
  const filteredTrendingCards = universeCards.filter((card) => {
    if (trendingCategoryFilter === 'All Ranked') return true;
    return card.category === trendingCategoryFilter;
  });

  // Search matches
  const searchResults = searchQuery.trim()
    ? [
        ...entries
          .filter(
            (e) =>
              e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              e.director.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((e) => ({
            type: `Sci-Fi Rank #0${e.editorialRank}`,
            title: `${e.title} (${e.year})`,
            subtitle: `Dir. ${e.director} • ${e.verdictScore} Verdict`,
            onClick: () => {
              setActiveBreakdownEntry(e);
              setShowSearchDropdown(false);
            },
          })),
        ...universeCards
          .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((c) => ({
            type: c.badge,
            title: c.title,
            subtitle: `${c.criticName} • ${c.votes}`,
            onClick: () => {
              setActiveUniverseExplorer(c);
              setShowSearchDropdown(false);
            },
          })),
      ]
    : [];

  const currentReelSlide = HERO_SLIDES[currentSlideIndex];
  const reelNumStr = String(currentSlideIndex + 1).padStart(2, '0');

  return (
    <div className="bg-[#f8fafc] dark:bg-[#131b2e] font-body-md text-body-md text-slate-900 dark:text-[#eef0ff] antialiased selection:bg-amber-100 dark:selection:bg-[#2f1500] selection:text-amber-900 dark:selection:text-[#ffdcc3] min-h-screen transition-colors duration-300">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 dark:bg-[#283044] text-white dark:text-[#eef0ff] font-label-md text-label-md font-bold shadow-xl border border-amber-500/40 dark:border-[#887364] flex items-center gap-2.5 animate-bounce">
          <span className="material-symbols-outlined text-amber-400 dark:text-[#ffb77d] text-lg">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 w-full z-40 bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#3a485c] shadow-sm transition-colors duration-300">
        <div className="h-20 w-full px-margin-mobile md:px-margin lg:px-margin-desktop flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-lg">
            <a
              className="flex items-center gap-space-sm group"
              href="#discover"
              onClick={(e) => handleNavigate('discover', e)}
            >
              <img
                alt="AZVerse Glowing Emblem Logo"
                className="h-8 w-auto object-contain drop-shadow-sm"
                src={IMAGES.logo}
                referrerPolicy="no-referrer"
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-slate-900 dark:text-[#faf8ff] uppercase">
                AZ
                <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-[#2f1500] text-amber-700 dark:text-[#ffb77d] font-label-sm text-label-sm font-bold tracking-widest border border-amber-500/20 dark:border-[#887364]/60">
                  VERSE
                </span>
              </span>
            </a>

            <nav className="hidden xl:flex items-center gap-space-xs">
              <a
                aria-current={activeNavKey === 'discover' ? 'page' : undefined}
                className={`px-space-md py-space-sm rounded-lg transition-colors ${
                  activeNavKey === 'discover'
                    ? 'bg-amber-500/10 dark:bg-[#2f1500] text-amber-700 dark:text-[#ffb77d] font-semibold border border-transparent dark:border-[#887364]/40'
                    : 'font-label-lg text-label-lg text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] hover:bg-slate-100 dark:hover:bg-[#283044]'
                }`}
                href="#discover"
                onClick={(e) => handleNavigate('discover', e)}
              >
                Discover
              </a>

              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] hover:bg-slate-100 dark:hover:bg-[#283044] transition-colors"
                >
                  <span>Categories</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180 text-slate-400 dark:text-[#b9c7e0]">
                    expand_more
                  </span>
                </button>
                <div className="absolute left-0 top-full pt-space-xs hidden group-hover:block w-48 z-50">
                  <div className="bg-white dark:bg-[#283044] rounded-xl p-space-xs shadow-xl border border-slate-200 dark:border-[#3a485c]">
                    <a
                      className="flex items-center px-space-md py-space-sm rounded-lg font-label-md text-label-md text-slate-700 dark:text-[#eef0ff] hover:text-amber-800 dark:hover:text-[#ffb77d] hover:bg-amber-50/70 dark:hover:bg-[#3a485c] transition-colors"
                      href="#movies"
                      onClick={(e) => handleNavigate('category-movies', e)}
                    >
                      Movies
                    </a>
                    <a
                      className="flex items-center px-space-md py-space-sm rounded-lg font-label-md text-label-md text-slate-700 dark:text-[#eef0ff] hover:text-amber-800 dark:hover:text-[#ffb77d] hover:bg-amber-50/70 dark:hover:bg-[#3a485c] transition-colors"
                      href="#anime"
                      onClick={(e) => handleNavigate('category-anime', e)}
                    >
                      Anime
                    </a>
                    <a
                      className="flex items-center px-space-md py-space-sm rounded-lg font-label-md text-label-md text-slate-700 dark:text-[#eef0ff] hover:text-amber-800 dark:hover:text-[#ffb77d] hover:bg-amber-50/70 dark:hover:bg-[#3a485c] transition-colors"
                      href="#tech"
                      onClick={(e) => handleNavigate('category-tech', e)}
                    >
                      Tech
                    </a>
                    <a
                      className="flex items-center px-space-md py-space-sm rounded-lg font-label-md text-label-md text-slate-700 dark:text-[#eef0ff] hover:text-amber-800 dark:hover:text-[#ffb77d] hover:bg-amber-50/70 dark:hover:bg-[#3a485c] transition-colors"
                      href="#gaming"
                      onClick={(e) => handleNavigate('category-gaming', e)}
                    >
                      Gaming
                    </a>
                  </div>
                </div>
              </div>

              <a
                className={`px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-colors ${
                  activeNavKey === 'trending'
                    ? 'bg-amber-500/10 dark:bg-[#2f1500] text-amber-700 dark:text-[#ffb77d] font-semibold border border-transparent dark:border-[#887364]/40'
                    : 'text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] hover:bg-slate-100 dark:hover:bg-[#283044]'
                }`}
                href="#trending"
                onClick={(e) => handleNavigate('trending', e)}
              >
                Trending
              </a>
              <a
                className={`px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-colors ${
                  activeNavKey === 'community-arena'
                    ? 'bg-amber-500/10 dark:bg-[#2f1500] text-amber-700 dark:text-[#ffb77d] font-semibold border border-transparent dark:border-[#887364]/40'
                    : 'text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] hover:bg-slate-100 dark:hover:bg-[#283044]'
                }`}
                href="#community-arena"
                onClick={(e) => handleNavigate('community-arena', e)}
              >
                Community Arena
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-space-md">
            {/* Search Box with Live Dropdown */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-space-sm bg-slate-100/90 dark:bg-[#283044] hover:bg-slate-100 dark:hover:bg-[#3a485c]/80 border border-slate-200/80 dark:border-[#3a485c] px-space-md py-2 rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400 dark:text-[#b9c7e0] text-[18px]">search</span>
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="bg-transparent w-44 lg:w-64 font-body-sm text-body-sm text-slate-800 dark:text-[#eef0ff] placeholder:text-slate-400 dark:placeholder:text-[#b9c7e0]/80 focus:outline-none"
                  placeholder="Search rankings, critics, tags..."
                  type="text"
                />
                <kbd className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-white dark:bg-[#131b2e] text-slate-500 dark:text-[#b9c7e0] border border-slate-200 dark:border-[#4f5d72] shadow-xs">
                  ⌘K
                </kbd>
              </div>

              {showSearchDropdown && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#283044] rounded-2xl shadow-xl border border-slate-200 dark:border-[#3a485c] p-2 z-50">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-[#3a485c]">
                    <span className="font-label-sm text-label-sm text-slate-400 dark:text-[#b9c7e0] uppercase">
                      Consensus Search Results
                    </span>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }}
                      className="text-xs text-slate-400 dark:text-[#b9c7e0] hover:text-slate-700 dark:hover:text-[#faf8ff]"
                    >
                      Clear
                    </button>
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                      No matching canons found for "{searchQuery}"
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-[#3a485c]">
                      {searchResults.map((res, i) => (
                        <button
                          key={i}
                          onClick={res.onClick}
                          className="w-full text-left px-3 py-2.5 hover:bg-amber-50/70 dark:hover:bg-[#3a485c] rounded-xl transition-colors block"
                        >
                          <span className="font-label-sm text-label-sm text-amber-700 dark:text-[#ffb77d] uppercase font-bold block">
                            {res.type}
                          </span>
                          <span className="font-label-md text-label-md text-slate-900 dark:text-[#eef0ff] font-bold block truncate">
                            {res.title}
                          </span>
                          <span className="font-body-sm text-xs text-slate-500 dark:text-[#b9c7e0] block truncate">
                            {res.subtitle}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <a
              className="hidden sm:inline-flex items-center gap-space-xs bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] px-4 py-2.5 rounded-full font-label-lg text-label-lg font-bold transition-all shadow-sm shadow-amber-500/30 hover:shadow-md"
              href="#submit-list"
              onClick={(e) => handleNavigate('submit-list', e)}
            >
              Submit a List
            </a>

            <div className="flex items-center gap-space-xs relative">
              <button
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                onClick={handleToggleDarkMode}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-[#ffb77d] hover:text-slate-900 dark:hover:text-[#ffdcc3] hover:bg-slate-100 dark:hover:bg-[#283044] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#3a485c]"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] hover:bg-slate-100 dark:hover:bg-[#283044] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#3a485c]"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 dark:bg-[#fd8a42] ring-2 ring-white dark:ring-[#131b2e]"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-11 w-80 bg-white dark:bg-[#283044] rounded-2xl shadow-xl border border-slate-200 dark:border-[#3a485c] p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-[#3a485c]">
                    <span className="font-label-md text-label-md text-slate-900 dark:text-[#faf8ff] font-bold">
                      Guild Notifications
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-[#2f1500] text-amber-800 dark:text-[#ffdcc3] border border-transparent dark:border-[#887364]/50 font-label-sm text-label-sm font-bold">
                      2 Live
                    </span>
                  </div>
                  <div className="space-y-2 font-body-sm text-xs text-slate-600 dark:text-[#d5e3fd]">
                    <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-[#2f1500]/80 border border-amber-200/60 dark:border-[#887364]/60">
                      <strong className="text-slate-900 dark:text-[#ffdcc3] block">Arena Round 47 Surge</strong>
                      Interstellar holds a 57% lead over 2001: A Space Odyssey.
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200/60 dark:border-[#3a485c]">
                      <strong className="text-slate-900 dark:text-[#eef0ff] block">Elena Vance published a new list</strong>
                      "Top 10 Mind-Bending Sci-Fi Masterpieces That Redefined Cinema"
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              className="relative p-0.5 rounded-full ring-2 ring-slate-200 dark:ring-[#3a485c] hover:ring-amber-500 dark:hover:ring-[#ffb77d] transition-all group"
              href="#profile"
              onClick={(e) => handleNavigate('user-critic-profile', e)}
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={IMAGES.userAvatar}
                referrerPolicy="no-referrer"
              />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full pt-20 bg-[#f8fafc] dark:bg-[#131b2e] min-h-[calc(100vh-80px)] transition-colors duration-300">
        {activeRoute === 'submit-list' ? (
          <SubmitListView
            onBack={() => setActiveRoute('discover')}
            onPublishCustomList={(newList) => {
              setUniverseCards((prev) => [newList, ...prev]);
              setActiveRoute('discover');
              triggerToast(`Published "${newList.title}" to Trending Universes!`);
              setTimeout(() => {
                document
                  .getElementById('trending-universes-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        ) : activeRoute === 'user-critic-profile' ? (
          <CriticProfileView
            onBack={() => setActiveRoute('discover')}
            savedCount={(listSaved ? 1 : 0) + (spotlightSaved ? 1 : 0)}
            votesCastCount={Object.values(userVotes).filter((v) => v !== 0).length}
          />
        ) : (
          <div className="flex flex-col w-full">
            {/* Luminous Quartz Cinema Dynamic Hero Canvas */}
            <div className="relative w-full overflow-hidden">
              {/* 1. HERO SECTION WITH VIVID, CRISP CINEMATIC REEL */}
              <section
                className="relative w-full px-margin-mobile md:px-margin lg:px-margin-desktop pt-10 pb-14 overflow-hidden"
                id="hero-carousel-section"
              >
                {/* DYNAMIC CINEMATIC BACKDROP SLIDESHOW - Prominent & Vivid Clarity */}
                <svg className="hidden" aria-hidden="true">
                  <filter id="cinema-hd-sharpen">
                    <feConvolveMatrix
                      order="3"
                      preserveAlpha="true"
                      kernelMatrix="0 -0.45 0 -0.45 2.8 -0.45 0 -0.45 0"
                    />
                  </filter>
                </svg>
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {HERO_SLIDES.map((slide, idx) => (
                    <div
                      key={slide.index}
                      className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        idx === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      data-canon={slide.canon}
                      data-index={slide.index}
                      data-label={slide.label}
                    >
                      <img
                        alt={slide.alt}
                        style={{ filter: 'url(#cinema-hd-sharpen) contrast(1.06) saturate(1.1)' }}
                        className="w-full h-full object-cover kenburns-active"
                        src={slide.src}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                  {/* CLEAR CINEMATIC VIGNETTE & BOTTOM TRANSITION (Preserves full image visibility in both Light & Dark modes) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/15 to-[#f8fafc] dark:from-[#0d1c2f]/35 dark:via-[#131b2e]/30 dark:to-[#131b2e] transition-colors duration-300"></div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/75 to-transparent dark:from-[#131b2e] dark:via-[#131b2e]/80 dark:to-transparent transition-colors duration-300"></div>
                </div>

                {/* LIVE REEL STATUS BADGE & THUMBNAIL SWITCHER (TOP BAR IN HERO) */}
                <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between pb-6 pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#283044]/90 backdrop-blur-md border border-slate-200/90 dark:border-[#3a485c] text-slate-800 dark:text-[#eef0ff] font-label-sm text-label-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-[#fd8a42] animate-ping"></span>
                    <span className="font-bold text-amber-700 dark:text-[#ffb77d]" id="reel-indicator-text">
                      LIVE REEL: {reelNumStr} / 04 — {currentReelSlide.label}
                    </span>
                  </div>
                  {/* Quick Reel Selector Dots */}
                  <div className="flex items-center gap-2 bg-white/90 dark:bg-[#283044]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 dark:border-[#3a485c] shadow-sm">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.index}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        aria-label={`Reel ${idx + 1}: ${slide.label}`}
                        className={
                          idx === currentSlideIndex
                            ? 'reel-dot w-6 h-1.5 rounded-full bg-amber-500 dark:bg-[#fd8a42] shadow-sm transition-all'
                            : 'reel-dot w-2 h-1.5 rounded-full bg-slate-300 dark:bg-[#4f5d72] hover:bg-slate-400 dark:hover:bg-[#67758c] transition-all'
                        }
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center mt-6">
                  {/* Hero Text Wrapper - Unobstructed view of the hero backdrop */}
                  <div className="w-full max-w-4xl px-4 py-6 flex flex-col items-center text-center">
                    <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl max-w-3xl tracking-tight text-slate-950 dark:text-[#faf8ff] font-bold drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_2px_16px_rgba(13,28,47,0.9)] leading-tight">
                      The Ultimate Universe of <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-[#ffb77d] dark:via-[#ffdcc3] dark:to-[#fd8a42] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)] dark:drop-shadow-[0_2px_10px_rgba(13,28,47,0.8)]">
                        Top 10s &amp; Deep Reviews
                      </span>
                    </h1>
                    <p className="mt-4 font-body-lg text-body-lg text-slate-900 dark:text-[#eef0ff] max-w-2xl leading-relaxed font-semibold drop-shadow-[0_1px_10px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_2px_12px_rgba(13,28,47,0.95)]">
                      Curated cinephile breakdowns, anime epics, cutting-edge silicon, and gaming milestones—debated, ranked, and decided by millions in theater-grade consensus.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
                      {[
                        'All Universes',
                        'Sci-Fi & Cinema',
                        'Dark Thrillers',
                        'Shonen & Cyberpunk Anime',
                        'Next-Gen Gaming',
                        'Silicon Frontiers',
                      ].map((pill) => {
                        const isActive = heroUniverseFilter === pill;
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => {
                              setHeroUniverseFilter(pill);
                              if (pill === 'Shonen & Cyberpunk Anime') {
                                setTrendingCategoryFilter('Anime & Animation');
                              } else if (pill === 'Next-Gen Gaming') {
                                setTrendingCategoryFilter('Gaming Masterpieces');
                              } else if (pill === 'Dark Thrillers') {
                                setTrendingCategoryFilter('Dark Noir & Thrillers');
                              } else if (pill === 'Silicon Frontiers') {
                                setTrendingCategoryFilter('Prestige TV Epics');
                              } else {
                                setTrendingCategoryFilter('All Ranked');
                              }
                            }}
                            className={
                              isActive
                                ? 'px-4 py-2 rounded-full bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] font-label-lg text-label-lg font-bold shadow-md shadow-amber-500/30 transition-all hover:bg-amber-600 dark:hover:bg-[#8d4b00]'
                                : 'px-4 py-2 rounded-full bg-white/85 dark:bg-[#283044]/90 hover:bg-white dark:hover:bg-[#3a485c] text-slate-900 dark:text-[#eef0ff] font-label-lg text-label-lg border border-white/90 dark:border-[#4f5d72] backdrop-blur-md shadow-sm transition-colors font-semibold'
                            }
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metric Pulse Ticker Bar */}
                  <div className="mt-8 w-full grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/95 dark:bg-[#283044]/95 backdrop-blur-md border border-slate-200/90 dark:border-[#3a485c] p-3 rounded-2xl shadow-sm shadow-slate-200/60 dark:shadow-[#0d1c2f]/60 transition-colors">
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-[#131b2e]/85 border border-slate-100 dark:border-[#3a485c]">
                      <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-[22px]">
                        format_list_numbered
                      </span>
                      <div className="text-left">
                        <span className="block font-headline-sm text-sm text-slate-900 dark:text-[#faf8ff] font-bold tracking-tight">
                          14,820
                        </span>
                        <span className="block font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0]">
                          Active Countdowns
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-[#131b2e]/85 border border-slate-100 dark:border-[#3a485c]">
                      <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-[22px]">
                        how_to_vote
                      </span>
                      <div className="text-left">
                        <span className="block font-headline-sm text-sm text-slate-900 dark:text-[#faf8ff] font-bold tracking-tight">
                          1.4M
                        </span>
                        <span className="block font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0]">
                          Community Votes This Week
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-[#131b2e]/85 border border-slate-100 dark:border-[#3a485c]">
                      <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-[22px]">
                        verified_user
                      </span>
                      <div className="text-left">
                        <span className="block font-headline-sm text-sm text-slate-900 dark:text-[#faf8ff] font-bold tracking-tight">
                          892
                        </span>
                        <span className="block font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0]">
                          Verified Guild Critics
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-50/80 dark:bg-[#2f1500]/90 border border-amber-100 dark:border-[#887364]/60">
                      <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-[22px] animate-bounce">
                        local_fire_department
                      </span>
                      <div className="text-left truncate">
                        <span className="block font-headline-sm text-sm text-amber-800 dark:text-[#ffdcc3] font-bold truncate">
                          Top 10 Sci-Fi Decade
                        </span>
                        <span className="block font-label-sm text-label-sm text-amber-600 dark:text-[#ffb77d] truncate">
                          Trending Live Now
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CAROUSEL AMBER SYNC PROGRESS TRACK BAR */}
                  <div className="w-full mt-4 flex items-center justify-between gap-3 px-1">
                    {HERO_SLIDES.map((slide, idx) => {
                      let widthPct = '0%';
                      if (idx < currentSlideIndex) widthPct = '100%';
                      else if (idx === currentSlideIndex) widthPct = `${slideProgress}%`;
                      return (
                        <div
                          key={slide.index}
                          onClick={() => handleSelectSlide(idx)}
                          className="flex-1 h-1.5 bg-slate-200/90 dark:bg-[#283044] rounded-full overflow-hidden cursor-pointer"
                        >
                          <div
                            className="reel-progress-bar h-full bg-amber-500 dark:bg-[#fd8a42] transition-all duration-150"
                            style={{ width: widthPct }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* LIVE PULSE MARQUEE */}
                  <div className="w-full border-y border-slate-200/80 dark:border-[#3a485c] bg-white/80 dark:bg-[#283044]/90 backdrop-blur-md flex items-center overflow-hidden py-3 px-4 my-6 rounded-xl shadow-xs relative z-10 transition-colors">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-[#ffdcc3] bg-amber-50 dark:bg-[#2f1500] border border-amber-200 dark:border-[#887364]/60 px-3 py-1 rounded-full shrink-0 mr-4 z-10 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-[#fd8a42] animate-ping"></span>
                      <span>LIVE PULSE</span>
                    </div>
                    <div className="overflow-hidden relative flex-1">
                      <div className="inline-flex items-center gap-6 whitespace-nowrap text-xs font-medium text-slate-700 dark:text-[#d5e3fd] font-body-sm animate-marquee">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🏆</span> Dune: Part Two captures {pollPercentages[0]}% in Arena Battle
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">⭐</span> Interstellar locks #1 Sci-Fi Apex (9.8 Score)
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🎮</span> Elden Ring dominates Top 10 Souls Encounters (160k votes)
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🎬</span> Denis Villeneuve: Geometry of Dread (22 min read)
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🩸</span> Top 10 Survival Horror Games ranks #2 today
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">✨</span> Studio Ghibli Golden Era achieves 9.8 consensus
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🔥</span> 42,100 new ballots verified in the last hour
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🏆</span> Dune: Part Two captures {pollPercentages[0]}% in Arena Battle
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">⭐</span> Interstellar locks #1 Sci-Fi Apex (9.8 Score)
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🎮</span> Elden Ring dominates Top 10 Souls Encounters (160k votes)
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🎬</span> Denis Villeneuve: Geometry of Dread (22 min read)
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🩸</span> Top 10 Survival Horror Games ranks #2 today
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">✨</span> Studio Ghibli Golden Era achieves 9.8 consensus
                        </span>
                        <span className="text-amber-400 dark:text-[#fd8a42] font-bold">✦</span>
                        <span className="inline-flex items-center gap-2">
                          <span className="text-amber-500 dark:text-[#ffb77d] font-bold">🔥</span> 42,100 new ballots verified in the last hour
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 1: CURATED FLAGSHIP TOP 10 HUBS (MULTI-GENRE LISTICLE GRID) — Placed right after Hero */}
              <section
                id="trending-universes-section"
                className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop pt-4 pb-12 border-b border-slate-200/80 dark:border-[#3a485c] bg-white/60 dark:bg-[#0d1c2f]/50 transition-colors"
              >
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#2f1500] border border-amber-200/70 dark:border-[#887364]/60 text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-base text-amber-600 dark:text-[#ffb77d]">
                          auto_awesome
                        </span>
                        Consensus Matrix Explorations
                      </div>
                      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-slate-900 dark:text-[#faf8ff] tracking-tight font-bold">
                        Trending Universes: Fresh Top 10 Countdowns
                      </h2>
                      <p className="mt-1 font-body-md text-body-md text-slate-600 dark:text-[#d5e3fd] max-w-2xl">
                        Explore peer-audited and guild-ranked listicles across cinema, milestone gaming, cyberpunk animation, and prestige television.
                      </p>
                    </div>
                    {/* Interactive Category Switcher */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                      {[
                        'All Ranked',
                        'Anime & Animation',
                        'Gaming Masterpieces',
                        'Dark Noir & Thrillers',
                        'Prestige TV Epics',
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setTrendingCategoryFilter(cat)}
                          className={
                            trendingCategoryFilter === cat
                              ? 'px-4 py-2 rounded-full bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] font-label-md text-label-md font-bold shadow-xs whitespace-nowrap'
                              : 'px-4 py-2 rounded-full bg-slate-100 dark:bg-[#283044] hover:bg-slate-200 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-md text-label-md font-semibold transition-colors border border-slate-200/60 dark:border-[#3a485c] whitespace-nowrap'
                          }
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4-Grid Multi-Genre Countdown Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTrendingCards.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => setActiveUniverseExplorer(card)}
                        className="bg-white dark:bg-[#283044] rounded-2xl border border-slate-200/90 dark:border-[#3a485c] shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-amber-400/60 dark:hover:border-[#ffb77d]/60 transition-all cursor-pointer"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#131b2e]">
                          <img
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={card.image}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#131b2e]/95 backdrop-blur-md text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-bold shadow-xs border border-amber-200/50 dark:border-[#887364]/60">
                            {card.badge}
                          </div>
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/85 dark:bg-[#0d1c2f]/90 backdrop-blur-md text-white dark:text-[#faf8ff] font-label-sm text-label-sm font-bold shadow-xs">
                            {card.score}
                          </div>
                          <div className="absolute bottom-2 left-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 dark:bg-[#0d1c2f]/85 backdrop-blur-md text-white text-xs flex items-center justify-between">
                            <span className="text-slate-300 dark:text-[#b9c7e0] font-medium">#1 Peak:</span>
                            <span className="font-bold truncate text-amber-300 dark:text-[#ffb77d] ml-1">
                              {card.peakEntry}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold tracking-tight group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors line-clamp-2">
                              {card.title}
                            </h3>
                            <p className="mt-1.5 font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd] line-clamp-2">
                              {card.description}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-100 dark:border-[#3a485c] flex items-center justify-between font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0]">
                            <div className="flex items-center gap-2">
                              <img
                                alt={card.criticName}
                                className="w-6 h-6 rounded-full object-cover"
                                src={card.criticAvatar}
                                referrerPolicy="no-referrer"
                              />
                              <span className="font-semibold text-slate-700 dark:text-[#eef0ff] truncate max-w-[100px]">
                                {card.criticName}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600 dark:text-[#b9c7e0]">
                              <span className="material-symbols-outlined text-sm text-amber-600 dark:text-[#ffb77d]">
                                how_to_vote
                              </span>
                              <span>{card.votes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* MAIN TWO-COLUMN DISCOVERY WORKSPACE */}
              <div
                className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop pt-12 pb-24"
                id="flagship-listicle-section"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
                  {/* LEFT MAIN CONTENT: FLAGSHIP LISTICLE (8 COLS) */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* 2. FLAGSHIP LISTICLE SHOWCASE HEADER */}
                    <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm relative overflow-hidden transition-colors">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-400/10 blur-[90px] rounded-full pointer-events-none"></div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#2f1500] border border-amber-200/60 dark:border-[#887364]/60 text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-semibold tracking-wider uppercase">
                          <span className="material-symbols-outlined text-base text-amber-600 dark:text-[#ffb77d]">
                            stars
                          </span>{' '}
                          AZVerse Canon Featured
                        </div>
                        <div className="flex items-center gap-4 font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-slate-400 dark:text-[#b9c7e0]">
                              visibility
                            </span>{' '}
                            248.5k
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-slate-400 dark:text-[#b9c7e0]">
                              thumb_up
                            </span>{' '}
                            42.1k
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-slate-400 dark:text-[#b9c7e0]">
                              schedule
                            </span>{' '}
                            18 min
                          </span>
                        </div>
                      </div>
                      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-slate-900 dark:text-[#faf8ff] tracking-tight mb-4 font-bold">
                        Top 10 Mind-Bending Sci-Fi Masterpieces That Redefined Cinema
                      </h2>
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-3">
                          <img
                            alt="Elena Vance"
                            className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-slate-200 dark:ring-[#4f5d72]"
                            src={IMAGES.elenaVance}
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold">
                                Elena Vance
                              </span>
                              <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-sm">
                                verified
                              </span>
                            </div>
                            <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                              Chief Cinema Lead • Published 3h ago
                            </span>
                          </div>
                        </div>
                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setListSaved(!listSaved);
                              triggerToast(
                                !listSaved
                                  ? 'Saved Flagship Sci-Fi Canon to your Dossier'
                                  : 'Removed from Saved Lists'
                              );
                            }}
                            className={`px-3.5 py-1.5 rounded-lg text-label-md font-label-md flex items-center gap-1.5 transition-colors border font-semibold ${
                              listSaved
                                ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] border-amber-500 dark:border-[#b15f00]'
                                : 'bg-slate-100 dark:bg-[#131b2e] hover:bg-slate-200 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] border-slate-200/60 dark:border-[#4f5d72]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-base">
                              {listSaved ? 'bookmark_added' : 'bookmark_add'}
                            </span>{' '}
                            {listSaved ? 'Saved' : 'Save'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(window.location.href);
                              triggerToast('Canon permalink copied to clipboard');
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2e] hover:bg-slate-200 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] text-label-md font-label-md flex items-center gap-1.5 transition-colors border border-slate-200/60 dark:border-[#4f5d72] font-semibold"
                          >
                            <span className="material-symbols-outlined text-base text-slate-500 dark:text-[#b9c7e0]">
                              share
                            </span>{' '}
                            Share
                          </button>
                        </div>
                      </div>

                      {/* DUAL SORT SWITCHER & FILTERS BAR */}
                      <div className="mt-8 pt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50 dark:bg-[#131b2e]/80 p-3 rounded-xl border border-slate-200/80 dark:border-[#3a485c]">
                        {/* Switcher Tabs */}
                        <div className="flex items-center bg-white dark:bg-[#283044] p-1 rounded-lg border border-slate-200/80 dark:border-[#4f5d72] shadow-xs">
                          <button
                            type="button"
                            onClick={() => setRankingMode('editorial')}
                            className={
                              rankingMode === 'editorial'
                                ? 'px-4 py-2 rounded-md font-label-md text-label-md font-bold bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] shadow-xs transition-all flex items-center gap-1.5'
                                : 'px-4 py-2 rounded-md font-label-md text-label-md text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors flex items-center gap-1.5'
                            }
                            id="tab-editorial"
                          >
                            <span className="material-symbols-outlined text-base">
                              military_tech
                            </span>
                            Editorial Countdown (#10 → #1)
                          </button>
                          <button
                            type="button"
                            onClick={() => setRankingMode('community')}
                            className={
                              rankingMode === 'community'
                                ? 'px-4 py-2 rounded-md font-label-md text-label-md font-bold bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] shadow-xs transition-all flex items-center gap-1.5'
                                : 'px-4 py-2 rounded-md font-label-md text-label-md text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors flex items-center gap-1.5'
                            }
                            id="tab-community"
                          >
                            <span className="material-symbols-outlined text-base text-slate-400 dark:text-[#b9c7e0]">
                              trending_up
                            </span>
                            Visitor Live Ranking
                          </button>
                        </div>

                        {/* Quick Sub-filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                          <button
                            type="button"
                            onClick={() => setSubFilter('all')}
                            className={`px-3 py-1.5 rounded-lg border font-label-sm text-label-sm font-semibold shrink-0 transition-colors ${
                              subFilter === 'all'
                                ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] border-amber-500 dark:border-[#b15f00]'
                                : 'bg-white dark:bg-[#283044] hover:bg-slate-100 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] border-slate-200 dark:border-[#4f5d72]'
                            }`}
                          >
                            All 10 Entries
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubFilter(subFilter === 'imax' ? 'all' : 'imax')}
                            className={`px-3 py-1.5 rounded-lg border font-label-sm text-label-sm shrink-0 flex items-center gap-1 transition-colors ${
                              subFilter === 'imax'
                                ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] border-amber-500 dark:border-[#b15f00] font-bold'
                                : 'bg-white dark:bg-[#283044] hover:bg-slate-100 dark:hover:bg-[#3a485c] text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] border-slate-200 dark:border-[#4f5d72]'
                            }`}
                          >
                            <span>IMAX / 4K</span>
                            <span className="material-symbols-outlined text-xs">tune</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSubFilter(subFilter === 'score93' ? 'all' : 'score93')
                            }
                            className={`px-3 py-1.5 rounded-lg border font-label-sm text-label-sm shrink-0 flex items-center gap-1 transition-colors ${
                              subFilter === 'score93'
                                ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] border-amber-500 dark:border-[#b15f00] font-bold'
                                : 'bg-white dark:bg-[#283044] hover:bg-slate-100 dark:hover:bg-[#3a485c] text-slate-600 dark:text-[#d5e3fd] hover:text-slate-900 dark:hover:text-[#faf8ff] border-slate-200 dark:border-[#4f5d72]'
                            }`}
                          >
                            <span>Score 9.0+</span>
                            <span className="material-symbols-outlined text-xs">
                              arrow_drop_down
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 3. COUNTDOWN CARDS */}
                    {/* ITEM #01 CARD (GOLD MASTER CHAMPION) */}
                    <article className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#283044] border-2 border-amber-400/40 dark:border-[#ffb77d]/45 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-amber-500/70 dark:hover:border-[#ffb77d]/70">
                      <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none"></div>
                      <div className="flex flex-col gap-6">
                        {/* Top Row: Apex Badge + Rank Display + Critic Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="font-rank-display text-rank-display font-bold text-amber-600 dark:text-[#ffb77d] drop-shadow-xs">
                              #01
                            </div>
                            <div>
                              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-xs">
                                <span className="material-symbols-outlined text-xs">
                                  workspace_premium
                                </span>{' '}
                                {entry01.badgeText || 'Consensus Apex'}
                              </span>
                              <span className="block font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0] mt-0.5 font-medium">
                                {entry01.subBadgeText}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="font-headline-sm text-headline-sm text-amber-700 dark:text-[#ffb77d] font-bold block">
                                {entry01.verdictScore.toFixed(1)}
                              </span>
                              <span className="font-label-sm text-label-sm text-slate-400 dark:text-[#b9c7e0] uppercase tracking-wider font-semibold">
                                Verdict
                              </span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-[#2f1500] border border-amber-200/80 dark:border-[#887364]/60 flex items-center justify-center text-amber-600 dark:text-[#ffb77d] shadow-xs">
                              <span className="material-symbols-outlined text-2xl">trophy</span>
                            </div>
                          </div>
                        </div>

                        {/* Media Showcase Container */}
                        <div
                          onClick={() => setActiveBreakdownEntry(entry01)}
                          className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-[#3a485c] group cursor-pointer"
                        >
                          <img
                            alt={entry01.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={entry01.image}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          {/* Floating Play Trailer / Audio Preview */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveBreakdownEntry(entry01);
                              }}
                              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/95 text-slate-900 hover:bg-amber-500 hover:text-white transition-all shadow-lg backdrop-blur-md transform group-hover:scale-105 font-bold"
                            >
                              <span className="material-symbols-outlined text-xl">play_arrow</span>
                              <span className="font-label-lg text-label-lg">
                                {entry01.trailerLabel || 'Watch Official 4K Trailer • 2:45'}
                              </span>
                            </button>
                          </div>
                          {/* Floating Video Overlays (Bottom left & right) */}
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md text-amber-700 dark:text-[#ffb77d] font-label-sm text-label-sm font-semibold shadow-xs">
                              4K HDR
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md text-slate-800 dark:text-[#eef0ff] font-label-sm text-label-sm font-semibold shadow-xs">
                              IMAX Enhanced
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md text-slate-800 dark:text-[#eef0ff] font-label-sm text-label-sm font-semibold shadow-xs">
                              Dolby Atmos
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md text-slate-700 dark:text-[#eef0ff] font-label-sm text-label-sm font-medium shadow-xs">
                            <span className="material-symbols-outlined text-sm text-amber-600 dark:text-[#ffb77d]">
                              graphic_eq
                            </span>
                            <span>{entry01.audioTag || 'Zimmer Organ Peak'}</span>
                          </div>
                        </div>

                        {/* Title & Editorial Breakdown */}
                        <div>
                          <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-[#faf8ff] tracking-tight font-bold">
                            {entry01.title} ({entry01.year}) —{' '}
                            <span className="text-slate-500 dark:text-[#b9c7e0] font-normal">
                              Dir. {entry01.director}
                            </span>
                          </h3>
                          {/* Accolade Chips */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-md bg-amber-50 dark:bg-[#2f1500] border border-amber-200/60 dark:border-[#887364]/60 text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs text-amber-600 dark:text-[#ffb77d]">
                                star
                              </span>{' '}
                              Academy Award: Visual Effects
                            </span>
                            <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#4f5d72] text-slate-700 dark:text-[#d5e3fd] font-label-sm text-label-sm font-medium">
                              99% Audience Metacritic
                            </span>
                            <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#4f5d72] text-slate-700 dark:text-[#d5e3fd] font-label-sm text-label-sm font-medium">
                              Kip Thorne Physics Verified
                            </span>
                          </div>
                          {/* Editorial Consensus Quote */}
                          <blockquote className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-[#131b2e]/80 border-l-4 border-amber-500 dark:border-[#fd8a42] text-slate-700 dark:text-[#d5e3fd] font-body-md text-body-md italic shadow-xs">
                            {entry01.quote}
                            <span className="block mt-2 font-label-sm text-label-sm text-amber-800 dark:text-[#ffb77d] uppercase font-bold not-italic">
                              {entry01.quoteAuthor}
                            </span>
                          </blockquote>
                        </div>

                        {/* Interactive Voting & Engagement Pill Strip */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 bg-slate-50 dark:bg-[#131b2e]/80 p-3 rounded-xl border border-slate-200/80 dark:border-[#3a485c]">
                          {/* Dual Vote Conjoined Unit */}
                          <div className="inline-flex items-center rounded-full bg-white dark:bg-[#283044] p-1 shadow-xs border border-slate-200 dark:border-[#4f5d72]">
                            <button
                              type="button"
                              onClick={() => handleEntryVote(entry01.id, 1)}
                              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] font-label-lg text-label-lg font-bold transition-all shadow-xs"
                            >
                              <span className="material-symbols-outlined text-base">thumb_up</span>
                              <span>{entry01.upvotes.toLocaleString()}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEntryVote(entry01.id, -1)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
                                userVotes[entry01.id] === -1
                                  ? 'bg-slate-800 dark:bg-[#3a485c] text-white'
                                  : 'text-slate-500 dark:text-[#b9c7e0] hover:text-slate-900 dark:hover:text-[#faf8ff]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-base">
                                thumb_down
                              </span>
                              <span>{entry01.downvotes}</span>
                            </button>
                          </div>

                          {/* Community Star Rater */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-amber-500 dark:text-[#ffb77d] text-base">
                              <span className="material-symbols-outlined text-[18px]">star</span>
                              <span className="material-symbols-outlined text-[18px]">star</span>
                              <span className="material-symbols-outlined text-[18px]">star</span>
                              <span className="material-symbols-outlined text-[18px]">star</span>
                              <span className="material-symbols-outlined text-[18px]">
                                star_half
                              </span>
                            </div>
                            <span className="font-label-lg text-label-lg text-slate-900 dark:text-[#faf8ff] font-bold">
                              4.9
                            </span>
                            <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                              (38,104 ratings)
                            </span>
                          </div>

                          {/* Action Tools */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveBreakdownEntry(entry01)}
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#283044] hover:bg-slate-100 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-md text-label-md flex items-center gap-1 border border-slate-200 dark:border-[#4f5d72] transition-colors font-semibold"
                            >
                              <span className="material-symbols-outlined text-base text-slate-500 dark:text-[#b9c7e0]">
                                comment
                              </span>
                              <span>{entry01.commentsCount.toLocaleString()}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                triggerToast(`Added "${entry01.title}" to your personal watchlist`)
                              }
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#283044] hover:bg-slate-100 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-md text-label-md flex items-center gap-1 border border-slate-200 dark:border-[#4f5d72] transition-colors"
                            >
                              <span className="material-symbols-outlined text-base text-slate-500 dark:text-[#b9c7e0]">
                                playlist_add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* ITEM #02 CARD (CYBERPUNK NEON MASTERPIECE) */}
                    {entry02 && (
                      <article className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-[#4f5d72]">
                        <div className="flex flex-col gap-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="font-rank-display text-rank-display font-bold text-slate-500 dark:text-[#b9c7e0]">
                                #02
                              </div>
                              <div>
                                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-100 dark:bg-[#131b2e] text-slate-800 dark:text-[#d5e3fd] font-label-sm text-label-sm font-semibold uppercase tracking-wider border border-slate-200 dark:border-[#4f5d72]">
                                  {entry02.badgeText || 'Masterpiece Runner-Up'}
                                </span>
                                <span className="block font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0] mt-0.5">
                                  {entry02.subBadgeText}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold block">
                                  {entry02.verdictScore.toFixed(1)}
                                </span>
                                <span className="font-label-sm text-label-sm text-slate-400 dark:text-[#b9c7e0] uppercase tracking-wider font-semibold">
                                  Verdict
                                </span>
                              </div>
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#4f5d72] flex items-center justify-center text-slate-700 dark:text-[#d5e3fd]">
                                <span className="material-symbols-outlined text-xl">
                                  camera_roll
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Media Preview 16:9 */}
                          <div
                            onClick={() => setActiveBreakdownEntry(entry02)}
                            className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-[#3a485c] group cursor-pointer"
                          >
                            <img
                              alt={entry02.imageAlt}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              src={entry02.image}
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveBreakdownEntry(entry02);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-md backdrop-blur-md font-bold"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  play_arrow
                                </span>
                                <span className="font-label-md text-label-md">
                                  {entry02.trailerLabel || 'Preview Deakins 4K Framing'}
                                </span>
                              </button>
                            </div>
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md text-slate-800 dark:text-[#eef0ff] font-label-sm text-label-sm font-semibold shadow-xs">
                                Deakins Oscar Cinematography
                              </span>
                              <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md text-slate-800 dark:text-[#eef0ff] font-label-sm text-label-sm font-semibold shadow-xs">
                                Sound Design Benchmark
                              </span>
                            </div>
                          </div>

                          {/* Title & Review Text */}
                          <div>
                            <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-[#faf8ff] tracking-tight font-bold">
                              {entry02.title} ({entry02.year}) —{' '}
                              <span className="text-slate-500 dark:text-[#b9c7e0] font-normal">
                                Dir. {entry02.director}
                              </span>
                            </h3>
                            <p className="mt-2 font-body-md text-body-md text-slate-600 dark:text-[#d5e3fd] leading-relaxed">
                              {entry02.description}
                            </p>
                          </div>

                          {/* Item 2 Voting Row */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-[#131b2e] p-1 border border-slate-200 dark:border-[#4f5d72]">
                              <button
                                type="button"
                                onClick={() => handleEntryVote(entry02.id, 1)}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all border font-semibold shadow-xs ${
                                  userVotes[entry02.id] === 1
                                    ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] border-amber-500 dark:border-[#b15f00]'
                                    : 'bg-white dark:bg-[#283044] hover:bg-amber-500 dark:hover:bg-[#b15f00] hover:text-white text-slate-800 dark:text-[#d5e3fd] border-slate-200 dark:border-[#4f5d72]'
                                }`}
                              >
                                <span className="material-symbols-outlined text-base">
                                  thumb_up
                                </span>
                                <span>{entry02.upvotes.toLocaleString()}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEntryVote(entry02.id, -1)}
                                className="flex items-center gap-1 px-3 py-1.5 text-slate-500 dark:text-[#b9c7e0] hover:text-slate-900 dark:hover:text-[#faf8ff] font-label-sm text-label-sm transition-colors"
                              >
                                <span className="material-symbols-outlined text-base">
                                  thumb_down
                                </span>
                                <span>{entry02.downvotes}</span>
                              </button>
                            </div>
                            <div className="flex items-center gap-4 text-slate-500 dark:text-[#b9c7e0] font-label-md text-label-md font-medium">
                              <span
                                onClick={() => setActiveBreakdownEntry(entry02)}
                                className="flex items-center gap-1 text-amber-700 dark:text-[#ffb77d] font-semibold cursor-pointer hover:underline"
                              >
                                <span className="material-symbols-outlined text-base text-amber-600 dark:text-[#ffb77d]">
                                  forum
                                </span>{' '}
                                {entry02.commentsCount.toLocaleString()} comments in debate
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveBreakdownEntry(entry02)}
                                className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2e] hover:bg-slate-200 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] border border-slate-200 dark:border-[#4f5d72] font-semibold"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    )}

                    {/* ITEM #03 CARD */}
                    {entry03 && (
                      <article className="p-6 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm relative overflow-hidden transition-colors">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="font-rank-display text-rank-display font-bold text-slate-400 dark:text-[#b9c7e0]">
                                #03
                              </div>
                              <div>
                                <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] tracking-tight font-bold">
                                  {entry03.title} ({entry03.year}) —{' '}
                                  <span className="text-slate-500 dark:text-[#b9c7e0] font-normal">
                                    Dir. {entry03.director}
                                  </span>
                                </h3>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-[#2f1500] border border-amber-200/70 dark:border-[#887364]/60 text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-semibold">
                                    {entry03.badgeText ||
                                      '▲ Community Voted #2 (+1 in Crowd Mode)'}
                                  </span>
                                  <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                                    • {entry03.subBadgeText}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-headline-sm text-headline-sm text-amber-700 dark:text-[#ffb77d] font-bold">
                                {entry03.verdictScore.toFixed(1)}
                              </span>
                              <span className="font-label-sm text-label-sm text-slate-400 dark:text-[#b9c7e0] uppercase block font-semibold">
                                Verdict
                              </span>
                            </div>
                          </div>
                          <p className="font-body-md text-body-md text-slate-600 dark:text-[#d5e3fd] leading-relaxed">
                            {entry03.description}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-[#131b2e] p-1 border border-slate-200 dark:border-[#4f5d72]">
                              <button
                                type="button"
                                onClick={() => handleEntryVote(entry03.id, 1)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                                  userVotes[entry03.id] === 1
                                    ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff]'
                                    : 'text-slate-700 dark:text-[#d5e3fd] hover:bg-white dark:hover:bg-[#3a485c]'
                                }`}
                              >
                                <span className="material-symbols-outlined text-sm">
                                  thumb_up
                                </span>
                                <span>{entry03.upvotes.toLocaleString()} votes</span>
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveBreakdownEntry(entry03)}
                              className="text-amber-700 dark:text-[#ffb77d] hover:text-amber-800 dark:hover:text-[#ffdcc3] font-label-md text-label-md font-bold flex items-center gap-1"
                            >
                              <span>Read Full Analytical Breakdown</span>
                              <span className="material-symbols-outlined text-base">
                                arrow_forward
                              </span>
                            </button>
                          </div>
                        </div>
                      </article>
                    )}

                    {/* EXPANDABLE BROWSER FOR #04 - #10 */}
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="flex items-center justify-between px-2">
                        <h4 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold">
                          The Contenders (#04 – #10)
                        </h4>
                        <span className="font-label-sm text-label-sm text-slate-400 dark:text-[#b9c7e0] uppercase tracking-wider font-semibold">
                          Instant Review Feed
                        </span>
                      </div>

                      {visibleContenders.map((contender, idx) => {
                        const displayRank = String(idx + 4).padStart(2, '0');
                        const isUpvoted = userVotes[contender.id] === 1;
                        return (
                          <div
                            key={contender.id}
                            onClick={() => setActiveBreakdownEntry(contender)}
                            className="p-4 rounded-xl bg-white dark:bg-[#283044] hover:bg-slate-50 dark:hover:bg-[#3a485c]/80 border border-slate-200 dark:border-[#3a485c] transition-colors flex items-center justify-between gap-4 shadow-xs cursor-pointer"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="font-headline-md text-headline-md text-slate-400 dark:text-[#b9c7e0] font-bold w-12 text-center">
                                #{displayRank}
                              </span>
                              <img
                                alt={contender.imageAlt}
                                className="w-14 h-14 rounded-lg object-cover shrink-0 shadow-xs border border-slate-200 dark:border-[#4f5d72]"
                                src={contender.image}
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <h5 className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold truncate">
                                  {contender.title} ({contender.year})
                                </h5>
                                <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0] truncate block">
                                  {contender.subBadgeText}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <span className="font-label-lg text-label-lg text-amber-700 dark:text-[#ffb77d] font-bold">
                                {contender.verdictScore.toFixed(1)}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEntryVote(contender.id, 1);
                                }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border ${
                                  isUpvoted
                                    ? 'bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] border-amber-500 dark:border-[#b15f00]'
                                    : 'bg-slate-100 dark:bg-[#131b2e] hover:bg-amber-500 dark:hover:bg-[#b15f00] hover:text-white text-slate-600 dark:text-[#d5e3fd] border-slate-200 dark:border-[#4f5d72]'
                                }`}
                              >
                                <span className="material-symbols-outlined text-base">
                                  thumb_up
                                </span>
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* Expand Button */}
                      {contenderEntries.length > 4 && (
                        <button
                          type="button"
                          onClick={() => setShowExpandedContenders(!showExpandedContenders)}
                          className="w-full py-3 rounded-xl bg-white dark:bg-[#283044] hover:bg-slate-50 dark:hover:bg-[#3a485c] border border-slate-200 dark:border-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 transition-colors mt-2 shadow-xs"
                        >
                          <span>
                            {showExpandedContenders
                              ? 'Collapse #08 Alien, #09 Eternal Sunshine & #10 Stalker'
                              : 'Expand #08 Alien, #09 Eternal Sunshine & #10 Stalker'}
                          </span>
                          <span
                            className={`material-symbols-outlined text-lg text-slate-400 dark:text-[#b9c7e0] transition-transform ${
                              showExpandedContenders ? 'rotate-180' : ''
                            }`}
                          >
                            expand_more
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* RIGHT SIDEBAR / COMMUNITY WIDGET RAIL (4 COLS) */}
                  <aside className="lg:col-span-4 flex flex-col gap-6">
                    {/* WIDGET 1: LIVE COMMUNITY ARENA POLL */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm relative overflow-hidden transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-[#fd8a42] animate-ping"></span>
                          <span className="font-label-sm text-label-sm uppercase tracking-widest text-amber-700 dark:text-[#ffb77d] font-bold">
                            Arena Vote Live
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-slate-400 dark:text-[#b9c7e0] font-medium">
                          Closes in 4h
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] mb-2 font-bold">
                        Which 2024 Sci-Fi Film Deserves a Top 5 Spot?
                      </h3>
                      <p className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0] mb-5">
                        Live consensus battle between premier theatrical milestones.
                      </p>
                      {/* Poll Options */}
                      <div className="space-y-3">
                        {[
                          { name: 'Dune: Part Two' },
                          { name: 'Furiosa: Mad Max Saga' },
                          { name: 'Alien: Romulus' },
                        ].map((option, idx) => {
                          const isSelected = selectedPollIndex === idx;
                          const pct = pollPercentages[idx];
                          return (
                            <div
                              key={option.name}
                              onClick={() => setSelectedPollIndex(idx)}
                              className={`p-3 rounded-xl border transition-colors cursor-pointer group ${
                                isSelected
                                  ? 'bg-slate-50 dark:bg-[#131b2e] hover:bg-amber-50/60 dark:hover:bg-[#3a485c]/80 border-amber-400/80 dark:border-[#ffb77d]/60'
                                  : 'bg-slate-50 dark:bg-[#131b2e]/60 hover:bg-slate-100/80 dark:hover:bg-[#131b2e] border-slate-200 dark:border-[#3a485c]'
                              }`}
                            >
                              <div className="flex items-center justify-between font-label-lg text-label-lg mb-1.5">
                                <span
                                  className={
                                    isSelected
                                      ? 'text-slate-900 dark:text-[#faf8ff] font-bold flex items-center gap-1.5'
                                      : 'text-slate-800 dark:text-[#d5e3fd] font-medium flex items-center gap-1.5'
                                  }
                                >
                                  {isSelected && (
                                    <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-base">
                                      check_circle
                                    </span>
                                  )}
                                  {option.name}
                                </span>
                                <span
                                  className={
                                    isSelected
                                      ? 'text-amber-700 dark:text-[#ffb77d] font-bold'
                                      : 'text-slate-600 dark:text-[#b9c7e0] font-bold'
                                  }
                                >
                                  {pct}%
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#283044] overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    idx === 0
                                      ? 'bg-amber-500 dark:bg-[#fd8a42]'
                                      : idx === 1
                                      ? 'bg-slate-400 dark:bg-[#67758c]'
                                      : 'bg-slate-300 dark:bg-[#4f5d72]'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                              <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0] mt-1 block">
                                {pollVotes[idx].toLocaleString()} votes
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={handleCastPollBallot}
                        className="w-full mt-4 py-2.5 rounded-full bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] font-label-lg text-label-lg font-bold transition-all shadow-sm shadow-amber-500/30"
                      >
                        {pollVoted ? 'Ballot Verified ✓' : 'Cast Instant Ballot'}
                      </button>
                    </div>

                    {/* WIDGET 2: TOP RANKED CRITICS LEADERBOARD */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold">
                          Guild Critics
                        </h3>
                        <span className="font-label-sm text-label-sm text-amber-700 dark:text-[#ffb77d] uppercase font-bold tracking-wider">
                          Top Reputation
                        </span>
                      </div>
                      <div className="space-y-4">
                        {/* Critic 1 */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                alt="Julian Vance-Sloan"
                                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-[#4f5d72]"
                                src={IMAGES.julianVance}
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 dark:bg-[#b15f00] text-white font-label-sm text-[10px] flex items-center justify-center font-bold ring-2 ring-white dark:ring-[#283044]">
                                1
                              </span>
                            </div>
                            <div>
                              <span className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold block">
                                Julian Vance-Sloan
                              </span>
                              <span className="font-label-sm text-label-sm text-amber-700 dark:text-[#ffb77d] font-semibold">
                                Grandmaster Critic
                              </span>
                            </div>
                          </div>
                          <span className="font-body-sm text-body-sm text-slate-700 dark:text-[#d5e3fd] font-bold">
                            98.4 rep
                          </span>
                        </div>
                        {/* Critic 2 */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                alt="Aoi Takahashi"
                                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-[#4f5d72]"
                                src={IMAGES.aoiTakahashi}
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-[#3a485c] text-slate-700 dark:text-[#eef0ff] font-label-sm text-[10px] flex items-center justify-center font-bold ring-2 ring-white dark:ring-[#283044]">
                                2
                              </span>
                            </div>
                            <div>
                              <span className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold block">
                                Aoi Takahashi
                              </span>
                              <span className="font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0] font-medium">
                                Animation Fellow
                              </span>
                            </div>
                          </div>
                          <span className="font-body-sm text-body-sm text-slate-700 dark:text-[#d5e3fd] font-bold">
                            96.1 rep
                          </span>
                        </div>
                        {/* Critic 3 */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                alt="Marcus Chen"
                                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-[#4f5d72]"
                                src={IMAGES.marcusChen}
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-[#3a485c] text-slate-700 dark:text-[#eef0ff] font-label-sm text-[10px] flex items-center justify-center font-bold ring-2 ring-white dark:ring-[#283044]">
                                3
                              </span>
                            </div>
                            <div>
                              <span className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold block">
                                Marcus Chen
                              </span>
                              <span className="font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0] font-medium">
                                Silicon Benchmarker
                              </span>
                            </div>
                          </div>
                          <span className="font-body-sm text-body-sm text-slate-700 dark:text-[#d5e3fd] font-bold">
                            94.8 rep
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNavigate('user-critic-profile')}
                        className="w-full mt-5 py-2 rounded-lg bg-slate-100 dark:bg-[#131b2e] hover:bg-slate-200 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-md text-label-md font-semibold transition-colors border border-slate-200 dark:border-[#4f5d72]"
                      >
                        View All 892 Guild Members
                      </button>
                    </div>

                    {/* WIDGET 3: TRENDING COUNTDOWNS THIS WEEK */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm transition-colors">
                      <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] mb-4 font-bold">
                        Trending Universes
                      </h3>
                      <div className="space-y-3">
                        {/* Item A */}
                        <a
                          className="p-3 rounded-xl bg-slate-50 dark:bg-[#131b2e]/80 hover:bg-amber-50/50 dark:hover:bg-[#3a485c]/80 border border-slate-200/80 dark:border-[#3a485c] flex items-center gap-3 transition-colors group"
                          href="#ghibli"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveUniverseExplorer(TRENDING_UNIVERSE_CARDS[0]);
                          }}
                        >
                          <img
                            alt="Studio Ghibli"
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-[#4f5d72] shadow-xs"
                            src={IMAGES.cardGhibli}
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="font-label-md text-label-md text-amber-700 dark:text-[#ffb77d] font-semibold block uppercase tracking-wider">
                              Top 10 Masterpieces
                            </span>
                            <h5 className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold truncate group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors">
                              Studio Ghibli: The Golden Era
                            </h5>
                            <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                              114k votes • Curated
                            </span>
                          </div>
                        </a>
                        {/* Item B */}
                        <a
                          className="p-3 rounded-xl bg-slate-50 dark:bg-[#131b2e]/80 hover:bg-amber-50/50 dark:hover:bg-[#3a485c]/80 border border-slate-200/80 dark:border-[#3a485c] flex items-center gap-3 transition-colors group"
                          href="#souls"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveUniverseExplorer(TRENDING_UNIVERSE_CARDS[1]);
                          }}
                        >
                          <img
                            alt="Soulslike Boss Fights"
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-[#4f5d72] shadow-xs"
                            src={IMAGES.cardSouls}
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="font-label-md text-label-md text-amber-700 dark:text-[#ffb77d] font-semibold block uppercase tracking-wider">
                              Gaming Benchmarks
                            </span>
                            <h5 className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold truncate group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors">
                              Top 10 Soulslike Boss Fights
                            </h5>
                            <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                              89k votes • Heated debate
                            </span>
                          </div>
                        </a>
                        {/* Item C */}
                        <a
                          className="p-3 rounded-xl bg-slate-50 dark:bg-[#131b2e]/80 hover:bg-amber-50/50 dark:hover:bg-[#3a485c]/80 border border-slate-200/80 dark:border-[#3a485c] flex items-center gap-3 transition-colors group"
                          href="#cyberpunk-anime"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveUniverseExplorer(TRENDING_UNIVERSE_CARDS[2]);
                          }}
                        >
                          <img
                            alt="Cyberpunk Anime Serials"
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-[#4f5d72] shadow-xs"
                            src={IMAGES.cardCyberpunkAnime}
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="font-label-md text-label-md text-slate-500 dark:text-[#b9c7e0] font-semibold block uppercase tracking-wider">
                              Anime Pantheon
                            </span>
                            <h5 className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold truncate group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors">
                              Top 10 Cyberpunk Anime Serials
                            </h5>
                            <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                              63k votes • Updated today
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* WIDGET 4: SUBMIT NEW CANON BANNER */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white dark:from-[#2f1500] dark:via-[#283044] dark:to-[#283044] border border-amber-300/60 dark:border-[#887364]/60 shadow-sm relative overflow-hidden">
                      <span className="material-symbols-outlined text-amber-600 dark:text-[#ffb77d] text-3xl mb-2">
                        rate_review
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] mb-2 font-bold">
                        Think You Know Better?
                      </h4>
                      <p className="font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd] mb-4">
                        Construct your personal Top 10 countdown and submit it to the AZVerse consensus engine for community validation.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleNavigate('submit-list')}
                        className="w-full py-2.5 rounded-full bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] font-label-lg text-label-lg font-bold transition-all shadow-sm shadow-amber-500/30"
                      >
                        Build Your Countdown List
                      </button>
                    </div>

                    {/* WIDGET 5: RAPID TOP 10S SHORT LISTS & ARCHIVES */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#283044] border border-slate-200/90 dark:border-[#3a485c] shadow-sm flex flex-col gap-5 transition-colors">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-[#2f1500] border border-amber-200/70 dark:border-[#887364]/60 text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm text-amber-600 dark:text-[#ffb77d]">
                              bolt
                            </span>
                            <span>Short List Archives</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-slate-400 dark:text-[#b9c7e0] font-semibold">
                            4.2k daily readers
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold tracking-tight mt-1">
                          Rapid Top 10s: Short Lists &amp; Archives
                        </h3>
                        <p className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                          Instant 60-second breakdowns &amp; reader consensus rankings
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                        {[
                          'All Short Lists',
                          '🎮 Gaming',
                          '🩸 Horror',
                          '🌋 Disasters & History',
                        ].map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setShortListFilter(tab)}
                            className={
                              shortListFilter === tab
                                ? 'px-3 py-1 rounded-full bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] font-label-sm text-label-sm font-bold shadow-xs whitespace-nowrap'
                                : 'px-3 py-1 rounded-full bg-slate-100 dark:bg-[#131b2e] hover:bg-slate-200 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-sm text-label-sm font-medium border border-slate-200/70 dark:border-[#4f5d72] whitespace-nowrap transition-colors'
                            }
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col gap-4 divide-y divide-slate-100 dark:divide-[#3a485c]">
                        {filteredShortLists.map((archive, idx) => (
                          <div
                            key={archive.id}
                            className={`${
                              idx === 0 ? 'pt-2' : 'pt-4'
                            } flex flex-col gap-2.5 group`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#131b2e] text-slate-700 dark:text-[#d5e3fd] font-label-sm text-label-sm font-semibold border border-slate-200/80 dark:border-[#4f5d72]">
                                {archive.categoryTag}
                              </span>
                              <div className="flex items-center gap-2 text-slate-500 dark:text-[#b9c7e0] font-body-sm text-xs">
                                <span>{archive.votes}</span>
                                <span>•</span>
                                <span className="text-amber-700 dark:text-[#ffb77d] font-bold flex items-center gap-0.5">
                                  <span className="material-symbols-outlined text-xs text-amber-600 dark:text-[#ffb77d]">
                                    star
                                  </span>{' '}
                                  {archive.verdictLabel}
                                </span>
                              </div>
                            </div>
                            <h4
                              onClick={() => setActiveShortListExplorer(archive)}
                              className="font-label-lg text-label-lg text-slate-900 dark:text-[#eef0ff] font-bold group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors cursor-pointer"
                            >
                              {archive.title}
                            </h4>
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#131b2e]/85 border border-slate-200/80 dark:border-[#3a485c] text-xs font-body-sm text-slate-600 dark:text-[#d5e3fd] flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 text-amber-800 dark:text-[#ffdcc3] font-semibold font-label-sm">
                                <span className="material-symbols-outlined text-sm text-amber-600 dark:text-[#ffb77d]">
                                  verified
                                </span>
                                <span>{archive.peakConsensus}</span>
                              </div>
                              <p className="truncate text-slate-500 dark:text-[#b9c7e0] text-[11px]">
                                {archive.summaryLine}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-0.5">
                              <span className="font-label-sm text-slate-400 dark:text-[#b9c7e0]">
                                60-Sec Reading Time
                              </span>
                              <a
                                className="font-label-sm text-label-sm text-amber-700 dark:text-[#ffb77d] hover:text-amber-800 dark:hover:text-[#ffdcc3] font-bold inline-flex items-center gap-1 transition-colors"
                                href={`#${archive.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveShortListExplorer(archive);
                                }}
                              >
                                <span>View Full Top 10</span>
                                <span className="material-symbols-outlined text-sm">
                                  arrow_forward
                                </span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setShortListFilter('All Short Lists');
                          setActiveShortListExplorer(SHORT_LIST_ARCHIVES[0]);
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] hover:bg-slate-100 dark:hover:bg-[#3a485c] text-slate-700 dark:text-[#d5e3fd] font-label-md text-label-md font-semibold border border-slate-200/90 dark:border-[#4f5d72] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-base text-slate-400 dark:text-[#b9c7e0]">
                          view_list
                        </span>
                        <span>Explore All 120+ Rapid Top 10 Archives</span>
                      </button>
                    </div>
                  </aside>
                </div>
              </div>

              {/* SECTION 2: LONG-FORM EDITORIAL DEEP DIVES & RETROSPECTIVES */}
              <section
                id="guild-journalism-section"
                className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop py-14 bg-[#f8fafc] dark:bg-[#131b2e] transition-colors"
              >
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-[#2f1500] text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2 border border-amber-500/20 dark:border-[#887364]/60">
                        <span className="material-symbols-outlined text-base text-amber-600 dark:text-[#ffb77d]">
                          article
                        </span>
                        Guild Journalism
                      </div>
                      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-slate-900 dark:text-[#faf8ff] tracking-tight font-bold">
                        From The Guild: Long-form Deep Dives &amp; Retrospectives
                      </h2>
                    </div>
                    <a
                      className="hidden sm:inline-flex items-center gap-1 text-amber-700 dark:text-[#ffb77d] hover:text-amber-800 dark:hover:text-[#ffdcc3] font-label-lg text-label-lg font-bold transition-colors"
                      href="#archive"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveEssay(GUILD_ESSAYS[0]);
                      }}
                    >
                      <span>Browse Archive</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </a>
                  </div>

                  {/* Magazine Layout: Hero Article (7 Cols) + 3 Stacked Articles (5 Cols) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Hero Feature Article */}
                    <article
                      onClick={() => setActiveEssay(GUILD_ESSAYS[0])}
                      className="lg:col-span-7 bg-white dark:bg-[#283044] rounded-3xl border border-slate-200/90 dark:border-[#3a485c] shadow-sm p-6 md:p-8 flex flex-col justify-between group hover:shadow-md hover:border-amber-400/50 dark:hover:border-[#ffb77d]/60 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col gap-5">
                        <div className="relative aspect-[21/10] w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200 dark:border-[#3a485c]">
                          <img
                            alt="Cinematic vast desert dunes in Dune Denis Villeneuve visual style"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={IMAGES.slideDune}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-[#0d1c2f]/90 backdrop-blur-md text-amber-400 dark:text-[#ffb77d] font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-xs">schedule</span> 14 min read
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2 font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0]">
                            <span className="font-bold text-amber-700 dark:text-[#ffb77d] uppercase tracking-wider">
                              Directorial Aesthetics
                            </span>
                            <span>•</span>
                            <span>Masterclass Retrospective</span>
                          </div>
                          <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-[#faf8ff] font-bold tracking-tight group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors leading-snug">
                            The Geometry of Dread: How Denis Villeneuve Weaponizes Scale in Modern Cinema
                          </h3>
                          <blockquote className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-[#131b2e]/85 border-l-4 border-amber-500 dark:border-[#fd8a42] text-slate-700 dark:text-[#d5e3fd] font-body-md text-body-md italic">
                            “Villeneuve doesn't shoot environments; he shoots indifferent monoliths that swallow human hubris whole, forcing sound design and negative space into violent psychological combat.”
                          </blockquote>
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#3a485c] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            alt="Elena Vance"
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-[#4f5d72]"
                            src={IMAGES.elenaVance}
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-label-md text-label-md text-slate-900 dark:text-[#eef0ff] font-bold block">
                              Elena Vance
                            </span>
                            <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                              Chief Cinema Lead
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveEssay(GUILD_ESSAYS[0]);
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131b2e] hover:bg-amber-500 dark:hover:bg-[#b15f00] hover:text-white text-slate-800 dark:text-[#d5e3fd] font-label-md text-label-md font-bold transition-all border border-slate-200 dark:border-[#4f5d72] flex items-center gap-1.5 shadow-xs"
                        >
                          <span>Read Essay</span>
                          <span className="material-symbols-outlined text-base">
                            chevron_right
                          </span>
                        </button>
                      </div>
                    </article>

                    {/* 3 Stacked Articles */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                      {GUILD_ESSAYS.slice(1).map((essay) => (
                        <article
                          key={essay.id}
                          onClick={() => setActiveEssay(essay)}
                          className="bg-white dark:bg-[#283044] rounded-2xl border border-slate-200/90 dark:border-[#3a485c] shadow-sm p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-[#4f5d72] transition-all flex gap-4 items-center group cursor-pointer"
                        >
                          <img
                            alt={essay.title}
                            className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-[#4f5d72]"
                            src={essay.image}
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 font-label-sm text-label-sm text-amber-700 dark:text-[#ffb77d] font-bold uppercase tracking-wider mb-1">
                              <span>{essay.category}</span>
                              <span className="text-slate-400 dark:text-[#b9c7e0] font-normal">
                                • {essay.readTime}
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-sm text-slate-900 dark:text-[#eef0ff] font-bold group-hover:text-amber-700 dark:group-hover:text-[#ffb77d] transition-colors line-clamp-2">
                              {essay.title}
                            </h4>
                            <span className="font-body-sm text-xs text-slate-500 dark:text-[#b9c7e0] mt-1 block">
                              By {essay.author} • {essay.bookmarks}
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: COMMUNITY HEAD-TO-HEAD ARENA & LIVE DEBATE HUB */}
              <section
                id="daily-consensus-arena"
                className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop py-14 bg-white dark:bg-[#0d1c2f]/60 border-t border-b border-slate-200/80 dark:border-[#3a485c] transition-colors"
              >
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#2f1500] border border-amber-200/70 dark:border-[#887364]/60 text-amber-800 dark:text-[#ffdcc3] font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-[#fd8a42] animate-ping"></span>
                        Live Gladiator Debate Ring
                      </div>
                      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-slate-900 dark:text-[#faf8ff] tracking-tight font-bold">
                        Daily Consensus Arena: The Great Debates
                      </h2>
                      <p className="mt-1 font-body-md text-body-md text-slate-600 dark:text-[#d5e3fd] max-w-2xl">
                        Two titan benchmarks head-to-head. Community cast votes every 24 hours to shift the historical guild score.
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#283044] text-slate-700 dark:text-[#eef0ff] font-label-md text-label-md flex items-center gap-2 border border-slate-200 dark:border-[#3a485c]">
                      <span className="material-symbols-outlined text-base text-amber-600 dark:text-[#ffb77d]">
                        timer
                      </span>
                      <span>
                        Round 47 Ends in <strong>06h 42m</strong>
                      </span>
                    </div>
                  </div>

                  {/* Arena Card Matchup */}
                  <div className="rounded-3xl border-2 border-amber-400/50 dark:border-[#887364]/60 bg-gradient-to-br from-amber-500/5 via-white to-amber-500/10 dark:from-[#2f1500]/60 dark:via-[#283044] dark:to-[#131b2e] p-6 md:p-10 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                      {/* Contender A: Interstellar */}
                      <div className="flex flex-col gap-4 bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 dark:border-[#3a485c] shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-amber-500 dark:bg-[#b15f00] text-white dark:text-[#fffbff] font-label-sm text-label-sm font-bold uppercase tracking-wider">
                            Challenger A
                          </span>
                          <span className="font-headline-md text-headline-md text-amber-700 dark:text-[#ffb77d] font-bold">
                            {arenaPctA}%
                          </span>
                        </div>
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xs">
                          <img
                            alt="Interstellar black hole"
                            className="w-full h-full object-cover"
                            src={IMAGES.cardInterstellar}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold">
                            Interstellar (2014)
                          </h3>
                          <p className="font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd] mt-1">
                            “The visceral emotional propulsion of fatherhood and time dilation makes the cold physics deeply human.”
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleArenaVote('a')}
                          className="w-full py-2.5 rounded-full bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] font-label-md text-label-md font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-base">how_to_vote</span>
                          <span>
                            {arenaUserChoice === 'a' ? 'Voted Interstellar ✓' : 'Vote Interstellar'}{' '}
                            ({arenaVotes.a.toLocaleString()} votes)
                          </span>
                        </button>
                      </div>

                      {/* Contender B: 2001: A Space Odyssey */}
                      <div className="flex flex-col gap-4 bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 dark:border-[#3a485c] shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-slate-800 dark:bg-[#3a485c] text-white dark:text-[#eef0ff] font-label-sm text-label-sm font-bold uppercase tracking-wider">
                            Challenger B
                          </span>
                          <span className="font-headline-md text-headline-md text-slate-800 dark:text-[#eef0ff] font-bold">
                            {arenaPctB}%
                          </span>
                        </div>
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xs">
                          <img
                            alt="2001 Space Odyssey monolith"
                            className="w-full h-full object-cover"
                            src={IMAGES.card2001}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold">
                            2001: A Space Odyssey (1968)
                          </h3>
                          <p className="font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd] mt-1">
                            “Kubrick creates non-verbal cinema of pure cosmic terror. The jump cut from bone to satellite remains unbeatable.”
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleArenaVote('b')}
                          className="w-full py-2.5 rounded-full bg-slate-900 dark:bg-[#3a485c] hover:bg-slate-800 dark:hover:bg-[#4f5d72] text-white dark:text-[#faf8ff] font-label-md text-label-md font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-base">how_to_vote</span>
                          <span>
                            {arenaUserChoice === 'b' ? 'Voted 2001 ✓' : 'Vote 2001'} (
                            {arenaVotes.b.toLocaleString()} votes)
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Split Progress Bar */}
                    <div className="mt-8 max-w-3xl mx-auto flex flex-col gap-2">
                      <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-[#131b2e] overflow-hidden flex">
                        <div
                          className="bg-amber-500 dark:bg-[#fd8a42] h-full transition-all duration-300"
                          style={{ width: `${arenaPctA}%` }}
                        ></div>
                        <div
                          className="bg-slate-800 dark:bg-[#4f5d72] h-full transition-all duration-300"
                          style={{ width: `${arenaPctB}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-slate-500 dark:text-[#b9c7e0] px-1">
                        <span className="font-bold text-amber-700 dark:text-[#ffb77d]">
                          Interstellar: {arenaPctA}% Lead
                        </span>
                        <span>Total Ballots: {totalArenaVotes.toLocaleString()}</span>
                        <span className="font-bold text-slate-800 dark:text-[#eef0ff]">2001: {arenaPctB}%</span>
                      </div>
                    </div>

                    {/* Verified Hot Take Excerpt */}
                    <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-[#3a485c] flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 dark:bg-[#131b2e]/85 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img
                          alt="Julian"
                          className="w-10 h-10 rounded-full object-cover"
                          src={IMAGES.julianVance}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-label-md text-label-md text-slate-900 dark:text-[#faf8ff] font-bold flex items-center gap-1.5">
                            Julian Vance-Sloan{' '}
                            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-[#2f1500] text-amber-800 dark:text-[#ffdcc3] border border-transparent dark:border-[#887364]/50">
                              Grandmaster Critic
                            </span>
                          </span>
                          <p className="font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd] italic">
                            “Nolan makes you cry for the daughter; Kubrick makes you shudder for the species. Both are unrepeatable peaks.”
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveBreakdownEntry(entries[0])}
                        className="px-4 py-2 rounded-xl bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] font-label-md text-label-md font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">rate_review</span>
                        <span>Cast Your Argument</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: WEEKLY CANON SPOTLIGHT / CURATOR'S PICK */}
              <section className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop py-12 bg-[#f8fafc] dark:bg-[#131b2e] transition-colors">
                <div className="max-w-7xl mx-auto">
                  <div className="relative rounded-3xl overflow-hidden bg-slate-950 dark:bg-[#0d1c2f] text-white p-8 md:p-12 shadow-md border border-slate-800 dark:border-[#3a485c]">
                    {/* Ambient backdrop glow */}
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                      <div className="lg:col-span-8 flex flex-col gap-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 dark:bg-[#2f1500] border border-amber-400/40 dark:border-[#887364]/60 text-amber-300 dark:text-[#ffdcc3] font-label-sm text-label-sm font-bold uppercase tracking-wider w-fit">
                          <span className="material-symbols-outlined text-base text-amber-400 dark:text-[#ffb77d]">
                            verified
                          </span>
                          Curator's Weekly Canon Spotlight
                        </div>
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white dark:text-[#faf8ff] font-bold tracking-tight leading-tight">
                          The Overlooked 90s Cyberpunk Animes You Must Stream Before 2025
                        </h2>
                        <p className="font-body-lg text-body-lg text-slate-300 dark:text-[#d5e3fd] max-w-2xl font-normal leading-relaxed">
                          Beyond Ghost in the Shell and Akira: our archival guild unearths 10 hand-cel animation marvels packed with philosophical dread, synthesizer soundscapes, and breathtaking mechanical art.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2 font-label-md text-label-md text-slate-400 dark:text-[#b9c7e0]">
                          <span className="flex items-center gap-1 text-amber-400 dark:text-[#ffb77d]">
                            <span className="material-symbols-outlined text-base">star</span> 9.7 Verdict Average
                          </span>
                          <span>•</span>
                          <span>10 Curated Deep-Cuts</span>
                          <span>•</span>
                          <span>Updated Yesterday</span>
                        </div>
                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          <a
                            className="px-6 py-3 rounded-full bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] font-label-lg text-label-lg font-bold transition-all shadow-md flex items-center gap-2"
                            href="#explore-spotlight"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveUniverseExplorer(TRENDING_UNIVERSE_CARDS[0]);
                            }}
                          >
                            <span>Explore Full Top 10 Countdown</span>
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setSpotlightSaved(!spotlightSaved);
                              triggerToast(
                                !spotlightSaved
                                  ? '90s Cyberpunk Anime Canon saved to Watchlist'
                                  : 'Removed from Watchlist'
                              );
                            }}
                            className="px-5 py-3 rounded-full bg-white/10 dark:bg-[#283044] hover:bg-white/20 dark:hover:bg-[#3a485c] text-white dark:text-[#eef0ff] font-label-md text-label-md font-semibold backdrop-blur-md transition-colors border border-white/20 dark:border-[#4f5d72] flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-base">
                              {spotlightSaved ? 'bookmark_added' : 'bookmark_add'}
                            </span>
                            <span>{spotlightSaved ? 'Saved in Watchlist' : 'Save to Watchlist'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-4 relative">
                        <div
                          onClick={() => setActiveUniverseExplorer(TRENDING_UNIVERSE_CARDS[0])}
                          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 dark:border-[#4f5d72] shadow-2xl group cursor-pointer"
                        >
                          <img
                            alt="Cyberpunk city rain cel animation visual"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={IMAGES.slideBladeRunner}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3 text-center px-3 py-1.5 rounded-lg bg-black/60 dark:bg-[#0d1c2f]/85 backdrop-blur-md text-amber-300 dark:text-[#ffb77d] font-label-sm text-label-sm font-bold">
                            #1 Entry: Battle Angel Alita (1993 OVA)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white dark:bg-[#283044] border-t border-slate-200/90 dark:border-[#3a485c] py-space-xl shadow-xs transition-colors">
        <div className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-lg pb-space-xl">
            <div className="lg:col-span-2 space-y-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-sm text-headline-sm tracking-tight text-slate-900 dark:text-[#faf8ff] uppercase">
                  AZ
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-[#2f1500] text-amber-700 dark:text-[#ffb77d] font-label-sm text-label-sm font-bold tracking-widest border border-amber-500/20 dark:border-[#887364]/60">
                    VERSE
                  </span>
                </span>
              </div>
              <p className="font-body-md text-body-md text-slate-600 dark:text-[#d5e3fd] max-w-sm">
                The definitive cinema-grade canon. Real-time community votes, curated critique, and undeniable rankings across modern media and tech.
              </p>
              <div className="pt-space-xs max-w-md">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-slate-400 dark:text-[#b9c7e0] block mb-space-xs font-semibold">
                  Subscribe to Midnight Ballot
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newsletterEmail.trim()) return;
                    triggerToast(`Subscribed ${newsletterEmail} to Midnight Ballot!`);
                    setNewsletterEmail('');
                  }}
                  className="flex items-center gap-space-xs bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-[#4f5d72] p-1 rounded-full"
                >
                  <input
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-transparent px-space-md py-1.5 font-body-sm text-body-sm text-slate-800 dark:text-[#eef0ff] placeholder:text-slate-400 dark:placeholder:text-[#b9c7e0]/80 w-full focus:outline-none"
                    placeholder="Enter your critic email..."
                    type="email"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 dark:bg-[#b15f00] hover:bg-amber-600 dark:hover:bg-[#8d4b00] text-white dark:text-[#fffbff] px-space-md py-1.5 rounded-full font-label-md text-label-md font-bold transition-all shadow-xs"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-amber-700 dark:text-[#ffb77d] font-bold mb-space-md">
                Ranking Canons
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd]">
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#movies"
                    onClick={(e) => handleNavigate('category-movies', e)}
                  >
                    Cinema &amp; Directing
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#anime"
                    onClick={(e) => handleNavigate('category-anime', e)}
                  >
                    Masterpiece Anime
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#tech"
                    onClick={(e) => handleNavigate('category-tech', e)}
                  >
                    Silicon &amp; Hardware
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#gaming"
                    onClick={(e) => handleNavigate('category-gaming', e)}
                  >
                    Gaming Benchmarks
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#trending"
                    onClick={(e) => handleNavigate('trending', e)}
                  >
                    All-Time Top 100
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-amber-700 dark:text-[#ffb77d] font-bold mb-space-md">
                Community Arena
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-slate-600 dark:text-[#d5e3fd]">
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#community-arena"
                    onClick={(e) => handleNavigate('community-arena', e)}
                  >
                    Live Head-to-Head
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#submit-list"
                    onClick={(e) => handleNavigate('submit-list', e)}
                  >
                    Create New Listicle
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#critic-profile"
                    onClick={(e) => handleNavigate('user-critic-profile', e)}
                  >
                    Critic Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                    href="#discover"
                    onClick={(e) => handleNavigate('discover', e)}
                  >
                    Review Guild Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-[#131b2e]/85 border border-slate-200/80 dark:border-[#3a485c] p-space-lg rounded-xl space-y-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-slate-400 dark:text-[#b9c7e0] block font-semibold">
                Live Network Metrics
              </span>
              <div className="space-y-space-xs">
                <div>
                  <span className="font-headline-sm text-headline-sm text-amber-700 dark:text-[#ffb77d] font-bold block">
                    2.4M+
                  </span>
                  <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                    Verified Critic Votes
                  </span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-[#faf8ff] font-bold block">
                    14,280
                  </span>
                  <span className="font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0]">
                    Curated Top 10 Listicles
                  </span>
                </div>
              </div>
              <div className="pt-space-xs flex items-center gap-space-xs text-amber-700 dark:text-[#ffb77d] font-label-sm text-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-[#fd8a42] animate-pulse"></span>
                <span>Consensus Engine Active</span>
              </div>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-slate-500 dark:text-[#b9c7e0] border-t border-slate-100 dark:border-[#3a485c]">
            <p>© 2025 AZVerse Media Group. All rights reserved. Ranked under theater-grade consensus.</p>
            <div className="flex items-center gap-space-lg font-label-md text-label-md">
              <a
                className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast('AZVerse Privacy & Consensus Charter v4.2');
                }}
              >
                Privacy Policy
              </a>
              <a
                className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast('Guild Terms of Ranking & Ballot Integrity Verified');
                }}
              >
                Terms of Ranking
              </a>
              <a
                className="hover:text-slate-900 dark:hover:text-[#faf8ff] transition-colors"
                href="#api"
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast('AZVerse Open Canon API Registry v4.2');
                }}
              >
                API Registry
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      <BreakdownModal
        entry={activeBreakdownEntry}
        onClose={() => setActiveBreakdownEntry(null)}
        onVote={handleEntryVote}
        userVote={activeBreakdownEntry ? userVotes[activeBreakdownEntry.id] || 0 : 0}
      />

      <EssayModal essay={activeEssay} onClose={() => setActiveEssay(null)} />

      <ListExplorerModal
        universeCard={activeUniverseExplorer}
        shortList={activeShortListExplorer}
        onClose={() => {
          setActiveUniverseExplorer(null);
          setActiveShortListExplorer(null);
        }}
      />
    </div>
  );
}
