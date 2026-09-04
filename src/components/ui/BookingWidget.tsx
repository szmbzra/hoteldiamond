'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    // You can append checkIn and checkOut to the URL if needed, e.g.:
    // const url = new URL(bookUrl || window.location.href);
    // url.searchParams.set("checkin", data.checkIn);
    // url.searchParams.set("checkout", data.checkOut);
    // window.open(url.toString(), '_blank', 'noopener,noreferrer');
    
    window.open(bookUrl || '#', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl md:text-3xl font-light text-gray-900 text-center tracking-wide">
        Secure Your Booking Today
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            type="date"
            {...register("checkIn")}
            className="w-full px-6 py-4 bg-white border-none shadow-sm focus:ring-1 focus:ring-gold outline-none text-gray-600 font-light"
            placeholder="Check-in Date"
          />
          {errors.checkIn && (
            <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>
          )}
        </div>
        <div className="relative">
          <input
            type="date"
            {...register("checkOut")}
            className="w-full px-6 py-4 bg-white border-none shadow-sm focus:ring-1 focus:ring-gold outline-none text-gray-600 font-light"
            placeholder="Check-out Date"
          />
          {errors.checkOut && (
            <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-[#231f20] text-white py-5 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-lg mt-4 block"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
}
