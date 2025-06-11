"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Mail, Send, Linkedin, Github, Instagram } from "lucide-react";
import Link from "next/link";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsSubmitting(true);

  const promise = async () => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error("Database insert failed");

    const emailRes = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!emailRes.ok) throw new Error("Email send failed");

    return res.json();
  };

  toast.promise(promise(), {
    loading: "Sending your message...",
    success: () => {
      form.reset();
      return "Message sent successfully! 🚀";
    },
    error: (err: Error) =>
      err.message || "Something went wrong. Please try again later.",
  });

  setIsSubmitting(false);
}
  return (
    <section id="contact" ref={containerRef} className="relative section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading font-bold mb-6">
            Get In <span className="text-gradient-blue">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Interested in working together? Have a project in mind or just want to connect?
            Drop me a message and I will get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>
                Fill out the form below to contact me directly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project or question..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
              <CardDescription>
                Find me on these platforms or reach out directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>dhuliyaayush1601@gmail.com</span>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Social Profiles</h4>
                <div className="flex flex-col space-y-3">
                  <Link href="https://github.com/AyushShanu/SigmaWEBDEVCOU" target="_blank">
                    <Button variant="outline" className="justify-start w-full">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/ayush-dhuliya-17a9ba240/" target="_blank">
                    <Button variant="outline" className="justify-start w-full">
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </Button>
                  </Link>
                  <Link href="" target="_blank">
                    <Button variant="outline" className="justify-start w-full">
                      <Instagram className="mr-2 h-5 w-5" />
                      Instagram
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Availability</h4>
                <p className="text-muted-foreground text-sm">
                  Currently available for freelance projects and collaborations.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
