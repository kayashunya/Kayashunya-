export interface FlutterFile {
  path: string;
  name: string;
  category: 'config' | 'entry' | 'core' | 'domain' | 'data' | 'presentation';
  content: string;
}

export const FLUTTER_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    category: 'config',
    content: `name: kayasun
description: "Kayasun - Minimalist Spiritual Wisdom, E-Reader & Sadhana Tracker"
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1
  provider: ^6.1.2
  flutter_svg: ^2.0.10+1
  shared_preferences: ^2.2.3
  share_plus: ^10.0.0
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/icons/
    - assets/images/`
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    category: 'entry',
    content: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'core/theme/app_theme.dart';
import 'presentation/providers/wisdom_provider.dart';
import 'presentation/providers/sadhana_provider.dart';
import 'presentation/providers/auth_provider.dart';
import 'presentation/screens/main_scaffold.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set system UI overlay style for peaceful immersive aesthetic
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.white,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(const KayasunApp());
}

class KayasunApp extends StatelessWidget {
  const KayasunApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => WisdomProvider()),
        ChangeNotifierProvider(create: (_) => SadhanaProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        title: 'Kayasun',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        home: const MainScaffold(),
      ),
    );
  }
}`
  },
  {
    path: 'lib/core/constants/app_colors.dart',
    name: 'app_colors.dart',
    category: 'core',
    content: `import 'package:flutter/material.dart';

class AppColors {
  // Primary Spiritual Ochre / Saffron
  static const Color primary = Color(0xFFC25E00); // Deep warm saffron
  static const Color primaryLight = Color(0xFFD97706); // Amber ochre
  static const Color primaryTint = Color(0xFFFFF7ED); // Very soft saffron wash

  // Backgrounds & Surfaces
  static const Color background = Color(0xFFFAF8F5); // Warm serene off-white
  static const Color surface = Color(0xFFFFFFFF); // Pure white card surface
  static const Color surfaceMuted = Color(0xFFF3EFEA); // Subtle divider / neutral tint

  // Text & Charcoal
  static const Color textPrimary = Color(0xFF1F2937); // Deep soft charcoal (WCAG AAA)
  static const Color textSecondary = Color(0xFF4B5563); // Muted body text
  static const Color textTertiary = Color(0xFF9CA3AF); // Quiet captions / separators

  // Borders & Accents
  static const Color border = Color(0xFFE5E0D8); // Gentle hairline border
  static const Color borderLight = Color(0xFFF0EBE3);

  // E-Reader Specific Themes
  static const Color readerLightBg = Color(0xFFFFFFFF);
  static const Color readerLightText = Color(0xFF1F2937);

  static const Color readerSepiaBg = Color(0xFFF5EDE0); // Authentic warm parchment
  static const Color readerSepiaText = Color(0xFF382E25);

  static const Color readerDarkBg = Color(0xFF18181B); // Midnight zinc
  static const Color readerDarkText = Color(0xFFE4E4E7);

  // Utility
  static const Color success = Color(0xFF059669);
  static const Color error = Color(0xFFDC2626);
}`
  },
  {
    path: 'lib/core/theme/app_theme.dart',
    name: 'app_theme.dart',
    category: 'core',
    content: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.background,
      colorScheme: const ColorScheme.light(
        primary: AppColors.primary,
        secondary: AppColors.primaryLight,
        surface: AppColors.surface,
        background: AppColors.background,
        onPrimary: Colors.white,
        onSurface: AppColors.textPrimary,
        error: AppColors.error,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.surface,
        elevation: 0,
        scrolledUnderElevation: 0.5,
        centerTitle: false,
        surfaceTintColor: Colors.transparent,
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
        ),
        iconTheme: IconThemeData(color: AppColors.textPrimary, size: 22),
        actionsIconTheme: IconThemeData(color: AppColors.textPrimary, size: 22),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.surface,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.textTertiary,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
        selectedLabelStyle: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.2,
        ),
        unselectedLabelStyle: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w500,
        ),
      ),
      cardTheme: CardTheme(
        color: AppColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.border, width: 1),
        ),
        margin: EdgeInsets.zero,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.cinzel(
          fontSize: 32,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          letterSpacing: -0.5,
        ),
        displayMedium: GoogleFonts.cinzel(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
          letterSpacing: -0.2,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 15,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
        bodyLarge: GoogleFonts.plusJakartaSans(
          fontSize: 15,
          fontWeight: FontWeight.w400,
          color: AppColors.textPrimary,
          height: 1.55,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: AppColors.textSecondary,
          height: 1.5,
        ),
        bodySmall: GoogleFonts.plusJakartaSans(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          color: AppColors.textTertiary,
        ),
        labelLarge: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: Colors.white,
          letterSpacing: 0.3,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary, width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: AppColors.borderLight,
        thickness: 1,
        space: 1,
      ),
    );
  }
}`
  },
  {
    path: 'lib/domain/models/wisdom_item.dart',
    name: 'wisdom_item.dart',
    category: 'domain',
    content: `enum WisdomType {
  article,
  book,
  quote,
  sutra,
}

class WisdomItem {
  final String id;
  final String title;
  final String subtitle;
  final String author;
  final String content;
  final WisdomType type;
  final String category;
  final int readingTimeMinutes;
  final String? coverAsset;
  final String? quoteHighlight;
  final DateTime publishedDate;
  final int likesCount;
  final bool isBookmarked;

  const WisdomItem({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.author,
    required this.content,
    required this.type,
    required this.category,
    required this.readingTimeMinutes,
    this.coverAsset,
    this.quoteHighlight,
    required this.publishedDate,
    this.likesCount = 0,
    this.isBookmarked = false,
  });

  WisdomItem copyWith({
    String? id,
    String? title,
    String? subtitle,
    String? author,
    String? content,
    WisdomType? type,
    String? category,
    int? readingTimeMinutes,
    String? coverAsset,
    String? quoteHighlight,
    DateTime? publishedDate,
    int? likesCount,
    bool? isBookmarked,
  }) {
    return WisdomItem(
      id: id ?? this.id,
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      author: author ?? this.author,
      content: content ?? this.content,
      type: type ?? this.type,
      category: category ?? this.category,
      readingTimeMinutes: readingTimeMinutes ?? this.readingTimeMinutes,
      coverAsset: coverAsset ?? this.coverAsset,
      quoteHighlight: quoteHighlight ?? this.quoteHighlight,
      publishedDate: publishedDate ?? this.publishedDate,
      likesCount: likesCount ?? this.likesCount,
      isBookmarked: isBookmarked ?? this.isBookmarked,
    );
  }
}`
  },
  {
    path: 'lib/domain/models/sadhana_activity.dart',
    name: 'sadhana_activity.dart',
    category: 'domain',
    content: `enum SadhanaCategory {
  meditation,
  swadhyaya,
  contemplation,
  japa,
  mindfulness,
}

class SadhanaActivity {
  final String id;
  final String title;
  final String description;
  final SadhanaCategory category;
  final int targetMinutes;
  final bool isCompleted;
  final int streakDays;
  final String timeOfDay;

  const SadhanaActivity({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.targetMinutes,
    this.isCompleted = false,
    this.streakDays = 0,
    required this.timeOfDay,
  });

  SadhanaActivity copyWith({
    String? id,
    String? title,
    String? description,
    SadhanaCategory? category,
    int? targetMinutes,
    bool? isCompleted,
    int? streakDays,
    String? timeOfDay,
  }) {
    return SadhanaActivity(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      category: category ?? this.category,
      targetMinutes: targetMinutes ?? this.targetMinutes,
      isCompleted: isCompleted ?? this.isCompleted,
      streakDays: streakDays ?? this.streakDays,
      timeOfDay: timeOfDay ?? this.timeOfDay,
    );
  }
}`
  },
  {
    path: 'lib/domain/models/user_profile.dart',
    name: 'user_profile.dart',
    category: 'domain',
    content: `enum SubscriptionTier {
  freeSeeker,
  wisdomCircle,
  lifetimeSadhaka,
}

class UserProfile {
  final String id;
  final String name;
  final String email;
  final String? avatarUrl;
  final SubscriptionTier tier;
  final int totalReadingHours;
  final int currentStreak;
  final int booksCompleted;
  final List<String> bookmarkedIds;
  final bool notificationsEnabled;
  final String readingTheme;

  const UserProfile({
    required this.id,
    required this.name,
    required this.email,
    this.avatarUrl,
    this.tier = SubscriptionTier.freeSeeker,
    this.totalReadingHours = 0,
    this.currentStreak = 0,
    this.booksCompleted = 0,
    this.bookmarkedIds = const [],
    this.notificationsEnabled = true,
    this.readingTheme = 'sepia',
  });

  UserProfile copyWith({
    String? id,
    String? name,
    String? email,
    String? avatarUrl,
    SubscriptionTier? tier,
    int? totalReadingHours,
    int? currentStreak,
    int? booksCompleted,
    List<String>? bookmarkedIds,
    bool? notificationsEnabled,
    String? readingTheme,
  }) {
    return UserProfile(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      tier: tier ?? this.tier,
      totalReadingHours: totalReadingHours ?? this.totalReadingHours,
      currentStreak: currentStreak ?? this.currentStreak,
      booksCompleted: booksCompleted ?? this.booksCompleted,
      bookmarkedIds: bookmarkedIds ?? this.bookmarkedIds,
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      readingTheme: readingTheme ?? this.readingTheme,
    );
  }
}`
  },
  {
    path: 'lib/data/mock_data.dart',
    name: 'mock_data.dart',
    category: 'data',
    content: `import '../domain/models/wisdom_item.dart';
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
}`
  },
  {
    path: 'lib/presentation/screens/main_scaffold.dart',
    name: 'main_scaffold.dart',
    category: 'presentation',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/constants/app_colors.dart';
import '../widgets/community_bottom_sheet.dart';
import '../widgets/profile_dialog.dart';
import 'home_screen.dart';
import 'wisdom_screen.dart';
import 'sadhana_screen.dart';
import 'account_screen.dart';

enum OverflowMenuAction {
  community,
  profile,
  settingsHelp,
}

class MainScaffold extends StatefulWidget {
  const MainScaffold({super.key});

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    WisdomScreen(),
    SadhanaScreen(),
    AccountScreen(),
  ];

  void _onOverflowSelected(OverflowMenuAction action) {
    switch (action) {
      case OverflowMenuAction.community:
        CommunityBottomSheet.show(context);
        break;
      case OverflowMenuAction.profile:
        ProfileDialog.show(context);
        break;
      case OverflowMenuAction.settingsHelp:
        setState(() => _currentIndex = 3);
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.surface,
        elevation: 0,
        titleSpacing: 16,
        title: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.primaryTint,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.primaryLight.withOpacity(0.3)),
              ),
              child: const Center(
                child: Icon(
                  Icons.wb_sunny_outlined,
                  size: 18,
                  color: AppColors.primary,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Text(
              'Kayasun',
              style: GoogleFonts.cinzel(
                fontSize: 20,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
        actions: [
          PopupMenuButton<OverflowMenuAction>(
            icon: const Icon(
              Icons.more_vert_rounded,
              color: AppColors.textPrimary,
            ),
            elevation: 3,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
              side: const BorderSide(color: AppColors.borderLight),
            ),
            color: AppColors.surface,
            onSelected: _onOverflowSelected,
            itemBuilder: (context) => [
              PopupMenuItem(
                value: OverflowMenuAction.community,
                child: Row(
                  children: [
                    const Icon(Icons.people_alt_outlined, size: 18, color: AppColors.primary),
                    const SizedBox(width: 12),
                    Text(
                      'Community & Satsang',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
              PopupMenuItem(
                value: OverflowMenuAction.profile,
                child: Row(
                  children: [
                    const Icon(Icons.person_outline, size: 18, color: AppColors.primary),
                    const SizedBox(width: 12),
                    Text(
                      'Profile & Bookmarks',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
              const PopupMenuDivider(),
              PopupMenuItem(
                value: OverflowMenuAction.settingsHelp,
                child: Row(
                  children: [
                    const Icon(Icons.settings_outlined, size: 18, color: AppColors.textSecondary),
                    const SizedBox(width: 12),
                    Text(
                      'Settings & Help',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AppColors.surface,
          border: Border(top: BorderSide(color: AppColors.borderLight, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: AppColors.surface,
          selectedItemColor: AppColors.primary,
          unselectedItemColor: AppColors.textTertiary,
          type: BottomNavigationBarType.fixed,
          elevation: 0,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined),
              activeIcon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.menu_book_outlined),
              activeIcon: Icon(Icons.menu_book),
              label: 'Wisdom',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.self_improvement_outlined),
              activeIcon: Icon(Icons.self_improvement),
              label: 'Sadhana',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              activeIcon: Icon(Icons.person),
              label: 'Account',
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/presentation/screens/home_screen.dart',
    name: 'home_screen.dart',
    category: 'presentation',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';
import '../../core/constants/app_colors.dart';
import '../providers/wisdom_provider.dart';
import '../providers/sadhana_provider.dart';
import '../widgets/wisdom_card.dart';
import 'reader_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final wisdom = context.watch<WisdomProvider>();
    final sadhana = context.watch<SadhanaProvider>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'PRANAM & PEACE',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1.2,
                          color: AppColors.primary,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Today\'s Awakening',
                        style: GoogleFonts.cinzel(
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.primaryTint,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: AppColors.primaryLight.withOpacity(0.3)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.local_fire_department, size: 16, color: AppColors.primary),
                        const SizedBox(width: 4),
                        Text(
                          '\${sadhana.currentStreak} Day Streak',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppColors.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                color: const Color(0xFF261E1A),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.08),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: AppColors.primaryLight,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'DAILY SUTRA CONTEMPLATION',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.2,
                          color: AppColors.primaryLight,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Text(
                    '“Silence is not an empty absence. It is the full presence of Truth when the chatter of the ego subsides.”',
                    style: GoogleFonts.lora(
                      fontSize: 16.5,
                      fontStyle: FontStyle.italic,
                      color: const Color(0xFFFAF5EE),
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 14),
                  Text(
                    '— Acharya Kayasun · Discourse on Mandukya Upanishad',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      color: const Color(0xFFD4C7B8),
                    ),
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                        ),
                        icon: const Icon(Icons.menu_book, size: 15),
                        label: const Text('Read Discourse'),
                        onPressed: () {
                          if (wisdom.items.isNotEmpty) {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => ReaderScreen(item: wisdom.items.first),
                              ),
                            );
                          }
                        },
                      ),
                      const SizedBox(width: 12),
                      OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFFFAF5EE),
                          side: const BorderSide(color: Color(0xFF6B5E51)),
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        ),
                        icon: const Icon(Icons.share, size: 15),
                        label: const Text('Share Quote'),
                        onPressed: () {
                          Share.share(
                            '“Silence is not an empty absence. It is the full presence of Truth when the chatter of the ego subsides.”\\n— Acharya Kayasun',
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final item = wisdom.items[index];
                return WisdomCard(
                  item: item,
                  onBookmarkToggle: () => wisdom.toggleBookmark(item.id),
                  onLike: () => wisdom.incrementLikes(item.id),
                );
              },
              childCount: wisdom.items.length,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 32)),
        ],
      ),
    );
  }
}`
  },
  {
    path: 'lib/presentation/screens/wisdom_screen.dart',
    name: 'wisdom_screen.dart',
    category: 'presentation',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../domain/models/wisdom_item.dart';
import '../providers/wisdom_provider.dart';
import '../widgets/wisdom_card.dart';
import 'reader_screen.dart';

class WisdomScreen extends StatefulWidget {
  const WisdomScreen({super.key});

  @override
  State<WisdomScreen> createState() => _WisdomScreenState();
}

class _WisdomScreenState extends State<WisdomScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchCtrl = TextEditingController();

  final List<String> _categories = [
    'All',
    'Vedanta & Mind',
    'Bhagavad Gita',
    'Sadhana & Meditation',
    'Upanishads',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final wisdom = context.watch<WisdomProvider>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) {
          return [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'THE LIBRARY OF TRUTH',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 1.2,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Wisdom Catalog',
                      style: GoogleFonts.cinzel(
                        fontSize: 22,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Container(
                      height: 44,
                      decoration: BoxDecoration(
                        color: AppColors.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: TextField(
                        controller: _searchCtrl,
                        onChanged: wisdom.setSearchQuery,
                        decoration: const InputDecoration(
                          hintText: 'Search books, discourses, sutras...',
                          prefixIcon: Icon(Icons.search, size: 18),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(vertical: 12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SliverPersistentHeader(
              pinned: true,
              delegate: _SliverAppBarDelegate(
                TabBar(
                  controller: _tabController,
                  indicatorColor: AppColors.primary,
                  indicatorWeight: 2.5,
                  labelColor: AppColors.primary,
                  unselectedLabelColor: AppColors.textTertiary,
                  tabs: const [
                    Tab(text: 'E-Books'),
                    Tab(text: 'Articles'),
                    Tab(text: 'Quotes & Sutras'),
                  ],
                ),
              ),
            ),
          ];
        },
        body: TabBarView(
          controller: _tabController,
          children: [
            _buildBooksTab(wisdom.books),
            _buildListTab(wisdom.articles, wisdom),
            _buildListTab(wisdom.quotes, wisdom),
          ],
        ),
      ),
    );
  }

  Widget _buildBooksTab(List<WisdomItem> books) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 12),
      itemCount: books.length,
      itemBuilder: (context, index) {
        final book = books[index];
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.border),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 72,
                height: 104,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFC25E00), Color(0xFFD97706)],
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
                padding: const EdgeInsets.all(8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.auto_stories, size: 16, color: Colors.white70),
                    const Spacer(),
                    Text(
                      book.title,
                      style: GoogleFonts.cinzel(fontSize: 9, color: Colors.white, fontWeight: FontWeight.bold),
                      maxLines: 3,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(book.category.toUpperCase(), style: const TextStyle(fontSize: 10, color: AppColors.primary, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    Text(book.title, style: GoogleFonts.cinzel(fontSize: 15, fontWeight: FontWeight.w700)),
                    const SizedBox(height: 8),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
                      onPressed: () {
                        Navigator.push(context, MaterialPageRoute(builder: (_) => ReaderScreen(item: book)));
                      },
                      child: const Text('Read E-Book'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildListTab(List<WisdomItem> items, WisdomProvider wisdom) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        return WisdomCard(
          item: item,
          onBookmarkToggle: () => wisdom.toggleBookmark(item.id),
          onLike: () => wisdom.incrementLikes(item.id),
        );
      },
    );
  }
}

class _SliverAppBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;
  _SliverAppBarDelegate(this.tabBar);
  @override
  double get minExtent => tabBar.preferredSize.height;
  @override
  double get maxExtent => tabBar.preferredSize.height;
  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) => Container(color: AppColors.surface, child: tabBar);
  @override
  bool shouldRebuild(_SliverAppBarDelegate oldDelegate) => false;
}`
  },
  {
    path: 'lib/presentation/screens/reader_screen.dart',
    name: 'reader_screen.dart',
    category: 'presentation',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:share_plus/share_plus.dart';
import '../../domain/models/wisdom_item.dart';
import '../../core/constants/app_colors.dart';

class ReaderScreen extends StatefulWidget {
  final WisdomItem item;

  const ReaderScreen({super.key, required this.item});

  @override
  State<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends State<ReaderScreen> {
  double _fontSize = 17.0;
  String _colorMode = 'sepia'; // 'light', 'sepia', 'dark'
  final ScrollController _scrollController = ScrollController();
  double _readingProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.hasClients && _scrollController.position.maxScrollExtent > 0) {
        setState(() {
          _readingProgress = (_scrollController.offset / _scrollController.position.maxScrollExtent)
              .clamp(0.0, 1.0);
        });
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Color get _backgroundColor {
    switch (_colorMode) {
      case 'dark':
        return AppColors.readerDarkBg;
      case 'light':
        return AppColors.readerLightBg;
      case 'sepia':
      default:
        return AppColors.readerSepiaBg;
    }
  }

  Color get _textColor {
    switch (_colorMode) {
      case 'dark':
        return AppColors.readerDarkText;
      case 'light':
        return AppColors.readerLightText;
      case 'sepia':
      default:
        return AppColors.readerSepiaText;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _backgroundColor,
      appBar: AppBar(
        backgroundColor: _backgroundColor,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios_new, size: 18, color: _textColor),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Kayasun Reader',
          style: GoogleFonts.cinzel(fontSize: 15, fontWeight: FontWeight.w600, color: _textColor),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.text_fields_rounded, color: _textColor),
            onPressed: () {
              // Font size & Theme switcher modal
            },
          ),
          IconButton(
            icon: Icon(Icons.share_outlined, color: _textColor),
            onPressed: () {
              Share.share('“\${widget.item.quoteHighlight ?? widget.item.title}”\\n— \${widget.item.author}');
            },
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(2),
          child: LinearProgressIndicator(
            value: _readingProgress,
            backgroundColor: _backgroundColor,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
            minHeight: 2,
          ),
        ),
      ),
      body: SingleChildScrollView(
        controller: _scrollController,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '\${widget.item.category.toUpperCase()} · \${widget.item.readingTimeMinutes} MIN READ',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              widget.item.title,
              style: GoogleFonts.cinzel(
                fontSize: _fontSize + 8,
                fontWeight: FontWeight.w700,
                color: _textColor,
                height: 1.25,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              widget.item.content,
              style: GoogleFonts.lora(
                fontSize: _fontSize,
                color: _textColor,
                height: 1.8,
              ),
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/presentation/screens/sadhana_screen.dart',
    name: 'sadhana_screen.dart',
    category: 'presentation',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../providers/sadhana_provider.dart';

class SadhanaScreen extends StatelessWidget {
  const SadhanaScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final sadhana = context.watch<SadhanaProvider>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'DISCIPLINE OF THE SOUL',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              'Sadhana & Practice',
              style: GoogleFonts.cinzel(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(Icons.local_fire_department, size: 18, color: AppColors.primary),
                        const SizedBox(height: 8),
                        Text('\${sadhana.currentStreak} Days', style: GoogleFonts.plusJakartaSans(fontSize: 20, fontWeight: FontWeight.bold)),
                        const Text('Active Sadhaka Streak'),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(Icons.access_time_filled, size: 18, color: AppColors.primaryLight),
                        const SizedBox(height: 8),
                        Text('\${sadhana.totalMinutesToday} Mins', style: GoogleFonts.plusJakartaSans(fontSize: 20, fontWeight: FontWeight.bold)),
                        Text('\${sadhana.completedCount} of \${sadhana.activities.length} completed'),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            // Daily Routines Checklist
            ...sadhana.activities.map((act) => Container(
              margin: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.border),
              ),
              child: CheckboxListTile(
                activeColor: AppColors.primary,
                value: act.isCompleted,
                onChanged: (_) => sadhana.toggleActivity(act.id),
                title: Text(act.title, style: GoogleFonts.plusJakartaSans(fontWeight: FontWeight.w600)),
                subtitle: Text('\${act.targetMinutes} min · \${act.timeOfDay}'),
              ),
            )),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/presentation/screens/account_screen.dart',
    name: 'account_screen.dart',
    category: 'presentation',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../domain/models/user_profile.dart';
import '../providers/auth_provider.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  bool _isSignUp = false;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.user;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('MEMBERSHIP & PATH', style: GoogleFonts.plusJakartaSans(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.primary)),
            Text('Account & Profile', style: GoogleFonts.cinzel(fontSize: 22, fontWeight: FontWeight.w700)),
            const SizedBox(height: 16),
            if (user != null) ...[
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 28,
                          backgroundColor: AppColors.primaryTint,
                          child: Text(user.name[0].toUpperCase(), style: GoogleFonts.cinzel(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primary)),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(user.name, style: GoogleFonts.plusJakartaSans(fontSize: 16, fontWeight: FontWeight.bold)),
                              Text(user.email, style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppColors.textSecondary)),
                              Text('Wisdom Circle Member', style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppColors.primary, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }
}`
  }
];
