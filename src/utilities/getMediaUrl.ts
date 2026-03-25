/**
 * Processes media resource URL to ensure proper formatting.
 *
 * Relative URLs (e.g. `/api/media/file/image.webp`) are kept as-is so that
 * Next.js Image can serve them via `localPatterns` without making a loopback
 * HTTP request to localhost — which Next.js blocks because it resolves to a
 * private IP. Absolute external URLs (CDN, etc.) are returned unchanged.
 *
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const encodedTag = cacheTag && cacheTag !== '' ? encodeURIComponent(cacheTag) : null

  // Absolute external URL — return as-is (CDN, remote storage, etc.)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return encodedTag ? `${url}?${encodedTag}` : url
  }

  // Relative path — keep relative so Next.js localPatterns handles it
  return encodedTag ? `${url}?${encodedTag}` : url
}
