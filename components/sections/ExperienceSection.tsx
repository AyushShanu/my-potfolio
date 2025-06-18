"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const experiences = [
  {
    company: "Bizyou Technologies",
    role: "Frontend Developer Intern",
    duration: "September 2024 - March 2025",
    description:
      "Contributed to the development of a dynamic LMS platform using Next.js and TailwindCSS, enhancing user experience through responsive design and interactive features.",
    technologies: [
      "Next.js",
      "TailwindCSS",
      "React",
      "GitHub",
      "TypeScript",
      "AI Tools",
      "Promting",
      "Shadcn UI",
    ],
  },
];

const globalSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Three.js",
  "Framer Motion",
  "Tailwind",
  "Supabase",
  "Git",
  "Node.js",
  "AI Tools"
];

export default function ExperienceSection() {
  return (
    <section className="relative py-24 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold mb-4">
          My <span className="text-gradient-purple">Experience</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A journey through companies, code, and creative problem-solving.
        </p>
      </motion.div>

      <div className="relative border-l-4 border-border/20 pl-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative mb-14 group"
          >
            <div className="absolute -left-[38px] top-1 w-6 h-6 rounded-full border-4 border-purple-500 bg-background transition-transform group-hover:scale-125 group-hover:rotate-180 duration-300 cursor-pointer shadow-lg shadow-purple-500/30" />

            <div className="bg-card rounded-xl p-6 shadow-md border border-border transition-all group-hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
              <div className="text-muted-foreground text-sm mb-3">
                {exp.company} — <span>{exp.duration}</span>
              </div>
              <p className="text-base mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    className="bg-muted text-xs hover:scale-105 hover:bg-gradient-to-r from-purple-400 to-pink-500 transition-transform duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-4">
          <span className="text-gradient-purple">My</span> Skills
        </h3>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          A visual representation of my core capabilities.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {globalSkills.map((skill, i) => (
            <div
              key={i}
              className="w-32 h-32 rounded-full border-[3px] border-purple-500 flex items-center justify-center text-sm font-medium text-white bg-gradient-to-br from-purple-600/20 to-purple-900/20 hover:from-purple-600/50 hover:to-purple-900/50 hover:scale-105 hover:rotate-[6deg] transition-transform duration-500 cursor-pointer shadow-md shadow-purple-500/20 backdrop-blur-md"
            >
              {skill}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}