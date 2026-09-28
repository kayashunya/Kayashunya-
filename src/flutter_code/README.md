# Kayasun - Minimalist Spiritual Wisdom & Sadhana Mobile App

Inspired by the peaceful, reader-centric aesthetic of the **Acharya Prashant** app (`org.acharyaprashant.apbooks`).

## Architecture Overview (Clean Architecture)

```
kayasun/
├── pubspec.yaml
├── lib/
│   ├── main.dart                          # App Entry point & Provider injection
│   ├── core/
│   │   ├── constants/
│   │   │   └── app_colors.dart            # Saffron (#C25E00), Charcoal (#1F2937), Parchment (#FAF8F5)
│   │   └── theme/
│   │       └── app_theme.dart             # Google Fonts (Cinzel, Plus Jakarta Sans, Lora)
│   ├── domain/
│   │   └── models/
│   │       ├── wisdom_item.dart           # E-books, discourses, articles, sutras
│   │       ├── sadhana_activity.dart      # Meditation, study, reflection routines
│   │       └── user_profile.dart          # Member tiers, streaks, bookmarks
│   ├── data/
│   │   └── mock_data.dart                 # Production-grade mock spiritual repository
│   └── presentation/
│       ├── providers/
│       │   ├── wisdom_provider.dart       # Search, filter, bookmarks, likes state
│       │   ├── sadhana_provider.dart      # Daily routines checklist & Dhyana timer
│       │   └── auth_provider.dart         # Sign-in/Sign-up & user preferences
│       ├── screens/
│       │   ├── main_scaffold.dart         # Header with 3-dot overflow & 4-tab BottomBar
│       │   ├── home_screen.dart           # Daily sutras, hero cards, 1-tap WhatsApp share
│       │   ├── wisdom_screen.dart         # Category tabs, E-book catalog, search
│       │   ├── reader_screen.dart         # Distraction-free e-reader (Sepia/White/Dark)
│       │   ├── sadhana_screen.dart        # Dhyana timer, streak counter, daily checklist
│       │   └── account_screen.dart        # Auth cards, membership tiers, settings
│       └── widgets/
│           ├── wisdom_card.dart           # Zero-pill metadata & share action
│           ├── community_bottom_sheet.dart# Satsang circles & discussions
│           └── profile_dialog.dart        # Quick stats & saved reading list
```

## How to Run in VS Code or Android Studio

1. **Ensure Flutter SDK 3.0+ is installed**:
   ```bash
   flutter --version
   ```

2. **Get Dependencies**:
   ```bash
   flutter pub get
   ```

3. **Run on Emulator / Connected Device**:
   ```bash
   flutter run
   ```

4. **Build APK / App Bundle**:
   ```bash
   flutter build apk --release
   ```
