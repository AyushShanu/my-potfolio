"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground"
      >
        <Terminal size={18} />
      </motion.div>
      <span className="font-medium text-lg">
        <span className="text-gradient-purple">Ayush</span>Portfolio
      </span>
    </Link>
  );
}