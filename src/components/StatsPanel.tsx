import React from 'react';
import { BookOpen, Code, Zap, Trophy } from 'lucide-react';

interface StatsPanelProps {
  totalProjects: number;
  totalCategories: number;
  easyProjects: number;
  hardProjects: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  totalProjects, 
  totalCategories, 
  easyProjects, 
  hardProjects 
}) => {
  const stats = [
    {
      icon: BookOpen,
      label: 'Total Projects',
      value: totalProjects,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Code,
      label: 'Categories',
      value: totalCategories,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Zap,
      label: 'Easy Projects',
      value: easyProjects,
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Trophy,
      label: 'Hard Projects',
      value: hardProjects,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.color} mb-3`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;