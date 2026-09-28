enum SubscriptionTier {
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
  final String readingTheme; // light, sepia, dark

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
}
