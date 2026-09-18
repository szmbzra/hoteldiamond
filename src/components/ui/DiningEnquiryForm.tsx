"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Recaptcha from "./Recaptcha";

const scheduleSlots = ["Breakfast (7 AM – 10 AM)", "Lunch (12 PM – 3 PM)", "Dinner (7 PM – 10 PM)"];

const PHONE_ALLOWED_CHARS = /[^0-9+-]/g;
const PHONE_MAX_LENGTH = 14;

const diningEnquirySchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(PHONE_MAX_LENGTH, `Phone number cannot exceed ${PHONE_MAX_LENGTH} characters`)
    .regex(/^[0-9+-]+$/, "Phone number can only contain digits, + and -"),
  schedule_slot: z.string().min(1, "Please select a time slot"),
  reservation_date: z.string().min(1, "Reservation date is required"),
  pax: z.string().min(1, "Number of guests is required"),
  special_request: z.string().optional(),
});

type DiningEnquiryFormData = z.infer<typeof diningEnquirySchema>;

interface DiningEnquiryFormProps {
  venueName?: string;
  /** Renders bare form fields with no heading/section chrome, for embedding
   * inside a container that already supplies its own title (e.g. a modal). */
  compact?: boolean;
}

export default function DiningEnquiryForm({
  venueName,
  compact = false,
}: DiningEnquiryFormProps = {}) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiningEnquiryFormData>({
    resolver: zodResolver(diningEnquirySchema),
    defaultValues: {
      schedule_slot: "",
    },
  });

  const { onChange: onPhoneChange, ...phoneField } = register("phone");

  const endpoint = process.env.NEXT_PUBLIC_SITE_URL + "/enquery_mail_dining.php";

  const onSubmit = async (formData: DiningEnquiryFormData) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionData = {
        ...formData,
        venue_name: venueName || "General Enquiry",
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
      <div
        className={
          compact
            ? "w-full"
            : "w-full max-w-5xl mx-auto px-6 md:px-12 bg-white py-12"
        }
      >
        {!compact && (
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-text mb-3">
              Get In Touch
            </p>
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Dining Enquiry
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>
        )}

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
              Your dining enquiry has been sent successfully. We will get back
              to you soon.
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
                  htmlFor="de-full-name"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="de-full-name"
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
                  htmlFor="de-email"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="de-email"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="de-phone"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="de-phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={PHONE_MAX_LENGTH}
                  {...phoneField}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(PHONE_ALLOWED_CHARS, "");
                    onPhoneChange(e);
                  }}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="+977 98XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="de-schedule-slot"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Time Slot *
                </label>
                <select
                  id="de-schedule-slot"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="de-reservation-date"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Reservation Date *
                </label>
                <input
                  id="de-reservation-date"
                  type="date"
                  {...register("reservation_date")}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                />
                {errors.reservation_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reservation_date.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="de-pax"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Number of Guests (Pax) *
                </label>
                <input
                  id="de-pax"
                  type="number"
                  {...register("pax")}
                  min={1}
                  className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                  placeholder="2"
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
                htmlFor="de-special-request"
                className="block text-sm text-gray-600 mb-2"
              >
                Special Requests
              </label>
              <textarea
                id="de-special-request"
                {...register("special_request")}
                rows={4}
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm resize-none"
                placeholder="Any dietary needs, seating preferences, or occasion details…"
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
