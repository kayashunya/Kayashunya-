import '../domain/models/wisdom_item.dart';
import '../domain/models/sadhana_activity.dart';
import '../domain/models/user_profile.dart';

class MockData {
  static final UserProfile initialUser = UserProfile(
    id: 'user_kayasun_108',
    name: 'Aarav Sharma',
    email: 'aarav.seeker@kayasun.org',
    tier: SubscriptionTier.wisdomCircle,
    totalReadingHours: 42,
    currentStreak: 12,
    booksCompleted: 4,
    bookmarkedIds: ['wisdom_1', 'wisdom_3'],
    notificationsEnabled: true,
    readingTheme: 'sepia',
  );

  static final List<WisdomItem> wisdomList = [
    WisdomItem(
      id: 'wisdom_1',
      title: 'The Mirror of Clarity: Living Without Fear',
      subtitle: 'Understanding the roots of psychological anxiety through Advaita Vedanta',
      author: 'Acharya Kayasun',
      category: 'Vedanta & Mind',
      type: WisdomType.book,
      readingTimeMinutes: 28,
      publishedDate: DateTime.now().subtract(const Duration(days: 2)),
      likesCount: 342,
      isBookmarked: true,
      quoteHighlight: 'Fear is not an external force; it is the mind clinging to an illusory image of safety.',
      content: '''Chapter 1: The Root of All Trembling

When you look at fear closely, without wanting to run from it or conquer it, what do you see? You see that fear is always about the future. And the future is nothing but a projected thought of the past trying to preserve itself.

Vedanta does not give you methods to become "brave." Bravery is still within the duality of fear and defense. True fearlessness—Abhaya—arises not when the ego builds stronger shields, but when the nature of the shield-bearer is thoroughly inquired into.

Who is the one asking to be safe? 
The body has its biological instincts—if there is fire, the hand withdraws. That is natural intelligence. But psychological fear is different: "What if they reject me? What if I fail? What if my identity dissolves?"

Chapter 2: The Illusory Anchor

All spiritual suffering is attachment to the perishable while demanding immortality from it. The moment you see that the ego is a mental fabrication, the trembling stops. Not because the world became harmless, but because the one who could be wounded was recognized as a phantom.

Sit in stillness. Observe the rising impulse of panic or greed. Do not label it. Do not fight it. In the light of choiceless awareness, the false dissolves of its own accord.''',
    ),
    WisdomItem(
      id: 'wisdom_2',
      title: 'Action Without Clinging: The Gita in Everyday Conflict',
      subtitle: 'Nishkama Karma decoded for modern workplace and relationship dilemmas',
      author: 'Acharya Kayasun',
      category: 'Bhagavad Gita',
      type: WisdomType.book,
      readingTimeMinutes: 35,
      publishedDate: DateTime.now().subtract(const Duration(days: 5)),
      likesCount: 512,
      isBookmarked: false,
      quoteHighlight: 'You have right to the deed, but never to the fruits thereof. Act as the instrument of the Truth.',
      content: '''Chapter 1: The Battlefield of Decision

Arjuna's breakdown in the middle of Kurukshetra is not an ancient fairy tale; it is the exact crisis every honest human faces when duty demands clarity over sentimentality.

Sentimentality looks like compassion, but it is actually ego-preservation. "What will happen to MY people? What will happen to MY reputation?" Krishna exposes this illusion immediately: "Whence has this dejection come upon you in this hour of peril?"

Chapter 2: The Sovereign Secret of Action

True action—Karma Yoga—is not mechanical exertion. It is action performed when the personal center has subsided. When you act for truth rather than personal gratification, exhaustion disappears. Work becomes prayer; duty becomes freedom.''',
    ),
    WisdomItem(
      id: 'wisdom_3',
      title: 'Silence Speaks: The Art of Daily Contemplation',
      subtitle: 'Why 15 minutes of uninterrupted silence dissolves hours of mental agitation',
      author: 'Acharya Kayasun',
      category: 'Sadhana & Meditation',
      type: WisdomType.article,
      readingTimeMinutes: 8,
      publishedDate: DateTime.now().subtract(const Duration(days: 1)),
      likesCount: 890,
      isBookmarked: true,
      quoteHighlight: 'Silence is not the absence of sound; it is the absence of the self-centered narrator.',
      content: '''Most people believe meditation is concentration. They strain their forehead, fight their thoughts, and emerge with a headache.

Meditation is not doing; it is the cessation of unnecessary psychological doing. When you sit quietly at dawn, allow every sound—the rustle of leaves, the far-off vehicle, the ticking of the clock—to enter without resistance.

Do not become the judge of your thoughts. The moment you say "Good thought, bad thought," you have created two: the watcher and the watched. Realize that both are within the field of awareness. You are the unchanging screen upon which the film of mind is projected.''',
    ),
    WisdomItem(
      id: 'wisdom_4',
      title: 'Daily Sutra: On Desire and Fulfillment',
      subtitle: 'From Katha Upanishad: The eternal distinction between Shreyas and Preyas',
      author: 'Upanishadic Wisdom',
      category: 'Upanishads',
      type: WisdomType.sutra,
      readingTimeMinutes: 4,
      publishedDate: DateTime.now(),
      likesCount: 1240,
      isBookmarked: false,
      quoteHighlight: 'The pleasant (Preyas) is one thing; the truly good (Shreyas) is another. The wise choose the good; the childish cling to the pleasant.',
      content: '''Yama speaks to Nachiketa:
"Two paths lie open before humankind: the path of immediate pleasantness (Preyas) and the path of ultimate truth (Shreyas). Both attract the soul. The wise man, examining both thoroughly, prefers the good over the pleasant. The fool, swayed by bodily appetites and egoic security, chooses the pleasant and falls again and again into the trap of death."''',
    ),
  ];

  static final List<SadhanaActivity> initialActivities = [
    const SadhanaActivity(
      id: 'sadhana_1',
      title: 'Morning Contemplation (Dhyana)',
      description: '15 minutes of unguided silent sitting before entering the day’s activities.',
      category: SadhanaCategory.meditation,
      targetMinutes: 15,
      isCompleted: true,
      streakDays: 12,
      timeOfDay: 'Morning',
    ),
    const SadhanaActivity(
      id: 'sadhana_2',
      title: 'Scriptural Study (Swadhyaya)',
      description: 'Read 2 chapters of Gita or Upanishad commentary with reflective note-taking.',
      category: SadhanaCategory.swadhyaya,
      targetMinutes: 20,
      isCompleted: true,
      streakDays: 8,
      timeOfDay: 'Morning',
    ),
    const SadhanaActivity(
      id: 'sadhana_3',
      title: 'Midday Breath Awareness (Pranayama)',
      description: '5 minutes of centered breathing to break continuous screen momentum.',
      category: SadhanaCategory.mindfulness,
      targetMinutes: 5,
      isCompleted: false,
      streakDays: 5,
      timeOfDay: 'Afternoon',
    ),
    const SadhanaActivity(
      id: 'sadhana_4',
      title: 'Evening Self-Inquiry (Atma-Vichara)',
      description: 'Reflect upon the day: Where did reactivity take over? Who was the one offended?',
      category: SadhanaCategory.contemplation,
      targetMinutes: 10,
      isCompleted: false,
      streakDays: 14,
      timeOfDay: 'Evening',
    ),
  ];
}
