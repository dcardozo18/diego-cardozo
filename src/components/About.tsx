import { Code2, Palette, Rocket, Sparkles } from "lucide-react";

const About = () => {
  const skills = [
    { icon: Code2, title: "Development", description: "Full-stack development with modern frameworks" },
    { icon: Palette, title: "Design", description: "UI/UX design with attention to detail" },
    { icon: Rocket, title: "Performance", description: "Optimized and scalable solutions" },
    { icon: Sparkles, title: "Innovation", description: "Creative problem-solving approach" }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer and designer with over 5 years of experience 
              creating digital products that blend beautiful design with powerful functionality.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise spans from front-end development with React and Vue to backend 
              architecture with Node.js and cloud services. I believe in writing clean, 
              maintainable code and creating user experiences that delight.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["React", "TypeScript", "Node.js", "Python", "AWS", "Figma", "PostgreSQL", "GraphQL"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:shadow-glow transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Skills grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.title}
                  className="glass-card rounded-xl p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-bold mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;