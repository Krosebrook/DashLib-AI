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