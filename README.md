# Generative UI Studio

**Generative UI Studio** is an advanced, AI-driven development environment that fundamentally bridges the gap between natural language ideas and functional frontend execution. Powered by Large Language Models (LLMs) like Google's Gemini, this tool transforms standard conversational prompts into rich, fully realized, and interactive React user interfaces in real-time.

Instead of merely generating raw code snippets for developers to piece together, Generative UI Studio acts as an autonomous frontend architect. When a user inputs a concept—whether it's a "comprehensive gym management dashboard," a "modern car rental booking portal," or a "high-frequency crypto trading workspace"—the application dynamically parses the intent, identifies the industry domain, and synthetically constructs a bespoke UI layout on the fly. 

The studio comes equipped with an intelligent **Universal Visual Enforcer**, which ensures that every generated application feels premium and complete. It automatically maps the user's intent to specific domains (such as Healthcare, Finance, E-commerce, or Education) and seamlessly injects high-quality, contextually relevant Unsplash photography, structured data tables, interactive Recharts, and tailored menu layouts without requiring any manual asset gathering from the user. 

Built with modern web technologies including **React, TypeScript, Vite, and Tailwind CSS**, Generative UI Studio is designed to be highly modular and extensible. It is the perfect foundational tool for rapid prototyping, hackathons, design sprints, or simply visualizing complex software ideas at the speed of thought.

## Features

- 🧠 **AI-Powered UI Generation**: Type a prompt (e.g., "Design a gym management dashboard") and watch the AI instantly generate a fully functional layout.
- 🎨 **Dynamic Domain Theming**: Automatically detects the domain of your prompt (Health, Finance, Food, Ecommerce, etc.) and injects high-quality, relevant photography and components.
- 📊 **Rich Components**: Generates complex components including data tables, Kanban boards, interactive charts, metric cards, and responsive grids.
- ⚡ **Real-Time Preview**: Instantly preview and interact with the generated application interface.
- 🔧 **Customizable Themes**: Change the accent color, styling, and visual density on the fly.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts
- **Backend / LLM Integration**: Node.js, Express, Google Gemini AI (via `@google/generative-ai`), OpenRouter support

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API key or OpenRouter API key.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chmounikaxyz-ui/Generative-UI-studio.git
   cd Generative-UI-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.example` to `.env` and add your API keys:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   # Optionally use OpenRouter
   OPENROUTER_API_KEY="your_openrouter_api_key_here"
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This will start both the backend proxy server and the Vite frontend. Open your browser and navigate to `http://localhost:5173` (or the port provided by Vite).

## Usage
Once the application is running, simply type what kind of interface you want to build into the command bar (e.g., "Build a dashboard for a modern car rental service") and hit Enter. The AI will analyze your request and instantly build the UI on the canvas.

## License
MIT License
