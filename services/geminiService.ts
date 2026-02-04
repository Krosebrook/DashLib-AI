
import { GoogleGenAI } from "@google/genai";
import { Template } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a bespoke dashboard from a free-form user prompt using streaming for better UX.
 */
export const generateCustomDashboardStream = async (
  userPrompt: string, 
  onChunk: (text: string) => void
): Promise<string> => {
  const prompt = `
    Act as a World-Class Staff Frontend Engineer & UI Architect.
    USER REQUEST: "${userPrompt}"

    YOUR TASK: Generate a single-file, production-ready React component that fulfills this request.

    ARCHITECTURAL STANDARDS (NON-NEGOTIABLE):
    1. AESTHETICS: Use a sophisticated dark/light hybrid theme using Tailwind Slate/Indigo.
    2. INTERACTIVITY: Include functional tabs, tooltips (simulated with CSS/hover), and interactive chart states.
    3. BEST PRACTICES: 
       - Use Lucide-React for icons.
       - Use Recharts for all data visualizations.
       - Implement a "User Persona" switch (e.g., Exec vs Analyst) that toggles visible metrics.
    4. DATA HYGIENE: Use robust mock data arrays and ensure all sensitive info is masked (e.g., "ID-****").
    5. COMPONENTS: Include a persistent Alert Banner at the top for system notifications.

    TECH STACK:
    - React (Hooks, functional components).
    - Tailwind CSS (Utility classes only).
    - Recharts & Lucide-React.

    Return ONLY the raw React code. Do not wrap in markdown blocks. Start directly with imports.
  `;

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    let fullText = '';
    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        // Clean up markdown noise if the model accidentally includes it
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
 * Generates a bespoke dashboard from a free-form user prompt (Legacy non-stream).
 */
export const generateCustomDashboard = async (userPrompt: string): Promise<string> => {
  let result = '';
  await generateCustomDashboardStream(userPrompt, (chunk) => { result = chunk; });
  return result;
};

/**
 * Generates a full React component code for a given dashboard template.
 */
export const generateDashboardCode = async (template: Template): Promise<string> => {
  const prompt = `
    Act as a Staff Platform Engineer specialized in high-performance Enterprise Dashboards.
    Generate a complete, functional React component for the "${template.title}" dashboard.
    
    CRITICAL IMPLEMENTATION RULES:
    
    1. PERSISTENT DISMISSIBLE BANNER:
       - Every generated dashboard MUST have a Banner at the very top.
       - It displays a critical alert summary (e.g., "ALERT: ${template.alertThreshold || 'Threshold breached'}").
       - It MUST be dismissible with an 'X' button and include a link to "View Details".

    2. CUSTOMIZABLE ALERTING SYSTEM UI:
       - Implement an "Alert Threshold Configuration" section.
       - Components: Metric Dropdown, Condition Dropdown (Greater Than, Less Than, Equal To), Value Input (Number), and "Save Rule" button.
       - Display a list of "Active Threshold Rules" that updates when saved.

    3. MODEL PERFORMANCE & A/B TESTING (Specifically for "Model Performance & Cost"):
       - MANDATORY REQUIREMENT: Create a dedicated "A/B Testing Workbench" UI section.
       - The workbench MUST include:
         * A large textarea for the user to enter a "Test Prompt".
         * Multi-select buttons for models: [GPT-4o, Claude 3.5 Sonnet, Llama 3].
         * A prominent "Run Experiment" button.
         * Side-by-side response cards showing the model outputs.
         * Comparison Visualization: A Recharts Bar Chart comparing Latency and Cost.

    4. SECURITY CUSTOM RULE BUILDER (Specifically for "Security & Compliance"):
       - REQUIREMENT: Create a dedicated "Custom Security Rule Builder" section.
       - Features: Metric Select, Condition Select, Value Input, Save Button.
       - Functional Requirement: Maintain an "Active Security Policies" list.

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

/**
 * Provides an architectural recommendation based on a user's query.
 */
export const getAIRecommendation = async (query: string, templates: Template[]): Promise<string> => {
  const templateContext = templates.map(t => `- ${t.title} (${t.category}): ${t.purpose}`).join('\n');
  
  const prompt = `
    You are an Enterprise Dashboard Architect. 
    A user is asking how to build a monitoring, testing, or alerting solution.
    
    User Query: "${query}"
    
    Library Templates:
    ${templateContext}
    
    Task:
    1. Recommend the 1-2 most relevant templates.
    2. Specifically mention how they use A/B testing (simultaneous model tests) or the custom alert rule builder to solve the user's need.
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
