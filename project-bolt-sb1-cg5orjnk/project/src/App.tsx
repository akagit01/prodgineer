import React, { useState, useMemo } from 'react';
import { Brain, Sparkles, Github, ExternalLink } from 'lucide-react';
import { useAITools } from './hooks/useAITools';
import { ToolCard } from './components/ToolCard';
import { ToolModal } from './components/ToolModal';
import { FilterSort } from './components/FilterSort';
import { AITool } from './lib/supabase';

function App() {
  const { tools, loading, error, submitRating } = useAITools();
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools;

    // Filter by phase
    if (selectedPhase) {
      filtered = filtered.filter(tool => tool.phase === selectedPhase);
    }

    // Sort tools
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'phase':
          return a.phase.localeCompare(b.phase);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [tools, selectedPhase, sortBy]);

  const handleToolClick = (tool: AITool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTool(null), 300);
  };

  const handleRate = async (toolId: string, rating: number) => {
    return await submitRating(toolId, rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading AI tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">
            Unable to load AI tools. Please check your Supabase configuration.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <p className="text-sm text-red-800 font-mono">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Tools for Product Managers
                </h1>
                <p className="text-gray-600 text-sm">
                  Discover essential AI tools for every stage of product development
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span>{tools.length} tools available</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Supercharge Your Product Development
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial discovery to iteration and optimization, these AI-powered tools will help you make better decisions, 
            work more efficiently, and build products your users will love.
          </p>
        </div>

        {/* Filter and Sort */}
        <FilterSort
          selectedPhase={selectedPhase}
          sortBy={sortBy}
          onPhaseChange={setSelectedPhase}
          onSortChange={setSortBy}
        />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAndSortedTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={handleToolClick}
            />
          ))}
        </div>

        {filteredAndSortedTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more tools.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Built with React, TypeScript, Tailwind CSS, and Supabase
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>Source Code</span>
              </a>
              <a
                href="https://netlify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Deploy on Netlify</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <ToolModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRate={handleRate}
      />
    </div>
  );
}

export default App;