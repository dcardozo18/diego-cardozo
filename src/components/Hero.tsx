import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        heroRef.current.style.setProperty('--mouse-x', `${x}px`);
        heroRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ background: 'var(--gradient-mesh)' }}
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'var(--gradient-radial)' }}
      />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-down">
          <span className="gradient-text">Creative</span>{" "}
          <span className="text-foreground">Portfolio</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-up animation-delay-200">
          Crafting digital experiences with elegant design and modern technology
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center animate-fade-up animation-delay-400">
          <button className="px-8 py-3 gradient-border rounded-full hover:shadow-glow transition-all duration-300 hover:scale-105">
            View Projects
          </button>
          <button className="px-8 py-3 glass-card rounded-full hover:bg-secondary transition-all duration-300">
            Contact Me
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;