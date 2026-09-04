// CMS `gallery_images`/`img` entries come back as either bare URL strings or
// {src|url} objects — normalise to plain URL strings for the image slider.
export function toImageUrls(images: any[] | undefined): string[] {
  if (!Array.isArray(images)) return [];
  return images
    .map((img) => (typeof img === "string" ? img : img?.src ?? img?.url ?? ""))
    .filter(Boolean);
}

export function resolveHeroImages(item: any, fallback = ""): string[] {
  const gallery = toImageUrls(item?.gallery_images);
  const images = toImageUrls(item?.img);
  if (gallery.length > 0) return gallery;
  if (images.length > 0) return images;
  return fallback ? [fallback] : [];
}
