/**
 * BannerAd — Mobile 320×50 banner ad placeholder.
 * TODO: Replace with real AdMob Banner ID: ca-app-pub-xxxxxxxx/banner
 *
 * Integration steps:
 *   1. Install your AdMob SDK (e.g. react-native-google-mobile-ads)
 *   2. Replace `adUnitId` with your real banner unit ID from AdMob console
 *   3. Replace this placeholder <div> with the real <BannerAd> component from the SDK
 */

interface BannerAdProps {
  /** AdMob banner unit ID — replace with real ID before publishing */
  adUnitId?: string;
  className?: string;
}

export function BannerAd({
  adUnitId = "ca-app-pub-xxxxxxxx/banner", // TODO: Replace with real ID
  className = "",
}: BannerAdProps) {
  return (
    <div
      data-ocid="ad.banner"
      aria-label="Advertisement"
      className={`w-full h-[50px] bg-muted/40 border-t border-border flex items-center justify-center ${className}`}
    >
      <div className="flex items-center gap-2 px-4 w-full">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 font-body whitespace-nowrap">
          Advertisement
        </span>
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-[9px] text-muted-foreground/30 font-mono whitespace-nowrap truncate max-w-[140px]">
          {adUnitId}
        </span>
      </div>
    </div>
  );
}
