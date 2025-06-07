"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CanvasContainer } from "../3d/canvas-container";
import { MorphingBlob } from "../3d/morphing-blob";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative section-padding"
    >
      <div className="container mx-auto px-4">
        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
        >
           <div className="relative aspect-square md:aspect-auto md:h-[500px]">
            {/* Visual component for the about section */}
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-br from-accent/30 to-secondary/30 dark:from-accent/20 dark:to-primary/20">
              <CanvasContainer interactive controls>
                <MorphingBlob
                  color="#7c3aed"
                  emissiveColor="#4c1d95"
                  emissiveIntensity={0.4}
                  speed={0.5}
                  complexity={3}
                  scale={1.8}
                  position={[0, 0, 0]}
                  interactive={true}
                />
              </CanvasContainer>
            </div>
          </div>

          <div>
            <h2 className="section-heading font-bold mb-6">
              About <span className="text-gradient-blue">Me</span>
            </h2>
            
            <div className="space-y-4 text-lg">
              <p>
              I am a frontend developer who loves building immersive and interactive experiences that blend design, tech, and creativity. I started with basic web development, but now I am exploring 3D on the web and using AI tools to make my designs even better. I care about making things that look beautiful and feel amazing to use, and I am always learning, experimenting, and growing through hands-on work.
              </p>
              
              <p>
              I always love pushing creative boundaries—from clean UIs to dynamic 3D visuals. I love mixing design sense with new-age tech like AI to craft experiences that not only work well but feel unique. For me, it’s all about creating something that stands out and makes people say " this feels different."
              </p>
              
              <p>
              I create frontend experiences where every pixel has purpose and every interaction feels alive. Whether it’s designing smooth UI flows or experimenting with AI and 3D on the web, I’m all in on using tech creatively. I thrive on turning ideas into visually stunning, user-focused projects that leave a lasting impact.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Technologies I Love</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Three.js", "Framer Motion", "Tailwind CSS", "TypeScript", "AI Tools","DataBases"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}