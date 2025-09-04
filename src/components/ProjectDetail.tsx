import React from 'react';
import { ArrowLeft, Clock, Users, Star, Code, ExternalLink, Download, Play } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
}

interface ProjectDetailProps {
  project: Project;
  category: Category;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, category, onBack }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getEstimatedTime = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '1-3 days';
      case 'medium': return '1-2 weeks';
      case 'hard': return '2-4 weeks';
      default: return 'Variable';
    }
  };

  const getTeamSize = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '1 person';
      case 'medium': return '1-2 people';
      case 'hard': return '2-4 people';
      default: return 'Variable';
    }
  };

  const generateFeatures = (project: Project) => {
    const baseFeatures = [
      'User-friendly interface',
      'Responsive design',
      'Error handling',
      'Input validation'
    ];

    const difficultyFeatures = {
      easy: ['Basic functionality', 'Simple UI components'],
      medium: ['Database integration', 'User authentication', 'API integration'],
      hard: ['Advanced algorithms', 'Real-time features', 'Scalable architecture', 'Security implementation']
    };

    return [...baseFeatures, ...difficultyFeatures[project.difficulty as keyof typeof difficultyFeatures] || []];
  };

  const generateTechStack = (project: Project, category: Category) => {
    const baseTech = ['HTML', 'CSS', 'JavaScript'];
    
    if (category.id === 'python') return ['Python', 'Flask/Django', 'SQLite/PostgreSQL'];
    if (category.id === 'java') return ['Java', 'Spring Boot', 'MySQL', 'Maven'];
    if (category.id === 'c-language') return ['C', 'GCC Compiler', 'Make', 'Standard Libraries'];
    if (category.id === 'frontend') return [...baseTech, 'React/Vue', 'Tailwind CSS', 'TypeScript'];
    if (category.id === 'fullstack') return [...baseTech, 'Node.js', 'Express', 'MongoDB/PostgreSQL', 'React'];
    if (category.id === 'app-development') return ['React Native', 'Expo', 'AsyncStorage', 'Native APIs'];
    
    return [...baseTech, 'Framework of choice', 'Database'];
  };

  const generateLearningOutcomes = (project: Project) => {
    const baseOutcomes = ['Problem-solving skills', 'Code organization', 'Testing and debugging'];
    
    const difficultyOutcomes = {
      easy: ['Basic programming concepts', 'UI/UX fundamentals'],
      medium: ['Database design', 'API development', 'State management'],
      hard: ['System architecture', 'Performance optimization', 'Security best practices', 'Scalability patterns']
    };

    return [...baseOutcomes, ...difficultyOutcomes[project.difficulty as keyof typeof difficultyOutcomes] || []];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Projects
          </button>
          
          <div className="flex items-start gap-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <span className="text-3xl">{category.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-xl text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{getEstimatedTime(project.difficulty)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{getTeamSize(project.difficulty)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>{category.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.description} This project is designed to help you master key programming concepts 
                  while building something practical and impressive for your portfolio.
                </p>
              </div>
            </section>

            {/* Key Features */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generateFeatures(project).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Outcomes */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generateLearningOutcomes(project).map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Implementation Steps */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Steps</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Planning & Design</h3>
                    <p className="text-gray-600">Define requirements, create wireframes, and plan the project structure.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Setup & Environment</h3>
                    <p className="text-gray-600">Initialize the project, set up development environment, and install dependencies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Core Development</h3>
                    <p className="text-gray-600">Implement the main functionality and core features of the application.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Testing & Refinement</h3>
                    <p className="text-gray-600">Test thoroughly, fix bugs, and polish the user experience.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Deployment</h3>
                    <p className="text-gray-600">Deploy the application and make it accessible to users.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium text-gray-900">{getEstimatedTime(project.difficulty)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Team Size:</span>
                  <span className="font-medium text-gray-900">{getTeamSize(project.difficulty)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{category.title}</span>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Recommended Tech Stack</h3>
              <div className="space-y-2">
                {generateTechStack(project, category).map((tech, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Project Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Get Started</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  <Play className="h-4 w-4" />
                  Start Building
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                  <Download className="h-4 w-4" />
                  Download Template
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                  <ExternalLink className="h-4 w-4" />
                  View Examples
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;