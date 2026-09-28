import 'package:flutter/material.dart';
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
  final TextEditingController _nameCtrl = TextEditingController();
  final TextEditingController _emailCtrl = TextEditingController();
  final TextEditingController _passCtrl = TextEditingController();

  @override
  void dispose() {
    _nameCtrl.dispose();
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

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
            Text(
              'MEMBERSHIP & PATH',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              'Account & Profile',
              style: GoogleFonts.cinzel(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 16),

            if (!auth.isAuthenticated || user == null) ...[
              // Auth Card (Sign In / Register toggle)
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _isSignUp ? 'Join the Kayasun Circle' : 'Welcome Back, Seeker',
                      style: GoogleFonts.cinzel(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      _isSignUp
                          ? 'Create an account to synchronize your reading progress, notes, and sadhana streaks.'
                          : 'Enter your credentials to continue your journey of inquiry.',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 16),
                    if (_isSignUp) ...[
                      TextField(
                        controller: _nameCtrl,
                        decoration: InputDecoration(
                          labelText: 'Full Name',
                          labelStyle: GoogleFonts.plusJakartaSans(fontSize: 13),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                    TextField(
                      controller: _emailCtrl,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: 'Email Address',
                        labelStyle: GoogleFonts.plusJakartaSans(fontSize: 13),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: _passCtrl,
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        labelStyle: GoogleFonts.plusJakartaSans(fontSize: 13),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                    const SizedBox(height: 18),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                        onPressed: auth.isLoading
                            ? null
                            : () {
                                if (_isSignUp) {
                                  auth.signUp(
                                    _nameCtrl.text.isEmpty ? 'Seeker' : _nameCtrl.text,
                                    _emailCtrl.text.isEmpty ? 'seeker@kayasun.org' : _emailCtrl.text,
                                    _passCtrl.text,
                                  );
                                } else {
                                  auth.signIn(
                                    _emailCtrl.text.isEmpty ? 'seeker@kayasun.org' : _emailCtrl.text,
                                    _passCtrl.text,
                                  );
                                }
                              },
                        child: auth.isLoading
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                              )
                            : Text(
                                _isSignUp ? 'Create Kayasun Account' : 'Sign In',
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Center(
                      child: TextButton(
                        onPressed: () => setState(() => _isSignUp = !_isSignUp),
                        child: Text(
                          _isSignUp
                              ? 'Already have an account? Sign In'
                              : 'New to Kayasun? Register Now',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 13,
                            color: AppColors.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ] else ...[
              // Logged in User Profile Card
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
                          child: Text(
                            user.name[0].toUpperCase(),
                            style: GoogleFonts.cinzel(
                              fontSize: 22,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                user.name,
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                  color: AppColors.textPrimary,
                                ),
                              ),
                              Text(
                                user.email,
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 12,
                                  color: AppColors.textSecondary,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  const Icon(Icons.verified, size: 14, color: AppColors.primary),
                                  const SizedBox(width: 4),
                                  Text(
                                    user.tier == SubscriptionTier.wisdomCircle
                                        ? 'Wisdom Circle Member'
                                        : 'Free Seeker',
                                    style: GoogleFonts.plusJakartaSans(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    const Divider(color: AppColors.borderLight),
                    const SizedBox(height: 14),
                    // Summary metrics
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildMetric('Hours Read', '${user.totalReadingHours}h'),
                        _buildMetric('Streak', '${user.currentStreak}d'),
                        _buildMetric('Finished', '${user.booksCompleted} books'),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Subscription Upgrade Banner
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFFFFBEB), Color(0xFFFEF3C7)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFFDE68A)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.workspace_premium, color: Color(0xFFB45309), size: 28),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Kayasun Wisdom Circle',
                            style: GoogleFonts.cinzel(
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                              color: const Color(0xFF78350F),
                            ),
                          ),
                          Text(
                            'Unlimited access to all e-books, Sanskrit commentaries, and live monthly satsangs.',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 12,
                              color: const Color(0xFF92400E),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Account Settings & Preferences List
              Text(
                'Settings & Preferences',
                style: GoogleFonts.cinzel(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 10),

              Container(
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    SwitchListTile(
                      activeColor: AppColors.primary,
                      title: Text(
                        'Daily Sadhana Reminders',
                        style: GoogleFonts.plusJakartaSans(fontSize: 14, fontWeight: FontWeight.w500),
                      ),
                      subtitle: Text(
                        'Gentle chime at 6:00 AM for morning contemplation',
                        style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppColors.textTertiary),
                      ),
                      value: user.notificationsEnabled,
                      onChanged: (_) => auth.toggleNotifications(),
                    ),
                    const Divider(color: AppColors.borderLight, height: 1),
                    ListTile(
                      leading: const Icon(Icons.language, size: 20, color: AppColors.textSecondary),
                      title: Text(
                        'Content Language',
                        style: GoogleFonts.plusJakartaSans(fontSize: 14, fontWeight: FontWeight.w500),
                      ),
                      trailing: Text(
                        'English & Hindi',
                        style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppColors.primary),
                      ),
                      onTap: () {},
                    ),
                    const Divider(color: AppColors.borderLight, height: 1),
                    ListTile(
                      leading: const Icon(Icons.help_outline, size: 20, color: AppColors.textSecondary),
                      title: Text(
                        'Help & Support / Ashram Desk',
                        style: GoogleFonts.plusJakartaSans(fontSize: 14, fontWeight: FontWeight.w500),
                      ),
                      trailing: const Icon(Icons.chevron_right, size: 18),
                      onTap: () {},
                    ),
                    const Divider(color: AppColors.borderLight, height: 1),
                    ListTile(
                      leading: const Icon(Icons.logout, size: 20, color: AppColors.error),
                      title: Text(
                        'Sign Out',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.error,
                        ),
                      ),
                      onTap: () => auth.signOut(),
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildMetric(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: GoogleFonts.plusJakartaSans(
            fontSize: 17,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        Text(
          label,
          style: GoogleFonts.plusJakartaSans(
            fontSize: 11,
            color: AppColors.textTertiary,
          ),
        ),
      ],
    );
  }
}
