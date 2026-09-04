"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Recaptcha from "@/components/ui/Recaptcha";

const dealEnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(3, "Address is required"),
  phone: z
    .string()
    .min(7, "Contact number must be at least 7 characters")
    .regex(
      /^[0-9+-\s]+$/,
      "Contact number can only contain digits, spaces, +, or -",
    ),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type DealEnquiryFormData = z.infer<typeof dealEnquirySchema>;

interface DealEnquiryFormProps {
  dealTitle?: string;
}

export default function DealEnquiryForm({ dealTitle }: DealEnquiryFormProps) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DealEnquiryFormData>({
    resolver: zodResolver(dealEnquirySchema),
  });

  const endpoint = process.env.NEXT_PUBLIC_SITE_URL + "/enquery_mail_dod.php";

  const onSubmit = async (formData: DealEnquiryFormData) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionData = {
        ...formData,
        deal_title: dealTitle || "Deal of the Day",
        "g-recaptcha-response": captchaToken,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Server responded with an error");

      setSubmitSuccess(true);
      reset();
      setCaptchaToken(null);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again later.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        className="bg-green-50 border border-green-100 text-green-800 p-8 rounded-lg text-center"
        role="alert"
      >
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h4 className="text-xl font-medium mb-3">Thank you!</h4>
        <p className="text-green-700 mb-6">
          Your enquiry has been sent successfully. We will get back to you soon.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      <div>
        <label htmlFor="dod-name" className="block text-sm text-gray-600 mb-2">
          Name *
        </label>
        <input
          id="dod-name"
          type="text"
          {...register("name")}
          className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="dod-address"
          className="block text-sm text-gray-600 mb-2"
        >
          Address *
        </label>
        <input
          id="dod-address"
          type="text"
          {...register("address")}
          className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
          placeholder="Your address"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="dod-contact"
            className="block text-sm text-gray-600 mb-2"
          >
            Contact Number *
          </label>
          <input
            id="dod-contact"
            type="tel"
            {...register("phone")}
            className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
            placeholder="+977 98XXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="dod-email"
            className="block text-sm text-gray-600 mb-2"
          >
            Email Address *
          </label>
          <input
            id="dod-email"
            type="email"
            {...register("email")}
            className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="dod-message"
          className="block text-sm text-gray-600 mb-2"
        >
          Message *
        </label>
        <textarea
          id="dod-message"
          rows={4}
          {...register("message")}
          className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm resize-none"
          placeholder="I'm interested in today's deal..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Recaptcha onChange={(token) => setCaptchaToken(token)} />
      {submitError && (
        <p className="text-red-500 text-sm font-medium">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gold cursor-pointer text-luxury-dark px-8 py-3 rounded-sm font-medium hover:bg-gold-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
