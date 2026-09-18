"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import EnquiryModal from "@/components/ui/EnquiryModal";
import EventEnquiryForm from "@/components/ui/EventEnquiryForm";

export default function EventEnquireButton({ hallName }: { hallName?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 mt-8 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:opacity-90 cursor-pointer"
        style={{
          background: "var(--luxury-dark)",
          color: "var(--luxury-gold)",
          border: "1px solid var(--luxury-dark)",
        }}
      >
        Enquire Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>

      <EnquiryModal
        title={hallName ? `Hall Enquiry — ${hallName}` : "Hall Enquiry"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <EventEnquiryForm hallName={hallName} compact />
      </EnquiryModal>
    </>
  );
}
