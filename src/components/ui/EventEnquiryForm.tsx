"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Recaptcha from "./Recaptcha";

const scheduleSlots = [
  "Morning (6 AM – 12 PM)",
  "Day (12 PM – 6 PM)",
  "Evening (6 PM – 10 PM)",
];

const eventEnquirySchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  event_name: z.string().min(2, "Event name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .regex(
      /^[0-9+-\s]+$/,
      "Phone number can only contain digits, spaces, +, or -",
    ),
  schedule_slot: z.string().min(1, "Schedule slot is required"),
  event_date: z.string().min(1, "Event date is required"),
  address: z.string().optional(),
  pax: z.string().min(1, "Number of guests is required"),
  special_request: z.string().optional(),
});

type EventEnquiryFormData = z.infer<typeof eventEnquirySchema>;

interface EventEnquiryFormProps {
  hallName?: string;
}

export default function EventEnquiryForm({
  hallName,
}: EventEnquiryFormProps = {}) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventEnquiryFormData>({
    resolver: zodResolver(eventEnquirySchema),
    defaultValues: {
      schedule_slot: "",
    },
  });

  const endpoint = process.env.NEXT_PUBLIC_SITE_URL + "/enquery_mail_hall.php";

  const onSubmit = async (formData: EventEnquiryFormData) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionData = {
        ...formData,
        package_name: hallName || "General Enquiry",
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

  return (
    <section>
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 bg-white py-12">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-text mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Event Enquiry
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        {submitSuccess ? (
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
              Your event enquiry has been sent successfully. We will get back to
              you soon.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Send Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ee-full-name"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="ee-full-name"
                  type="text"
                  {...register("full_name")}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.full_name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ee-event-name"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Event Name *
                </label>
                <input
                  id="ee-event-name"
                  type="text"
                  {...register("event_name")}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="Wedding Reception"
                />
                {errors.event_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.event_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ee-email"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="ee-email"
                  type="email"
                  {...register("email")}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ee-phone"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="ee-phone"
                  type="tel"
                  {...register("phone")}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="+977 98XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ee-schedule-slot"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Schedule Slot *
                </label>
                <select
                  id="ee-schedule-slot"
                  {...register("schedule_slot")}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                >
                  <option value="" disabled>
                    Select a slot
                  </option>
                  {scheduleSlots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.schedule_slot && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.schedule_slot.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ee-event-date"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Event Date *
                </label>
                <input
                  id="ee-event-date"
                  type="date"
                  {...register("event_date")}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                />
                {errors.event_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.event_date.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ee-address"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Address
                </label>
                <input
                  id="ee-address"
                  type="text"
                  {...register("address")}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="Kathmandu, Nepal"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ee-pax"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Number of Guests (Pax) *
                </label>
                <input
                  id="ee-pax"
                  type="number"
                  {...register("pax")}
                  min={1}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="50"
                />
                {errors.pax && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pax.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="ee-special-request"
                className="block text-sm text-gray-600 mb-2"
              >
                Special Requests
              </label>
              <textarea
                id="ee-special-request"
                {...register("special_request")}
                rows={4}
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm resize-none"
                placeholder="Any special requirements, dietary needs, or setup preferences…"
              />
              {errors.special_request && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.special_request.message}
                </p>
              )}
            </div>

            <Recaptcha onChange={(token) => setCaptchaToken(token)} />
            {submitError && (
              <p className="text-red-500 text-sm font-medium">{submitError}</p>
            )}

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold cursor-pointer text-luxury-dark px-8 py-3 rounded-sm font-medium hover:bg-gold-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
