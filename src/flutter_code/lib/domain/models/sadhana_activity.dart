enum SadhanaCategory {
  meditation,
  swadhyaya, // Spiritual reading/study
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
  final String timeOfDay; // Morning, Midday, Evening

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
}
