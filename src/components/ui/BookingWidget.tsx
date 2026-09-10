'use client';

import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays } from "lucide-react";
import { todayIso } from "@/lib/format";

const bookingSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingWidgetProps {
  bookUrl?: string;
}

export default function BookingWidget({ bookUrl }: BookingWidgetProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const onSubmit = (data: BookingFormData) => {
    // You can append checkIn and checkOut to the URL if needed, e.g.:
    // const url = new URL(bookUrl || window.location.href);
    // url.searchParams.set("checkin", data.checkIn);
    // url.searchParams.set("checkout", data.checkOut);
    // window.open(url.toString(), '_blank', 'noopener,noreferrer');

    window.open(bookUrl || '#', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <p className="luxury-label text-center" style={{ color: "var(--luxury-gold-text)" }}>
        Check Availability
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DateField
          id="booking-checkin"
          label="Check-in"
          min={todayIso()}
          value={checkIn}
          error={errors.checkIn?.message}
          register={register("checkIn")}
        />
        <DateField
          id="booking-checkout"
          label="Check-out"
          min={checkIn || todayIso()}
          value={checkOut}
          error={errors.checkOut?.message}
          register={register("checkOut")}
        />

        <button
          type="submit"
          className="luxury-btn luxury-btn-solid w-full justify-center mt-2"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
}

interface DateFieldProps {
  id: string;
  label: string;
  min?: string;
  value?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

// The native date input's on-screen mm/dd/yyyy vs dd/mm/yyyy formatting follows the
// visitor's browser/OS locale and can't be overridden from the page. To always show
// "2026-09-10"-style dates, the native text is made transparent and a formatted
// overlay is drawn on top (the picker icon is left untouched so it stays clickable).
function DateField({ id, label, min, value, error, register }: DateFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.15em] mb-2"
        style={{ color: "var(--luxury-muted)" }}
      >
        {label}
      </label>
      <div
        className="relative rounded-lg border transition-colors focus-within:border-gold"
        style={{ borderColor: "var(--luxury-border)" }}
      >
        <input
          id={id}
          type="date"
          min={min}
          {...register}
          className="w-full px-4 py-3.5 bg-white rounded-lg outline-none text-transparent scheme-light"
        />
        <div
          className="absolute inset-y-0 left-4 right-11 flex items-center pointer-events-none text-sm font-light"
          style={{ color: value ? "var(--luxury-charcoal)" : "var(--luxury-muted)" }}
        >
          {value || "yyyy-mm-dd"}
        </div>
        <CalendarDays
          className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--luxury-gold)" }}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
