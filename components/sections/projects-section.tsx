"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";

// Project data
const projects = [
  {
    id: 1,
    title: "Netflix Landing Page",
    description:"A visually stunning, responsive clone of Netflix’s landing page built to showcase modern frontend development skills. This project replicates the look and feel of Netflix’s homepage with precise layout structure, smooth transitions, hover effects, and mobile responsiveness",
    image:"https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["HTML", "CSS"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/netflix-landing-page",
  },
  {
    id: 2,
    title: "OpenDriveX",
    description:"A backend drive system that mimics basic cloud storage functionality — users can upload, manage, and access files through a robust Express and MongoDB setup",
    image:"https://images.pexels.com/photos/7567458/pexels-photo-7567458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Node.js", "Express", "MongooDB", "Cloudinary"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/drive-project",
  },
  {
    id: 3,
    title: "Next.js LMS",
    description:
      "Frontend interface for a Learning Management System built with Next.js, including sections for course uploads, dashboard analytics, and user interaction.",
    image:
      "https://images.pexels.com/photos/7256811/pexels-photo-7256811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Shadcn UI", "React", "TypeScript", "Next.js"],
    demoUrl: "#",
    repoUrl: "https://github.com/AyushShanu/LMs",
  },
  {
    id: 4,
    title: "My Portfolio",
    description: "Web-based narrative experience with parallax effects and 3D elements",
    image:
      "https://images.pexels.com/photos/4050470/pexels-photo-4050470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["GSAP", "Lenis", "Three.js", "HTML Canvas"],
    demoUrl: "#",
    repoUrl: "#",
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
      className="relative section-padding bg-muted/50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-heading font-bold mb-6">
            Featured <span className="text-gradient-green">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A selection of my work that showcases my skills in interactive development,
            3D web experiences, and creative design solutions.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {project.repoUrl && project.repoUrl !== "#" ? (
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          ) : (
            <Button size="sm" variant="outline" disabled>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          )}

          {project.demoUrl && project.demoUrl !== "#" ? (
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Button>
            </Link>
          ) : (
            <Button size="sm" disabled>
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
