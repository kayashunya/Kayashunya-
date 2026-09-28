import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:share_plus/share_plus.dart';
import '../../domain/models/wisdom_item.dart';
import '../../core/constants/app_colors.dart';
import '../screens/reader_screen.dart';

class WisdomCard extends StatelessWidget {
  final WisdomItem item;
  final VoidCallback? onBookmarkToggle;
  final VoidCallback? onLike;

  const WisdomCard({
    super.key,
    required this.item,
    this.onBookmarkToggle,
    this.onLike,
  });

  void _shareViaWhatsApp(BuildContext context) {
    final text = '✨ *Kayasun Daily Wisdom*\n\n'
        '"${item.quoteHighlight ?? item.subtitle}"\n\n'
        '— ${item.author}\n'
        'Read more on Kayasun: https://kayasun.org/w/${item.id}';
    Share.share(text, subject: item.title);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => ReaderScreen(item: item),
              ),
            );
          },
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Quiet Category & Reading Time (Zero-Pill discipline)
                Row(
                  children: [
                    Text(
                      item.category.toUpperCase(),
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 1.1,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text('·', style: TextStyle(color: AppColors.textTertiary)),
                    const SizedBox(width: 8),
                    Text(
                      '${item.readingTimeMinutes} min read',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 12,
                        color: AppColors.textTertiary,
                      ),
                    ),
                    const Spacer(),
                    IconButton(
                      icon: Icon(
                        item.isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                        color: item.isBookmarked ? AppColors.primary : AppColors.textTertiary,
                        size: 20,
                      ),
                      onPressed: onBookmarkToggle,
                      visualDensity: VisualDensity.compact,
                      splashRadius: 20,
                    ),
                  ],
                ),
                const SizedBox(height: 8),

                // Title
                Text(
                  item.title,
                  style: GoogleFonts.cinzel(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                    height: 1.3,
                  ),
                ),
                const SizedBox(height: 8),

                // Subtitle
                Text(
                  item.subtitle,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 14,
                    color: AppColors.textSecondary,
                    height: 1.5,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),

                // Quote Callout (if available)
                if (item.quoteHighlight != null) ...[
                  const SizedBox(height: 14),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      color: AppColors.primaryTint,
                      borderRadius: BorderRadius.circular(10),
                      border: const Border(
                        left: BorderSide(color: AppColors.primary, width: 3),
                      ),
                    ),
                    child: Text(
                      '“${item.quoteHighlight}”',
                      style: GoogleFonts.lora(
                        fontSize: 13.5,
                        fontStyle: FontStyle.italic,
                        color: const Color(0xFF78350F), // Warm amber-charcoal
                        height: 1.45,
                      ),
                    ),
                  ),
                ],

                const SizedBox(height: 16),
                const Divider(color: AppColors.borderLight, height: 1),
                const SizedBox(height: 12),

                // Footer Row: Author + WhatsApp Share & Likes
                Row(
                  children: [
                    Text(
                      item.author,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const Spacer(),
                    // 1-Tap WhatsApp Share
                    InkWell(
                      onTap: () => _shareViaWhatsApp(context),
                      borderRadius: BorderRadius.circular(8),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        child: Row(
                          children: [
                            const Icon(
                              Icons.share_outlined,
                              size: 16,
                              color: AppColors.primary,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              'Share',
                              style: GoogleFonts.plusJakartaSans(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: AppColors.primary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
