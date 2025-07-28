import React from 'react';
import { Filter, SortDesc } from 'lucide-react';

interface FilterSortProps {
  selectedPhase: string;
  sortBy: string;
  onPhaseChange: (phase: string) => void;
  onSortChange: (sort: string) => void;
}

export function FilterSort({ selectedPhase, sortBy, onPhaseChange, onSortChange }: FilterSortProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Phase Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={selectedPhase}
          onChange={(e) => onPhaseChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Phases</option>
          <option value="discovery">🔍 Discovery</option>
          <option value="delivery">🚀 Delivery</option>
          <option value="iteration">🔄 Iteration</option>
        </select>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <SortDesc className="w-5 h-5 text-gray-500" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
          <option value="phase">Sort by Phase</option>
        </select>
      </div>
    </div>
  );
}