
/**
 * Represents a dashboard template in the library.
 */
export interface Template {
  id: string;
  category: DashboardCategory;
  title: string;
  purpose: string;
  refreshRate: string;
  dataSources: string[];
  metrics: string[];
  visualizations: string[];
  notes: string;
  alertThreshold?: string;
  variants?: string[];
  hasInteractiveSandbox?: boolean;
}

export enum DashboardCategory {
  SaaSFinancial = "SaaS Financial",
  ProductUsage = "Product & Usage",
  AIOps = "AI/LLM Operations",
  MarketingSales = "Marketing & Sales",
  TeamOps = "Team & Operations",
  EnterpriseGov = "Enterprise & Governance"
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface SystemAlert {
  id: string;
  templateId: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: number;
}

export interface SecurityRule {
  id: string;
  metric: string;
  condition: string;
  value: number;
  enabled: boolean;
}

// --- NEW FEATURES ---

export interface BrandConfig {
  primaryColor: 'indigo' | 'emerald' | 'blue' | 'slate' | 'violet';
  borderRadius: 'rounded-none' | 'rounded-lg' | 'rounded-2xl' | 'rounded-3xl';
  density: 'compact' | 'comfortable';
}

export type Persona = 'Executive' | 'Analyst' | 'Developer';

export interface AuditReport {
  score: number;
  strengths: string[];
  weaknesses: string[];
  securityRisk: 'Low' | 'Medium' | 'High';
  recommendation: string;
}
