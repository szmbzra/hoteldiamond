"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import EnquiryModal from "@/components/ui/EnquiryModal";
import DiningEnquiryForm from "@/components/ui/DiningEnquiryForm";

export default function DiningEnquireButton({ venueName }: { venueName?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="luxury-btn luxury-btn-light"
      >
        Enquire Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>

      <EnquiryModal
        title={venueName ? `Dining Enquiry — ${venueName}` : "Dining Enquiry"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DiningEnquiryForm venueName={venueName} compact />
      </EnquiryModal>
    </>
  );
}
