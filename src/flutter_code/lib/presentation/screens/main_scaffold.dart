import 'package:flutter/material.dart';
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
        // Switch to Account tab or show bottom sheet
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
            // Minimalist Kayasun Lotus/Sun emblem
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
          // Three-Dot Overflow Popup Menu
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
      // Strictly 4 Tabs
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
}
