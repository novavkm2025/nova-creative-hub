import Link from "next/link";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Explore Our Work
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Visit the Gallery
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            Explore our collection of creative products and customized
            designs, made for your special moments.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Wedding Invitations */}
          <Link
            href="/invitations"
            className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07] lg:col-span-2"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

            <div className="relative flex h-full flex-col justify-end">
              <h3 className="text-2xl font-semibold text-white md:text-3xl">
                Wedding Invitations
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                Elegant designs for your special day.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-400">
                <span>Explore</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          </Link>

          {/* Mementos */}
          <div className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="relative flex h-full flex-col justify-end">
              <h3 className="text-2xl font-semibold text-white">
                Mementos
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Beautiful keepsakes made to remember.
              </p>
            </div>
          </div>

          {/* Acrylic Products */}
          <div className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="relative flex h-full flex-col justify-end">
              <h3 className="text-2xl font-semibold text-white">
                Acrylic Products
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Premium acrylic creations for every occasion.
              </p>
            </div>
          </div>

          {/* Custom Gifts */}
          <div className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="relative flex h-full flex-col justify-end">
              <h3 className="text-2xl font-semibold text-white">
                Custom Gifts
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Personalized gifts made specially for you.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="relative flex h-full flex-col justify-end">
              <h3 className="text-2xl font-semibold text-white">
                Badges
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Custom badges for events and occasions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}