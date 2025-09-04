import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CategorySection from './components/CategorySection';
import FilterPanel from './components/FilterPanel';
import StatsPanel from './components/StatsPanel';
import ProjectDetail from './components/ProjectDetail';
import { Code2, Github, ExternalLink } from 'lucide-react';
import projectsData from './data/projects.json';

function App() {
  const [highlightedProject, setHighlightedProject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState(projectsData.categories);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<any>(null);

  const handleResultClick = (projectId: string, categoryId: string) => {
    // Find the project and category
    const category = projectsData.categories.find(cat => cat.id === categoryId);
    const project = category?.projects.find(proj => proj.id === projectId);
    
    if (project && category) {
      setSelectedProject(project);
      setSelectedProjectCategory(category);
      return;
    }
    
    // Fallback to highlighting if project not found
    setHighlightedProject(projectId);
    
    // Scroll to the project with smooth animation
    setTimeout(() => {
      const element = document.getElementById(`project-${projectId}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);

    // Clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedProject('');
    }, 3000);
  };

  const handleProjectClick = (project: any, category: any) => {
    setSelectedProject(project);
    setSelectedProjectCategory(category);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setSelectedProjectCategory(null);
  };

  useEffect(() => {
    let filtered = projectsData.categories;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(category => category.id === selectedCategory);
    }

    // Filter by difficulty within categories
    if (selectedDifficulty !== 'all') {
      filtered = filtered.map(category => ({
        ...category,
        projects: category.projects.filter(project => project.difficulty === selectedDifficulty)
      })).filter(category => category.projects.length > 0);
    }

    setFilteredCategories(filtered);
  }, [selectedDifficulty, selectedCategory]);

  const totalProjects = projectsData.categories.reduce((sum, category) => sum + category.projects.length, 0);
  const easyProjects = projectsData.categories.reduce((sum, category) => 
    sum + category.projects.filter(p => p.difficulty === 'easy').length, 0);
  const hardProjects = projectsData.categories.reduce((sum, category) => 
    sum + category.projects.filter(p => p.difficulty === 'hard').length, 0);

  // Show project detail if a project is selected
  if (selectedProject && selectedProjectCategory) {
    return (
      <ProjectDetail
        project={selectedProject}
        category={selectedProjectCategory}
        onBack={handleBackToProjects}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Code2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Project Ideas Hub</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover your next coding adventure with our curated collection of projects across 15 categories. 
              From beginner-friendly mini projects to advanced enterprise systems.
            </p>
          </div>

          <SearchBar 
            projects={projectsData} 
            onResultClick={handleResultClick}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <StatsPanel 
          totalProjects={totalProjects}
          totalCategories={projectsData.categories.length}
          easyProjects={easyProjects}
          hardProjects={hardProjects}
        />

        <FilterPanel
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={projectsData.categories}
        />

        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <CategorySection 
              key={category.id} 
              category={category}
              highlightedProject={highlightedProject}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects match your filters</h3>
            <p className="text-gray-600">Try adjusting your difficulty level or category selection.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="h-6 w-6" />
                <span className="font-bold text-xl">Project Ideas Hub</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering developers with curated project ideas to enhance skills and build impressive portfolios.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">All Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Beginner Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Advanced Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Submit Ideas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © 2025 Project Ideas Hub. Inspiring developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;