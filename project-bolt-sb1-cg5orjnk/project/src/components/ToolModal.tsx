import React, { useState } from 'react';
import { X, ExternalLink, Lightbulb, Target, Star } from 'lucide-react';
import { AITool } from '../lib/supabase';
import { StarRating } from './StarRating';

interface ToolModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
  onRate: (toolId: string, rating: number) => Promise<boolean>;
}

const phaseColors = {
  discovery: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  delivery: 'bg-blue-100 text-blue-800 border-blue-200',
  iteration: 'bg-purple-100 text-purple-800 border-purple-200'
};

const phaseIcons = {
  discovery: '🔍',
  delivery: '🚀',
  iteration: '🔄'
};

export function ToolModal({ tool, isOpen, onClose, onRate }: ToolModalProps) {
  const [isRating, setIsRating] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  if (!isOpen || !tool) return null;

  const handleRate = async (rating: number) => {
    setIsRating(true);
    const success = await onRate(tool.id, rating);
    setIsRating(false);
    
    if (success) {
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {tool.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {tool.name}
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                    phaseColors[tool.phase]
                  }`}
                >
                  <span>{phaseIcons[tool.phase]}</span>
                  {tool.phase}
                </span>
                <StarRating rating={tool.average_rating || 0} readonly size="sm" />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              What it does
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Use Case */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              How Product Managers use it
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {tool.use_case}
            </p>
          </div>

          {/* Tool Features */}
          {(tool.context_window || tool.free_limit) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.context_window && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Context Window: {tool.context_window}</span>
                  </div>
                )}
                {tool.free_limit && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Free Tier: {tool.free_limit}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Rate this tool
            </h3>
            
            {showThankYou ? (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-green-600 font-medium">Thanks for your rating!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-600 text-center">
                  Help other product managers by sharing your experience
                </p>
                <StarRating
                  rating={0}
                  onRate={handleRate}
                  size="lg"
                />
                {isRating && (
                  <div className="text-sm text-gray-500">Submitting rating...</div>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex gap-3">
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-5 h-5" />
              Visit {tool.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}