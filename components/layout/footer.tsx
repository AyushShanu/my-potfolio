import { Logo } from "../ui/logo";
import { Button } from "../ui/button";
import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card/50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-xs">
              A creative frontend developer specializing in immersive experiences, 
              modern UI design, and AI integration.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Email">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollToTop}
            className="mt-4 md:mt-0"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}