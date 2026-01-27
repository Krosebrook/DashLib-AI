import { GoogleGenAI } from "@google/genai";
import { Template } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a full React component code for a given dashboard template.
 * Uses gemini-3-pro-preview for advanced coding logic and reasoning.
 */
export const generateDashboardCode = async (template: Template): Promise<string> => {
  const prompt = `
    Act as a Staff Platform Engineer (AppSec + Integration Architecture) specialized in the Enterprise Profile Builder (EPB) ecosystem.
    Generate a complete, production-ready React component for the "${template.title}" dashboard.
    
    ARCHITECTURAL REQUIREMENTS:
    1. ROLE-BASED ACCESS CONTROL (RBAC):
       - Implement a "User Role" toggle (Executive, Manager, Engineer) to demonstrate how views change based on EPB RBAC.
       - Executive: High-level KPI cards, Cost ($), and ROI charts.
       - Manager: Team throughput, approval queues, and SLA monitoring.
       - Engineer: Technical traces, p95 latency charts, error logs, and ReAct loop steps.

    2. AGENT OBSERVABILITY & AI FEATURES:
       - If the dashboard involves AI/Agents:
         * Include a "ReAct Loop Visualizer" (Thought -> Action -> Observation).
         * Include a "HITL Approval Queue" for Human-In-The-Loop simulation.
         * Visualize token usage across different models (Claude Opus/Sonnet/Haiku).

    3. COMPLIANCE & SECURITY:
       - Implement an "Immutable Audit Log" table component.
       - Include a "Persistent Alert Banner" at the top that is dismissible but highly visible.
       - Apply PII masking (e.g., "admin***@company.com") to all sensitive data strings.

    4. TECH STACK & STYLE:
       - Framework: React (functional components, hooks).
       - Styling: Tailwind CSS (modern, enterprise-dark theme using Slate-900/950).
       - Charts: Use Recharts for professional, interactive data visualization.
       - Icons: Use Lucide-React.
       - Layout: Responsive, high-density dashboard grid.

    5. CODE QUALITY:
       - Include mock data generation logic inside the component.
       - Implement a "Circuit Breaker" status indicator (Closed/Open).
       - Ensure clean, commented, and performant code.

    CONTEXT:
    Title: ${template.title}
    Purpose: ${template.purpose}
    Metrics: ${template.metrics.join(', ')}
    Visualizations: ${template.visualizations.join(', ')}
    Notes: ${template.notes}

    Return ONLY the raw React component code. Do not include markdown code blocks or any explanation text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    
    return response.text?.trim() || "// Error: No code generated.";
  } catch (error) {
    console.error("Gemini CodeGen Error:", error);
    return "// Error generating dashboard code. Please verify your API Key and network connection.";
  }
};

/**
 * Provides an architectural recommendation based on a user's query.
 */
export const getAIRecommendation = async (query: string, templates: Template[]): Promise<string> => {
  const templateContext = templates.map(t => `- ${t.title} (${t.category}): ${t.purpose}`).join('\n');
  
  const prompt = `
    You are an EPB (Enterprise Profile Builder) Architect. 
    A user is seeking dashboard architectural advice.
    
    User Query: "${query}"
    
    Library Templates:
    ${templateContext}
    
    Task:
    1. Recommend the 1-2 most relevant templates.
    2. Explain how they address specific enterprise needs like RLS, RBAC, or Compliance (SOC2/GDPR).
    3. Keep it professional, helpful, and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "I couldn't generate a recommendation at this time.";
  } catch (error) {
    console.error("Gemini Advisor Error:", error);
    return "Sorry, I'm having trouble connecting to the AI advisor right now.";
  }
};
