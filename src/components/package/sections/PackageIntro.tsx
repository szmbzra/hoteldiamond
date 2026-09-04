export default function PackageIntro({
  label,
  title,
  description,
  className,
  dark = false,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24 ${className}`}
    >
      <div className="mx-auto text-center">
        <div className={`luxury-label mb-4 ${dark ? "text-gold" : "text-gold-text"}`}>{label}</div>
        <div className="flex justify-center mb-8">
          <div className="luxury-divider" />
        </div>
        <h2 className={`luxury-section-title mb-8 ${dark ? "text-luxury-cream" : "text-luxury-charcoal"}`}>
          {title}
        </h2>
        {description && (
          <div
            className={`cms-content luxury-subtitle ${dark ? "text-luxury-cream cms-content-invert" : "text-luxury-muted"}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </section>
  );
}
