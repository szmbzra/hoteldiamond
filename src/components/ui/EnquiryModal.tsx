"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Popup dialog shell for an "Enquire Now" button — supplies the backdrop,
 * header and close behaviour; the caller renders whatever form fits the
 * context as children.
 *
 * Portaled to document.body — trigger buttons often sit inside an
 * `animate-*`/`overflow-hidden` ancestor, which would otherwise confine this
 * "fixed" overlay to that ancestor's box instead of the viewport.
 */
export default function EnquiryModal({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl"
      >
        <div
          className="flex items-center justify-between px-6 sm:px-8 h-16 shrink-0 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-10"
          style={{ borderColor: "var(--luxury-border)" }}
        >
          <h2
            id="enquiry-modal-title"
            className="text-lg font-light truncate pr-4"
            style={{ color: "var(--luxury-charcoal)" }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full cursor-pointer hover:bg-black/5 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" style={{ color: "var(--luxury-charcoal)" }} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
