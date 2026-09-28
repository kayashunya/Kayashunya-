import 'package:flutter/foundation.dart';
import '../../domain/models/user_profile.dart';
import '../../data/mock_data.dart';

class AuthProvider extends ChangeNotifier {
  UserProfile? _user = MockData.initialUser;
  bool _isAuthenticated = true;
  bool _isLoading = false;

  UserProfile? get user => _user;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;

  Future<void> signIn(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 600));

    _isAuthenticated = true;
    _user = MockData.initialUser.copyWith(email: email);
    _isLoading = false;
    notifyListeners();
  }

  Future<void> signUp(String name, String email, String password) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 600));

    _isAuthenticated = true;
    _user = UserProfile(
      id: 'user_${DateTime.now().millisecondsSinceEpoch}',
      name: name,
      email: email,
      tier: SubscriptionTier.freeSeeker,
      totalReadingHours: 0,
      currentStreak: 1,
      booksCompleted: 0,
    );
    _isLoading = false;
    notifyListeners();
  }

  void signOut() {
    _isAuthenticated = false;
    _user = null;
    notifyListeners();
  }

  void updateTheme(String theme) {
    if (_user != null) {
      _user = _user!.copyWith(readingTheme: theme);
      notifyListeners();
    }
  }

  void toggleNotifications() {
    if (_user != null) {
      _user = _user!.copyWith(notificationsEnabled: !_user!.notificationsEnabled);
      notifyListeners();
    }
  }
}
