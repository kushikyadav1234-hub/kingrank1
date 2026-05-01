/**
 * AdInterstitial — Full-screen interstitial/rewarded ad overlay placeholder.
 *
 * TODO: Replace placeholder Ad IDs before publishing:
 *   Interstitial: ca-app-pub-xxxxxxxx/interstitial
 *   Rewarded:     ca-app-pub-xxxxxxxx/rewarded
 *
 * Integration guide:
 *   1. Install your AdMob SDK
 *   2. Preload the ad using the SDK's load method with the unit ID
 *   3. Call the SDK's show method in place of this overlay
 */

import { useEffect, useRef, useState } from "react";

const AD_UNIT_IDS = {
  interstitial: "ca-app-pub-xxxxxxxx/interstitial", // TODO: Replace
  rewarded: "ca-app-pub-xxxxxxxx/rewarded", // TODO: Replace
} as const;

const SKIP_DELAY_SEC = 3;

export interface AdInterstitialProps {
  isVisible: boolean;
  adType?: "interstitial" | "rewarded";
  /** Override the placeholder unit ID */
  adUnitId?: string;
  onClose: () => void;
}

export function AdInterstitial({
  isVisible,
  adType = "interstitial",
  adUnitId,
  onClose,
}: AdInterstitialProps) {
  const [secondsLeft, setSecondsLeft] = useState(SKIP_DELAY_SEC);
  const [canDismiss, setCanDismiss] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unitId = adUnitId ?? AD_UNIT_IDS[adType];

  useEffect(() => {
    if (!isVisible) {
      setSecondsLeft(SKIP_DELAY_SEC);
      setCanDismiss(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setSecondsLeft(SKIP_DELAY_SEC);
    setCanDismiss(false);

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setCanDismiss(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <dialog
      open
      data-ocid="ad_interstitial.dialog"
      aria-label={adType === "rewarded" ? "Rewarded Ad" : "Advertisement"}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-0 m-0 border-0 max-w-none max-h-none w-full h-full"
    >
      <div className="w-full max-w-sm mx-4 rounded-2xl bg-card border border-border overflow-hidden shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60 border-b border-border">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-body">
            {adType === "rewarded" ? "Rewarded Ad" : "Advertisement"}
          </span>
          <button
            type="button"
            data-ocid="ad_interstitial.close_button"
            onClick={canDismiss ? onClose : undefined}
            aria-label={canDismiss ? "Close ad" : `Skip in ${secondsLeft}s`}
            className={[
              "text-xs font-medium font-body rounded-full px-3 py-1 transition-smooth",
              canDismiss
                ? "bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            ].join(" ")}
          >
            {canDismiss ? "✕ Skip" : `Skip in ${secondsLeft}s`}
          </button>
        </div>

        {/* Ad content placeholder */}
        <div className="flex flex-col items-center justify-center py-16 px-6 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-3xl">
              {adType === "rewarded" ? "🎁" : "📢"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold font-display text-foreground">
              {adType === "rewarded"
                ? "Watch to Unlock Download"
                : "Loading Ad…"}
            </p>
            <p className="text-sm text-muted-foreground font-body mt-1 max-w-[220px]">
              {adType === "rewarded"
                ? "Watch this short ad to unlock your free download."
                : "This ad supports free PDF access for all users."}
            </p>
          </div>
          <div className="w-full rounded-lg bg-muted/60 border border-border px-3 py-2">
            <p className="text-[10px] text-muted-foreground font-mono break-all text-center">
              {unitId}
            </p>
          </div>
        </div>
      </div>

      {canDismiss && (
        <button
          type="button"
          data-ocid="ad_interstitial.cancel_button"
          onClick={onClose}
          className="mt-4 text-xs text-muted-foreground font-body hover:text-foreground transition-colors"
        >
          Tap anywhere to continue →
        </button>
      )}
    </dialog>
  );
}
