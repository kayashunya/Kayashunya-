import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:share_plus/share_plus.dart';
import '../../domain/models/wisdom_item.dart';
import '../../core/constants/app_colors.dart';

class ReaderScreen extends StatefulWidget {
  final WisdomItem item;

  const ReaderScreen({super.key, required this.item});

  @override
  State<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends State<ReaderScreen> {
  double _fontSize = 17.0;
  String _colorMode = 'sepia'; // 'light', 'sepia', 'dark'
  final ScrollController _scrollController = ScrollController();
  double _readingProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.hasClients && _scrollController.position.maxScrollExtent > 0) {
        setState(() {
          _readingProgress = (_scrollController.offset / _scrollController.position.maxScrollExtent)
              .clamp(0.0, 1.0);
        });
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Color get _backgroundColor {
    switch (_colorMode) {
      case 'dark':
        return AppColors.readerDarkBg;
      case 'light':
        return AppColors.readerLightBg;
      case 'sepia':
      default:
        return AppColors.readerSepiaBg;
    }
  }

  Color get _textColor {
    switch (_colorMode) {
      case 'dark':
        return AppColors.readerDarkText;
      case 'light':
        return AppColors.readerLightText;
      case 'sepia':
      default:
        return AppColors.readerSepiaText;
    }
  }

  Color get _mutedTextColor {
    switch (_colorMode) {
      case 'dark':
        return Colors.white54;
      case 'light':
        return AppColors.textTertiary;
      case 'sepia':
      default:
        return const Color(0xFF786A5E);
    }
  }

  void _showReaderSettings() {
    showModalBottomSheet(
      context: context,
      backgroundColor: _backgroundColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: const EdgeInsets.fromLTRB(24, 16, 24, 32),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      decoration: BoxDecoration(
                        color: _mutedTextColor.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'Reader Preferences',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: _textColor,
                    ),
                  ),
                  const SizedBox(height: 18),
                  // Font Size Slider
                  Row(
                    children: [
                      Text('A', style: TextStyle(fontSize: 14, color: _textColor)),
                      Expanded(
                        child: Slider(
                          value: _fontSize,
                          min: 14.0,
                          max: 26.0,
                          activeColor: AppColors.primary,
                          onChanged: (val) {
                            setModalState(() => _fontSize = val);
                            setState(() => _fontSize = val);
                          },
                        ),
                      ),
                      Text('A', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: _textColor)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Theme Selector (Segmented buttons)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildThemeButton('Sepia', 'sepia', const Color(0xFFF5EDE0), const Color(0xFF382E25), setModalState),
                      _buildThemeButton('White', 'light', Colors.white, const Color(0xFF1F2937), setModalState),
                      _buildThemeButton('Night', 'dark', const Color(0xFF18181B), const Color(0xFFE4E4E7), setModalState),
                    ],
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildThemeButton(String label, String mode, Color bg, Color text, StateSetter setModalState) {
    final isSelected = _colorMode == mode;
    return GestureDetector(
      onTap: () {
        setModalState(() => _colorMode = mode);
        setState(() => _colorMode = mode);
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: isSelected ? AppColors.primary : Colors.black12,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          label,
          style: GoogleFonts.plusJakartaSans(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: text,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _backgroundColor,
      appBar: AppBar(
        backgroundColor: _backgroundColor,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios_new, size: 18, color: _textColor),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Kayasun Reader',
          style: GoogleFonts.cinzel(fontSize: 15, fontWeight: FontWeight.w600, color: _textColor),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.text_fields_rounded, color: _textColor),
            onPressed: _showReaderSettings,
            tooltip: 'Text size & appearance',
          ),
          IconButton(
            icon: Icon(Icons.share_outlined, color: _textColor),
            onPressed: () {
              Share.share(
                '“${widget.item.quoteHighlight ?? widget.item.title}”\n— ${widget.item.author}\nvia Kayasun App',
              );
            },
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(2),
          child: LinearProgressIndicator(
            value: _readingProgress,
            backgroundColor: _backgroundColor,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
            minHeight: 2,
          ),
        ),
      ),
      body: SingleChildScrollView(
        controller: _scrollController,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Category & Metadata
            Text(
              '${widget.item.category.toUpperCase()} · ${widget.item.readingTimeMinutes} MIN READ',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 12),
            // Title
            Text(
              widget.item.title,
              style: GoogleFonts.cinzel(
                fontSize: _fontSize + 8,
                fontWeight: FontWeight.w700,
                color: _textColor,
                height: 1.25,
              ),
            ),
            const SizedBox(height: 8),
            // Subtitle
            Text(
              widget.item.subtitle,
              style: GoogleFonts.plusJakartaSans(
                fontSize: _fontSize - 2,
                color: _mutedTextColor,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 20),
            Divider(color: _mutedTextColor.withOpacity(0.2)),
            const SizedBox(height: 20),
            // Body Content in elegant spiritual font (Lora)
            Text(
              widget.item.content,
              style: GoogleFonts.lora(
                fontSize: _fontSize,
                color: _textColor,
                height: 1.8,
                letterSpacing: 0.2,
              ),
            ),
            const SizedBox(height: 40),
            Center(
              child: Icon(
                Icons.spa_outlined,
                color: AppColors.primary.withOpacity(0.5),
                size: 24,
              ),
            ),
            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }
}
