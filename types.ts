
/**
 * Represents a dashboard template in the library.
 */
export interface Template {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Primary category for filtering */
  category: DashboardCategory;
  /** Human-readable title */
  title: string;
  /** Detailed explanation of the business value */
  purpose: string;
  /** Data update frequency (e.g., 'Real-time', 'Daily') */
  refreshRate: string;
  /** List of recommended data integrations */
  dataSources: string[];
  /** Key Performance Indicators to include */
  metrics: string[];
  /** Recommended chart types */
  visualizations: string[];
  /** Instructions for the AI code generator */
  notes: string;
  /** Optional recommendation for threshold alerting */
  alertThreshold?: string;
  /** Optional layout variations */
  variants?: string[];
  /** Flag to enable the interactive demo tab */
  hasInteractiveSandbox?: boolean;
}

/**
 * Standard enterprise dashboard categories.
 */
export enum DashboardCategory {
  SaaSFinancial = "SaaS Financial",
  ProductUsage = "Product & Usage",
  AIOps = "AI/LLM Operations",
  MarketingSales = "Marketing & Sales",
  TeamOps = "Team & Operations",
  EnterpriseGov = "Enterprise & Governance"
}

/**
 * Represents a single message in the AI Advisor chat.
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
