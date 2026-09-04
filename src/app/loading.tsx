// Generic skeleton shown in the {children} slot of RootLayout while a route's
// data loads. Navbar/Footer stay mounted (this only fills the content area),
// so the shape just approximates the common page anatomy — hero band, then a
// max-w-[1400px] container with a heading and a card grid — close enough for
// rooms/events/restaurant/blog/home without needing a skeleton per route.
function Bone({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-luxury-dark/10 ${className}`} />;
}

export default function Loading() {
  return (
    <div className="bg-luxury-cream">
      {/* Hero band */}
      <div className="relative w-full h-[60vh] min-h-[280px] max-h-[480px] overflow-hidden bg-luxury-dark/5">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <Bone className="h-3 w-40" />
          <Bone className="h-8 w-72 max-w-[80vw]" />
          <Bone className="h-px w-16 bg-gold/30" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <Bone className="h-3 w-28" />
          <Bone className="h-6 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Bone className="h-56 w-full rounded-xl" />
              <Bone className="h-4 w-3/4" />
              <Bone className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
