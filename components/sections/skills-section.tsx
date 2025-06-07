"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { CanvasContainer } from "../3d/canvas-container";
import { GeometricParticles } from "../3d/geometric-particles";

// Skill categories
const skillCategories = [
  {
    name: "Frontend Development",
    skills: [
      { name: "React / Next.js", level: 80 },
      { name: "Three.js / WebGL", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "CSS / Tailwind", level: 80 },
    ],
  },

  {
    name: "Design",
    skills: [
      { name: "UI/UX Design", level: 60 },
      { name: "Design Systems", level: 60 },
      { name: "Figma", level:50 },
      { name: "Visual Design", level: 50 },
    ],
  },
  {
    name: "AI & Tools",
    skills: [
      { name: "Prompt Engineering", level: 65 },
      { name: "AI-assisted Design", level: 70 },
      { name: "LLM Integration", level: 60 },
      { name: "Developer Tools", level: 70 },
    ],
  },
 {
    name: "Git & Version Control",
    skills: [
      { name: "Version Control", level: 60 },
      { name: "Pull Requests & Code Reviews", level: 65 },
      { name: "Collaboration with GitHub", level: 60 },
      { name: "CLI Git Commands", level: 75 },
    ],
  },
];

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative section-padding"
    >
      <CanvasContainer>
        <GeometricParticles count={50} size={0.1} speed={0.05} />
      </CanvasContainer>

      <div className="container mx-auto px-4">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-heading font-bold mb-6">
            My <span className="text-gradient-purple">Skills</span> & Expertise
          </h2>
          <p className="text-lg text-muted-foreground">
            I blend technical expertise with creative problem-solving to deliver standout digital experiences.
            My skills span development, design, and emerging technologies.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={category.name}
              category={category}
              index={categoryIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCategory({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">{category.name}</h3>
          <div className="space-y-6">
            {category.skills.map((skill, skillIndex) => (
              <SkillItem
                key={skill.name}
                skill={skill}
                index={skillIndex}
                categoryIndex={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SkillItem({ skill, index, categoryIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.1) }}
      className="space-y-2"
    >
      <div className="flex justify-between">
        <span>{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2" />
    </motion.div>
  );
}