// Trimmed from the quin frontend: the asset shapes the media lightbox understands.
type Meta = { caption?: string; title?: string; description?: string };
export type MediaAssetImage = { kind: "image"; path: string } & Meta;
export type MediaAssetPdf = { kind: "pdf"; path: string; preview?: string; download?: string } & Meta;
export type MediaAsset = MediaAssetImage | MediaAssetPdf;
