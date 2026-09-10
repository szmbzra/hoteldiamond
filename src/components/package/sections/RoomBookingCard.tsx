import { Maximize, Phone, Users } from "lucide-react";
import BookingWidget from "@/components/ui/BookingWidget";
import { contact } from "@/config/site";
import { formatCurrencyAmount } from "@/lib/format";

interface RoomBookingCardProps {
  price?: string | number;
  currency?: string;
  occupancy?: string;
  roomSize?: string;
  bookUrl?: string;
}

export default function RoomBookingCard({
  price,
  currency,
  occupancy,
  roomSize,
  bookUrl,
}: RoomBookingCardProps) {
  const formattedPrice = formatCurrencyAmount(price, currency);
  const facts = [
    occupancy ? { icon: Users, label: "Occupancy", value: occupancy } : null,
    roomSize ? { icon: Maximize, label: "Room Size", value: roomSize } : null,
  ].filter((f): f is { icon: typeof Users; label: string; value: string } => f !== null);

  return (
    <div
      className="p-8 md:p-10 rounded-2xl shadow-xl"
      style={{ background: "var(--luxury-ivory)", border: "1px solid var(--luxury-border)" }}
    >
      {formattedPrice && (
        <div className="mb-8 text-center">
          <p className="luxury-label mb-2" style={{ color: "var(--luxury-gold-text)" }}>
            Starting From
          </p>
          <p className="text-3xl font-light" style={{ color: "var(--luxury-charcoal)" }}>
            {formattedPrice}
            <span className="text-sm ml-2" style={{ color: "var(--luxury-muted)" }}>
              / night
            </span>
          </p>
        </div>
      )}

      {facts.length > 0 && (
        <div className={`grid gap-4 mb-8 ${facts.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 py-4 px-2 rounded-xl"
              style={{ background: "var(--luxury-cream)" }}
            >
              <Icon className="w-4 h-4" style={{ color: "var(--luxury-gold)" }} />
              <span
                className="text-[10px] uppercase tracking-[0.15em]"
                style={{ color: "var(--luxury-muted)" }}
              >
                {label}
              </span>
              <span className="text-sm font-light" style={{ color: "var(--luxury-charcoal)" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {(formattedPrice || facts.length > 0) && (
        <div className="pt-2 mb-6 border-t" style={{ borderColor: "var(--luxury-border)" }} />
      )}

      <BookingWidget bookUrl={bookUrl} />

      <a
        href={`tel:${contact.phoneE164}`}
        className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] transition-colors hover:opacity-70"
        style={{ color: "var(--luxury-muted)" }}
      >
        <Phone className="w-3.5 h-3.5" />
        Or call {contact.phone}
      </a>
    </div>
  );
}
