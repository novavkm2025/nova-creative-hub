"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FloatingProductProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export default function FloatingProduct({
  src,
  alt,
  className,
  delay = 0,
}: FloatingProductProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: [0, -15, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={320}
        height={320}
        className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      />
    </motion.div>
  );
}