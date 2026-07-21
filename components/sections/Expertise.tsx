"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const expertise = [
  {
    title: "Wedding Invitations",
    description:
      "Elegant invitations crafted to make every celebration unforgettable.",
    image: "/products/wedding-card.png",
    scale: "scale-100",
    items: [
      "Budget Friendly Cards",
      "Screen Printed Cards",
      "Digital Printed Invitations",
      "Digital Invitations",
      "Premium Cards",
    ],
  },
  {
    title: "Printing Solutions",
    description:
      "Professional printing solutions for personal and business needs.",
    image: "/products/Printings.png",
    scale: "scale-120",
    items: [
      "Flex Printing",
      "Vinyl Printing",
      "UV Printing",
      "UV Acrylic Printing",
      "Business Cards",
      "Flyers",
      "Brochures",
      "Labels & Stickers",
      "Flag Printing",
      "Badges",
    ],
  },
  {
    title: "Customized Gifts",
    description:
      "Personalized gifts created with premium quality and attention to detail.",
    image: "/products/gifts.png",
    scale: "scale-100",
    items: [
      "Mugs",
      "T-Shirts",
      "Photo Frames",
      "Keychains",
      "Acrylic Clocks",
      "UV Acrylic Frames",
      "Customized Gifts",
    ],
  },
  {
    title: "Awards & Displays",
    description:
      "Premium display products for recognition, branding and decoration.",
    image: "/products/acrylic.png",
    scale: "scale-130",
    items: [
      "Acrylic Mementos", "Wedding Mementos",
      "Wooden Mementos",
      "House Name Boards",
      "Office Name Boards",
      "Sign Boards",
    ],
  },
];

export default function Expertise() {
  return (
    <section className="relative py-32 bg-[#05070D]">
      <div className="mx-auto w-[92%] max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 uppercase tracking-[0.35em] text-sm">
            OUR EXPERTISE
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black text-white">
            Everything You Need,
            <br />
            Under One Roof.
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-lg leading-8">
            From wedding invitations to premium printing,
            customized gifts and display products,
            Nova Creative Hub brings your ideas to life.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">

          {expertise.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 p-10">

                <div className="flex justify-between items-start gap-8">

                  <div>

                    <h3 className="text-3xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-slate-400 leading-7 max-w-sm">
                      {item.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">

                      {item.items.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                        >
                          {service}
                        </span>
                      ))}

                    </div>

                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -3 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-[200px] h-[220px] shrink-0 flex items-center justify-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`object-contain ${item.scale} drop-shadow-[0_30px_50px_rgba(0,0,0,.45)]`}
                    />
                  </motion.div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}