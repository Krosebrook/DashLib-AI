
import { GoogleGenAI, Type } from "@google/genai";
import { Template, BrandConfig, Persona, AuditReport } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getBrandContext = (config?: BrandConfig) => {
  if (!config) return '';
  return `
    BRAND CONFIGURATION:
    - Primary Color Theme: ${config.primaryColor}-600 (Use ${config.primaryColor} scale for all accents/buttons).
    - Border Radius: ${config.borderRadius} (Apply to all cards/containers).
    - Density: ${config.density} (If 'compact', reduce padding/margins by 20%).
  `;
};

const getPersonaContext = (persona?: Persona) => {
  if (!persona) return '';
  const instructions = {
    'Executive': 'Focus on high-level KPIs, clean visualizations, minimal text, and "at a glance" summary cards.',
    'Analyst': 'Focus on data density, detailed tables, export controls, and complex filtering options.',
    'Developer': 'Focus on API status, latency metrics, error logs, and system health indicators.'
  };
  return `USER PERSONA: ${persona}. ${instructions[persona]}`;
};

/**
 * Generates a bespoke dashboard from a free-form user prompt using streaming for better UX.
 * Supports Multimodal inputs (Image) and Context injection (SQL).
 */
export const generateCustomDashboardStream = async (
  userPrompt: string, 
  onChunk: (text: string) => void,
  brandConfig?: BrandConfig,
  persona?: Persona,
  imageBase64?: string,
  contextData?: string
): Promise<string> => {
  const parts: any[] = [];

  // 1. Construct the System/User Prompt
  let textPrompt = `
    Act as a World-Class Staff Frontend Engineer & UI Architect.
    USER REQUEST: "${userPrompt}"
    ${getBrandContext(brandConfig)}
    ${getPersonaContext(persona)}

    ${contextData ? `\nADDITIONAL CONTEXT (SQL/FIGMA): \n${contextData}\nMap the UI components directly to this structure.` : ''}

    YOUR TASK: Generate a single-file, production-ready React component that fulfills this request.

    ARCHITECTURAL STANDARDS (NON-NEGOTIABLE):
    1. AESTHETICS: 
       - Use a sophisticated dark/light hybrid theme using Tailwind Slate/${brandConfig?.primaryColor || 'Indigo'}.
       - Use 'lucide-react' for all icons.
       - The UI must look "Enterprise Grade" (clean borders, subtle shadows, consistent spacing).

    2. INTERACTIVITY (CRITICAL):
       - The dashboard MUST NOT be static.
       - Use \`useState\` to implement functional tabs (e.g., "Overview" vs "Details").
       - Use \`useState\` to implement time-range filters (e.g., "7d", "30d", "YTD") that update the UI state (even if data is mocked).
       - Charts must have Tooltips and active states.

    3. VISUALIZATION BEST PRACTICES: 
       - Use \`recharts\` for ALL data visualizations.
       - ALWAYS wrap charts in \`<ResponsiveContainer width="100%" height={...}>\`.
       - Use cohesive colors for chart lines/bars (e.g., Indigo-500, Emerald-500).

    4. DATA HYGIENE: 
       - Define robust mock data arrays inside the component (do not rely on external props).
       - Ensure all sensitive info is masked (e.g., "User-****").

    5. COMPONENT STRUCTURE:
       - Start with imports: \`import React, { useState } from 'react';\`, \`import { ... } from 'lucide-react';\`, \`import { ... } from 'recharts';\`.
       - Export as \`export default function Dashboard() { ... }\`.
       - Include a persistent Alert Banner at the top for system notifications if relevant.

    Return ONLY the raw React code. Do not wrap in markdown blocks. Start directly with imports.
  `;

  if (imageBase64) {
    textPrompt += `\n\nREFER TO THE ATTACHED IMAGE for layout structure and visual hierarchy. Replicate the placement of charts and KPIs exactly.`;
    parts.push({
      inlineData: {
        mimeType: 'image/png',
        data: imageBase64
      }
    });
  }

  parts.push({ text: textPrompt });

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: {
        role: 'user',
        parts: parts
      },
    });

    let fullText = '';
    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        const cleaned = fullText.replace(/```tsx|```typescript|```javascript|```/g, "");
        onChunk(cleaned);
      }
    }
    return fullText.replace(/```tsx|```typescript|```javascript|```/g, "");
  } catch (error) {
    console.error("Gemini Streaming CodeGen Error:", error);
    throw error;
  }
};

/**
 * Generates Brand Configuration from a natural language description.
 */
export const generateBrandConfig = async (description: string): Promise<BrandConfig> => {
  const prompt = `
    Analyze the following brand description and extract design tokens.
    Description: "${description}"
    
    Return a JSON object with this exact schema:
    {
      "primaryColor": "indigo" | "emerald" | "blue" | "slate" | "violet",
      "borderRadius": "rounded-none" | "rounded-lg" | "rounded-2xl" | "rounded-3xl",
      "density": "compact" | "comfortable"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryColor: { type: Type.STRING, enum: ['indigo', 'emerald', 'blue', 'slate', 'violet'] },
            borderRadius: { type: Type.STRING, enum: ['rounded-none', 'rounded-lg', 'rounded-2xl', 'rounded-3xl'] },
            density: { type: Type.STRING, enum: ['compact', 'comfortable'] }
          }
        }
      }
    });
    
    return JSON.parse(response.text || '{}') as BrandConfig;
  } catch (error) {
    console.error("Brand Gen Error:", error);
    return { primaryColor: 'indigo', borderRadius: 'rounded-2xl', density: 'comfortable' };
  }
};

export const generateDashboardCode = async (template: Template, brandConfig?: BrandConfig): Promise<string> => {
  // Existing function remains unchanged, just ensuring it exports correctly.
  const prompt = `
    Act as a Staff Platform Engineer specialized in high-performance Enterprise Dashboards.
    Generate a complete, functional React component for the "${template.title}" dashboard.
    ${getBrandContext(brandConfig)}
    
    CRITICAL IMPLEMENTATION RULES:
    1. PERSISTENT DISMISSIBLE BANNER:
       - Every generated dashboard MUST have a Banner at the very top.
       - It displays a critical alert summary (e.g., "ALERT: ${template.alertThreshold || 'Threshold breached'}").
       - It MUST be dismissible with an 'X' button and include a link to "View Details".
    2. CUSTOMIZABLE ALERTING SYSTEM UI:
       - Implement an "Alert Threshold Configuration" section.
       - Components: Metric Dropdown, Condition Dropdown (Greater Than, Less Than, Equal To), Value Input (Number), and "Save Rule" button.
       - Display a list of "Active Threshold Rules" that updates when saved.
    3. MODEL PERFORMANCE & A/B TESTING (If applicable):
       - If template is "Model Performance", include "A/B Testing Workbench".
    4. SECURITY CUSTOM RULE BUILDER (If applicable):
       - If template is "Security & Compliance", include "Custom Security Rule Builder".
    5. INTERACTIVITY:
       - Use \`useState\` for basic interactions (tabs, filters).
       - Ensure all charts are responsive using \`ResponsiveContainer\`.

    TECH STACK: React, Tailwind CSS, Recharts, Lucide-React.

    Return ONLY the raw React component code. Do not include markdown code blocks or text explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    
    return response.text?.trim().replace(/```tsx|```typescript|```javascript|```/g, "") || "// Error: No code generated.";
  } catch (error) {
    console.error("Gemini CodeGen Error:", error);
    return "// Error generating dashboard code. Please verify your API Key.";
  }
};

export const generateDashboardAudit = async (template: Template): Promise<AuditReport> => {
   // Existing function remains unchanged
  const prompt = `
    Act as a Senior QA Architect & Security Compliance Officer.
    Analyze the following dashboard concept for Enterprise Readiness:
    
    Title: ${template.title}
    Purpose: ${template.purpose}
    Metrics: ${template.metrics.join(', ')}
    Data Sources: ${template.dataSources.join(', ')}

    Produce a JSON object with the following schema (DO NOT WRAP IN MARKDOWN):
    {
      "score": number (0-100),
      "strengths": string[] (3 points),
      "weaknesses": string[] (3 points focusing on potential edge cases, data privacy, or performance),
      "securityRisk": "Low" | "Medium" | "High",
      "recommendation": string (One professional paragraph)
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    
    const text = response.text || "{}";
    return JSON.parse(text) as AuditReport;
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return {
      score: 0,
      strengths: [],
      weaknesses: ["Failed to generate audit report."],
      securityRisk: 'High',
      recommendation: "System error during audit."
    };
  }
};

export const getAIRecommendation = async (query: string, templates: Template[]): Promise<string> => {
   // Existing function remains unchanged
  const templateContext = templates.map(t => `- ${t.title} (${t.category}): ${t.purpose}`).join('\n');
  
  const prompt = `
    You are an Enterprise Dashboard Architect. 
    A user is asking how to build a monitoring, testing, or alerting solution.
    
    User Query: "${query}"
    
    Library Templates:
    ${templateContext}
    
    Task:
    1. Recommend the 1-2 most relevant templates.
    2. Specifically mention how they use A/B testing or custom alert rules to solve the user's need.
    3. Keep it professional, technical, and concise.
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
