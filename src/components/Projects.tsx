import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ecommerceMockup from "@/assets/ecommerce-mockup.jpg";
import bankingMockup from "@/assets/banking-mockup.jpg";
import saasMockup from "@/assets/saas-mockup.jpg";
import socialMockup from "@/assets/social-mockup.jpg";
import portfolioMockup from "@/assets/portfolio-mockup.jpg";
import fitnessMockup from "@/assets/fitness-mockup.jpg";

const projects = 
[
  {
    "id": 1,
    "title": "Tech Startup Landing Page",
    "description": "Landing page focused on lead generation for a productivity app.",
    "tags": ["HTML", "CSS", "JavaScript", "Bootstrap"],
    "mockupType": "Desktop",
    "gradient": "from-blue-500 to-purple-600",
    "image": "/images/projects/startup-landing.png"
  },
  {
    "id": 2,
    "title": "Urban Clothing E-commerce",
    "description": "Online store with shopping cart and payment integration.",
    "tags": ["React", "Node.js", "MongoDB", "Stripe"],
    "mockupType": "Desktop",
    "gradient": "from-green-500 to-teal-600",
    "image": "/images/projects/urban-store.png"
  },
  {
    "id": 3,
    "title": "Minimalist Personal Portfolio",
    "description": "Professional portfolio website with subtle animations.",
    "tags": ["HTML", "CSS", "JavaScript", "GSAP"],
    "mockupType": "Desktop",
    "gradient": "from-gray-700 to-gray-900",
    "image": "/images/projects/portfolio.png"
  },
  {
    "id": 4,
    "title": "Gastronomy Blog",
    "description": "Recipe blog with search functionality and categories.",
    "tags": ["WordPress", "PHP", "MySQL"],
    "mockupType": "Desktop",
    "gradient": "from-orange-400 to-red-500",
    "image": "/images/projects/food-blog.png"
  },
  {
    "id": 5,
    "title": "Task Manager Web App",
    "description": "To-do list app with CRUD features and cloud storage.",
    "tags": ["React", "Firebase"],
    "mockupType": "Desktop",
    "gradient": "from-indigo-500 to-cyan-600",
    "image": "/images/projects/task-app.png"
  },
  {
    "id": 6,
    "title": "Fitness Mobile App",
    "description": "Responsive app with workout routines and progress tracking.",
    "tags": ["React Native", "Expo", "Firebase"],
    "mockupType": "Mobile",
    "gradient": "from-pink-500 to-rose-600",
    "image": "/images/projects/fitness-app.png"
  },
  {
    "id": 7,
    "title": "Data Analytics Dashboard",
    "description": "Dashboard with metrics visualization and interactive reports.",
    "tags": ["Vue.js", "Chart.js", "TailwindCSS"],
    "mockupType": "Desktop",
    "gradient": "from-blue-600 to-sky-500",
    "image": "/images/projects/dashboard.png"
  },
  {
    "id": 8,
    "title": "Netflix Clone",
    "description": "Streaming platform with categories and video player.",
    "tags": ["React", "Firebase", "TMDB API"],
    "mockupType": "Desktop",
    "gradient": "from-red-600 to-black",
    "image": "/images/projects/netflix-clone.png"
  },
  {
    "id": 9,
    "title": "Travel Agency Website",
    "description": "Website with catalog of travel packages and online booking.",
    "tags": ["Next.js", "TailwindCSS", "Node.js"],
    "mockupType": "Desktop",
    "gradient": "from-teal-400 to-blue-500",
    "image": "/images/projects/travel-agency.png"
  },
  {
    "id": 10,
    "title": "Digital Products Marketplace",
    "description": "Platform for selling templates, ebooks, and online courses.",
    "tags": ["Laravel", "MySQL", "PayPal API"],
    "mockupType": "Desktop",
    "gradient": "from-purple-500 to-pink-600",
    "image": "/images/projects/marketplace.png"
  },
  {
    "id": 11,
    "title": "Recipe Mobile App",
    "description": "App with search by ingredients and illustrated steps.",
    "tags": ["Flutter", "Dart", "SQLite"],
    "mockupType": "Mobile",
    "gradient": "from-amber-400 to-orange-500",
    "image": "/images/projects/recipe-app.png"
  },
  {
    "id": 12,
    "title": "News Website",
    "description": "News portal with categories, highlights, and admin panel.",
    "tags": ["WordPress", "PHP", "MySQL"],
    "mockupType": "Desktop",
    "gradient": "from-gray-500 to-blue-700",
    "image": "/images/projects/news-site.png"
  },
  {
    "id": 13,
    "title": "Online Learning Platform",
    "description": "Educational site with video lessons, forums, and certification.",
    "tags": ["React", "Node.js", "PostgreSQL"],
    "mockupType": "Desktop",
    "gradient": "from-green-400 to-emerald-600",
    "image": "/images/projects/learning-platform.png"
  },
  {
    "id": 14,
    "title": "Real-time Chat App",
    "description": "Messaging app with authentication and live chat.",
    "tags": ["Socket.io", "Node.js", "Express", "MongoDB"],
    "mockupType": "Desktop",
    "gradient": "from-cyan-500 to-blue-700",
    "image": "/images/projects/chat-app.png"
  },
  {
    "id": 15,
    "title": "3D Creative Portfolio",
    "description": "Portfolio site with interactive 3D models and animations.",
    "tags": ["Three.js", "WebGL", "React"],
    "mockupType": "Desktop",
    "gradient": "from-gray-800 to-purple-700",
    "image": "/images/projects/3d-portfolio.png"
  },
  {
    "id": 16,
    "title": "Food Delivery Mobile App",
    "description": "Ordering app with real-time tracking and map integration.",
    "tags": ["React Native", "Firebase", "Google Maps API"],
    "mockupType": "Mobile",
    "gradient": "from-orange-500 to-red-600",
    "image": "/images/projects/delivery-app.png"
  },
  {
    "id": 17,
    "title": "Crowdfunding Platform",
    "description": "Fundraising website with project profiles and payments.",
    "tags": ["Django", "Python", "PostgreSQL"],
    "mockupType": "Desktop",
    "gradient": "from-blue-500 to-indigo-700",
    "image": "/images/projects/crowdfunding.png"
  },
  {
    "id": 18,
    "title": "Personal Finance Mobile App",
    "description": "App for tracking expenses and income with dynamic charts.",
    "tags": ["Flutter", "Firebase", "Hive DB"],
    "mockupType": "Mobile",
    "gradient": "from-emerald-500 to-teal-700",
    "image": "/images/projects/finance-app.png"
  },
  {
    "id": 19,
    "title": "Event Website",
    "description": "Conference site with tickets and interactive agenda.",
    "tags": ["Angular", "Firebase", "Stripe"],
    "mockupType": "Desktop",
    "gradient": "from-indigo-600 to-purple-700",
    "image": "/images/projects/event-site.png"
  },
  {
    "id": 20,
    "title": "AR Virtual Store",
    "description": "E-commerce with augmented reality product previews.",
    "tags": ["React", "AR.js", "Node.js"],
    "mockupType": "Mobile",
    "gradient": "from-pink-500 to-violet-600",
    "image": "/images/projects/ar-store.png"
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