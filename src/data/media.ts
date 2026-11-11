import { mediaFiles, publicMediaPath } from "./media-files.mjs";


export const media = Object.fromEntries(
  Object.entries(mediaFiles).map(([key, filename]) => [key, publicMediaPath(key, filename)]),
) as Record<keyof typeof mediaFiles, string>;
