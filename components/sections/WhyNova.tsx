"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Shapes,
  Printer,
  ImageIcon,
  BadgeDollarSign,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Any Design.\nAny Layout.",
    description:
      "Bring your idea to us and we'll transform it into a completely custom design, tailored to your vision.",
  },
  {
    icon: Shapes,
    title: "Custom-Shaped\nAcrylic Products",
    description:
      "Create acrylic mementos and keychains in almost any shape, size, or style for gifts, events, and branding.",
  },
  {
    icon: Printer,
    title: "Creative Design\n& Printing",
    description:
      "Posters, invitations, brochures, labels, stickers, flex, vinyl, UV printing and much more.",
  },
  {
    icon: ImageIcon,
    title: "Affordable\nPhoto Frames",
    description:
      "Elegant photo frames and personalized products crafted with quality materials at budget-friendly prices.",
  },
  {
    icon: BadgeDollarSign,
    title: "Budget-Friendly\nPricing",
    description:
      "Professional-quality products and creative designs that fit your budget without compromising quality.",
  },
  {
    icon: Truck,
    title: "Delivery Across\nIndia",
    description:
      "Safe delivery available across India, with international shipping possible for selected products on request.",
  },
];

export default function WhyNova() {
  return (
    <section className="relative overflow-hidden bg-[#05070D] py-32">

      {/* Background Glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[180px]" />

      <div className="relative mx-auto w-[92%] max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mb-20 text-center"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
            WHY CUSTOMERS CHOOSE NOVA
          </p>

          <h2 className="mt-5 text-5xl font-black leading-tight text-white md:text-6xl">
            Imagine It.
            <br />
            We'll Create It.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            From custom designs to premium printing, we bring your ideas to
            life with creativity, precision, and attention to detail.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-[30px] border border-transparent transition duration-500 group-hover:border-cyan-400/30" />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 6,
                    scale: 1.08,
                  }}
                  className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20"
                >
                  <Icon
                    size={30}
                    className="text-cyan-300"
                  />
                </motion.div>

                {/* Title */}

                <h3 className="whitespace-pre-line text-2xl font-bold leading-tight text-white">
                  {feature.title}
                </h3>

                {/* Accent Line */}

                <div className="mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-500 group-hover:w-24" />

                {/* Description */}

                <p className="mt-6 leading-8 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}