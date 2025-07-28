import { useState, useEffect } from 'react';
import { supabase, AITool } from '../lib/supabase';

export function useAITools() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = async () => {
    try {
      setLoading(true);
      
      // Fetch tools with average ratings
      const { data: toolsData, error: toolsError } = await supabase
        .from('ai_tools')
        .select('*')
        .order('name');

      if (toolsError) throw toolsError;

      // Fetch ratings and calculate averages
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('ratings')
        .select('tool_id, rating');

      if (ratingsError) throw ratingsError;

      // Calculate average ratings
      const ratingMap = new Map<string, number[]>();
      ratingsData?.forEach((rating) => {
        if (!ratingMap.has(rating.tool_id)) {
          ratingMap.set(rating.tool_id, []);
        }
        ratingMap.get(rating.tool_id)!.push(rating.rating);
      });

      const toolsWithRatings = toolsData?.map((tool) => {
        const ratings = ratingMap.get(tool.id) || [];
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
          : 0;
        
        return {
          ...tool,
          average_rating: Math.round(averageRating * 10) / 10
        };
      }) || [];

      setTools(toolsWithRatings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const submitRating = async (toolId: string, rating: number) => {
    try {
      // Generate a simple browser fingerprint
      const userId = `user_${navigator.userAgent.slice(0, 20)}_${Date.now()}`;
      
      const { error } = await supabase
        .from('ratings')
        .insert([{ tool_id: toolId, rating, user_id: userId }]);

      if (error) throw error;
      
      // Refresh tools to get updated ratings
      await fetchTools();
      return true;
    } catch (err) {
      console.error('Error submitting rating:', err);
      return false;
    }
  };

  return {
    tools,
    loading,
    error,
    submitRating,
    refetch: fetchTools
  };
}