import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../providers/sadhana_provider.dart';

class SadhanaScreen extends StatelessWidget {
  const SadhanaScreen({super.key});

  String _formatTime(int seconds) {
    final mins = seconds ~/ 60;
    final secs = seconds % 60;
    return '${mins.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

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
            // Header
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

            // Top Dashboard Cards (Streak & Daily Minutes)
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
                        Row(
                          children: [
                            const Icon(Icons.local_fire_department, size: 18, color: AppColors.primary),
                            const Spacer(),
                            Text(
                              'Consistency',
                              style: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppColors.textTertiary),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '${sadhana.currentStreak} Days',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        Text(
                          'Active Sadhaka Streak',
                          style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppColors.textSecondary),
                        ),
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
                        Row(
                          children: [
                            const Icon(Icons.access_time_filled, size: 18, color: AppColors.primaryLight),
                            const Spacer(),
                            Text(
                              'Today',
                              style: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppColors.textTertiary),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '${sadhana.totalMinutesToday} Mins',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        Text(
                          '${sadhana.completedCount} of ${sadhana.activities.length} complete',
                          style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppColors.textSecondary),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Meditation Timer Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      const Icon(Icons.self_improvement, color: AppColors.primary, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'Silent Dhyana Timer',
                        style: GoogleFonts.cinzel(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const Spacer(),
                      Text(
                        'Ambient Bell On',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 11,
                          color: AppColors.textTertiary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Timer Dial Display
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 140,
                        height: 140,
                        child: CircularProgressIndicator(
                          value: sadhana.timerProgress,
                          strokeWidth: 4,
                          backgroundColor: AppColors.borderLight,
                          valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                        ),
                      ),
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            _formatTime(sadhana.timerRemainingSeconds),
                            style: GoogleFonts.cinzel(
                              fontSize: 30,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          Text(
                            sadhana.isTimerRunning ? 'Breathing in silence' : 'Ready to sit',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 11,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),

                  // Preset buttons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [5, 10, 15, 20].map((mins) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: OutlinedButton(
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            side: BorderSide(
                              color: sadhana.timerTotalSeconds == mins * 60
                                  ? AppColors.primary
                                  : AppColors.border,
                            ),
                            backgroundColor: sadhana.timerTotalSeconds == mins * 60
                                ? AppColors.primaryTint
                                : Colors.transparent,
                          ),
                          onPressed: () => sadhana.resetTimer(mins),
                          child: Text(
                            '${mins}m',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: sadhana.timerTotalSeconds == mins * 60
                                  ? AppColors.primary
                                  : AppColors.textSecondary,
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 16),

                  // Play/Pause Action
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
                    ),
                    icon: Icon(
                      sadhana.isTimerRunning ? Icons.pause : Icons.play_arrow,
                      size: 20,
                    ),
                    label: Text(sadhana.isTimerRunning ? 'Pause Contemplation' : 'Begin Sitting'),
                    onPressed: () {
                      if (sadhana.isTimerRunning) {
                        sadhana.pauseTimer();
                      } else {
                        sadhana.resumeTimer();
                      }
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Daily Routines Section
            Text(
              'Daily Sadhana Routines',
              style: GoogleFonts.cinzel(
                fontSize: 17,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 10),

            // Routine checklist
            ...sadhana.activities.map((act) {
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: act.isCompleted ? AppColors.primaryLight.withOpacity(0.4) : AppColors.border,
                  ),
                ),
                child: CheckboxListTile(
                  activeColor: AppColors.primary,
                  value: act.isCompleted,
                  onChanged: (_) => sadhana.toggleActivity(act.id),
                  title: Text(
                    act.title,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      decoration: act.isCompleted ? TextDecoration.lineThrough : null,
                      color: act.isCompleted ? AppColors.textTertiary : AppColors.textPrimary,
                    ),
                  ),
                  subtitle: Text(
                    '${act.targetMinutes} min · ${act.timeOfDay}',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ),
              );
            }),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
