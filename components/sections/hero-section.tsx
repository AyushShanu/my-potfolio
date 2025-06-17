"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CanvasContainer } from "../3d/canvas-container";
import { GeometricParticles } from "../3d/geometric-particles";
import { Button } from "../ui/button";
import { ArrowDownCircle } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleScroll = () => {
    const aboutSection = document.getElementById("project");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center"
    >
      <div className="absolute inset-0">
        <CanvasContainer>
          <GeometricParticles count={150} size={0.15} speed={0.1} />
        </CanvasContainer>
      </div>

      <div className="container relative mx-auto px-4 py-20 pt-32 md:pt-0">
        <motion.div
          style={{ opacity, scale, y }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-heading font-bold mb-4"
          >
            <span className="block">Building </span>
            <span className="text-gradient-purple">Future-Forward</span>
            <span className="block">Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto"
          >
           Frontend developer who loves building immersive interfaces, exploring 3D web experiences, and using AI tools to level up my design workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-4"
          >
            <Button size="lg" onClick={handleScroll}>
              Explore Work
            </Button>
            <Button size="lg" variant="outline" onClick={handleScroll}>
              Get to Know Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
            onClick={handleScroll}
          >
            <ArrowDownCircle className="text-foreground/70 w-10 h-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}