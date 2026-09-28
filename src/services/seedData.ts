import type {
  AppSettings,
  AppBranding,
  HomeSection,
  NavigationMenuItem,
  BottomNavItem,
  WisdomContent,
  SadhnaContent,
  VideoContent,
  AudioContent,
  QuoteContent,
  MediaItem,
  CourseContent,
  OnlineSession,
  EditablePage,
  UserRecord
} from '../types/cms';

export const DEFAULT_APP_SETTINGS: AppSettings = {
  appName: 'KAYASHUNYA',
  tagline: 'The Science of Body, Silence of Being',
  appDescription: 'A sanctuary for non-dual self-inquiry, universal physical discipline, yoga, and inner awakening.',
  websiteUrl: 'https://kayashunya.org',
  contactEmail: 'physicaltospiritual@gmail.com',
  contactPhone: '+91 98765 43210',
  address: 'Kayashunya Ashram & Learning Foundation, Rishikesh / Online',
  socialLinks: {
    youtube: 'https://youtube.com/@kayashunya',
    instagram: 'https://instagram.com/kayashunya',
    telegram: 'https://t.me/kayashunya_satsang',
    whatsapp: 'https://chat.whatsapp.com/kayashunya',
  },
  copyrightText: '© 2026 Kayashunya Foundation. All Rights Reserved.',
};

export const DEFAULT_BRANDING: AppBranding = {
  logoUrl: '',
  appIconUrl: '',
  faviconUrl: '',
  splashImageUrl: '',
  primaryColor: '#C25E00', // Warm Spiritual Saffron / Ochre
  secondaryColor: '#D97706', // Amber gold
  accentColor: '#92400E',
  canvasBgLight: '#FAF8F5',
  canvasBgDark: '#18181B',
  fontHeading: 'Cinzel',
  fontBody: 'Plus Jakarta Sans',
};

export const DEFAULT_HOME_SECTIONS: HomeSection[] = [
  {
    id: 'sec_banner',
    title: "Daily Sutra Contemplation",
    subtitle: 'From Katha Upanishad: The eternal distinction between Shreyas and Preyas',
    type: 'banner',
    isEnabled: true,
    order: 1,
    buttonLabel: 'Read Today\'s Discourse',
    buttonDestination: '/wisdom/wisdom_1',
  },
  {
    id: 'sec_continue',
    title: 'Continue Sadhna & Reading',
    subtitle: 'Pick up your practice where you left off',
    type: 'continue',
    isEnabled: true,
    order: 2,
  },
  {
    id: 'sec_wisdom',
    title: 'Discourses & Wisdom Library',
    subtitle: 'Core teachings on Advaita, Gita, and self-inquiry',
    type: 'todays_wisdom',
    isEnabled: true,
    order: 3,
    displayLimit: 3,
    buttonLabel: 'View All Wisdom',
    buttonDestination: '/wisdom',
  },
  {
    id: 'sec_sadhna',
    title: 'Daily Sadhna & Routines',
    subtitle: 'Track your inner discipline, yoga, and Dhyana timer',
    type: 'todays_sadhna',
    isEnabled: true,
    order: 4,
    displayLimit: 4,
    buttonLabel: 'Open Sadhna Tracker',
    buttonDestination: '/sadhna',
  },
  {
    id: 'sec_sessions',
    title: 'Upcoming Live Online Sessions',
    subtitle: 'Join live interactive satsangs with global seekers',
    type: 'upcoming_sessions',
    isEnabled: true,
    order: 5,
    displayLimit: 2,
    buttonLabel: 'All Sessions',
    buttonDestination: '/sessions',
  },
  {
    id: 'sec_courses',
    title: 'Featured Programs & Courses',
    subtitle: 'Structured paths for deep understanding and transformation',
    type: 'courses',
    isEnabled: true,
    order: 6,
    displayLimit: 2,
    buttonLabel: 'Explore Courses',
    buttonDestination: '/courses',
  },
  {
    id: 'sec_videos',
    title: 'Video Library',
    subtitle: 'Watch video discourses and technique demonstrations',
    type: 'videos',
    isEnabled: true,
    order: 7,
    displayLimit: 2,
    buttonLabel: 'Watch Library',
    buttonDestination: '/videos',
  },
  {
    id: 'sec_quotes',
    title: 'Contemplative Quotes',
    subtitle: 'Share daily pearls of truth directly to WhatsApp',
    type: 'quotes',
    isEnabled: true,
    order: 8,
    displayLimit: 2,
  },
];

export const DEFAULT_DRAWER_MENU: NavigationMenuItem[] = [
  { id: 'm1', label: 'Home', iconName: 'Home', destination: 'home', order: 1, isEnabled: true },
  { id: 'm2', label: 'Wisdom Library', iconName: 'BookOpen', destination: 'wisdom', order: 2, isEnabled: true },
  { id: 'm3', label: 'Sadhna Tracker', iconName: 'Compass', destination: 'sadhna', order: 3, isEnabled: true },
  { id: 'm4', label: 'Master Courses', iconName: 'GraduationCap', destination: 'courses', order: 4, isEnabled: true },
  { id: 'm5', label: 'Live Sessions', iconName: 'Calendar', destination: 'sessions', order: 5, isEnabled: true },
  { id: 'm6', label: 'Video Discourses', iconName: 'PlayCircle', destination: 'videos', order: 6, isEnabled: true },
  { id: 'm7', label: 'Audio & Podcasts', iconName: 'Headphones', destination: 'audio', order: 7, isEnabled: true },
  { id: 'm8', label: 'Daily Quotes', iconName: 'Quote', destination: 'quotes', order: 8, isEnabled: true },
  { id: 'm9', label: 'About Kayashunya', iconName: 'Info', destination: 'page_about-kayashunya', order: 9, isEnabled: true },
  { id: 'm10', label: 'Kayashunya Method', iconName: 'Sparkles', destination: 'page_kayashunya-method', order: 10, isEnabled: true },
  { id: 'm11', label: 'Kayashunya 8 Path', iconName: 'Waypoints', destination: 'page_kayashunya-8-path', order: 11, isEnabled: true },
  { id: 'm12', label: 'The Last Hour', iconName: 'Clock', destination: 'page_the-last-hour', order: 12, isEnabled: true },
  { id: 'm13', label: 'Contact Ashram', iconName: 'Mail', destination: 'page_contact', order: 13, isEnabled: true },
];

export const DEFAULT_BOTTOM_NAV: BottomNavItem[] = [
  { id: 'b1', key: 'home', label: 'HOME', iconName: 'Home', destination: 'home', isEnabled: true, order: 1 },
  { id: 'b2', key: 'wisdom', label: 'WISDOM', iconName: 'BookOpen', destination: 'wisdom', isEnabled: true, order: 2 },
  { id: 'b3', key: 'sadhna', label: 'SADHNA', iconName: 'Compass', destination: 'sadhna', isEnabled: true, order: 3 },
  { id: 'b4', key: 'account', label: 'ACCOUNT', iconName: 'User', destination: 'account', isEnabled: true, order: 4 },
];

export const DEFAULT_WISDOM: WisdomContent[] = [
  {
    id: 'wisdom_1',
    title: 'The Mirror of Clarity: Living Without Fear',
    subtitle: 'Understanding the roots of psychological anxiety through Advaita Vedanta',
    slug: 'the-mirror-of-clarity-living-without-fear',
    author: 'Acharya Kayashunya',
    category: 'Vedanta & Mind',
    tags: ['Advaita', 'Fearlessness', 'Self-Inquiry', 'Clarity'],
    type: 'book',
    readingTimeMinutes: 28,
    status: 'published',
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    likesCount: 342,
    isFeatured: true,
    quoteHighlight: 'Fear is not an external force; it is the mind clinging to an illusory image of safety.',
    excerpt: 'When you look at fear closely without wanting to run from it, you see that fear is always about the projected future.',
    content: `Chapter 1: The Root of All Trembling

When you look at fear closely, without wanting to run from it or conquer it, what do you see? You see that fear is always about the future. And the future is nothing but a projected thought of the past trying to preserve itself.

Vedanta does not give you methods to become "brave." Bravery is still within the duality of fear and defense. True fearlessness—Abhaya—arises not when the ego builds stronger shields, but when the nature of the shield-bearer is thoroughly inquired into.

Who is the one asking to be safe? 
The body has its biological instincts—if there is fire, the hand withdraws. That is natural intelligence. But psychological fear is different: "What if they reject me? What if I fail? What if my identity dissolves?"

Chapter 2: The Illusory Anchor

All spiritual suffering is attachment to the perishable while demanding immortality from it. The moment you see that the ego is a mental fabrication, the trembling stops. Not because the world became harmless, but because the one who could be wounded was recognized as a phantom.

Sit in stillness. Observe the rising impulse of panic or greed. Do not label it. Do not fight it. In the light of choiceless awareness, the false dissolves of its own accord.`,
  },
  {
    id: 'wisdom_2',
    title: 'Action Without Clinging: The Gita in Everyday Conflict',
    subtitle: 'Nishkama Karma decoded for modern workplace and relationship dilemmas',
    slug: 'action-without-clinging-gita-in-everyday-conflict',
    author: 'Acharya Kayashunya',
    category: 'Bhagavad Gita',
    tags: ['Bhagavad Gita', 'Karma Yoga', 'Right Action'],
    type: 'book',
    readingTimeMinutes: 35,
    status: 'published',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    likesCount: 512,
    quoteHighlight: 'You have right to the deed, but never to the fruits thereof. Act as the instrument of Truth.',
    excerpt: 'Arjuna\'s breakdown at Kurukshetra is the crisis every human faces when sentimentality clouds clarity.',
    content: `Chapter 1: The Battlefield of Decision

Arjuna's breakdown in the middle of Kurukshetra is not an ancient fairy tale; it is the exact crisis every honest human faces when duty demands clarity over sentimentality.

Sentimentality looks like compassion, but it is actually ego-preservation. "What will happen to MY people? What will happen to MY reputation?" Krishna exposes this illusion immediately: "Whence has this dejection come upon you in this hour of peril?"

Chapter 2: The Sovereign Secret of Action

True action—Karma Yoga—is not mechanical exertion. It is action performed when the personal center has subsided. When you act for truth rather than personal gratification, exhaustion disappears. Work becomes prayer; duty becomes freedom.`,
  },
  {
    id: 'wisdom_3',
    title: 'Silence Speaks: The Art of Daily Contemplation',
    subtitle: 'Why 15 minutes of uninterrupted silence dissolves hours of mental agitation',
    slug: 'silence-speaks-the-art-of-daily-contemplation',
    author: 'Acharya Kayashunya',
    category: 'Sadhana & Meditation',
    tags: ['Meditation', 'Silence', 'Awareness'],
    type: 'article',
    readingTimeMinutes: 8,
    status: 'published',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    likesCount: 890,
    quoteHighlight: 'Silence is not the absence of sound; it is the absence of the self-centered narrator.',
    excerpt: 'Meditation is not doing; it is the cessation of unnecessary psychological doing.',
    content: `Most people believe meditation is concentration. They strain their forehead, fight their thoughts, and emerge with a headache.

Meditation is not doing; it is the cessation of unnecessary psychological doing. When you sit quietly at dawn, allow every sound—the rustle of leaves, the far-off vehicle, the ticking of the clock—to enter without resistance.

Do not become the judge of your thoughts. The moment you say "Good thought, bad thought," you have created two: the watcher and the watched. Realize that both are within the field of awareness. You are the unchanging screen upon which the film of mind is projected.`,
  },
  {
    id: 'wisdom_4',
    title: 'Kayashunya: The Dissolution of Bodily Conditioning',
    subtitle: 'How unconscious postural and breath habits store psychological memory',
    slug: 'kayashunya-dissolution-of-bodily-conditioning',
    author: 'Acharya Kayashunya',
    category: 'Kayashunya Method',
    tags: ['Body', 'Prana', 'Subtle Energy'],
    type: 'article',
    readingTimeMinutes: 12,
    status: 'published',
    publishedAt: new Date().toISOString(),
    likesCount: 620,
    quoteHighlight: 'When the body is held in genuine stillness, the subconscious mind is forced to surrender its chatter.',
    excerpt: 'The body is the crystallised unconscious mind. By rectifying spinal alignment and breath rhythm, the spiritual inquiry becomes effortless.',
    content: `Kayashunya (literally "emptiness of the bodily shell") is not an ascetic denial of the flesh. It is the profound realization that the body is the dense manifestation of our unexamined psychological attachments.

Every anxiety creates a spasm in the diaphragm; every resentment tightens the jaw and pelvis; every fear contracts the breath. You cannot meditate deeply while your nervous system is broadcasting emergency signals of old traumas.

Through conscious postural stillness, deliberate breath deceleration, and radical bodily observation, the body ceases to be a noisy obstacle. It becomes a clean, transparent flute through which truth resonates.`,
  },
];

export const DEFAULT_SADHNA: SadhnaContent[] = [
  {
    id: 'sadhna_1',
    title: 'Morning Contemplation (Dhyana)',
    subtitle: 'Silent non-dual observation of the rising day',
    category: 'meditation',
    description: '15 minutes of unguided silent sitting before entering the day’s activities.',
    instructions: 'Sit comfortably with a neutral spine. Do not control thoughts. Watch every thought as a cloud in the open sky of awareness.',
    durationMinutes: 15,
    difficulty: 'All Levels',
    tags: ['Silence', 'Dhyana', 'Dawn'],
    status: 'published',
    order: 1,
    timeOfDay: 'Morning',
    isFeatured: true,
  },
  {
    id: 'sadhna_2',
    title: 'Scriptural Study (Swadhyaya)',
    subtitle: 'Deep reading of Mandukya Upanishad or Gita verses',
    category: 'swadhyaya',
    description: 'Read 2 chapters or sutras with reflective inquiry and personal journaling.',
    instructions: 'Read slowly. Stop after each paragraph. Ask yourself: "How does this expose my own psychological defense mechanisms?"',
    durationMinutes: 20,
    difficulty: 'Intermediate',
    tags: ['Scripture', 'Gita', 'Upanishad'],
    status: 'published',
    order: 2,
    timeOfDay: 'Morning',
  },
  {
    id: 'sadhna_3',
    title: 'Kayashunya 8 Path: Spinal Stillness',
    subtitle: 'Release unconscious tension and restore primal breath',
    category: 'kayashunya_8_path',
    description: 'Special sequence designed to align the 8 bodily pivots for meditation stability.',
    instructions: 'Begin standing, balance equal weight on four corners of the feet. Proceed to seated Sukhasana with vertical spine alignment.',
    durationMinutes: 25,
    difficulty: 'Intermediate',
    tags: ['Kayashunya 8 Path', 'Posture', 'Prana'],
    status: 'published',
    order: 3,
    timeOfDay: 'Morning',
    isFeatured: true,
  },
  {
    id: 'sadhna_4',
    title: 'Midday Breath Awareness (Pranayama)',
    subtitle: 'Equal breath ratio to break mental inertia',
    category: 'breath',
    description: '5 minutes of centered box breathing (4-4-4-4) to reset the nervous system.',
    instructions: 'Inhale 4 seconds, retain 4 seconds, exhale 4 seconds, pause 4 seconds. Repeat for 12 complete cycles.',
    durationMinutes: 5,
    difficulty: 'Beginner',
    tags: ['Pranayama', 'Breath', 'Focus'],
    status: 'published',
    order: 4,
    timeOfDay: 'Afternoon',
  },
  {
    id: 'sadhna_5',
    title: 'Universal Training: Strength in Stillness',
    subtitle: 'Functional physical capacity without body vanity',
    category: 'universal_training',
    description: 'Calisthenics and isometric holds that teach the mind not to panic under tension.',
    instructions: '3 rounds of static squats, plank holds, and deep hip openers. Observe the mind\'s impulse to complain and remain steady.',
    durationMinutes: 30,
    difficulty: 'Advanced',
    tags: ['Strength', 'Physical', 'Universal Training'],
    status: 'published',
    order: 5,
    timeOfDay: 'Afternoon',
  },
  {
    id: 'sadhna_6',
    title: 'Evening Self-Inquiry (Atma-Vichara)',
    subtitle: 'Reflecting upon the day\'s attachments and reactivities',
    category: 'awareness',
    description: 'Review the day without guilt: Where did ego react? Who was the one offended?',
    instructions: 'Write down moments of agitation. Ask directly: "Who felt hurt? To whom did this disturbance appear?" Rest in the observer.',
    durationMinutes: 10,
    difficulty: 'All Levels',
    tags: ['Atma-Vichara', 'Inquiry', 'Evening'],
    status: 'published',
    order: 6,
    timeOfDay: 'Evening',
  },
];

export const DEFAULT_VIDEOS: VideoContent[] = [
  {
    id: 'video_1',
    title: 'Beyond Psychological Fear: Himalayan Discourse',
    description: 'In-depth exploration of how unconscious memories forge identity and produce continuous trembling.',
    category: 'Advaita Vedanta',
    tags: ['Fear', 'Vedanta', 'Discourse'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    duration: '48:15',
    instructor: 'Acharya Kayashunya',
    status: 'published',
    publishedAt: new Date().toISOString(),
    isFeatured: true,
  },
  {
    id: 'video_2',
    title: 'The Kayashunya Postural Method: Freeing the Diaphragm',
    description: 'Practical demonstration of seated alignment to unlock unrestricted natural diaphragmatic breathing.',
    category: 'Kayashunya Method',
    tags: ['Yoga', 'Breath', 'Technique'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    duration: '26:40',
    instructor: 'Acharya Kayashunya',
    status: 'published',
    publishedAt: new Date().toISOString(),
  },
];

export const DEFAULT_AUDIO: AudioContent[] = [
  {
    id: 'audio_1',
    title: 'Morning Discourse: Freedom from Reactivity',
    description: 'Gentle contemplation on meeting the day’s unexpected hurdles from the vantage point of pure stillness.',
    category: 'Discourses',
    audioUrl: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
    duration: '12:30',
    narrator: 'Acharya Kayashunya',
    status: 'published',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'audio_2',
    title: 'Atma-Vichara Guided Inquiry & Bell',
    description: 'Guided audio meditation designed to accompany the 15-minute silent Dhyana timer.',
    category: 'Meditation',
    audioUrl: 'https://actions.google.com/sounds/v1/water/river_stream.ogg',
    duration: '15:00',
    narrator: 'Acharya Kayashunya',
    status: 'published',
    publishedAt: new Date().toISOString(),
  },
];

export const DEFAULT_QUOTES: QuoteContent[] = [
  {
    id: 'quote_1',
    quote: 'Silence is not an empty absence. It is the full presence of Truth when the chatter of the ego subsides.',
    author: 'Acharya Kayashunya',
    category: 'Silence',
    status: 'published',
    sharesCount: 1240,
  },
  {
    id: 'quote_2',
    quote: 'You have right to the deed, but never to the fruits thereof. Act as the instrument of the Truth.',
    author: 'Bhagavad Gita',
    category: 'Right Action',
    status: 'published',
    sharesCount: 940,
  },
  {
    id: 'quote_3',
    quote: 'Fear is not an external entity; it is your own mind clinging to an illusory image of safety.',
    author: 'Acharya Kayashunya',
    category: 'Fearlessness',
    status: 'published',
    sharesCount: 680,
  },
];

export const DEFAULT_COURSES: CourseContent[] = [
  {
    id: 'course_1',
    title: 'Foundations of Advaita Vedanta & Fearlessness',
    subtitle: 'A systematic 6-week journey into non-duality and radical inquiry',
    description: 'Learn the timeless methodology of self-inquiry as taught in the Mandukya, Katha, and Ashtavakra scriptures. Free yourself from the cycle of emotional reactivity.',
    category: 'Advaita Vedanta',
    instructor: 'Acharya Kayashunya',
    coverImageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800',
    durationHours: 18,
    modulesCount: 3,
    lessonsCount: 9,
    status: 'published',
    isFeatured: true,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Nature of the Seeker',
        order: 1,
        lessons: [
          { id: 'l1', title: 'Lesson 1.1: Why Do We Suffer?', durationMinutes: 24, type: 'video', order: 1, isFreePreview: true },
          { id: 'l2', title: 'Lesson 1.2: The Three States of Consciousness', durationMinutes: 32, type: 'video', order: 2 },
          { id: 'l3', title: 'Lesson 1.3: Reflection & Swadhyaya Questions', durationMinutes: 15, type: 'text', order: 3 },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Dissecting Fear & Attachment',
        order: 2,
        lessons: [
          { id: 'l4', title: 'Lesson 2.1: The Psychological Mirror', durationMinutes: 28, type: 'video', order: 1 },
          { id: 'l5', title: 'Lesson 2.2: Dissolving the Ego-Shield', durationMinutes: 35, type: 'audio', order: 2 },
        ],
      },
    ],
  },
  {
    id: 'course_2',
    title: 'Kayashunya Universal Training & 8 Path',
    subtitle: 'Physical conditioning and pranic alignment for deep meditation',
    description: 'Transform your body from an agitated, pain-ridden obstacle into a stable, receptive temple of silence through daily practice.',
    category: 'Physical & Prana',
    instructor: 'Acharya Kayashunya',
    coverImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    durationHours: 12,
    modulesCount: 2,
    lessonsCount: 6,
    status: 'published',
    modules: [
      {
        id: 'm3',
        title: 'Module 1: The 8 Postural Pivots',
        order: 1,
        lessons: [
          { id: 'l6', title: 'Lesson 1.1: Grounding the Pelvic Seat', durationMinutes: 20, type: 'video', order: 1, isFreePreview: true },
          { id: 'l7', title: 'Lesson 1.2: Restoring Vertical Spine Suspension', durationMinutes: 25, type: 'video', order: 2 },
        ],
      },
    ],
  },
];

export const DEFAULT_SESSIONS: OnlineSession[] = [
  {
    id: 'session_1',
    title: 'Global Live Satsang: Overcoming the Fear of Failing',
    description: 'Open Q&A and direct inquiry with Acharya Kayashunya. Bring your most pressing life dilemmas.',
    instructor: 'Acharya Kayashunya',
    scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    scheduledTime: '07:30 PM IST',
    durationMinutes: 90,
    meetingLink: 'https://meet.google.com/kayashunya-satsang',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    status: 'upcoming',
    registeredCount: 420,
    maxParticipants: 1000,
  },
  {
    id: 'session_2',
    title: 'Dawn Dhyana & Pranayama Intensive',
    description: 'Live interactive dawn breathing session to purify the nadis and establish daytime presence.',
    instructor: 'Ashram Senior Instructor',
    scheduledDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    scheduledTime: '06:00 AM IST',
    durationMinutes: 60,
    meetingLink: 'https://meet.google.com/kayashunya-dawn',
    coverImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    status: 'upcoming',
    registeredCount: 180,
    maxParticipants: 500,
  },
];

export const DEFAULT_EDITABLE_PAGES: EditablePage[] = [
  {
    id: 'page_about-kayashunya',
    slug: 'about-kayashunya',
    title: 'About Kayashunya',
    metaDescription: 'The mission, vision, and lineage of the Kayashunya spiritual and training foundation.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# About Kayashunya

Kayashunya was born out of an urgent civilizational need: the bridge between uncompromised spiritual wisdom and disciplined physical mastery.

In modern times, spirituality has often deteriorated into either sentimental escapism or intellectual vanity. Meanwhile, physical training has been reduced to shallow aesthetic egotism.

Kayashunya reunites these two paths:
1. **Shunya (Silence/Void)**: Radical self-inquiry rooted in Advaita Vedanta and the Upanishads.
2. **Kaya (The Body)**: Robust, functional, and aligned physical capacity to sustain deep meditation and uncompromising truth.

We do not teach belief systems. We teach observation, inquiry, and total alignment.`,
  },
  {
    id: 'page_kayashunya-method',
    slug: 'kayashunya-method',
    title: 'The Kayashunya Method',
    metaDescription: 'The three-pillar methodology: Observation, Physical Alignment, and De-conditioning.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# The Kayashunya Method

The Kayashunya Method consists of three synchronized pillars:

### 1. Choiceless Bodily Stillness
Before the mind can become still, the body must cease its involuntary fidgeting and chronic protective tensions. Through vertical spinal traction and diaphragmatic release, we quiet the motor cortex.

### 2. Radical Self-Inquiry (Atma-Vichara)
Whenever disturbance arises—whether anxiety, boredom, lust, or grief—we do not seek a quick dopamine escape. We directly inquire: "To whom does this disturbance arise? Who is the one suffering?"

### 3. Dedicated Swadhyaya (Scriptural Study)
We study classical texts—The Bhagavad Gita, Mandukya Upanishad, Ribhu Gita, and Ashtavakra Gita—not as ancient dogmas, but as scientific field manuals for psychological liberation.`,
  },
  {
    id: 'page_universal-training',
    slug: 'universal-training',
    title: 'Universal Training',
    metaDescription: 'Physical discipline and strength for spiritual seekers.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# Kayashunya Universal Training

Physical training is not for mirrors; it is for freedom.

Universal Training combines:
- Isometric holds and spinal decompressive mobility
- Calisthenic strength-endurance
- Pranayama for nervous system regulation
- Fasting and metabolic discipline

When the body is strong, light, and pain-free, the seated posture for meditation becomes a joy rather than a battle against aching joints.`,
  },
  {
    id: 'page_kayashunya-8-path',
    slug: 'kayashunya-8-path',
    title: 'Kayashunya 8 Path',
    metaDescription: 'The eightfold path of physical and spiritual awakening.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# The Kayashunya 8 Path

The 8 stages of holistic awakening:
1. **Shuddhi**: Cleansing of biological inputs and sensory diet.
2. **Asana**: Steady, motionless bodily foundation.
3. **Prana**: Harmonization of respiratory volume and cadence.
4. **Vairagya**: Dispassionate observation of cravings.
5. **Swadhyaya**: Daily contemplation of sacred texts.
6. **Dharana**: Unwavering focus on the central inquiry.
7. **Dhyana**: Effortless continuity of silent awareness.
8. **Shunyata**: The dissolution of the separate ego into the Infinite.`,
  },
  {
    id: 'page_the-last-hour',
    slug: 'the-last-hour',
    title: 'The Last Hour',
    metaDescription: 'Contemplation on impermanence, death, and urgency of awakening.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# The Last Hour

"If this was your last hour on Earth, what would remain of your anxieties?"

The contemplation of mortality is the most potent spiritual medicine. The mind lives in the illusion of infinite tomorrow, constantly postponing truth for petty ambitions.

When you sit with the sharp awareness that your physical form is perishable and temporary, artificial priorities fall away instantly. What remains is only Truth, Presence, and Compassion.`,
  },
  {
    id: 'page_contact',
    slug: 'contact',
    title: 'Contact Ashram Desk',
    metaDescription: 'Get in touch with the Kayashunya teaching team and ashram secretariat.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# Contact Kayashunya

We welcome sincere seekers from all corners of the globe.

- **Email**: physicaltospiritual@gmail.com
- **Ashram Desk**: +91 98765 43210
- **Location**: Kayashunya Ashram & Center for Contemplation, Rishikesh, Uttarakhand, India
- **Office Hours**: 9:00 AM – 5:00 PM IST (Monday to Saturday)

For queries regarding online sessions, publications, or retreats, please write directly to our desk.`,
  },
  {
    id: 'page_privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaDescription: 'Kayashunya privacy and data security declaration.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# Privacy Policy

We respect your sacred privacy. Kayashunya will never sell, trade, or monetize your personal information, reading habits, or sadhana notes.

Your data is stored securely in encrypted cloud infrastructure solely to synchronize your personal practice across your devices.`,
  },
  {
    id: 'page_terms',
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    metaDescription: 'Terms of participation in Kayashunya programs.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# Terms & Conditions

All teachings, e-books, and audio recordings provided on Kayashunya are for inner study and self-cultivation.

Respect copyright and sacred integrity of the discourses. Unauthorized redistribution for commercial gain is strictly prohibited.`,
  },
  {
    id: 'page_disclaimer',
    slug: 'disclaimer',
    title: 'Disclaimer',
    metaDescription: 'Health, yoga, and meditation guidance disclaimer.',
    status: 'published',
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: 'physicaltospiritual@gmail.com',
    content: `# Disclaimer

Spiritual inquiry and physical practices shared on Kayashunya are intended for educational and contemplative purposes. They do not constitute formal medical or psychiatric treatment. Always consult your qualified healthcare practitioner before undertaking vigorous breathwork or intense physical training.`,
  },
];

export const DEFAULT_USERS: UserRecord[] = [
  {
    uid: 'owner_kayashunya_1',
    email: 'physicaltospiritual@gmail.com',
    displayName: 'Owner / Super Admin',
    role: 'super_admin',
    isSuspended: false,
    streakDays: 45,
    totalHoursRead: 128,
    booksCompleted: 12,
    createdAt: new Date().toISOString(),
  },
  {
    uid: 'user_aarav_sharma',
    email: 'aarav.seeker@kayashunya.org',
    displayName: 'Aarav Sharma',
    role: 'user',
    isSuspended: false,
    streakDays: 12,
    totalHoursRead: 42,
    booksCompleted: 4,
    createdAt: new Date().toISOString(),
  },
];
