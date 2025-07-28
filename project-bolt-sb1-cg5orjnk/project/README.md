# AI Tools Showcase for Product Managers

A beautiful, production-ready web application showcasing 10 essential AI tools for product managers throughout the product development lifecycle. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Interactive Tool Cards**: Beautiful card-based interface with hover effects and smooth animations
- **Detailed Tool Information**: Modal interface with comprehensive tool details and use cases
- **Real-time Rating System**: Users can rate tools with instant feedback using Supabase backend
- **Advanced Filtering**: Filter tools by product lifecycle phase (Discovery, Delivery, Iteration)
- **Smart Sorting**: Sort tools by name, rating, or phase
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Production Ready**: Built with modern best practices and performance optimizations

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom components
- **Backend**: Supabase (PostgreSQL + Row Level Security)
- **Icons**: Lucide React
- **Deployment**: Netlify (optimized for static hosting)

## 📦 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works perfectly)
- A Netlify account for deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-tools-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Copy `.env.example` to `.env` and fill in your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Set up the database**
   - In your Supabase dashboard, go to the SQL Editor
   - Copy the contents of `supabase/migrations/create_ai_tools_schema.sql`
   - Run the SQL to create tables and insert sample data

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - You should see the AI tools showcase with sample data

## 🌐 Netlify Deployment

### Method 1: Netlify Git Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Build settings should auto-detect:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Add Environment Variables**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add your Supabase credentials:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live in minutes!

### Method 2: Manual Deploy

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Add environment variables in Site settings
   - Your site is live!

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FilterSort.tsx   # Filtering and sorting controls
│   ├── StarRating.tsx   # Interactive star rating component
│   ├── ToolCard.tsx     # Individual tool card component
│   └── ToolModal.tsx    # Tool details modal
├── hooks/               # Custom React hooks
│   └── useAITools.ts    # Tools data fetching and rating logic
├── lib/                 # Utilities and configurations
│   └── supabase.ts      # Supabase client and type definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports

supabase/
└── migrations/          # Database schema and sample data
    └── create_ai_tools_schema.sql
```

## 🎨 Customization

### Adding New Tools

1. In your Supabase dashboard, go to the Table Editor
2. Open the `ai_tools` table
3. Add new rows with the required fields:
   - `name`: Tool name
   - `description`: Brief description
   - `use_case`: How PMs use this tool
   - `phase`: One of 'discovery', 'delivery', 'iteration'
   - `link`: Tool website URL
   - `context_window`: Optional context information
   - `free_limit`: Optional free tier information

### Styling and Theme

The app uses a carefully crafted design system:
- **Colors**: Blue and indigo primary colors with emerald accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px spacing system
- **Components**: Modular, reusable components with hover states

## 🔒 Security

- **Row Level Security**: Enabled on all Supabase tables
- **Environment Variables**: Sensitive data stored securely
- **Public API**: Only read operations exposed to frontend
- **Input Validation**: Proper validation on all user inputs

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablet screens
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Large touch targets for mobile users

## 🚀 Performance

- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Optimized images from Pexels CDN
- **Lazy Loading**: Components load on demand
- **Caching**: Efficient caching strategies implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for lightning-fast development
- Styled with [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- Powered by [Supabase](https://supabase.com) for backend services
- Icons from [Lucide React](https://lucide.dev/) for beautiful iconography
- Deployed on [Netlify](https://netlify.com) for reliable hosting

---

Made with ❤️ for Product Managers who want to leverage AI in their workflow.