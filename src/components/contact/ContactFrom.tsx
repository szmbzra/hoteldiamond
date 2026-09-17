"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Recaptcha from "../ui/Recaptcha";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .regex(
      /^[0-9+-\s]+$/,
      "Phone number can only contain digits, spaces, +, or -",
    ),
  address: z.string().min(3, "Address is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactFrom() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (formData: ContactFormData) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const endpoint =
      process.env.NEXT_PUBLIC_SITE_URL + "/enquery_mail_contact.php";

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
        "g-recaptcha-response": captchaToken,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

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
    <>
      <div className="max-w-5xl px-6 md:px-12 max-w-5xl px-6 md:px-12">
        <div className="mb-10">
          <h2 className="text-3xl uppercase mb-4">Send Us a Message</h2>
          <div className="h-px w-16 bg-gold"></div>
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
              Your message has been sent successfully. We will get back to you
              soon.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm text-gray-600 mb-2"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                {...register("name")}
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm text-gray-600 mb-2"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                {...register("email")}
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                placeholder="Your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm text-gray-600 mb-2"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                {...register("phone")}
                pattern="[0-9]*"
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                placeholder="Your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-address"
                className="block text-sm text-gray-600 mb-2"
              >
                Address
              </label>
              <input
                id="contact-address"
                type="text"
                {...register("address")}
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                placeholder="Your Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm text-gray-600 mb-2"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                {...register("message")}
                className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
                placeholder="Tell us about your message..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* <Recaptcha onChange={(token) => setCaptchaToken(token)} /> */}
            {submitError && (
              <p className="text-red-500 text-sm font-medium">{submitError}</p>
            )}

            <div className="flex  mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold cursor-pointer text-luxury-dark px-8 py-3 rounded-sm font-medium hover:bg-gold-dim transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
