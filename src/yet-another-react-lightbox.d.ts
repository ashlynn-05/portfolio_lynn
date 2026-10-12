import type { GenericSlide } from "yet-another-react-lightbox";
import type { MediaAsset } from "./lib/media";

declare module "yet-another-react-lightbox" {
  // Custom slide for non-image media (the resume PDF), carrying the original asset.
  export interface DocSlide extends GenericSlide {
    type: "doc";
    asset: MediaAsset;
    title?: string;
    description?: string;
  }

  interface SlideTypes {
    doc: DocSlide;
  }
}
