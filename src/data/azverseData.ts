export interface HeroSlide {
  index: number;
  canon: string;
  label: string;
  alt: string;
  src: string;
}

export interface CountdownEntry {
  id: string;
  editorialRank: number;
  communityRank: number;
  title: string;
  year: number;
  director: string;
  verdictScore: number;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  starRating?: number;
  ratingsCount?: string;
  badgeText?: string;
  subBadgeText?: string;
  image: string;
  imageAlt: string;
  isImax4k: boolean;
  trailerLabel?: string;
  videoTags?: string[];
  audioTag?: string;
  accolades?: { text: string; highlight?: boolean }[];
  quote?: string;
  quoteAuthor?: string;
  description?: string;
  analyticalBreakdown: {
    cinematography: string;
    soundDesign: string;
    thematicCore: string;
    keyScene: string;
  };
}

export interface TrendingUniverseCard {
  id: string;
  category: 'Anime & Animation' | 'Gaming Masterpieces' | 'Dark Noir & Thrillers' | 'Prestige TV Epics';
  badge: string;
  score: string;
  peakEntry: string;
  title: string;
  description: string;
  criticName: string;
  criticAvatar: string;
  votes: string;
  image: string;
  entries: { rank: number; title: string; year: string; score: string; note: string }[];
}

export interface ShortListArchive {
  id: string;
  categoryTag: string;
  filterGroup: 'Gaming' | 'Horror' | 'Disasters & History';
  votes: string;
  verdictLabel: string;
  title: string;
  peakConsensus: string;
  summaryLine: string;
  fullList: { rank: number; name: string; detail: string; score: string }[];
}

export interface GuildEssay {
  id: string;
  category: string;
  subtitle: string;
  readTime: string;
  title: string;
  quote: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  bookmarks: string;
  image: string;
  paragraphs: string[];
}

export const IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSTNzNp24dpPEIcilGQJtghnNt2K_haOZAAAVM_wRkARJlVzNLakC9oTFgsotjWEgGcb_fRZNg955Zq6ae6U0sgAWcrdugz9H-OkUo8v2Bk3YZ7HhnDikrkAQJDze9qXFGukGB3fYf-N4C0BPeojLhRhtccGhftE5RavLnF4IulQkdHTV_9jhqkmm8l30HMZjHojGJ-oakQYSm3oaOzP_Ybz18wUO2KsM81Y7iOA=s2048',
  userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWQbHu0vjGHPlRCBKdwxMBdRkQ8kMhPGKU41sVvjom-r7XJk27EIeDkVM3Jz6lhc-X-mGwSitsgkRJI9nCoSxz6TviyFvMVNMROQ4-kZYDsEVNc5Br0dAleo5pu6U-l-IHsR75OFWYgC_bncYIbmQ0NlXGLK6ZvYLvxbv4NSGUvkI75G1N6xoA9OpD4vsBAGJPU2lzhd-SCbxDH3RZj1Bc5mEtvF8ISVBdxhDrKQ=s1024',
  slideInterstellar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYa1G-JGjoVMd0Kr3udlmPzR2W_GTQ5euQpkqLUJfTZOr50pgsctZlUJZAcwhKOV7kAPzdr8VWriF2vbti1tgFqFwSb2AmbrWfzsBA6SZNUJOHg4w47uwxWROVzTuahKm9nWEhLuLCl9SYPCX7jy3yqtZPG94DvkAgmtTNtuhJiLTngX82WiSPvOc7qupDKe0BHXirjKiVbDQfGNKR-wXRqOzy3qrowT6Wbcn91A=s2048',
  slideBladeRunner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPKubmM3sWpzSw-kBhAY798N8k8bWR137Ixr2zEzLpXwH6PWMhuW5usbl_IytdhV0Mo8YMbIL2mrthEIAi1MrIrKCwW1zmQoY4pGXqMI0aYHaj1IAwfDi07LBB4_NvXAcbWfA22m5XrbBaOz2Cj8Cqopv68ME5r51MlPiuPTqdY-4j_Zl-7gfXhySC3pNwWX6TjohvSkuZYIlpRzAkP0z4hUo-zTPtQjPuoRel2w=s2048',
  slideDune: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXsvnzo2MZkQfN1mSTjHRE-ZvdC0WjnZQqvKjNsZVVh43ghhnkufLHq7nvj6cBsvYO14zvTI6a5WNT0wab3zSo9c6VdtEeUvZa0nsXP-hXf8lMNIYxudO9dOygmdK8ceaKzkq2wwlRAHE8_nygXqEXRjz5J8k-fJvyrjx7a2dGu85d1zDPRnUnDj6QVEh7fOKaiUsZUD1TV3cQclWZ64fmCFzmMOzvdgQHBJog8Q=s2048',
  slide2001: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNute4qCtal4r74q5k_Em7bxcI2XFDCmrkEyGdquyRBKiZbojnZObVdo7sxQsw0xsfOo2fdad9gT9F4xgucM_7Rn4jm_DBOG3UEPt0HSQnoHU_Y7t7XlI_iB8xfk5iAE3E1Dkav-MfJMfsg4Fcs4mv2mv-MPnYCxPL5g8vfSXgZ_jZvQ1-HK5kUt3Q_Hfmqwl6-Mx8Qq58OGz2shcPuuUiCq3YUDFFGTSxhv5fag=s2048',
  elenaVance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnArpLctY1ddO6DMdn3hm44D8q32xwAj63nOoFaPhyHkmNJHhNv-vfSY4Ni-8c7UGJxEqj7wS6AETPNaDLuORrmaurN--Da0YLkujZeCezFrlHFzLQJUaLhcWdmZDWDnvJsvcls_HUSJaHN192Y-XKukFAmiVYWJ12MRWPWycFO_u0KTjuoPlHT5zQNJhSQEx7UoDhSpTiDYOpToa0z6DTyzFJRxe4w502ASwo8Q=s1024',
  julianVance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0Q-2m7tFO5u022CvZJFiCIkRx7CYNp02tf38CP_cwbCFpbfA7EEbN6I0gbtDN3p2_iFz0o4X1_kCNDq4cuDmUWAL1xvJQf1txzDxSvHISjiGYhQkEGFchxIq5g11Qubnr2zhsZk6qux4mAibKqT--HkMi-p3L6_h8ENXxjAVbs573S21OsPouyWmyH1-j5Eh4lF5p-5ESA3p2T_8YmT-wgiMJwkNYuKyQBcFBw=s1024',
  aoiTakahashi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnD_imbAPZcMaUK_JearBX2JHdUVBTWGtqC6tfBn-S3SunfQyA8faj8udE7J4VSX4RqOYBuVHywhRHPXq5qBNfWNrXmpcEfAwl9K7aBg0ExXT5bz4q0-myjZc_BdZYf2xXnX5XVZdiE-cQ5m-uPgzNY7D0AFqktL0skRcCz6m6_htedBThCzVFFrsNx5WP2w_wlJavBlbeOtxAknGv-X5REDFdI0hGM3LJdkZtXg=s1024',
  marcusChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuvoS2Ffd7tnZveloM18EA-brJSYMZpK6cIOVMm0kKbKOt9nGhI184QPHVgyrgPfSLn-CMq9iZHInVterBocFsZA9ID6wvBivB6FmYwgD2D9ax7li4q9A6syJDrUSFb4Xc7FJjWDLGMssN6KCe14nI2k3uGGbBwYShk9Yel4WWPUGZULgKxU8osJ_kmDTKE9wPWHWconuxh_13Txt7J94FdytCTdq7slhgIHP3sw=s1024',
  cardInterstellar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYa1G-JGjoVMd0Kr3udlmPzR2W_GTQ5euQpkqLUJfTZOr50pgsctZlUJZAcwhKOV7kAPzdr8VWriF2vbti1tgFqFwSb2AmbrWfzsBA6SZNUJOHg4w47uwxWROVzTuahKm9nWEhLuLCl9SYPCX7jy3yqtZPG94DvkAgmtTNtuhJiLTngX82WiSPvOc7qupDKe0BHXirjKiVbDQfGNKR-wXRqOzy3qrowT6Wbcn91A=s2048',
  cardBladeRunner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPKubmM3sWpzSw-kBhAY798N8k8bWR137Ixr2zEzLpXwH6PWMhuW5usbl_IytdhV0Mo8YMbIL2mrthEIAi1MrIrKCwW1zmQoY4pGXqMI0aYHaj1IAwfDi07LBB4_NvXAcbWfA22m5XrbBaOz2Cj8Cqopv68ME5r51MlPiuPTqdY-4j_Zl-7gfXhySC3pNwWX6TjohvSkuZYIlpRzAkP0z4hUo-zTPtQjPuoRel2w=s2048',
  cardMatrix: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyWY1pqApvnr59xRdiaVU87HsWa5Zg0SUzbedis_KRKCaQJM6jeO86SkzVnmySRJLWmFiL03LVeqVP65SH64abU0mEF6MqDDuZfJ9sc6BKi1gig9n9RBkdEDzUHfj-yUlwjP2tpWYrePnG5v-5SLxnvvrGLMZT4QQpJNzqRto2WDsvKl232lTT-DqsvJf7PzRLASsG_pnOBZ0sRlgVoVixq-t_vu615nk6pLQh7g=s2048',
  cardInception: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG7w4aXu_1iNhn3gCyHUWckgKwjb87hak9_GFD9wkB1TAw3oSa90gQ7IFmJmjvPL1TE95T4LhSNs-diDK1Ay7BswsQ93RvaZxd1UuaOyVoy6dGZyu4NwneDRGiIsjeixzJnfoOzZrGsDnAdv01dFeINWeX7Ls4w4w6wY7zHtifRCdHJS3zZTUp396CagvxXK1wX4gwAPyYhZb5Yb5iNZEn2Bx4RrQOO-hZ78zeuQ=s2048',
  cardChildrenOfMen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASsxnqku2XZ-Ye_5JuaAin4IJ7-QJnlmfCTeNZQp95UOQY2rxWvYSJPC3DWzrPbwLLVcWMGqZr3QEwiuMkzI_shdYwWK-LsGxePoxtr_XLPXoMUPZOAc-BX3MTAgp07hQd_yFm8uvM_enx6DLMpsClbD-jQE8doyKbS3cJEXlrEw8ZZ2CpjxJ6UOR1-71RR5u0umdBTWVXIUIw0892m_QR6OKW7x0AMUS9nzYHTw=s2048',
  card2001: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNute4qCtal4r74q5k_Em7bxcI2XFDCmrkEyGdquyRBKiZbojnZObVdo7sxQsw0xsfOo2fdad9gT9F4xgucM_7Rn4jm_DBOG3UEPt0HSQnoHU_Y7t7XlI_iB8xfk5iAE3E1Dkav-MfJMfsg4Fcs4mv2mv-MPnYCxPL5g8vfSXgZ_jZvQ1-HK5kUt3Q_Hfmqwl6-Mx8Qq58OGz2shcPuuUiCq3YUDFFGTSxhv5fag=s2048',
  cardGhibli: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKDV6PDaZastzkY5g8lGcfox8oVlN8W-qRNEGdjV_5gxzylAYW3DBES2syJjAFUgrH9X38_p-ffGf9lIHZeSg0J0kDG0tEUSQZWWXmA1SUd-zOKBb8kWjK-HCr7l6XkxnRADOeXwEDr_tku6_xojBEX-siggVCfjhki24v-J0WeUxdq41jHiQ4u7sMfrwVLNO0nS27EUO1SNdmLar3j6xD1kvTDEKQ0yTqzKmZeg=s2048',
  cardSouls: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD8BOF9T_3J1fCJ15ykVST64jhtjlzSoGy4eignZLpuR-VPRAzCnMhZLvrqZc-nWv9_6aPutpRXQyrfO0DW8PQxqjR-ntW4isz59H_FngBsZVoRSxQ4iLK2qxgBq9uIhkgGMOG5fcStKibSOi26C-Vb7L5TifS4HN6ZYOnY6FAysf_QQ1qeK78c9MFtl4nBfIh3mUAKewiRoyEwkPbmCloOdVUxtvYaUOpsrkMcQ=s2048',
  cardCyberpunkAnime: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPm0nZJdelKeY2lm96trVysh3fcHV_VYahXNHWb-eSENw9oVkYagd_hwHe9pckNPpz2L1IvC_z7bUJqh-rtJPiNI2LpMyaNid1Pc2-OBvDJEYXNHGIwNHCM-s4gIzBXjkAns4aefUBWwJWW-mnbo2GY0Hr3vvnnAVKVMd1X6QWjLCSjWLNBczabvfDIHy9eI6VY5LLvvw5_rpgLE_vpz2daEXkprD3ykApVvnKRw=s2048',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    index: 0,
    canon: 'Cinema Canon #01',
    label: 'INTERSTELLAR (4K IMAX)',
    alt: 'Deep space cosmic nebula and luminous gravitational accretion disk',
    src: IMAGES.slideInterstellar,
  },
  {
    index: 1,
    canon: 'Cyberpunk Canon #02',
    label: 'BLADE RUNNER 2049 (4K HDR)',
    alt: 'Neon reflections on rain-slicked futuristic cyberpunk city street',
    src: IMAGES.slideBladeRunner,
  },
  {
    index: 2,
    canon: 'Epic Sci-Fi #03',
    label: 'DUNE: EXPEDITIONS (70MM)',
    alt: 'Cinematic moody desert dunes bathed in warm amber twilight',
    src: IMAGES.slideDune,
  },
  {
    index: 3,
    canon: 'Pantheon Benchmark #04',
    label: '2001: SPACE ODYSSEY (CANON)',
    alt: 'Atmospheric starlight nebula void with dramatic dark horizon',
    src: IMAGES.slide2001,
  },
];

export const COUNTDOWN_ENTRIES: CountdownEntry[] = [
  {
    id: 'interstellar-2014',
    editorialRank: 1,
    communityRank: 1,
    title: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    verdictScore: 9.8,
    upvotes: 14290,
    downvotes: 412,
    commentsCount: 2840,
    starRating: 4.9,
    ratingsCount: '38,104 ratings',
    badgeText: 'Consensus Apex',
    subBadgeText: 'Unanimous #1 across 42 critics',
    image: IMAGES.cardInterstellar,
    imageAlt: 'Expansive cinematic space scene from Interstellar style movie showing a colossal luminous glowing black hole accretion disk',
    isImax4k: true,
    trailerLabel: 'Watch Official 4K Trailer • 2:45',
    videoTags: ['4K HDR', 'IMAX Enhanced', 'Dolby Atmos'],
    audioTag: 'Zimmer Organ Peak',
    accolades: [
      { text: 'Academy Award: Visual Effects', highlight: true },
      { text: '99% Audience Metacritic' },
      { text: 'Kip Thorne Physics Verified' },
    ],
    quote: '“Flawless acoustic resonance and emotional gravity that bends relativistic physics into cinematic transcendence. Nolan crafts an insurmountable benchmark in modern cosmic cinema.”',
    quoteAuthor: '— Elena Vance, Chief Lead',
    analyticalBreakdown: {
      cinematography: 'Hoyte van Hoytema shot over 65 minutes of native 15-perf 65mm IMAX film, mounting hard-bodied cameras directly onto spacecraft miniatures and Learjet noses for zero-CGI physical lighting.',
      soundDesign: 'Hans Zimmer recorded the 1926 four-manual Harrison & Harrison pipe organ at Temple Church in London, turning every breath of the air-bellows into the literal oxygen supply of the crew.',
      thematicCore: 'Relativistic time dilation ceases to be an abstract chalkboard equation and becomes the tragedy of a father watching 23 years of his children’s lives evaporate in three hours on Miller’s planet.',
      keyScene: 'The 68-RPM spinning Endurance docking sequence ("No Time for Caution")—unanimous #1 sequence in Guild history.',
    },
  },
  {
    id: 'blade-runner-2049',
    editorialRank: 2,
    communityRank: 3,
    title: 'Blade Runner 2049',
    year: 2017,
    director: 'Denis Villeneuve',
    verdictScore: 9.6,
    upvotes: 11840,
    downvotes: 320,
    commentsCount: 1402,
    badgeText: 'Masterpiece Runner-Up',
    subBadgeText: 'Top-voted in Visual Composition',
    image: IMAGES.cardBladeRunner,
    imageAlt: 'Neo-noir cyberpunk cityscape from Blade Runner 2049 aesthetic showing holographic neon pink advert',
    isImax4k: true,
    trailerLabel: 'Preview Deakins 4K Framing',
    videoTags: ['Deakins Oscar Cinematography', 'Sound Design Benchmark'],
    description: 'A hypnotic neon dystopia where every single frame feels calibrated like a museum painting. Villeneuve and Roger Deakins expand Philip K. Dick’s existential questioning into an overwhelming sensory monolith.',
    analyticalBreakdown: {
      cinematography: 'Roger Deakins’ long-awaited Academy Award win uses moving caustic water reflections, monochromatic sodium-vapor fog in Las Vegas, and brutalist miniature architecture.',
      soundDesign: 'Yamaha CS-80 brass swells collide with industrial sub-bass impacts that test theater subwoofers to their mechanical limits.',
      thematicCore: 'What makes a soul real is not the miracle of biological birth, but the choice to sacrifice oneself for something larger than one’s programmed script.',
      keyScene: 'The Sea Wall water-skimmer fight followed by quiet snow falling on K’s outstretched hand.',
    },
  },
  {
    id: 'arrival-2016',
    editorialRank: 3,
    communityRank: 2,
    title: 'Arrival',
    year: 2016,
    director: 'Denis Villeneuve',
    verdictScore: 9.5,
    upvotes: 9940,
    downvotes: 195,
    commentsCount: 890,
    badgeText: '▲ Community Voted #2 (+1 in Crowd Mode)',
    subBadgeText: 'Nonlinear Linguistics Masterclass',
    image: IMAGES.slideDune,
    imageAlt: 'Arrival atmospheric monolithic shell hovering over misty Montana valley',
    isImax4k: false,
    description: 'Amy Adams delivers career-best subtlety in an intellectually towering film that turns first-contact linguistics into an emotional meditation on deterministic time and maternal love.',
    analyticalBreakdown: {
      cinematography: 'Bradford Young’s overcast, under-lit naturalism grounds extraterrestrial contact in tactile, damp morning mist and shallow-focus intimacy.',
      soundDesign: 'Jóhann Jóhannsson’s vocal loops and Max Richter’s "On the Nature of Daylight" form a palindromic musical circle.',
      thematicCore: 'Sapir-Whorf hypothesis elevated to temporal empathy: if you could see your entire life from start to finish, would you embrace the grief to keep the joy?',
      keyScene: 'Louise realizing her "flashbacks" are flash-forwards as Heptapod B logograms unlock non-linear consciousness.',
    },
  },
  {
    id: 'the-matrix-1999',
    editorialRank: 4,
    communityRank: 4,
    title: 'The Matrix',
    year: 1999,
    director: 'The Wachowskis',
    verdictScore: 9.4,
    upvotes: 9410,
    downvotes: 210,
    commentsCount: 780,
    subBadgeText: 'The Wachowskis • Bullet-Time & Philosophical Allegory',
    image: IMAGES.cardMatrix,
    imageAlt: 'Dark green digital rain falling in black cybernetic reality from The Matrix cyberpunk film style.',
    isImax4k: true,
    analyticalBreakdown: {
      cinematography: 'Bill Pope’s sickly green CRT code-tint versus steely blue real-world lighting, paired with Yuen Woo-ping’s wire-fu choreography.',
      soundDesign: 'Don Davis’s avant-garde brass clusters fused with industrial breakbeat electronica.',
      thematicCore: 'Baudrillard’s Simulacra and Simulation fused with Gnostic liberation myth and cyberpunk kineticism.',
      keyScene: 'The Government Lobby shootout and Neo awakening in the bio-harvester pod field.',
    },
  },
  {
    id: 'inception-2010',
    editorialRank: 5,
    communityRank: 6,
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    verdictScore: 9.3,
    upvotes: 8890,
    downvotes: 280,
    commentsCount: 720,
    subBadgeText: 'Christopher Nolan • Subconscious Architecture',
    image: IMAGES.cardInception,
    imageAlt: 'Cityscape folding vertically onto itself in dream world architecture with dramatic amber sunlight highlights.',
    isImax4k: true,
    analyticalBreakdown: {
      cinematography: 'Practical rotating 100-foot hotel corridor rig capturing Joseph Gordon-Levitt fighting in shifting gravity.',
      soundDesign: 'Édith Piaf’s "Non, je ne regrette rien" slowed down to create the iconic brass "BRAAAM" time-scaling motif.',
      thematicCore: 'The heist film reimagined as therapeutic catharsis inside nested layers of grief and projection.',
      keyScene: 'Four simultaneous dream layers crosscutting in slow-motion as the van hits the river.',
    },
  },
  {
    id: 'children-of-men-2006',
    editorialRank: 6,
    communityRank: 7,
    title: 'Children of Men',
    year: 2006,
    director: 'Alfonso Cuarón',
    verdictScore: 9.3,
    upvotes: 8320,
    downvotes: 140,
    commentsCount: 640,
    subBadgeText: 'Alfonso Cuarón • Virtuosic Single-Take Realism',
    image: IMAGES.cardChildrenOfMen,
    imageAlt: 'Gritty dystopian overcast city street with soldiers and refugees in hand-held cinema single take camera aesthetic.',
    isImax4k: false,
    analyticalBreakdown: {
      cinematography: 'Emmanuel Lubezki’s impossible multi-minute unbroken tracking shots inside cramped cars and warzones.',
      soundDesign: 'Diegetic urban chaos punctured by the sudden, sacred silence of a crying newborn.',
      thematicCore: 'Despair and bureaucratic collapse when humanity loses its future—and the fragile spark that restores awe.',
      keyScene: 'The 6-minute Bexhill refugee camp battle cease-fire as soldiers freeze at the sound of Kee’s baby.',
    },
  },
  {
    id: '2001-space-odyssey-1968',
    editorialRank: 7,
    communityRank: 5,
    title: '2001: A Space Odyssey',
    year: 1968,
    director: 'Stanley Kubrick',
    verdictScore: 9.2,
    upvotes: 9120,
    downvotes: 310,
    commentsCount: 950,
    subBadgeText: 'Stanley Kubrick • The Archetype of Hard Cosmic Fiction',
    image: IMAGES.card2001,
    imageAlt: 'Mysterious black monolithic slab standing upright under alien sky with planetary alignment and glowing amber stars.',
    isImax4k: true,
    analyticalBreakdown: {
      cinematography: 'Super Panavision 70 slit-scan Star Gate corridor and rotating centrifuge set engineered before Apollo 11.',
      soundDesign: 'Ligeti’s micropolyphonic choral clusters alongside the cold vacuum of space breathing.',
      thematicCore: 'Evolutionary leaps triggered by alien intelligence, and the chilling politeness of HAL 9000’s machine paranoia.',
      keyScene: 'The 4-million-year match cut from airborne tapir bone to orbiting nuclear satellite.',
    },
  },
  {
    id: 'alien-1979',
    editorialRank: 8,
    communityRank: 8,
    title: 'Alien',
    year: 1979,
    director: 'Ridley Scott',
    verdictScore: 9.1,
    upvotes: 7650,
    downvotes: 120,
    commentsCount: 510,
    subBadgeText: 'Ridley Scott • Biomechanical Cosmic Dread & Blue-Collar Realism',
    image: IMAGES.slideInterstellar,
    imageAlt: 'Derelict spacecraft and biomechanical corridors in deep space.',
    isImax4k: true,
    analyticalBreakdown: {
      cinematography: 'Derek Vanlint’s claustrophobic anamorphic framing through grating, steam vents, and flashing emergency strobes.',
      soundDesign: 'Jerry Goldsmith’s echoplex flute phrases and the Nostromo’s rhythmic computer telemetry.',
      thematicCore: 'Corporate expendability ("Crew Expendable") meets H.R. Giger’s terrifying biomechanical lifecycle.',
      keyScene: 'Dallas in the air ducts and Ripley’s final confrontation aboard the Narcissus shuttle.',
    },
  },
  {
    id: 'eternal-sunshine-2004',
    editorialRank: 9,
    communityRank: 9,
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
    director: 'Michel Gondry',
    verdictScore: 9.0,
    upvotes: 7210,
    downvotes: 165,
    commentsCount: 480,
    subBadgeText: 'Michel Gondry & Charlie Kaufman • Lo-Fi Memory Erasure Romance',
    image: IMAGES.cardBladeRunner,
    imageAlt: 'Fading memories and snow-covered Montauk beach.',
    isImax4k: false,
    analyticalBreakdown: {
      cinematography: 'Ellen Kuras’s handheld in-camera practical tricks: vanishing book spines, crumbling beach houses, and spotlight tracking.',
      soundDesign: 'Jon Brion’s looping tape-warped chamber pop and muffled memory decay.',
      thematicCore: 'Erasing pain also erases the architecture of who we are; love is choosing to repeat the risk anyway.',
      keyScene: 'Joel and Clementine hiding inside his childhood memories to escape Lacuna’s erasure sweep.',
    },
  },
  {
    id: 'stalker-1979',
    editorialRank: 10,
    communityRank: 10,
    title: 'Stalker',
    year: 1979,
    director: 'Andrei Tarkovsky',
    verdictScore: 8.9,
    upvotes: 6840,
    downvotes: 215,
    commentsCount: 620,
    subBadgeText: 'Andrei Tarkovsky • Metaphysical Zone & Poetic Long Takes',
    image: IMAGES.cardChildrenOfMen,
    imageAlt: 'Sepia industrial railway transitioning into lush emerald Zone wilderness.',
    isImax4k: false,
    analyticalBreakdown: {
      cinematography: 'High-contrast sepia monochrome for the industrial outside world shifting to lush, hyper-tactile Eastmancolor inside the Zone.',
      soundDesign: 'Eduard Artemyev’s synthesizer drones blended with rhythmic train clatter becoming Wagner and Beethoven.',
      thematicCore: 'A pilgrimage to a Room that grants not what you claim to want, but what your deepest subconscious truly desires.',
      keyScene: 'The hypnotic 4-minute railway handcar tracking shot entering the forbidden Zone.',
    },
  },
];

export const TRENDING_UNIVERSE_CARDS: TrendingUniverseCard[] = [
  {
    id: 'ghibli-top-10',
    category: 'Anime & Animation',
    badge: 'Anime Pantheon',
    score: '9.7 Score',
    peakEntry: 'Spirited Away (4K Restored)',
    title: 'Top 10 Studio Ghibli Masterpieces Ranked by Thematic Depth',
    description: "From environmental mythos to wartime grief, our animation guild ranks Miyazaki and Takahata's finest moments.",
    criticName: 'Aoi Takahashi',
    criticAvatar: IMAGES.aoiTakahashi,
    votes: '84.2k votes',
    image: IMAGES.cardGhibli,
    entries: [
      { rank: 1, title: 'Spirited Away', year: '2001', score: '9.9', note: 'Unmatched bathhouse spirit mythology & coming-of-age resilience' },
      { rank: 2, title: 'Princess Mononoke', year: '1997', score: '9.8', note: 'Fierce ecological epic without simplistic villains' },
      { rank: 3, title: 'Grave of the Fireflies', year: '1988', score: '9.7', note: 'Takahata’s devastating anti-war realist masterpiece' },
      { rank: 4, title: 'The Tale of the Princess Kaguya', year: '2013', score: '9.6', note: 'Sumi-e watercolor brushstrokes alive with mortal longing' },
      { rank: 5, title: 'My Neighbor Totoro', year: '1988', score: '9.5', note: 'Pure childhood wonder and pastoral stillness' },
    ],
  },
  {
    id: 'soulslike-boss-top-10',
    category: 'Gaming Masterpieces',
    badge: 'Gaming Benchmarks',
    score: '9.6 Score',
    peakEntry: 'Shadow of Erdtree: Messmer',
    title: 'Top 10 Soulslike Boss Encounters Ranked by Mechanics & Lore',
    description: 'From Ornstein & Smough to Malenia, dissecting combat pacing, punish windows, and emotional orchestration.',
    criticName: 'Marcus Chen',
    criticAvatar: IMAGES.marcusChen,
    votes: '102.5k votes',
    image: IMAGES.cardSouls,
    entries: [
      { rank: 1, title: 'Messmer the Impaler (Elden Ring: SotE)', year: '2024', score: '9.9', note: 'Flawless hitbox choreography and tragic maternal abandonment' },
      { rank: 2, title: 'Sword Saint Isshin (Sekiro)', year: '2019', score: '9.8', note: 'The ultimate four-phase exam of posture and hesitation' },
      { rank: 3, title: 'Slave Knight Gael (Dark Souls III)', year: '2017', score: '9.8', note: 'Two nobodies fighting over nothing at the end of the world' },
      { rank: 4, title: 'Ludwig, the Holy Blade (Bloodborne)', year: '2015', score: '9.7', note: 'The Moonlight Greatsword phase transition & choral waltz' },
      { rank: 5, title: 'Malenia, Blade of Miquella (Elden Ring)', year: '2022', score: '9.5', note: 'Waterfowl Dance notoriety and scarlet rot apotheosis' },
    ],
  },
  {
    id: 'noir-thrillers-top-10',
    category: 'Dark Noir & Thrillers',
    badge: 'Dark Noir Canons',
    score: '9.8 Score',
    peakEntry: 'Se7en: The Desert Revelation',
    title: 'Top 10 Psychological Thrillers with Devastating Third Acts',
    description: 'Films that completely dismantle audience perception in the final ten minutes without relying on cheap gimmicks.',
    criticName: 'Julian Vance-Sloan',
    criticAvatar: IMAGES.julianVance,
    votes: '67.1k votes',
    image: IMAGES.cardChildrenOfMen,
    entries: [
      { rank: 1, title: 'Se7en', year: '1995', score: '9.8', note: 'David Fincher’s sun-drenched high-voltage power line climax' },
      { rank: 2, title: 'Oldboy', year: '2003', score: '9.7', note: 'Park Chan-wook’s operatic penthouse revelation' },
      { rank: 3, title: 'Memories of Murder', year: '2003', score: '9.7', note: 'Bong Joon-ho’s final fourth-wall stare into the audience' },
      { rank: 4, title: 'Chinatown', year: '1974', score: '9.6', note: 'Neo-noir fatalism perfected in a single final street line' },
      { rank: 5, title: 'Prisoners', year: '2013', score: '9.4', note: 'A faint red plastic whistle in the freezing dark' },
    ],
  },
  {
    id: 'prestige-tv-top-10',
    category: 'Prestige TV Epics',
    badge: 'Prestige Television',
    score: '9.5 Score',
    peakEntry: "Succession: Connor's Wedding",
    title: 'Top 10 Prestige Television Episodes of the Streaming Era',
    description: "From Breaking Bad's Ozymandias to Severance's The We We Are, ranking hour-long writing perfection.",
    criticName: 'Elena Vance',
    criticAvatar: IMAGES.elenaVance,
    votes: '79.8k votes',
    image: IMAGES.cardInception,
    entries: [
      { rank: 1, title: "Succession — 'Connor's Wedding' (S4E3)", year: '2023', score: '9.9', note: '27-minute unbroken speakerphone shockwave on Hudson harbor' },
      { rank: 2, title: "Severance — 'The We We Are' (S1E9)", year: '2022', score: '9.8', note: '40 minutes of relentless cross-cut Overtime Contingency tension' },
      { rank: 3, title: "Better Call Saul — 'Plan and Execution' (S6E7)", year: '2022', score: '9.8', note: 'A flickering candle when two separate worlds fatally collide' },
      { rank: 4, title: "The Bear — 'Fishes' (S2E6)", year: '2023', score: '9.7', note: '66 minutes of weaponized Christmas Eve culinary anxiety' },
      { rank: 5, title: "Chernobyl — 'Vichnaya Pamyat' (S1E5)", year: '2019', score: '9.7', note: 'Red & blue courtroom cards explaining how an RBMK reactor explodes' },
    ],
  },
];

export const SHORT_LIST_ARCHIVES: ShortListArchive[] = [
  {
    id: 'survival-horror',
    categoryTag: 'Horror & Games',
    filterGroup: 'Horror',
    votes: '42.8k Votes',
    verdictLabel: '9.7 Verdict',
    title: 'Top 10 Survival Horror Games That Broke Our Minds',
    peakConsensus: 'Peak Consensus: Silent Hill 2 (Remake)',
    summaryLine: '#1 Silent Hill 2 • #2 Resident Evil 2 Remake • #3 Dead Space • #4 Alien: Isolation',
    fullList: [
      { rank: 1, name: 'Silent Hill 2 (2001 / 2024 Remake)', detail: 'Psychological fog, Akira Yamaoka industrial melancholy, and guilt manifested.', score: '9.8' },
      { rank: 2, name: 'Resident Evil 2 Remake (2019)', detail: 'RPD survival routing and Mr. X’s binaural footsteps.', score: '9.7' },
      { rank: 3, name: 'Dead Space (2008 / 2023)', detail: 'Diegetic RIG interface and strategic dismemberment aboard USG Ishimura.', score: '9.6' },
      { rank: 4, name: 'Alien: Isolation (2014)', detail: 'Dual-brain AI Xenomorph stalking Sevastopol Station in 1979 cassette-futurism.', score: '9.5' },
      { rank: 5, name: 'Signalis (2022)', detail: 'Cosmic retro-cybernetic survival horror inspired by King in Yellow & Evangelion.', score: '9.4' },
    ],
  },
  {
    id: 'historic-disasters',
    categoryTag: 'History & Disasters',
    filterGroup: 'Disasters & History',
    votes: '88.4k Votes',
    verdictLabel: '9.9 Historical Weight',
    title: 'Top 10 Historic & Cosmic Disasters of All Time',
    peakConsensus: 'Peak Consensus: Chernobyl 1986',
    summaryLine: '#1 The 1815 Tambora Eruption • #2 Tunguska Event 1908 • #3 Titanic Void • #4 Pompeii Vesuvius',
    fullList: [
      { rank: 1, name: '1815 Mount Tambora Eruption', detail: 'VEI-7 volcanic winter causing the 1816 "Year Without a Summer" across the Northern Hemisphere.', score: '9.9' },
      { rank: 2, name: 'Chernobyl Reactor No. 4 (1986)', detail: 'Steam explosion and open-air graphite fire that reshaped nuclear engineering and geopolitics.', score: '9.9' },
      { rank: 3, name: '1908 Tunguska Airburst', detail: '12-megaton meteoroid airburst flattening 80 million trees across 2,150 sq km of Siberian taiga.', score: '9.7' },
      { rank: 4, name: 'AD 79 Eruption of Mount Vesuvius', detail: 'Pyroclastic surges preserving Pompeii and Herculaneum in volcanic ash.', score: '9.7' },
      { rank: 5, name: 'RMS Titanic Sinking (1912)', detail: 'North Atlantic iceberg collision ending Gilded Age technological hubris in 2 hours 40 minutes.', score: '9.6' },
    ],
  },
  {
    id: 'open-world-games',
    categoryTag: 'Gaming Benchmark',
    filterGroup: 'Gaming',
    votes: '112.5k Votes',
    verdictLabel: '9.8 Verdict',
    title: 'Top 10 Open-World Games with Unrivaled Immersion',
    peakConsensus: 'Peak Consensus: Red Dead Redemption 2',
    summaryLine: '#1 Red Dead Redemption 2 • #2 The Witcher 3 • #3 Elden Ring • #4 Zelda: BotW',
    fullList: [
      { rank: 1, name: 'Red Dead Redemption 2 (2018)', detail: 'Unprecedented ecosystem simulation, dynamic weather mud physics, and Arthur Morgan’s journal.', score: '9.9' },
      { rank: 2, name: 'The Witcher 3: Wild Hunt (2015)', detail: 'Side quests written with the moral complexity of standalone dark-fantasy novels.', score: '9.8' },
      { rank: 3, name: 'Elden Ring (2022)', detail: 'Zero-compass discovery where every painted horizon is a reachable dungeon.', score: '9.8' },
      { rank: 4, name: 'The Legend of Zelda: Breath of the Wild (2017)', detail: 'Systemic chemistry engine turning wind, fire, and electricity into pure player agency.', score: '9.7' },
      { rank: 5, name: 'Cyberpunk 2077: Phantom Liberty (2023)', detail: 'Night City path-traced verticality and Dogtown spy-thriller density.', score: '9.5' },
    ],
  },
  {
    id: 'psychological-horror-films',
    categoryTag: 'Cinema Noir & Horror',
    filterGroup: 'Horror',
    votes: '64.1k Votes',
    verdictLabel: '9.6 Verdict',
    title: 'Top 10 Psychological Horror Films That Never Leave You',
    peakConsensus: 'Peak Consensus: The Shining',
    summaryLine: "#1 The Shining (1980) • #2 Hereditary (2018) • #3 Cure (1997) • #4 Rosemary's Baby",
    fullList: [
      { rank: 1, name: 'The Shining (1980)', detail: 'Kubrick’s impossible Overlook Hotel geometry and Steadicam dread.', score: '9.8' },
      { rank: 2, name: 'Hereditary (2018)', detail: 'Ari Aster’s miniature dollhouse framing of generational trauma and occult fatalism.', score: '9.7' },
      { rank: 3, name: 'Cure (1997)', detail: 'Kiyoshi Kurosawa’s hypnotic detective masterwork of contagion and existential emptiness.', score: '9.6' },
      { rank: 4, name: "Rosemary's Baby (1968)", detail: 'Paranoia and gaslighting inside Manhattan’s gothic Bramford apartments.', score: '9.5' },
      { rank: 5, name: 'The Lighthouse (2019)', detail: '1.19:1 orthochromatic 35mm madness on a storm-lashed New England rock.', score: '9.4' },
    ],
  },
];

export const GUILD_ESSAYS: GuildEssay[] = [
  {
    id: 'villeneuve-geometry-of-dread',
    category: 'Directorial Aesthetics',
    subtitle: 'Masterclass Retrospective',
    readTime: '14 min read',
    title: 'The Geometry of Dread: How Denis Villeneuve Weaponizes Scale in Modern Cinema',
    quote: '“Villeneuve doesn’t shoot environments; he shoots indifferent monoliths that swallow human hubris whole, forcing sound design and negative space into violent psychological combat.”',
    author: 'Elena Vance',
    authorRole: 'Chief Cinema Lead',
    authorAvatar: IMAGES.elenaVance,
    bookmarks: '5.8k bookmarked',
    image: IMAGES.slideDune,
    paragraphs: [
      'Across Incendies, Sicario, Arrival, Blade Runner 2049, and the Dune diptych, Denis Villeneuve has forged a visual vocabulary that treats architectural and geological scale not as spectacle, but as existential pressure. Where conventional blockbusters fill the frame with kinetic clutter to reassure the viewer of human centrality, Villeneuve empties the frame until human figures are reduced to fragile silhouettes against brutalist concrete, sodium-lit smog, or endless ochre dunes.',
      'Working alongside cinematographers Roger Deakins, Bradford Young, and Greig Fraser, Villeneuve consistently positions the horizon line either oppressively high—crushing characters beneath monolithic ceilings—or dizzyingly low, exposing them to an indifferent sky. In Arrival, the Heptapod shell hangs a few meters above Montana grass without landing gear or exhaust, violating physical intuition through sheer quietude.',
      'This visual minimalism is inseparable from acoustic weight. Villeneuve treats silence and sub-bass frequencies as physical walls. Whether it is Jóhann Jóhannsson’s descending brass beast in Sicario as the convoy crosses into Juárez, or Hans Zimmer’s Tibetan horn blasts across Arrakis, the soundscape arrives before the image—announcing that the environment itself is the antagonist.',
    ],
  },
  {
    id: 'akira-light-trails',
    category: 'Animation Craft',
    subtitle: '8 min read',
    readTime: '8 min read',
    title: 'Why Akira’s Hand-Painted Light Trails Still Defy 3D CGI Decades Later',
    quote: '“160,000 hand-painted cels using 327 custom colors—including 50 shades created exclusively for Neo-Tokyo’s nocturnal glow.”',
    author: 'Aoi Takahashi',
    authorRole: 'Animation Fellow',
    authorAvatar: IMAGES.aoiTakahashi,
    bookmarks: '2.4k bookmarked',
    image: IMAGES.cardCyberpunkAnime,
    paragraphs: [
      'When Katsuhiro Otomo’s Akira premiered in July 1988, it shattered every rule of television-era cel animation. Rather than animating on threes with static backgrounds and post-recorded dialogue, Tokyo Movie Shinsha recorded the voice actors first and animated every lip phoneme and multi-plane camera pan on ones and twos.',
      'The famous tail-light streaks of Kaneda’s ceramic twin-rotor motorcycle were not digital particle effects; they were multi-exposure optical camera passes shot through hand-cut masks over backlit colored gels. Because human hands varied the spacing of those smears in response to the bike’s weight transfer, the light trails carry an organic kinetic momentum that mathematically uniform 3D shaders still struggle to replicate.',
    ],
  },
  {
    id: 'disco-elysium-thought-cabinet',
    category: 'Narrative Design',
    subtitle: '11 min read',
    readTime: '11 min read',
    title: 'The Subversive Brilliance of Disco Elysium’s Thought Cabinet',
    quote: '“When your own nervous system, necktie, and limbic brain argue in a 24-voice parliament, failure becomes the richest narrative reward in gaming.”',
    author: 'Marcus Chen',
    authorRole: 'Silicon Benchmarker',
    authorAvatar: IMAGES.marcusChen,
    bookmarks: '3.9k bookmarked',
    image: IMAGES.slide2001,
    paragraphs: [
      'Most role-playing games treat dialogue trees as locks and character stats as keys: invest enough points into Persuasion, click the highlighted blue line, and collect your reward. Disco Elysium tears up this transactional contract by turning its 24 skills—from Inland Empire and Shivers to Volition and Electrochemistry—into unreliable, competing roommates inside a shattered detective’s skull.',
      'Even more radical is the Thought Cabinet, where ideas themselves are equipped like armor. Internalizing "Wompty-Dompty Dom Centre" or "The Precarious World" alters how your mind parses Revachol’s history, proving that mechanical systems can model psychological obsession with literary precision.',
    ],
  },
  {
    id: 'zimmer-vs-goransson',
    category: 'Acoustic Theory',
    subtitle: '9 min read',
    readTime: '9 min read',
    title: 'Hans Zimmer vs. Ludwig Göransson: The New Sound of Tension',
    quote: '“The modern theatrical score has abandoned romantic melody in favor of timbral sculpture—where a bowed guitar or Shepard tone becomes the ticking clock of the plot.”',
    author: 'Julian Vance-Sloan',
    authorRole: 'Grandmaster Critic',
    authorAvatar: IMAGES.julianVance,
    bookmarks: '4.1k bookmarked',
    image: IMAGES.cardInterstellar,
    paragraphs: [
      'Over the past decade, a fascinating sonic baton pass has unfolded at the summit of blockbuster scoring. Hans Zimmer pioneered the hybridization of orchestral brass with modular synthesizers and acoustic anomalies—using a pocket watch’s ticking in Dunkirk and Interstellar to bind emotional catharsis to strict mathematical tempo.',
      'Ludwig Göransson, particularly in Tenet, Oppenheimer, and Sinners, pushes this physicality toward volatile tempo shifts. In "Can You Hear the Music," Göransson accelerates the violin ensemble across 21 distinct tempo changes without digital click-track splicing, capturing the dizzying vertigo of quantum discovery.',
    ],
  },
];
