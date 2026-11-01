import React, { useState } from 'react';
import {
  IMAGES,
  TrendingUniverseCard,
} from '../data/azverseData';

interface SubmitListViewProps {
  onBack: () => void;
  onPublishCustomList: (newList: TrendingUniverseCard) => void;
}

export const SubmitListView: React.FC<SubmitListViewProps> = ({
  onBack,
  onPublishCustomList,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TrendingUniverseCard['category']>('Dark Noir & Thrillers');
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState([
    { rank: 1, title: 'Dune: Part Two', year: '2024', score: '9.8', note: 'Arrakis sandworm riding & IMAX 70mm soundscape' },
    { rank: 2, title: 'Oppenheimer', year: '2023', score: '9.7', note: 'Trinity test silence & non-linear Senate hearing tension' },
    { rank: 3, title: 'Spider-Man: Across the Spider-Verse', year: '2023', score: '9.6', note: 'Every frame a hand-inked comic book painting' },
  ]);

  const handleEntryChange = (idx: number, field: string, value: string) => {
    setEntries((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleAddRow = () => {
    if (entries.length >= 10) return;
    setEntries([
      ...entries,
      {
        rank: entries.length + 1,
        title: '',
        year: '2024',
        score: '9.5',
        note: '',
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newCard: TrendingUniverseCard = {
      id: `custom-${Date.now()}`,
      category,
      badge: 'Community Canon',
      score: '9.8 Score',
      peakEntry: entries[0]?.title || 'Top Contender',
      title: title.trim(),
      description:
        description.trim() ||
        'Peer-submitted Top 10 canon countdown validated by the AZVerse Consensus Engine.',
      criticName: 'Elena Vance (Guild Curated)',
      criticAvatar: IMAGES.userAvatar,
      votes: '1.2k votes',
      image: IMAGES.slideDune,
      entries: entries.filter((x) => x.title.trim().length > 0),
    };
    onPublishCustomList(newCard);
  };

  return (
    <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin lg:px-margin-desktop py-12">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-label-md text-label-md font-bold shadow-xs transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Discover Canvas</span>
        </button>
        <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-label-sm text-label-sm font-bold uppercase tracking-wider">
          AZVerse Canon Studio v4.2
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 md:p-10 transition-colors">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-slate-900 dark:text-slate-100 font-bold tracking-tight">
          Construct &amp; Submit a Top 10 Countdown
        </h1>
        <p className="mt-2 font-body-md text-body-md text-slate-600 dark:text-slate-400">
          Publish your ranked countdown directly into the AZVerse Consensus Engine for community balloting and Guild verification.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block font-label-md text-label-md text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                Countdown Headline
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Top 10 Sci-Fi Soundtracks That Shook IMAX Subwoofers"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-body-md text-body-md focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                Universe Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TrendingUniverseCard['category'])}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-body-md text-body-md focus:outline-none focus:border-amber-500"
              >
                <option value="Dark Noir & Thrillers">Sci-Fi &amp; Cinema</option>
                <option value="Anime & Animation">Anime &amp; Animation</option>
                <option value="Gaming Masterpieces">Gaming Masterpieces</option>
                <option value="Prestige TV Epics">Prestige TV Epics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-slate-700 dark:text-slate-300 font-bold mb-1.5">
              Curatorial Thesis / Synopsis
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the grading criteria behind your ranking..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-body-md text-body-md focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-slate-100 font-bold">
                Ranked Contenders (#01 → #{String(entries.length).padStart(2, '0')})
              </span>
              {entries.length < 10 && (
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/15 hover:bg-amber-100 dark:hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 font-label-sm text-label-sm font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add Rank #{entries.length + 1}</span>
                </button>
              )}
            </div>

            {entries.map((entry, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
              >
                <div className="md:col-span-1 font-headline-sm text-headline-sm font-bold text-amber-600 dark:text-amber-400">
                  #{String(entry.rank).padStart(2, '0')}
                </div>
                <div className="md:col-span-4">
                  <input
                    type="text"
                    required
                    value={entry.title}
                    onChange={(e) => handleEntryChange(idx, 'title', e.target.value)}
                    placeholder="Work Title"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-body-sm text-body-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={entry.year}
                    onChange={(e) => handleEntryChange(idx, 'year', e.target.value)}
                    placeholder="Year"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-body-sm text-body-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div className="md:col-span-5">
                  <input
                    type="text"
                    value={entry.note}
                    onChange={(e) => handleEntryChange(idx, 'note', e.target.value)}
                    placeholder="Critical verdict note..."
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-body-sm text-body-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-label-lg text-label-lg font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-label-lg text-label-lg font-bold shadow-sm shadow-amber-500/30"
            >
              Publish Countdown to AZVerse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CriticProfileViewProps {
  onBack: () => void;
  savedCount: number;
  votesCastCount: number;
}

export const CriticProfileView: React.FC<CriticProfileViewProps> = ({
  onBack,
  savedCount,
  votesCastCount,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin lg:px-margin-desktop py-12 space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-label-md text-label-md font-bold shadow-xs transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Discover Canvas</span>
        </button>
        <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-label-sm text-label-sm font-bold uppercase tracking-wider">
          Verified Guild Dossier
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
        <div className="flex items-center gap-5">
          <img
            src={IMAGES.userAvatar}
            alt="Critic Profile"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/20 border border-slate-200 dark:border-slate-700"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-100 font-bold">
                Alex Mercer
              </h1>
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-lg">verified</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-label-sm text-label-sm font-bold border border-amber-500/20 dark:border-amber-500/30">
                Senior Guild Critic
              </span>
            </div>
            <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400 mt-1">
              70mm IMAX Archivist • Cyberpunk &amp; Hard Sci-Fi Specialist • Member since 2021
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
            <span className="font-headline-sm text-headline-sm text-amber-700 dark:text-amber-400 font-bold block">
              96.4
            </span>
            <span className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 uppercase">Reputation</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
            <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-slate-100 font-bold block">
              {142 + votesCastCount}
            </span>
            <span className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 uppercase">Ballots</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
            <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-slate-100 font-bold block">
              {18 + savedCount}
            </span>
            <span className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 uppercase">Saved Lists</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 md:p-8 transition-colors">
        <h2 className="font-headline-sm text-headline-sm text-slate-900 dark:text-slate-100 font-bold mb-4">
          Guild Critics Leaderboard — All-Time Reputation Standings
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { rank: 1, name: 'Julian Vance-Sloan', role: 'Grandmaster Critic', rep: '98.4 rep', lists: 64, avatar: IMAGES.julianVance },
            { rank: 2, name: 'Elena Vance', role: 'Chief Cinema Lead', rep: '97.9 rep', lists: 58, avatar: IMAGES.elenaVance },
            { rank: 3, name: 'Alex Mercer (You)', role: 'Senior Guild Critic', rep: '96.4 rep', lists: 29, avatar: IMAGES.userAvatar },
            { rank: 4, name: 'Aoi Takahashi', role: 'Animation Fellow', rep: '96.1 rep', lists: 47, avatar: IMAGES.aoiTakahashi },
            { rank: 5, name: 'Marcus Chen', role: 'Silicon Benchmarker', rep: '94.8 rep', lists: 51, avatar: IMAGES.marcusChen },
          ].map((c) => (
            <div key={c.rank} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  className={`font-headline-sm text-headline-sm font-bold w-8 ${
                    c.rank === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  #{c.rank}
                </span>
                <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700" referrerPolicy="no-referrer" />
                <div>
                  <span className="font-label-lg text-label-lg text-slate-900 dark:text-slate-100 font-bold block">
                    {c.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400">
                    {c.role} • {c.lists} Published Canons
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-label-md text-label-md font-bold">
                {c.rep}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
