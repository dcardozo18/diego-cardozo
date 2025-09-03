import { ExternalLink, Github } from "lucide-react";
import MacbookMockup from "./MacbookMockup";
import IphoneMockup from "./IphoneMockup";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    mockupType: "desktop" | "mobile";
    gradient: string;
    image: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
      {/* Gradient background on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
      />
      
      <div className="relative z-10">
        {/* Device mockup */}
        <div className="mb-6 overflow-hidden rounded-xl">
          {project.mockupType === "desktop" ? (
            <MacbookMockup imageSrc={project.image} />
          ) : (
            <IphoneMockup imageSrc={project.image} />
          )}
        </div>

        {/* Project info */}
        <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-4 h-4" />
            Source
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;