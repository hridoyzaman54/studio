import React, { useState } from 'react';
import {
  CountdownEntry,
  GuildEssay,
  ShortListArchive,
  TrendingUniverseCard,
  IMAGES,
} from '../data/azverseData';

interface BreakdownModalProps {
  entry: CountdownEntry | null;
  onClose: () => void;
  onVote: (id: string, delta: 1 | -1) => void;
  userVote?: 1 | -1 | 0;
}

export const BreakdownModal: React.FC<BreakdownModalProps> = ({
  entry,
  onClose,
  onVote,
  userVote = 0,
}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Julian Vance-Sloan',
      badge: 'Grandmaster Critic',
      avatar: IMAGES.julianVance,
      time: '42m ago',
      text: 'The 70mm IMAX presentation remains unmatched in theatrical density. Every frame holds up under archival scrutiny.',
      likes: 184,
    },
    {
      id: 'c2',
      author: 'Aoi Takahashi',
      badge: 'Animation Fellow',
      avatar: IMAGES.aoiTakahashi,
      time: '1h ago',
      text: 'The acoustic pacing in the third act creates a physiological tension that very few directors dare to sustain.',
      likes: 96,
    },
  ]);

  if (!entry) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      {
        id: String(Date.now()),
        author: 'You (Verified Critic)',
        badge: 'Guild Member',
        avatar: IMAGES.userAvatar,
        time: 'Just now',
        text: commentText.trim(),
        likes: 1,
      },
      ...comments,
    ]);
    setCommentText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full overflow-hidden shadow-2xl my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
          <img
            src={entry.image}
            alt={entry.imageAlt}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-white font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">
                <span>Editorial Rank #{String(entry.editorialRank).padStart(2, '0')}</span>
                <span>•</span>
                <span>Crowd Rank #{String(entry.communityRank).padStart(2, '0')}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white font-bold">
                {entry.title} ({entry.year}) — <span className="text-slate-300 font-normal">Dir. {entry.director}</span>
              </h3>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-slate-100 text-right shadow-md border border-transparent dark:border-slate-700">
              <span className="font-headline-sm text-headline-sm text-amber-700 dark:text-amber-400 font-bold block">
                {entry.verdictScore.toFixed(1)}
              </span>
              <span className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 uppercase">Guild Verdict</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-label-md text-label-md font-bold uppercase mb-1.5">
                <span className="material-symbols-outlined text-base">movie_filter</span>
                <span>Cinematography & Framing</span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {entry.analyticalBreakdown.cinematography}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-label-md text-label-md font-bold uppercase mb-1.5">
                <span className="material-symbols-outlined text-base">graphic_eq</span>
                <span>Acoustic & Score Architecture</span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {entry.analyticalBreakdown.soundDesign}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-label-md text-label-md font-bold uppercase mb-1.5">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Thematic Core</span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {entry.analyticalBreakdown.thematicCore}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-label-md text-label-md font-bold uppercase mb-1.5">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                <span>Signature Apex Sequence</span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {entry.analyticalBreakdown.keyScene}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md text-slate-700 dark:text-slate-200 font-bold">Cast Official Entry Vote:</span>
              <div className="inline-flex items-center rounded-full bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-700 shadow-xs">
                <button
                  onClick={() => onVote(entry.id, 1)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                    userVote === 1
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">thumb_up</span>
                  <span>{entry.upvotes.toLocaleString()}</span>
                </button>
                <button
                  onClick={() => onVote(entry.id, -1)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
                    userVote === -1
                      ? 'bg-slate-800 dark:bg-slate-700 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">thumb_down</span>
                  <span>{entry.downvotes.toLocaleString()}</span>
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white font-label-md text-label-md font-bold transition-colors"
            >
              Done Reading
            </button>
          </div>

          {/* Debate Thread */}
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-headline-sm text-headline-sm text-slate-900 dark:text-slate-100 font-bold">
              Critic & Community Debate ({entry.commentsCount.toLocaleString()})
            </h4>
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add your analytical take on this ranking..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-body-sm text-body-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-label-md text-label-md font-bold transition-colors shrink-0"
              >
                Post Take
              </button>
            </form>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex gap-3">
                  <img src={c.avatar} alt={c.author} className="w-9 h-9 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-label-md text-label-md text-slate-900 dark:text-slate-100 font-bold">{c.author}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-label-sm text-label-sm font-semibold">
                        {c.badge}
                      </span>
                      <span className="font-body-sm text-xs text-slate-400">{c.time}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-slate-700 dark:text-slate-300 mt-1">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EssayModalProps {
  essay: GuildEssay | null;
  onClose: () => void;
}

export const EssayModal: React.FC<EssayModalProps> = ({ essay, onClose }) => {
  const [bookmarked, setBookmarked] = useState(false);

  if (!essay) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full overflow-hidden shadow-2xl my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[21/9] w-full bg-slate-900">
          <img src={essay.image} alt={essay.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-label-sm text-label-sm font-bold uppercase tracking-wider">
              {essay.category} • {essay.readTime}
            </span>
            <h2 className="font-headline-md text-headline-md text-white font-bold mt-2">
              {essay.title}
            </h2>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-5 max-h-[65vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <img src={essay.authorAvatar} alt={essay.author} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <span className="font-label-lg text-label-lg text-slate-900 dark:text-slate-100 font-bold block">{essay.author}</span>
                <span className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400">{essay.authorRole} • {essay.bookmarks}</span>
              </div>
            </div>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md font-bold flex items-center gap-1.5 border transition-colors ${
                bookmarked
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {bookmarked ? 'bookmark_added' : 'bookmark_add'}
              </span>
              <span>{bookmarked ? 'Saved to Archive' : 'Bookmark Essay'}</span>
            </button>
          </div>
          <blockquote className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-slate-800 dark:text-slate-200 font-body-lg text-body-lg italic">
            {essay.quote}
          </blockquote>
          <div className="space-y-4 font-body-md text-body-md text-slate-700 dark:text-slate-300 leading-relaxed">
            {essay.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ListExplorerModalProps {
  universeCard?: TrendingUniverseCard | null;
  shortList?: ShortListArchive | null;
  onClose: () => void;
}

export const ListExplorerModal: React.FC<ListExplorerModalProps> = ({
  universeCard,
  shortList,
  onClose,
}) => {
  const [votedRanks, setVotedRanks] = useState<Record<number, boolean>>({});

  if (!universeCard && !shortList) return null;

  const title = universeCard ? universeCard.title : shortList!.title;
  const subtitle = universeCard ? universeCard.description : shortList!.peakConsensus;
  const badge = universeCard ? universeCard.badge : shortList!.categoryTag;
  const items = universeCard
    ? universeCard.entries.map((e) => ({
        rank: e.rank,
        name: `${e.title} (${e.year})`,
        detail: e.note,
        score: e.score,
      }))
    : shortList!.fullList;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full overflow-hidden shadow-2xl my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 bg-slate-900 dark:bg-slate-950 text-white flex items-start justify-between gap-4 border-b border-transparent dark:border-slate-800">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-label-sm text-label-sm font-bold uppercase tracking-wider">
              {badge}
            </span>
            <h3 className="font-headline-md text-headline-md font-bold mt-2">{title}</h3>
            <p className="font-body-sm text-body-sm text-slate-300 mt-1">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 space-y-3 max-h-[65vh] overflow-y-auto">
          {items.map((item) => {
            const isVoted = votedRanks[item.rank];
            return (
              <div
                key={item.rank}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-4 hover:border-amber-400 dark:hover:border-amber-500/60 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className={`font-headline-md text-headline-md font-bold w-10 text-center ${
                      item.rank === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    #{String(item.rank).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-label-lg text-label-lg text-slate-900 dark:text-slate-100 font-bold truncate">
                      {item.name}
                    </h4>
                    <p className="font-body-sm text-body-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-label-lg text-label-lg text-amber-700 dark:text-amber-400 font-bold">
                    {item.score}
                  </span>
                  <button
                    onClick={() =>
                      setVotedRanks((prev) => ({ ...prev, [item.rank]: !prev[item.rank] }))
                    }
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 transition-all border ${
                      isVoted
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    <span>{isVoted ? 'Voted' : 'Endorse'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
