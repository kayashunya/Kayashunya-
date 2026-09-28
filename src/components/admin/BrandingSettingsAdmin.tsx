import { useState } from 'react';
import { 
  Palette, 
  Globe, 
  Upload, 
  Check, 
  Save, 
  Sparkles, 
  Share2, 
  Smartphone,
  Info
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export function BrandingSettingsAdmin() {
  const { appSettings, branding, updateSettings, updateBrandingConfig } = useCms();

  // Local state for instant editing before saving
  const [formData, setFormData] = useState({
    appName: appSettings.appName,
    tagline: appSettings.tagline,
    appDescription: appSettings.appDescription,
    websiteUrl: appSettings.websiteUrl,
    contactEmail: appSettings.contactEmail,
    contactPhone: appSettings.contactPhone,
    address: appSettings.address,
    socialYoutube: appSettings.socialLinks?.youtube || '',
    socialInstagram: appSettings.socialLinks?.instagram || '',
    socialTelegram: appSettings.socialLinks?.telegram || '',
    socialWhatsapp: appSettings.socialLinks?.whatsapp || '',
    copyrightText: appSettings.copyrightText,
  });

  const [brandingData, setBrandingData] = useState({
    logoUrl: branding.logoUrl || '',
    appIconUrl: branding.appIconUrl || '',
    faviconUrl: branding.faviconUrl || '',
    splashImageUrl: branding.splashImageUrl || '',
    primaryColor: branding.primaryColor || '#C25E00',
    secondaryColor: branding.secondaryColor || '#D97706',
    canvasBgLight: branding.canvasBgLight || '#FAF8F5',
    canvasBgDark: branding.canvasBgDark || '#18181B',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings({
        appName: formData.appName,
        tagline: formData.tagline,
        appDescription: formData.appDescription,
        websiteUrl: formData.websiteUrl,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        address: formData.address,
        socialLinks: {
          youtube: formData.socialYoutube,
          instagram: formData.socialInstagram,
          telegram: formData.socialTelegram,
          whatsapp: formData.socialWhatsapp,
        },
        copyrightText: formData.copyrightText,
      });

      await updateBrandingConfig({
        logoUrl: brandingData.logoUrl,
        appIconUrl: brandingData.appIconUrl,
        faviconUrl: brandingData.faviconUrl,
        splashImageUrl: brandingData.splashImageUrl,
        primaryColor: brandingData.primaryColor,
        secondaryColor: brandingData.secondaryColor,
        canvasBgLight: brandingData.canvasBgLight,
        canvasBgDark: brandingData.canvasBgDark,
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {/* Title & Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            <span>App Branding & Global Settings</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Changes saved here update the live user-facing application in real-time without modifying source code.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving to Database...' : savedSuccess ? 'Saved Live!' : 'Save All Changes'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>Branding and settings updated successfully in Firestore! User app updated.</span>
        </div>
      )}

      {/* Quick Test Helper Box */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <strong>Real-Time Synchronization Test:</strong> Try changing the App Name below from <em>KAYASHUNYA</em> to <em>KAYASHUNYA UNIVERSAL</em> and hit <strong>Save All Changes</strong>. Switch to the <strong>📱 User App</strong> view: the header, title, and all pages reflect the new name instantly.
        </div>
      </div>

      {/* Section 1: App Identity */}
      <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-stone-800 pb-2">
          1. App Identity & Name
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              App Name (Brand Title)
            </label>
            <input
              type="text"
              required
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="e.g. KAYASHUNYA or KAYASHUNYA UNIVERSAL"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="e.g. The Science of Body, Silence of Being"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1">
            App Description
          </label>
          <textarea
            rows={2}
            value={formData.appDescription}
            onChange={(e) => setFormData({ ...formData, appDescription: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Comprehensive description of the application..."
          />
        </div>
      </div>

      {/* Section 2: Visual Branding & Color Scheme */}
      <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-stone-800 pb-2">
          2. Visual Assets & Palette Controls
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Custom Logo URL / Media Reference
            </label>
            <input
              type="text"
              value={brandingData.logoUrl}
              onChange={(e) => setBrandingData({ ...brandingData, logoUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              placeholder="https://... (or leave blank to use the spiritual sun emblem)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Favicon / App Icon URL
            </label>
            <input
              type="text"
              value={brandingData.appIconUrl}
              onChange={(e) => setBrandingData({ ...brandingData, appIconUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Color Palette Pickers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Primary Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandingData.primaryColor}
                onChange={(e) => setBrandingData({ ...brandingData, primaryColor: e.target.value })}
                className="w-9 h-9 rounded-lg border border-stone-700 bg-transparent cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-stone-400">{brandingData.primaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Secondary Ochre Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandingData.secondaryColor}
                onChange={(e) => setBrandingData({ ...brandingData, secondaryColor: e.target.value })}
                className="w-9 h-9 rounded-lg border border-stone-700 bg-transparent cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-stone-400">{brandingData.secondaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Light Canvas Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandingData.canvasBgLight}
                onChange={(e) => setBrandingData({ ...brandingData, canvasBgLight: e.target.value })}
                className="w-9 h-9 rounded-lg border border-stone-700 bg-transparent cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-stone-400">{brandingData.canvasBgLight}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Dark Mode Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandingData.canvasBgDark}
                onChange={(e) => setBrandingData({ ...brandingData, canvasBgDark: e.target.value })}
                className="w-9 h-9 rounded-lg border border-stone-700 bg-transparent cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-stone-400">{brandingData.canvasBgDark}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Contact & Social Information */}
      <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-stone-800 pb-2">
          3. Contact Information & Social Channels
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Phone / Ashram Hotline
            </label>
            <input
              type="text"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Website URL
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              YouTube Channel
            </label>
            <input
              type="text"
              value={formData.socialYoutube}
              onChange={(e) => setFormData({ ...formData, socialYoutube: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Telegram Community
            </label>
            <input
              type="text"
              value={formData.socialTelegram}
              onChange={(e) => setFormData({ ...formData, socialTelegram: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
              placeholder="https://t.me/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1">
            Copyright Notice
          </label>
          <input
            type="text"
            value={formData.copyrightText}
            onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
          />
        </div>
      </div>
    </form>
  );
}
