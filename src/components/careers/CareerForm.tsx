"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadCloud, FileText, X } from "lucide-react";
import Recaptcha from "@/components/ui/Recaptcha";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const careerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  cv: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Please attach your CV")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "File must be under 5MB",
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only PDF or Word documents are accepted",
    ),
});

type CareerFormData = z.infer<typeof careerSchema>;

export default function CareerForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
  });

  const { onChange: onCvChange, ...cvField } = register("cv");

  const endpoint = process.env.NEXT_PUBLIC_SITE_URL + "/enquery_mail_career.php";

  const onSubmit = async (formData: CareerFormData) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("cv", formData.cv[0]);
      submissionData.append("g-recaptcha-response", captchaToken);

      const response = await fetch(endpoint, {
        method: "POST",
        body: submissionData,
      });

      if (!response.ok) throw new Error("Server responded with an error");

      setSubmitSuccess(true);
      reset();
      setFileName(null);
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
          Your application has been submitted successfully. Our HR team will
          review your profile and get back to you soon.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      <div>
        <label
          htmlFor="career-full-name"
          className="block text-sm text-gray-600 mb-2"
        >
          Full Name *
        </label>
        <input
          id="career-full-name"
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
          htmlFor="career-email"
          className="block text-sm text-gray-600 mb-2"
        >
          Email Address *
        </label>
        <input
          id="career-email"
          type="email"
          {...register("email")}
          className="w-full border border-gray-200 px-4 py-3 rounded-sm text-sm"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="career-cv"
          className="block text-sm text-gray-600 mb-2"
        >
          Upload CV *
        </label>

        <label
          htmlFor="career-cv"
          className="flex flex-col items-center justify-center gap-2 w-full border border-dashed border-gray-300 rounded-sm px-4 py-8 text-center cursor-pointer hover:border-gold transition-colors"
        >
          {fileName ? (
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <FileText className="w-5 h-5 text-gold-text" />
              {fileName}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setValue("cv", undefined as unknown as FileList);
                  setFileName(null);
                }}
                aria-label="Remove selected file"
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
              <span className="text-sm text-gray-600">
                Click to upload your CV
              </span>
              <span className="text-xs text-gray-400">
                PDF or Word, up to 5MB
              </span>
            </>
          )}
          <input
            id="career-cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            {...cvField}
            onChange={(e) => {
              onCvChange(e);
              setFileName(e.target.files?.[0]?.name ?? null);
            }}
          />
        </label>
        {errors.cv && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cv.message as string}
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
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
