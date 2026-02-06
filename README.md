
# 📊 DashLib AI

[![Status](https://img.shields.io/badge/status-live-success)]()
[![Release](https://img.shields.io/badge/release-v3.2_PWA_Optimized-purple)]()
[![AI Engine](https://img.shields.io/badge/Gemini-Pro_Vision_%26_Live-blue)]()
[![License](https://img.shields.io/badge/license-MIT-grey)]()

**The Enterprise-Grade Dashboard Synthesis Engine.**

DashLib AI is an intelligent architectural tool designed for Senior Frontend Engineers. It leverages **Google Gemini 3 Pro** and the **Gemini Live API** to synthesize, audit, and deploy production-ready dashboard code based on complex business requirements via Text, Voice, or Image inputs.

---

## 🚀 New in v3.2: Multimodal Architect

### 👁️ **Vision-to-Code**
Stop writing CSS descriptions. Drag and drop a screenshot of an existing dashboard or a whiteboard sketch. DashLib analyzes the visual hierarchy, color palette, and data density to replicate the interface in React + Tailwind code with pixel-perfect accuracy.

### 🎙️ **Live Voice Architect**
Speak your requirements in real-time. Using the low-latency Gemini Live API, you can dictate complex logic ("Change the charts to area graphs and add a 7-day moving average filter") and see the code evolve instantly.

### 🧠 **Context Injection**
Paste raw SQL Schemas (`CREATE TABLE...`) or Figma JSON node data. The generator maps your specific data structure to the UI components, ensuring type safety in the generated mocks.

---

## 📱 PWA & Offline Capabilities

DashLib AI is a fully installable **Progressive Web App (PWA)** designed for zero-latency access.

- **App Shell Architecture**: The core UI (`index.html`, React bundles) is cached immediately, allowing the app to boot instantly even without a network.
- **Offline Inventory**: Browse templates, view specifications, and check audit reports while offline.
- **Resilient Fallback**: Navigation requests are intercepted to serve the App Shell, ensuring deep links work offline.
- **Installable**: Add to Dock (macOS), Taskbar (Windows), or Home Screen (iOS/Android) for a native app experience.

---

## 🌟 Core Capabilities

### 1. **Neural Code Synthesis**
Transform high-level requirements into fully typed, accessible React + Tailwind + Recharts code in seconds. Now supports **Constraint Injection** for strict design system adherence.

### 2. **Interactive Workbenches**
Don't just view static images. Interact with:
- **Security Logic Sandboxes**: Define and test governance rules.
- **A/B Testing Simulators**: Visualize model performance metrics side-by-side.

### 3. **Architectural Audits**
Every template includes an AI-driven "Architect's Audit" that scores the concept on Enterprise Readiness, identifying edge cases, security risks, and accessibility gaps.

### 4. **Brand Auto-Tune**
Input a natural language description of your brand (e.g., "Cyberpunk fintech with neon accents"), and the AI extracts and applies the correct Design Tokens (Color, Radius, Density) globally.

---

## 🚀 Quick Start

### 1. Environmental Setup
DashLib is a client-side PWA. It requires no backend, but needs an API key for inference.

```bash
# Export your Gemini API Key (Must support Gemini 1.5/3 Pro & Live API)
export API_KEY="AIzaSy..."
```

### 2. Launch
```bash
# Install dependencies
npm install

# Start local server
npx serve .
```

### 3. Usage Flow
1. **Browse Inventory**: Filter 50+ templates by SaaS, Financial, or GovOps categories.
2. **Open Workbench**: Click a template to view specs, audit reports, and live sandboxes.
3. **Generate**: Use the **Magic Generator** to synthesize the codebase using **Text, Voice, or Vision**.
4. **Export**: One-click deploy to StackBlitz or copy to clipboard.

---

## 📚 Documentation Index

- [**Architecture & Design**](./ARCHITECTURE.md): System context, live audio pipeline, and ADRs.
- [**Product Roadmap**](./ROADMAP.md): The strategic vision for the next 25 features.
- [**Contributing Standards**](./CONTRIBUTING.md): Engineering guidelines and PR protocols.
- [**Security Policy**](./SECURITY.md): Threat models and compliance.
- [**PWA & Offline**](./PWA.md): Service Worker strategies.

---

## 🏆 Powered By

- **React 19**: Concurrent rendering and latest hooks.
- **Google Gemini 3 Pro**: State-of-the-art reasoning and code generation.
- **Gemini Live API**: Real-time multimodal WebSocket streaming.
- **Tailwind CSS**: Utility-first styling engine.
- **Recharts**: Composable visualization library.

---
© 2025 DashLib AI. Engineered for Scale.
