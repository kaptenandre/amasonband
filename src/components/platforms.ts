export const PLATFORM_LABELS: Record<string, string> = {
  spotify: "Spotify",
  apple: "Apple Music",
  youtube: "YouTube",
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud",
  tidal: "Tidal",
  deezer: "Deezer",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  x: "X",
};

export function platformLabel(platform?: string): string {
  if (!platform) return "Listen";
  return (
    PLATFORM_LABELS[platform] ||
    platform.charAt(0).toUpperCase() + platform.slice(1)
  );
}
