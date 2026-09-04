export default function AmenitiesGrid({
  amenities = [],
}: {
  amenities?: any[];
}) {
  if (amenities.length === 0) return null;

  return (
    <section style={{ background: "var(--luxury-cream)" }}>
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2
            className="luxury-section-title"
            style={{ color: "var(--luxury-charcoal)" }}
          >
            {amenities?.[0]?.group_title || "Amenities"}
          </h2>
          <div className="flex justify-center mt-4">
            <div className="luxury-divider" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities?.[0]?.items?.map((f: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-white"
              style={{ border: "1px solid var(--luxury-border)" }}
            >
              {f.img ? (
                <img
                  src={f.img}
                  alt={f.title || f.name || "Amenity"}
                  className="w-8 h-8 object-contain opacity-70 shrink-0"
                />
              ) : (
                <span
                  className="text-base shrink-0"
                  style={{ color: "var(--luxury-gold)" }}
                >
                  ✦
                </span>
              )}
              <span
                className="text-sm font-light"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                {f.title || f.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
