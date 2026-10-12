// Every internal link is relative and ends in .html, so the built site works on any static host,
// in a sub-folder, or opened as plain files.
export function depthOf(pathname: string): number {
  const parts = pathname.split('/').filter(Boolean);
  return Math.max(0, parts.length - 1);
}

export function to(pathname: string, target: string): string {
  return '../'.repeat(depthOf(pathname)) + target;
}
