"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  featured?: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
  highlights?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Netflix Landing Page",
    description:
      "A pixel-perfect, responsive clone of Netflix's landing page showcasing modern frontend development skills with precise layout structure, smooth transitions, and hover effects.",
    image: "/images/projects/netflix.jpg",
    tags: ["HTML", "CSS", "Responsive Design"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/netflix-landing-page",
    featured: true,
    highlights: ["Pixel-perfect design", "Fully responsive", "Smooth animations"],
  },
  {
    id: 2,
    title: "OpenDriveX",
    description:
      "A robust cloud storage backend system enabling users to upload, manage, and access files seamlessly through Express.js and MongoDB with Cloudinary integration.",
    image: "/images/projects/onedrive.jpg",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/drive-project",
    featured: true,
    highlights: ["RESTful API", "File management", "Cloud integration"],
  },
  {
    id: 3,
    title: "Next.js LMS",
    description:
      "Modern Learning Management System frontend built with Next.js and TypeScript, featuring course management, analytics dashboard, and seamless user interactions.",
    image: "/images/projects/lms.jpg",
    tags: ["Next.js", "TypeScript", "React", "Shadcn UI"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/LMs",
    featured: true,
    highlights: ["Dashboard analytics", "Course management", "Type-safe"],
  },
  {
    id: 4,
    title: "Interactive Portfolio",
    description:
      "Immersive web experience featuring parallax scrolling, 3D elements, and advanced animations using GSAP, Lenis, and Three.js for smooth storytelling.",
    image: "/images/projects/portfolio.jpg",
    tags: ["Three.js", "GSAP", "Lenis", "HTML Canvas"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/my-potfolio",
    highlights: ["3D graphics", "Parallax effects", "Smooth scrolling"],
  },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Code2 className="h-4 w-4" />
            <span className="text-sm font-medium">Featured Work</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Projects That{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Define Excellence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
            A curated collection showcasing my expertise in modern web development, 
            from responsive interfaces to full-stack solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden h-full flex flex-col border-2 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10">
        {/* Project Image with Overlay */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
          />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 gap-1">
                <Sparkles className="h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}

          {/* Quick action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-10 flex gap-2"
          >
            {project.repoUrl && project.repoUrl !== "#" && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full backdrop-blur-sm bg-background/90 hover:bg-background"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {project.demoUrl && project.demoUrl !== "#" && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="default"
                  className="h-10 w-10 rounded-full backdrop-blur-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>

        <CardHeader className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="mt-auto space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-muted hover:bg-muted/80 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {project.repoUrl && project.repoUrl !== "#" ? (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="default"
                  variant="outline"
                  className="w-full group/btn"
                >
                  <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                  View Code
                </Button>
              </Link>
            ) : (
              <Button
                size="default"
                variant="outline"
                className="flex-1"
                disabled
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
            )}

            {/* {project.demoUrl && project.demoUrl !== "#" ? (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button size="default" className="w-full group/btn">
                  <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  Live Demo
                </Button>
              </Link>
            ) : (
              <Button size="default" className="flex-1" disabled>
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            )} */}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
