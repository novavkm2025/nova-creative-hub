"use client";

import Aurora from "@/components/effects/Aurora";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070D] pt-28">

      {/* Aurora Background */}
      <Aurora />

      {/* Extra Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[160px]" />

      </div>

      <div className="relative z-10 mx-auto grid w-[92%] max-w-7xl items-center gap-16 lg:grid-cols-[45%_55%]">

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
            EST. 2025
          </span>

          <h1 className="mt-8 leading-none">

            <span className="block text-7xl font-black tracking-[0.12em] text-white md:text-8xl lg:text-[8rem]">
              NOVA
            </span>

            <span className="mt-3 block text-3xl font-light tracking-[0.18em] text-slate-300 md:text-4xl">
              Creative Hub
            </span>

          </h1>

          <h2 className="mt-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            From Ideas to Prints.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            Discover a seamless blend of expert printing and custom creations.
            We offer top-tier printing solutions for every need alongside a premium selection of
            personalized products—including custom acrylic gifts, elegant wedding cards, mementos, and personalized keychains.
            Whatever you can imagine, we print and craft it to perfection.
          </p>

          {/* Service Highlights */}

          <div className="mt-10 flex flex-wrap gap-3">

            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur-xl">
              Wedding Invitations
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur-xl">
              Graphic Designing & Printing
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur-xl">
              Customized Gifts
            </span>

          </div>

          {/* Scroll */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-14 flex items-center gap-3"
          >

            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="text-2xl text-cyan-300"
            >
              ↓
            </motion.span>

            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Scroll to Explore
            </p>

          </motion.div>

        </motion.div>

        {/* RIGHT PRODUCTS */}

        <div className="relative h-[700px]">

          {/* Wedding Invitation */}

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-3, 2, -3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 z-30"
          >
            <Image
              src="/products/wedding-card.png"
              alt="Wedding Invitation"
              width={280}
              height={280}
              priority
              className="drop-shadow-[0_40px_60px_rgba(0,0,0,.45)]"
            />
          </motion.div>

          {/* Acrylic */}

          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [2, -2, 2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-24"
          >
            <Image
              src="/products/acrylic.png"
              alt="Acrylic"
              width={240}
              height={240}
              className="drop-shadow-[0_40px_60px_rgba(0,0,0,.45)]"
            />
          </motion.div>

          {/* Mug */}

          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-32"
          >
            <Image
              src="/products/mug.png"
              alt="Mug"
              width={220}
              height={220}
              className="drop-shadow-[0_40px_60px_rgba(0,0,0,.45)]"
            />
          </motion.div>
          {/* T-Shirt */}

            <motion.div
            animate={{
                y: [0, -15, 0],
                rotate: [2, -2, 2],
            }}
            transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute bottom-0 right-8 z-20"
            >
            <Image
                src="/products/tshirt.png"
                alt="T-Shirt"
                width={280}
                height={280}
                className="drop-shadow-[0_40px_60px_rgba(0,0,0,.45)]"
            />
            </motion.div>

        </div>

      </div>

    </section>
  );
}