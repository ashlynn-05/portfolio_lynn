import type { MediaAsset } from "./media";

// Typed client trigger for the global media lightbox (same contract as quin):
// callers dispatch LIGHTBOX_EVENT and the React island in MediaLightbox.tsx opens.
export const LIGHTBOX_EVENT = "media-lightbox:open";

export type LightboxOpenDetail = { assets: MediaAsset[]; index: number };

export function openLightbox(assets: MediaAsset[], index = 0): void {
  if (!assets.length || typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<LightboxOpenDetail>(LIGHTBOX_EVENT, { detail: { assets, index } }),
  );
}
