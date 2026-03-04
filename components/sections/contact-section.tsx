"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Mail, Phone, Download, Linkedin, Github, MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "dhuliyaayush1601@gmail.com",
    href: "null",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7037911601",
    href: "null", 
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
    description: "Open to freelance projects, full-time opportunities, and collaborations",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/AyushShanu",
    username: "@AyushShanu",
    color: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayush-dhuliya-17a9ba240/",
    username: "Ayush Dhuliya",
    color: "hover:bg-blue-50 dark:hover:bg-blue-950",
  },
];

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Make sure to add your resume.pdf to the public folder
    link.download = 'Ayush_Dhuliya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" ref={containerRef} className="relative section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading font-bold mb-6">
            Let's <span className="text-gradient-blue">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            I'm always open to discussing new opportunities, projects, or just having a chat about web development.
            Feel free to reach out through any of the channels below!
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Methods Cards */}
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{method.label}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                      {method.href ? (
                        <p 
                          className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          {method.value}
                          <ExternalLink className="h-3 w-3" />
                        </p>
                      ) : (
                        <p className="text-sm font-medium">{method.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={{ opacity, y }} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Resume Download Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Download My Resume
              </CardTitle>
              <CardDescription>
                Get a detailed overview of my experience, skills, and projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: October 2025</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Includes comprehensive details about my frontend development experience, technical skills, and notable projects.
                </p>
              </div>
              <Button 
                onClick={handleDownloadResume}
                className="w-full group"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume (PDF)
              </Button>
            </CardContent>
          </Card>

          {/* Social Links Card */}
          <Card>
            <CardHeader>
              <CardTitle>Connect on Social Media</CardTitle>
              <CardDescription>
                Follow me on these platforms to stay updated with my work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-between group ${social.color} transition-all duration-300`}
                      size="lg"
                    >
                      <div className="flex items-center gap-3">
                        <social.icon className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-semibold">{social.label}</p>
                          <p className="text-xs text-muted-foreground">{social.username}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Available for Work</h4>
                    <p className="text-xs text-muted-foreground">
                      Open to freelance projects, full-time opportunities, and collaborations
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
