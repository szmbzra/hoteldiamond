interface Props {
  siteName?: string;
  dark?: boolean;
}

export default function CareerIntro({ siteName, dark = false }: Props) {
  return (
    <div className="text-center mb-16">
      <h2 className={`text-3xl font-light mb-4 ${dark ? "text-gold-light" : ""}`}>
        Join Our Team
      </h2>
      <div className="h-px w-16 bg-gold mx-auto"></div>
      <p className={`text-md leading-relaxed mt-4 ${dark ? "text-luxury-cream" : "text-gray-600"}`}>
        Build your career with {siteName || "us"}. Share your details and CV
        below and our HR team will reach out when a suitable opening is
        available.
      </p>
    </div>
  );
}
