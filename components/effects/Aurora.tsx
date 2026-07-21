"use client";

import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Blue */}
      <motion.div
        animate={{
          x: [-80, 80, -80],
          y: [-50, 40, -50],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-250px] top-[-120px] h-[650px] w-[650px] rounded-full bg-cyan-500/20 blur-[180px]"
      />

      {/* Magenta */}
      <motion.div
        animate={{
          x: [60, -60, 60],
          y: [30, -40, 30],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-220px] bottom-[-120px] h-[600px] w-[600px] rounded-full bg-fuchsia-500/20 blur-[180px]"
      />

      {/* Purple */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[180px]"
      />

    </div>
  );
}