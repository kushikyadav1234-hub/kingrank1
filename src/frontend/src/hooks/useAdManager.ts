/**
 * useAdManager — Ad lifecycle hook for KingRank1.
 * Manages interstitial and rewarded ad display with a 5-minute cooldown.
 *
 * TODO: Wire up real AdMob SDK calls in showInterstitial / showRewarded.
 *   Interstitial unit ID: ca-app-pub-xxxxxxxx/interstitial
 *   Rewarded unit ID:     ca-app-pub-xxxxxxxx/rewarded
 */

import { useCallback, useRef, useState } from "react";

type AdType = "interstitial" | "rewarded";

const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes between ads of same type

export function useAdManager() {
  const [isAdVisible, setIsAdVisible] = useState(false);
  const [adType, setAdType] = useState<AdType | null>(null);
  const pendingCallback = useRef<(() => void) | null>(null);
  const lastShown = useRef<Record<AdType, number>>({
    interstitial: 0,
    rewarded: 0,
  });

  const canShow = useCallback((type: AdType): boolean => {
    return Date.now() - lastShown.current[type] >= COOLDOWN_MS;
  }, []);

  /** Show interstitial ad before an action; calls onComplete when dismissed */
  const showInterstitial = useCallback(
    (onComplete: () => void) => {
      if (!canShow("interstitial")) {
        onComplete();
        return;
      }
      lastShown.current.interstitial = Date.now();
      pendingCallback.current = onComplete;
      setAdType("interstitial");
      setIsAdVisible(true);
    },
    [canShow],
  );

  /** Show rewarded ad (e.g. before download); calls onComplete when dismissed */
  const showRewarded = useCallback(
    (onComplete: () => void) => {
      if (!canShow("rewarded")) {
        onComplete();
        return;
      }
      lastShown.current.rewarded = Date.now();
      pendingCallback.current = onComplete;
      setAdType("rewarded");
      setIsAdVisible(true);
    },
    [canShow],
  );

  /** Called by AdInterstitial onClose to dismiss the overlay and run the callback */
  const dismissAd = useCallback(() => {
    const cb = pendingCallback.current;
    pendingCallback.current = null;
    setIsAdVisible(false);
    setAdType(null);
    if (cb) setTimeout(cb, 0);
  }, []);

  return {
    isAdVisible,
    adType,
    showInterstitial,
    showRewarded,
    dismissAd,
  };
}
