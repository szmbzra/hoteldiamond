"use client";

import { useEffect } from "react";

const FA_HREF =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
const FA_INTEGRITY =
  "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==";

/**
 * Loads Font Awesome AFTER the page is interactive so it never blocks
 * First Contentful Paint or Largest Contentful Paint.
 *
 * Icons from the CMS (via Icon.tsx) appear ~100ms after initial paint —
 * they are always below the fold so the user never notices.
 */
export default function FontAwesomeLoader() {
  useEffect(() => {
    // Skip if already loaded (e.g. on navigation)
    if (document.querySelector(`link[href="${FA_HREF}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FA_HREF;
    link.integrity = FA_INTEGRITY;
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);
  }, []);

  return null;
}
