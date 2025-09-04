import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
}

interface ProjectCardProps {
  project: Project;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isHighlighted = false, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div 
      id={`project-${project.id}`}
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 cursor-pointer ${
        isHighlighted 
          ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg transform scale-105' 
          : 'border-gray-200'
      }`}
    >
      <h3 className="font-semibold text-gray-900 mb-3 text-lg">{project.title}</h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
          {project.difficulty}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;