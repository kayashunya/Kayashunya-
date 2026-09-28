enum WisdomType {
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
}
