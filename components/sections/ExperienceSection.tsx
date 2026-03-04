"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, TrendingUp, Code2, Sparkles, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    company: "Synchormedia Technologies",
    role: "AI Automation Engineer (Contractual)",
    duration: "October 2025 - Present",
    description:
      "Building and maintaining an automation and integrations platform by developing scalable connectors and workflow configurations. Responsible for implementing dynamic UI components, handling OAuth authentication flows, integrating third-party APIs, and resolving platform-level frontend issues to ensure seamless user experience.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Node.js",
      "REST APIs",
      "OAuth",
      "Git",
      "Shadcn UI",
      "AI Integrations"
    ],
    achievements: [
      "Developed 15+ custom OAuth connectors for third-party integrations",
      "Improved platform performance by 40% through optimized React components",
      "Built dynamic workflow builder with drag-and-drop functionality",
      "Reduced integration setup time by 60% with automated configuration"
    ],
    type: "current"
  },
  {
    company: "Synchormedia Technologies",
    role: "Frontend Developer Intern",
    duration: "March 2025 - September 2025",
    description:
      "Contributed to the development of an automation and integrations platform by building connector configuration interfaces and workflow components. Assisted in implementing OAuth authentication flows, integrating third-party APIs, and resolving frontend issues to improve platform usability and performance.",
    technologies: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Node.js",
      "REST APIs",
      "OAuth 2.0",
      "Git",
      "AI Integrations"
    ],
    achievements: [
      "Built 10+ reusable UI components using TypeScript and React",
      "Implemented OAuth 2.0 authentication flows for 5+ connectors",
      "Collaborated with backend team to integrate 20+ REST APIs",
      "Fixed 50+ frontend bugs improving overall platform stability"
    ],
    type: "past"
  },
  {
    company: "Salesine Technologies",
    role: "Web Developer Intern",
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
      "Prompting",
      "Shadcn UI",
    ],
    achievements: [
      "Developed responsive LMS hero section",
      "Created interactive course cards with hover effects",
      "Collaborated with design team to implement pixel-perfect UI"
    ],
    type: "past"
  },
];

const skillCategories = [
  {
    category: "Frontend Frameworks",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
    ]
  },
  {
    category: "Styling & Animation",
    skills: [
      { name: "TailwindCSS", level: 90 },
      { name: "Framer Motion", level: 75 },
      { name: "Shadcn UI", level: 85 },
    ]
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Supabase", level: 75 },
      { name: "MongoDB", level: 65 },
    ]
  },
  {
    category: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "REST APIs", level: 80 },
      { name: "AI Tools", level: 90 },
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Briefcase className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Professional Journey</span>
        </div>
        <h2 className="text-5xl font-bold mb-4">
          My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Experience</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          1+ year of building impactful products with modern technologies
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Animated Progress Line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border/30" />
        <motion.div
          className="absolute left-6 md:left-8 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"
          style={{ height: lineHeight }}
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-16 md:pl-20 group"
            >
              {/* Timeline Dot */}
              <motion.div
                whileHover={{ scale: 1.5, rotate: 180 }}
                className="absolute left-[13px] md:left-[17px] top-6 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 flex items-center justify-center cursor-pointer z-10"
              >
                {exp.type === "current" ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </motion.div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 md:p-8 shadow-lg border border-border/50 backdrop-blur-sm overflow-hidden group-hover:shadow-xl group-hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Current Badge */}
                {exp.type === "current" && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-purple-600 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-purple-500" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="px-3 py-1 bg-muted/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-32"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Technical Expertise</span>
          </div>
          <h3 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Proficiency levels in technologies I work with daily
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <h4 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                {category.category}
              </h4>
              <div className="space-y-5">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-sm font-medium text-foreground cursor-pointer hover:text-purple-600 transition-colors"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {skill.name}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ${
                          hoveredSkill === skill.name ? "shadow-lg shadow-purple-500/50" : ""
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: "Years Experience", value: "1+" },
            { label: "Repositories", value: "12" },
            { label: "Technologies", value: "12+" },
            { label: "Code Commits", value: "500+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 text-center border border-purple-500/20 backdrop-blur-sm cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
