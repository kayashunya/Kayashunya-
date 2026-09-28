import 'package:flutter/foundation.dart';
import '../../domain/models/wisdom_item.dart';
import '../../data/mock_data.dart';

class WisdomProvider extends ChangeNotifier {
  List<WisdomItem> _items = List.from(MockData.wisdomList);
  String _selectedCategory = 'All';
  String _searchQuery = '';
  WisdomType? _selectedTypeFilter;

  List<WisdomItem> get items => _items;
  String get selectedCategory => _selectedCategory;
  String get searchQuery => _searchQuery;

  List<WisdomItem> get filteredItems {
    return _items.where((item) {
      final matchesCategory = _selectedCategory == 'All' || item.category == _selectedCategory;
      final matchesType = _selectedTypeFilter == null || item.type == _selectedTypeFilter;
      final matchesSearch = _searchQuery.isEmpty ||
          item.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.category.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    }).toList();
  }

  List<WisdomItem> get books => _items.where((i) => i.type == WisdomType.book).toList();
  List<WisdomItem> get articles => _items.where((i) => i.type == WisdomType.article).toList();
  List<WisdomItem> get quotes => _items.where((i) => i.type == WisdomType.sutra || i.type == WisdomType.quote).toList();
  List<WisdomItem> get bookmarkedItems => _items.where((i) => i.isBookmarked).toList();

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void toggleBookmark(String id) {
    final index = _items.indexWhere((element) => element.id == id);
    if (index != -1) {
      final current = _items[index];
      _items[index] = current.copyWith(isBookmarked: !current.isBookmarked);
      notifyListeners();
    }
  }

  void incrementLikes(String id) {
    final index = _items.indexWhere((element) => element.id == id);
    if (index != -1) {
      final current = _items[index];
      _items[index] = current.copyWith(likesCount: current.likesCount + 1);
      notifyListeners();
    }
  }
}
