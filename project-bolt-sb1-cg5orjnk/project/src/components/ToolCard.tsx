import React from 'react';
import { ExternalLink, Zap, Clock, Users } from 'lucide-react';
import { AITool } from '../lib/supabase';
import { StarRating } from './StarRating';

interface ToolCardProps {
  tool: AITool;
  onClick: (tool: AITool) => void;
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

export function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
      onClick={() => onClick(tool)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {tool.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                    phaseColors[tool.phase]
                  }`}
                >
                  <span>{phaseIcons[tool.phase]}</span>
                  {tool.phase}
                </span>
              </div>
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {tool.context_window && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Context: {tool.context_window}</span>
            </div>
          )}
          {tool.free_limit && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Zap className="w-3 h-3" />
              <span>Free: {tool.free_limit}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <StarRating rating={tool.average_rating || 0} readonly size="sm" />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3 h-3" />
            <span>Rate this tool</span>
          </div>
        </div>
      </div>
    </div>
  );
}