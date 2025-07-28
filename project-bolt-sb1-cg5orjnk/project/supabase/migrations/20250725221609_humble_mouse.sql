/*
  # AI Tools Showcase Database Schema

  1. New Tables
    - `ai_tools`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text)
      - `description` (text)
      - `use_case` (text)
      - `phase` (text - discovery, delivery, iteration)
      - `link` (text)
      - `context_window` (text)
      - `free_limit` (text)
      - `created_at` (timestamp)
    - `ratings`
      - `id` (uuid, primary key)
      - `tool_id` (uuid, foreign key)
      - `rating` (integer 1-5)
      - `user_id` (text - browser fingerprint)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access and authenticated rating submission
    
  3. Sample Data
    - Insert 10 essential AI tools for product managers
*/

-- Create ai_tools table
CREATE TABLE IF NOT EXISTS ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text NOT NULL,
  use_case text NOT NULL,
  phase text NOT NULL CHECK (phase IN ('discovery', 'delivery', 'iteration')),
  link text NOT NULL,
  context_window text,
  free_limit text,
  created_at timestamptz DEFAULT now()
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES ai_tools(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read ai_tools"
  ON ai_tools
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read ratings"
  ON ratings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert ratings"
  ON ratings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample AI tools data
INSERT INTO ai_tools (name, logo_url, description, use_case, phase, link, context_window, free_limit) VALUES
('ChatGPT', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100', 'Advanced AI assistant for ideation, research, and content creation', 'Generate user personas, write PRDs, brainstorm feature ideas, and analyze market research', 'discovery', 'https://chat.openai.com', '128K tokens', '20 messages/3hrs (free)'),
('Claude', 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=100', 'AI assistant excelling at analysis, writing, and complex reasoning', 'Analyze user feedback, create technical specifications, and strategic planning', 'discovery', 'https://claude.ai', '200K tokens', '5 messages/hour (free)'),
('Notion AI', 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=100', 'AI-powered writing and productivity tool integrated with Notion', 'Auto-generate meeting notes, summarize research, create project timelines', 'delivery', 'https://notion.so', 'N/A', '20 AI responses (free trial)'),
('Figma AI', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=100', 'AI-enhanced design tool for prototyping and collaboration', 'Generate wireframes, create design variations, automate repetitive design tasks', 'delivery', 'https://figma.com', 'N/A', '3 files (free plan)'),
('Mixpanel', 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=100', 'Product analytics with AI-powered insights and predictions', 'Track user behavior, identify conversion bottlenecks, predict churn', 'iteration', 'https://mixpanel.com', 'N/A', '100K tracked users (free)'),
('Amplitude', 'https://images.pexels.com/photos/669616/pexels-photo-669616.jpeg?auto=compress&cs=tinysrgb&w=100', 'Digital analytics platform with behavioral insights and cohort analysis', 'Understand user journeys, A/B test results, feature adoption tracking', 'iteration', 'https://amplitude.com', 'N/A', '10M actions/month (free)'),
('Perplexity AI', 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=100', 'AI-powered search engine for research and fact-checking', 'Market research, competitor analysis, industry trend discovery', 'discovery', 'https://perplexity.ai', '127K tokens', '5 searches/4hrs (free)'),
('Linear', 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=100', 'Issue tracking and project management with AI-powered automation', 'Auto-triage bugs, predict sprint capacity, generate release notes', 'delivery', 'https://linear.app', 'N/A', '10 team members (free)'),
('Dovetail', 'https://images.pexels.com/photos/3184160/pexels-photo-3184160.jpeg?auto=compress&cs=tinysrgb&w=100', 'User research platform with AI-powered analysis and insights', 'Analyze user interviews, extract themes, generate research summaries', 'discovery', 'https://dovetailapp.com', 'N/A', '3 team members (free)'),
('Hotjar', 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=100', 'User behavior analytics with heatmaps, recordings, and AI insights', 'Understand user interactions, identify UX issues, optimize conversion funnels', 'iteration', 'https://hotjar.com', 'N/A', '35 sessions/day (free)');