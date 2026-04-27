# Student Resource Hub 🚀

A comprehensive, beautifully designed React application serving as a centralized hub for students to explore tech certifications, AI-powered learning tools, and career mastery roadmaps.

## ✨ New Features

- **🤖 AI Technical Aptitude Engine:** Evaluate your technical skills through AI-driven scenarios. Get instant feedback and visualize your progress with interactive radar charts.
- **💬 AI Coding Tutor:** A real-time assistant to help you debug code, understand complex concepts, and guide your learning journey.
- **🗺️ Interactive Mastery Roadmaps:** Step-by-step timelines for major tech domains (Development, DevOps, Cloud, UI/UX, Data Science) with integrated progress tracking.
- **🎨 Dynamic Footer System:** A comprehensive "Big Footer" on the Home page for full navigation, and a sleek, minimized footer on internal pages for a focused workspace.
- **🌙 Persistent Dark Mode:** Premium aesthetic with glassmorphism and smooth transitions that remember your preference via `localStorage`.

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Intelligence:** [Google Gemini 3 Flash](https://aistudio.google.com/) via `@google/generative-ai`
- **Visualization:** [Recharts](https://recharts.org/) (for Aptitude Radar Charts)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tusharshivade/Reactjs-simple-project.git
   cd Reactjs-simple-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key to `.env`:
   ```env
   VITE_GEMINI_API_KEY=your_actual_key_here
   ```
   > [!IMPORTANT]
   > Never share your `.env` file or push it to GitHub. Your key is protected by `.gitignore`.

### Running Locally

To start the development server (Frontend + Backend):
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
