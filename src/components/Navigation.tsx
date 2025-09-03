import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-card py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="gradient-text">Portfolio</span>
        </div>
        
        <div className="hidden md:flex gap-8">
          {["home", "projects", "about", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={cn(
                "nav-link capitalize",
                activeSection === section && "active"
              )}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5">
          <span className="w-full h-0.5 bg-foreground transition-all" />
          <span className="w-full h-0.5 bg-foreground transition-all" />
          <span className="w-full h-0.5 bg-foreground transition-all" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;