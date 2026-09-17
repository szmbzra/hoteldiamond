"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Recaptcha from "../ui/Recaptcha";
import { BreadcrumbNoBanner } from "../ui/Breadcrumb";
import { DecorativeGlow } from "../ui/DecorativeBlobs";
import OfferList from "./OfferList";

const todayISO = () => new Date().toISOString().split("T")[0];

const offerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .min(7, "Phone number must be at least 7 characters")
    .regex(/^[0-9+-\s]+$/, "Phone number can only contain digits, spaces, +, or -"),
  checkin_date: z.string()
    .min(1, "Check-in date is required")
    .refine((val) => val >= todayISO(), "Check-in date cannot be in the past"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type OfferFormData = z.infer<typeof offerSchema>;

const inputClass =
  "w-full border border-gold/25 px-4 py-3 rounded-md text-sm focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all";
const errorInputClass = "border-red-300 bg-red-50";
const labelClass = "block text-sm font-medium text-luxury-dark mb-1";

export default function OfferDetail({ offer, otherOffers }: { offer: any, otherOffers?: any[] }) {
  const plainTitle = offer.title?.replace(/<[^>]+>/g, "") || "";
  const imageSrc = offer.image || (offer.img && offer.img[0]);

  // Form State
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Booking calculator state (No. of People / Rate / Total / Pay Now-Later)
  const [numPeople, setNumPeople] = useState(1);
  const [paymentOption, setPaymentOption] = useState<"now" | "later">("now");
  const ratePerPerson = Number(offer?.rate) || 0;
  const totalAmount = numPeople * ratePerPerson;

  // When booking_mail.php answers with a payment form (Pay Now), it hands
  // back a hidden <form> + inline auto-submit <script> that POSTs to
  // hbl_request.php, which redirects the browser to the real HBL gateway.
  // dangerouslySetInnerHTML never runs embedded <script> tags, so we submit
  // the injected form ourselves once it lands in the DOM.
  const [paymentFormHtml, setPaymentFormHtml] = useState<string | null>(null);
  const paymentFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paymentFormHtml) return;
    const form = paymentFormRef.current?.querySelector<HTMLFormElement>('form[name="hblform"]');
    form?.submit();
  }, [paymentFormHtml]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: { checkin_date: todayISO() },
  });

  const submitOffer = async (
    formData: OfferFormData,
    extra: Record<string, string> = {},
  ) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const endpoint = process.env.NEXT_PUBLIC_SITE_URL + "/booking_mail.php";

    try {
      // The deployed booking_mail.php reads a JSON body via php://input.
      const submissionData = {
        fullname: formData.name,
        email: formData.email,
        phone: formData.phone,
        checkin_date: formData.checkin_date || "",
        message: formData.message,
        offer_title: plainTitle,
        "g-recaptcha-response": captchaToken,
        ...extra,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json().catch(() => null);

      if (data?.payment_form && data?.payment_content) {
        // Pay Now: hand off to the HBL gateway via a real browser navigation.
        setPaymentFormHtml(data.payment_content);
        return;
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

  // booking_mail.php only takes the "save + confirm" path when payment_type
  // is exactly "pay_later" — anything else returns a payment-form payload
  // instead of a plain success. Offers with no rate have nothing to
  // calculate or pay, so they always go through as a plain "pay_later"
  // enquiry; offers with a rate send the calculator's numbers plus the
  // guest's actual Pay Now/Pay Later choice.
  const onProceedToBooking = (formData: OfferFormData) =>
    submitOffer(
      formData,
      ratePerPerson > 0
        ? {
            // The live confirmation email prints "No. of Booking" / "No. of
            // Pax" / "Total Pax" as three separate lines (no_of_people /
            // adults_book / total__pax) — our calculator only tracks one
            // guest count, so all three get that same value.
            no_of_people: String(numPeople),
            adults_book: String(numPeople),
            total__pax: String(numPeople),
            room_price: ratePerPerson.toFixed(2),
            total_amount: totalAmount.toFixed(2),
            currency: "USD",
            payment_type: paymentOption === "later" ? "pay_later" : "pay_now",
          }
        : { payment_type: "pay_later" },
    );

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      <BreadcrumbNoBanner title={plainTitle} />

      <section className="max-w-[1400px] mx-auto py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: image + dates + content */}
          <div>
            {imageSrc && (
              <div className="relative w-full rounded-xl overflow-hidden mb-8 lg:sticky lg:top-24">
                <Image
                  src={imageSrc}
                  alt={plainTitle}
                  height={1080}
                  width={1350}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {(offer.start_date || offer.end_date) && (
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-sm font-medium text-gold-text border border-gold/30 bg-gold/5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {offer.start_date} {offer.end_date ? `to ${offer.end_date}` : ""}
                </span>
              </div>
            )}

            <div
              className="prose max-w-none luxury-subtitle"
              style={{ color: "var(--luxury-muted)" }}
              dangerouslySetInnerHTML={{ __html: offer.content || "" }}
            />
          </div>

          {/* Right: booking calculator + enquiry form */}
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm border border-gold/15 p-6 md:p-10">
            <div className="mb-8">
              <p className="luxury-label text-gold-text mb-3">Reserve Your Stay</p>
              <h3 className="text-2xl font-light text-luxury-dark mb-4">Interested in this offer?</h3>
              <div className="luxury-divider mb-4" />
              <p className="text-sm" style={{ color: "var(--luxury-muted)" }}>
                Fill out the form below and we will get back to you shortly.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-luxury-cream border border-gold/25 p-8 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gold">
                  <svg className="w-8 h-8 text-luxury-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-luxury-dark mb-3">Thank you!</h4>
                <p className="mb-6" style={{ color: "var(--luxury-muted)" }}>
                  Your enquiry has been sent successfully. We will contact you soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-8 py-3 bg-luxury-dark text-gold rounded-md hover:bg-gold hover:text-luxury-dark transition-colors font-medium"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onProceedToBooking)} className="space-y-5">
                {ratePerPerson > 0 && (
                  <div className="space-y-4 p-5 rounded-lg bg-luxury-cream border border-gold/20">
                    <p className="luxury-label text-gold-text">Trip Details</p>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="offer-people" className={labelClass}>No. of People</label>
                        <input
                          id="offer-people"
                          type="number"
                          min={1}
                          value={numPeople}
                          onChange={(e) => setNumPeople(Math.max(1, Number(e.target.value) || 1))}
                          className={`${inputClass} bg-white`}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Rate per Person</label>
                        <div className="flex items-center border border-gold/25 rounded-md overflow-hidden bg-white">
                          <span className="px-3 py-3 border-r border-gold/25" style={{ color: "var(--luxury-muted)" }}>$</span>
                          <input
                            type="text"
                            readOnly
                            value={ratePerPerson.toFixed(2)}
                            className="w-full px-4 py-3 text-sm bg-transparent text-luxury-dark outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="offer-checkin" className={labelClass}>Check-in Date *</label>
                      <input
                        id="offer-checkin"
                        type="date"
                        min={todayISO()}
                        {...register("checkin_date")}
                        className={`${inputClass} bg-white ${errors.checkin_date ? errorInputClass : ''}`}
                      />
                      {errors.checkin_date && <p className="text-red-500 text-xs mt-1.5">{errors.checkin_date.message}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                      <span className="text-luxury-dark">Total Amount</span>
                      <span className="text-xl font-semibold text-gold-text">USD {totalAmount.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentOption("now")}
                        className={`px-4 py-3 cursor-pointer rounded-md text-sm font-medium border transition-colors ${
                          paymentOption === "now"
                            ? "bg-luxury-dark text-gold border-luxury-dark"
                            : "bg-white text-gray-400 border-gold/25"
                        }`}
                      >
                        Pay Now {paymentOption === "now" && "✓"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentOption("later")}
                        className={`px-4 py-3 cursor-pointer rounded-md text-sm font-medium border transition-colors ${
                          paymentOption === "later"
                            ? "bg-luxury-dark text-gold border-luxury-dark"
                            : "bg-white text-gray-400 border-gold/25"
                        }`}
                      >
                        Pay Later {paymentOption === "later" && "✓"}
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="offer-name" className={labelClass}>Full Name *</label>
                  <input
                    id="offer-name"
                    type="text"
                    {...register("name")}
                    className={`${inputClass} ${errors.name ? errorInputClass : ''}`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="offer-email" className={labelClass}>Email Address *</label>
                    <input
                      id="offer-email"
                      type="email"
                      {...register("email")}
                      className={`${inputClass} ${errors.email ? errorInputClass : ''}`}
                      placeholder="your@mail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="offer-phone" className={labelClass}>Phone Number *</label>
                    <input
                      id="offer-phone"
                      type="tel"
                      {...register("phone")}
                      className={`${inputClass} ${errors.phone ? errorInputClass : ''}`}
                      placeholder="Your phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Zero-rate offers skip the Trip Details card, so give the
                    check-in date its own field instead of losing it. */}
                {ratePerPerson <= 0 && (
                  <div>
                    <label htmlFor="offer-checkin-plain" className={labelClass}>Check-in Date *</label>
                    <input
                      id="offer-checkin-plain"
                      type="date"
                      min={todayISO()}
                      {...register("checkin_date")}
                      className={`${inputClass} ${errors.checkin_date ? errorInputClass : ''}`}
                    />
                    {errors.checkin_date && <p className="text-red-500 text-xs mt-1.5">{errors.checkin_date.message}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="offer-message" className={labelClass}>Message *</label>
                  <textarea
                    id="offer-message"
                    rows={4}
                    {...register("message")}
                    className={`${inputClass} resize-none ${errors.message ? errorInputClass : ''}`}
                    placeholder="I would like to know more about this offer..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
                </div>

                <div className="pt-2">
                  <Recaptcha onChange={(token) => setCaptchaToken(token)} />
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-dark text-gold px-8 py-3.5 rounded-md font-medium hover:bg-luxury-dark hover:text-gold transition-colors duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Proceed to Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {otherOffers && otherOffers.length > 0 && (
        <section
          className="relative overflow-hidden max-w-[1400px] mx-auto pb-20 md:pb-24 px-6 md:px-12 lg:px-24"
        >
          <DecorativeGlow variant="gold-dark" />
          <div className="relative">
            <h3 className="text-2xl font-light tracking-wide uppercase mb-2" style={{ color: "var(--luxury-charcoal)" }}>
              Other Offers
            </h3>
            <div className="w-12 h-px mb-10" style={{ background: "var(--luxury-gold)" }} />
            <OfferList offers={otherOffers} />
          </div>
        </section>
      )}

      {/* Injected + auto-submitted for Pay Now — hands off to the HBL gateway. */}
      {paymentFormHtml && (
        <div ref={paymentFormRef} dangerouslySetInnerHTML={{ __html: paymentFormHtml }} />
      )}
    </div>
  );
}
