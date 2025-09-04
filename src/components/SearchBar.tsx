import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
  project: any;
  category: any;
}

interface SearchBarProps {
  projects: any;
  onResultClick: (projectId: string, categoryId: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ projects, onResultClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const performSearch = (term: string): SearchResult[] => {
    if (!term.trim()) return [];
    
    const results: SearchResult[] = [];
    const lowercaseTerm = term.toLowerCase();
    
    projects.categories.forEach((category: any) => {
      category.projects.forEach((project: any) => {
        const titleMatch = project.title.toLowerCase().includes(lowercaseTerm);
        const descriptionMatch = project.description.toLowerCase().includes(lowercaseTerm);
        const tagMatch = project.tags.some((tag: string) => 
          tag.toLowerCase().includes(lowercaseTerm)
        );
        
        if (titleMatch || descriptionMatch || tagMatch) {
          results.push({ project, category });
        }
      });
    });
    
    return results.slice(0, 8); // Limit to 8 results
  };

  useEffect(() => {
    const results = performSearch(searchTerm);
    setSearchResults(results);
    setShowDropdown(searchTerm.length > 0 && results.length > 0);
  }, [searchTerm, projects]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result.project.id, result.category.id);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowDropdown(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search projects by title, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl mt-2 z-50 max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((result, index) => (
                <div
                  key={`${result.category.id}-${result.project.id}`}
                  onClick={() => handleResultClick(result)}
                  className="p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{result.category.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{result.project.title}</h4>
                          <p className="text-sm text-gray-500">{result.category.title}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{result.project.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.project.difficulty)}`}>
                          {result.project.difficulty}
                        </span>
                        <div className="flex gap-1 flex-wrap">
                          {result.project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span key={tagIndex} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium mb-1">No projects found</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;