import 'dart:async';
import 'package:flutter/foundation.dart';
import '../../domain/models/sadhana_activity.dart';
import '../../data/mock_data.dart';

class SadhanaProvider extends ChangeNotifier {
  List<SadhanaActivity> _activities = List.from(MockData.initialActivities);
  int _currentStreak = 12;
  int _totalMinutesToday = 35;

  // Active Timer state
  bool _isTimerRunning = false;
  int _timerTotalSeconds = 15 * 60;
  int _timerRemainingSeconds = 15 * 60;
  Timer? _ticker;

  List<SadhanaActivity> get activities => _activities;
  int get currentStreak => _currentStreak;
  int get totalMinutesToday => _totalMinutesToday;
  bool get isTimerRunning => _isTimerRunning;
  int get timerTotalSeconds => _timerTotalSeconds;
  int get timerRemainingSeconds => _timerRemainingSeconds;

  double get timerProgress => _timerTotalSeconds > 0
      ? (_timerTotalSeconds - _timerRemainingSeconds) / _timerTotalSeconds
      : 0.0;

  int get completedCount => _activities.where((a) => a.isCompleted).length;

  void toggleActivity(String id) {
    final index = _activities.indexWhere((a) => a.id == id);
    if (index != -1) {
      final act = _activities[index];
      final newStatus = !act.isCompleted;
      _activities[index] = act.copyWith(
        isCompleted: newStatus,
        streakDays: newStatus ? act.streakDays + 1 : (act.streakDays > 0 ? act.streakDays - 1 : 0),
      );
      if (newStatus) {
        _totalMinutesToday += act.targetMinutes;
      } else {
        _totalMinutesToday -= act.targetMinutes;
      }
      notifyListeners();
    }
  }

  void startTimer({int minutes = 15}) {
    _timerTotalSeconds = minutes * 60;
    _timerRemainingSeconds = _timerTotalSeconds;
    _isTimerRunning = true;
    _ticker?.cancel();
    _ticker = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timerRemainingSeconds > 0) {
        _timerRemainingSeconds--;
        notifyListeners();
      } else {
        stopTimer();
        _totalMinutesToday += minutes;
        notifyListeners();
      }
    });
    notifyListeners();
  }

  void pauseTimer() {
    _isTimerRunning = false;
    _ticker?.cancel();
    notifyListeners();
  }

  void resumeTimer() {
    if (_timerRemainingSeconds > 0) {
      _isTimerRunning = true;
      _ticker = Timer.periodic(const Duration(seconds: 1), (timer) {
        if (_timerRemainingSeconds > 0) {
          _timerRemainingSeconds--;
          notifyListeners();
        } else {
          stopTimer();
          notifyListeners();
        }
      });
      notifyListeners();
    }
  }

  void stopTimer() {
    _isTimerRunning = false;
    _ticker?.cancel();
    _ticker = null;
    notifyListeners();
  }

  void resetTimer(int minutes) {
    stopTimer();
    _timerTotalSeconds = minutes * 60;
    _timerRemainingSeconds = _timerTotalSeconds;
    notifyListeners();
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }
}
