import React from 'react';
import ProjectCard from './ProjectCard';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  projects: any[];
}

interface CategorySectionProps {
  category: Category;
  highlightedProject?: string;
  onProjectClick?: (project: any, category: Category) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, highlightedProject, onProjectClick }) => {
  return (
    <section id={`category-${category.id}`} className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
          <p className="text-gray-600 text-lg">{category.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isHighlighted={highlightedProject === project.id}
            onClick={() => onProjectClick?.(project, category)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;