"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Sparkles, Zap, TrendingUp } from "lucide-react";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const stats = [
    { icon: Code2, label: "Year of Experience", value: "1+" },
    { icon: Sparkles, label: "Projects Built", value: "3" },
    { icon: Zap, label: "Technologies and AI tools known", value: "10+" },
    { icon: TrendingUp, label: "Always Learning", value: "100%" },
  ];

 const codeSnippet = `const developer = {
  name: "Ayush",
  role: "AI Automation Engineer",
  experience: "1+ year",
  specialization: "Workflow Systems & Integrations",
  coreSkills: [
    "API Orchestration",
    "OAuth 2.0",
    "REST APIs",
    "React",
    "TypeScript",
    "Node.js"
  ],
  currentFocus: "Building Scalable Automation Platforms",
}`;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 md:py-32"
    >
      <div className="container mx-auto px-4">
        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
        >
          {/* Left Side - Visual Element */}
          <div className="relative order-2 md:order-1">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-8 h-8 text-blue-500 mb-3" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-6 rounded-xl border border-slate-700/50 overflow-hidden"
            >
              {/* Window Controls */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Code Content */}
              <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>

              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 md:order-2">
  <h2 className="text-4xl md:text-5xl font-bold mb-6">
    About <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Me</span>
  </h2>
  
  <div className="space-y-4 text-lg text-muted-foreground">
    <p>
      I am an <strong className="text-foreground">AI Automation Engineer</strong> with hands-on experience building workflow systems and integration platforms. I specialize in designing connector's frontend as well as backend logic that enable seamless communication between services.
    </p>
    
    <p>
      My work involves developing <strong className="text-foreground">API-driven architectures</strong>, implementing <strong className="text-foreground">OAuth authentication flows</strong>, orchestrating multi-step workflows, and building dynamic configuration interfaces that simplify complex automation logic.
    </p>
    
    <p>
      I focus on system thinking — understanding how triggers, actions, APIs, and user interactions connect into a reliable automation pipeline. <strong className="text-foreground">I don’t just build interfaces; I build systems that make platforms work intelligently and efficiently.</strong>
    </p>
  </div>
  
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
      <Sparkles className="w-6 h-6 text-blue-500" />
      Core Expertise
    </h3>
    <div className="flex flex-wrap gap-2">
      {[
        "Workflow Automation",
        "API Orchestration",
        "OAuth 2.0",
        "REST APIs",
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "AI Integrations",
        "System Design Fundamentals"
      ].map((tech) => (
        <span 
          key={tech} 
          className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 hover:from-blue-500/20 hover:to-purple-500/20 dark:hover:from-blue-500/30 dark:hover:to-purple-500/30 rounded-full text-sm font-medium border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 cursor-default"
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
