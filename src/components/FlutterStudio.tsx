import { useState } from 'react';
import { 
  FileCode, 
  FolderTree, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Layers, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import JSZip from 'jszip';
import { FLUTTER_FILES, FlutterFile } from '../data/flutterProjectFiles';

export function FlutterStudio() {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add root pubspec.yaml
      FLUTTER_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Add a handy README.md
      zip.file(
        'README.md',
        `# Kayasun - Minimalist Spiritual Wisdom & Sadhana Mobile App
Inspired by Acharya Prashant (org.acharyaprashant.apbooks).

## Quick Start
1. Ensure Flutter 3.0+ is installed:
   \`flutter --version\`
2. Install dependencies:
   \`flutter pub get\`
3. Run on your connected phone or emulator:
   \`flutter run\`
`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'kayasun_flutter_project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to generate zip:', e);
    } finally {
      setIsZipping(false);
    }
  };

  // Group files by architectural category
  const categories = [
    { id: 'config', label: 'Configuration & Manifest', count: 1 },
    { id: 'entry', label: 'App Entry & Root', count: 1 },
    { id: 'core', label: 'Core Theme & Colors', count: 2 },
    { id: 'domain', label: 'Domain Entities', count: 3 },
    { id: 'data', label: 'Data & Mock Repository', count: 1 },
    { id: 'presentation', label: 'Presentation Screens', count: 6 },
  ];

  return (
    <div className="h-full flex flex-col bg-stone-900 text-stone-200">
      {/* Studio Bar */}
      <div className="px-6 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                Flutter Clean Architecture Studio
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Null-Safe Dart 3.0+
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Complete, production-ready code ready to run in VS Code or Android Studio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied File!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isZipping ? 'Bundling ZIP...' : 'Download Project (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Sidebar Tree + Code Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Clean Architecture File Explorer */}
        <div className="w-72 bg-stone-950 border-r border-stone-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-stone-800 text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
            <FolderTree className="w-3.5 h-3.5 text-amber-500" />
            <span>Project Explorer (Clean Arch)</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {categories.map((cat) => {
              const filesInCat = FLUTTER_FILES.filter((f) => f.category === cat.id);
              return (
                <div key={cat.id}>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {cat.label}
                  </div>
                  <div className="space-y-0.5 mt-0.5">
                    {filesInCat.map((file) => {
                      const isSelected = selectedFile.path === file.path;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                            isSelected
                              ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                              : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                          }`}
                        >
                          <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                          <span className="truncate font-mono">{file.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Terminal Guide */}
          <div className="p-3 bg-stone-900/60 border-t border-stone-800 text-[11px]">
            <div className="flex items-center gap-1.5 text-stone-400 font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Run in Terminal</span>
            </div>
            <code className="block p-1.5 bg-black/50 rounded font-mono text-[10px] text-amber-300 select-all">
              flutter pub get && flutter run
            </code>
          </div>
        </div>

        {/* Right Code Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-stone-900">
          {/* Breadcrumbs & File Stats */}
          <div className="px-6 py-2.5 bg-stone-950/70 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-amber-500">kayasun</span>
              <span>/</span>
              <span className="text-white font-semibold">{selectedFile.path}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{selectedFile.content.split('\n').length} lines</span>
              <span>·</span>
              <span>{(selectedFile.content.length / 1024).toFixed(1)} KB</span>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed selection:bg-amber-500/30">
            <pre className="text-stone-300">
              <code>
                {selectedFile.content.split('\n').map((line, idx) => (
                  <div key={idx} className="flex hover:bg-stone-800/40 py-0.5 px-1 rounded">
                    <span className="w-10 text-stone-600 select-none text-right pr-4 shrink-0 font-normal">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">
                      {renderHighlightedLine(line)}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lightweight syntax colorizer for Dart / YAML code
function renderHighlightedLine(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return <span className="text-stone-500 italic">{line}</span>;
  }
  if (line.trim().startsWith('import ') || line.trim().startsWith('library ') || line.trim().startsWith('part ')) {
    return <span className="text-amber-400">{line}</span>;
  }
  if (line.includes('class ') || line.includes('enum ') || line.includes('extends ') || line.includes('implements ')) {
    return <span className="text-cyan-300 font-semibold">{line}</span>;
  }
  if (line.includes('final ') || line.includes('const ') || line.includes('static ') || line.includes('override')) {
    return <span className="text-purple-300">{line}</span>;
  }
  if (line.includes('Widget ') || line.includes('StatelessWidget') || line.includes('StatefulWidget') || line.includes('BuildContext')) {
    return <span className="text-emerald-300">{line}</span>;
  }
  if (line.includes('return ') || line.includes('void ') || line.includes('if ') || line.includes('else ')) {
    return <span className="text-rose-300">{line}</span>;
  }
  return line;
}
