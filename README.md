# Generative UI Studio

Generative UI Studio is a dynamic, LLM-powered application that instantly synthesizes professional, interactive user interfaces from natural language prompts. Instead of returning raw code, it dynamically renders domain-specific components (dashboards, tables, charts, cards, etc.) directly into a live canvas.

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
