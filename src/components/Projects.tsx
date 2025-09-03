import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ecommerceMockup from "@/assets/ecommerce-mockup.jpg";
import bankingMockup from "@/assets/banking-mockup.jpg";
import saasMockup from "@/assets/saas-mockup.jpg";
import socialMockup from "@/assets/social-mockup.jpg";
import portfolioMockup from "@/assets/portfolio-mockup.jpg";
import fitnessMockup from "@/assets/fitness-mockup.jpg";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout",
    tags: ["React", "Node.js", "Stripe"],
    mockupType: "desktop" as const,
    gradient: "from-blue-500 to-purple-600",
    image: ecommerceMockup
  },
  {
    id: 2,
    title: "Banking App",
    description: "Secure mobile banking with biometric authentication",
    tags: ["React Native", "TypeScript", "Firebase"],
    mockupType: "mobile" as const,
    gradient: "from-green-500 to-teal-600",
    image: bankingMockup
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization",
    tags: ["Vue.js", "D3.js", "PostgreSQL"],
    mockupType: "desktop" as const,
    gradient: "from-orange-500 to-red-600",
    image: saasMockup
  },
  {
    id: 4,
    title: "Social Media App",
    description: "Connect and share with innovative social features",
    tags: ["Flutter", "GraphQL", "AWS"],
    mockupType: "mobile" as const,
    gradient: "from-pink-500 to-rose-600",
    image: socialMockup
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Creative portfolio with immersive animations",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    mockupType: "desktop" as const,
    gradient: "from-indigo-500 to-blue-600",
    image: portfolioMockup
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Track workouts and nutrition with AI coaching",
    tags: ["Swift", "Core ML", "HealthKit"],
    mockupType: "mobile" as const,
    gradient: "from-yellow-500 to-orange-600",
    image: fitnessMockup
  }
];

const Projects = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured</span> Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing my best work across web and mobile platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="scroll-animate"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;