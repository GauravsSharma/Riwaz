export function trimTitle(title: string): string {
  const words = title.trim().split(/\s+/);

  if (words.length <= 3) {
    return title; // no trim needed
  }

  return words.slice(0, 3).join(" ") + "...";
}
