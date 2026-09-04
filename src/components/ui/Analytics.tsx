"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/track";

export default function Analytics() {
  const pathname = usePathname();

  const startTimeRef = useRef(Date.now());

  const currentPathRef = useRef(pathname);

  // =========================
  // SEND TIME SPENT
  // =========================
  const sendTimeSpent = (path: string) => {
    const seconds = Math.floor(
      (Date.now() - startTimeRef.current) / 1000
    );

    // Ignore tiny visits
    if (seconds < 1) return;

    // IMPORTANT:
    // sendBeacon works best with FormData
    const formData = new FormData();

    formData.append("action", "time_spent");
    formData.append("url", path);
    formData.append("time", seconds.toString());

    // sendBeacon works during tab close
    if (navigator.sendBeacon) {

      navigator.sendBeacon(API_URL, formData);

    } else {

      // Fallback
      fetch(API_URL, {
        method: "POST",
        body: formData,
        keepalive: true,
      }).catch(() => {});
    }
  };

  // =========================
  // TRACK PAGE VISITS
  // =========================
  useEffect(() => {

    // Send previous page time first
    if (currentPathRef.current !== pathname) {

      sendTimeSpent(currentPathRef.current);
    }

    // Reset timer
    startTimeRef.current = Date.now();

    // Update current path
    currentPathRef.current = pathname;

    // Track current page visit
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "track",
        url: pathname,
        title: document.title,
      }),
    }).catch(() => {});

    // =========================
    // TAB CLOSE / REFRESH
    // =========================
    const handleUnload = () => {
      sendTimeSpent(currentPathRef.current);
    };

    // Better mobile support
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendTimeSpent(currentPathRef.current);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {

      window.removeEventListener(
        "beforeunload",
        handleUnload
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };

  }, [pathname]);

  // =========================
  // EMAIL SIGNATURE CLICK
  // =========================
  // Records a click when a visitor arrives from the email-signature link:
  //   https://www.manakamanahillcrest.com/?ref=email-signature
  // Runs in the browser, so it works on any host (cPanel Node OR static) and
  // uses the visitor's real User-Agent/IP — no server route or bot-protection
  // workaround needed. sessionStorage guards against double-counting on refresh.
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref !== "email-signature") return;
    if (sessionStorage.getItem("sig_click_tracked")) return;
    sessionStorage.setItem("sig_click_tracked", "1");

    const body = new FormData();
    // ⚠ Must match the backend WRITE action that does
    //   INSERT INTO tbl_email_signature_clicks
    // (the counterpart to the existing `get_signature_clicks` reader).
    body.append("action", "track_signature_click");

    fetch(API_URL, { method: "POST", body, keepalive: true }).catch(() => {});
  }, []);

  return null;
}