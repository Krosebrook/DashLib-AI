# 📊 DashLib AI
**The Enterprise-Grade Dashboard Template Library Powered by Gemini 3 Pro.**

DashLib AI is a high-performance repository of 50+ dashboard templates designed for modern SaaS, AIOps, and Enterprise Governance. It combines static design patterns with real-time AI code generation to bridge the gap between "Inspiration" and "Implementation".

---

## 🚀 Key Features

- **50+ Curated Templates**: Spanning Financials, Product Usage, AIOps, and more.
- **Magic Generator**: Natural Language to React component generation using Gemini 3 Pro.
- **Interactive Sandboxes**: Functional mock-ups (A/B Testing, Rule Builders) to test logic before exporting.
- **Smart AI Advisor**: A specialized chat agent that suggests templates based on business outcomes (e.g., "I need to reduce churn").
- **Tailwind & Recharts Native**: All generated code is optimized for standard modern tech stacks.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **AI Model**: [Google Gemini 3 Pro](https://ai.google.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Getting Started

1. **Configure API Key**: Ensure `process.env.API_KEY` is set to your Google Gemini API key.
2. **Browse Templates**: Use the search and category filters to find a starting point.
3. **Interactive Test**: Use the **Live Sandbox** tab in the template modal to test interactive features.
4. **Generate & Export**: Click **Generate React Code** to get production-ready, one-file components.

## 🤖 AI Features Documentation

### Magic Generator (NL to UI)
The Magic Generator uses a sophisticated streaming prompt pipeline. It doesn't just generate HTML; it creates functional React components with:
- Internal state management (`useState`).
- Data visualization logic (`recharts`).
- Responsive layouts (Tailwind breakpoints).

### AI Advisor
The advisor analyzes your `data.ts` template registry and provides architectural recommendations using Gemini 3 Flash for low-latency reasoning.

---
© 2025 DashLib AI. Built for Senior Frontend Engineers.
