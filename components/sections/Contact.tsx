"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const contacts = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 90488 42580",
    href: "tel:+919048842580",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91 90488 42580",
    href: "https://wa.me/919048842580",
  },
  {
    icon: Mail,
    title: "Email",
    value: "novavkm2025@gmail.com",
    href: "mailto:novavkm2025@gmail.com",
  },
  {
    icon: MapPin,
    title: "Visit Our Creative Studio",
    value: "Vallikunnam, Kayamkulam",
    href: "https://www.google.com/maps/place/Nova+Creative+Hub/data=!4m2!3m1!1s0x0:0x9f98f17d66ea0e02?sa=X&ved=1t:2428&ictx=111",
  },
];

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-[#05070D] py-32">

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[180px]" />

      <div className="relative mx-auto w-[92%] max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mb-20 text-center"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
            CONTACT US
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black text-white">
            Let's Bring Your
            <br />
            Ideas to Life.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Whether it's a wedding invitation, premium printing,
            customized gifts or acrylic products, we're ready to
            create something amazing together.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {contacts.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .08,
                  duration: .6,
                }}
                whileHover={{ y: -8 }}
                className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20">
                  <Icon className="text-cyan-300" size={28} />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {item.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .3 }}
          className="mt-16 overflow-hidden rounded-[32px] border border-white/10"
        >
          <iframe
            src="https://www.google.com/maps?q=Nova%20Creative%20Hub%20Vallikunnam&output=embed"
            width="100%"
            height="500"
            loading="lazy"
            className="border-0"
          />
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">

          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Visit Our Studio
            </h3>

            <p className="leading-8 text-slate-400">
              Nova Creative Hub
              <br />
              Kuttiyilayyathu Building
              <br />
              Puthenchantha
              <br />
              Vallikunnam
              <br />
              Kayamkulam
              <br />
              Alappuzha District
              <br />
              Kerala - 690501
              <br />
              India
            </p>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-white">
              <Clock className="text-cyan-300" />
              Working Hours
            </h3>

            <div className="space-y-3 text-slate-400">
              <p>Monday – Saturday : 10:00 AM – 8:00 PM</p>
              <p>Sunday : Holiday</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}