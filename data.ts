
import { Template, DashboardCategory } from './types';

export const templates: Template[] = [
  // CATEGORY 1: SaaS Financial
  {
    id: 'mrr-growth',
    category: DashboardCategory.SaaSFinancial,
    title: 'MRR Growth Dashboard',
    purpose: 'Track monthly recurring revenue health and growth trajectory',
    refreshRate: 'Real-time',
    dataSources: ['Stripe', 'Chargebee', 'Paddle'],
    metrics: [
      'Monthly Recurring Revenue (MRR)',
      'MoM MRR growth rate (%)',
      'ARR forecast',
      'Net new MRR'
    ],
    visualizations: [
      'Line chart: MRR over 12 months',
      'Waterfall chart: MRR breakdown',
      'Gauge: MRR growth rate'
    ],
    notes: 'Includes a customizable alerting system for MRR growth thresholds (<5%, >10%). Features a persistent, dismissible banner at the top for triggered alerts.',
    alertThreshold: 'If MRR < 5% of target growth'
  },

  // CATEGORY 2: Product & Usage
  {
    id: 'customer-health',
    category: DashboardCategory.ProductUsage,
    title: 'Customer Health Scorecard',
    purpose: 'Proactive monitoring of account health and churn risk',
    refreshRate: 'Daily',
    dataSources: ['Support Tickets', 'Usage Data', 'Segment'],
    metrics: [
      'Aggregate Health Score',
      'NPS/CSAT',
      'Last Login Activity',
      'Support Volume Trend'
    ],
    visualizations: [
      'Scatter: Usage vs. Sentiment',
      'KPI Cards: Red/Yellow/Green Accounts',
      'Trend: Health over time'
    ],
    notes: 'Alerts trigger when health scores drop below a configurable threshold (e.g., < 40/100).'
  },

  // CATEGORY 3: AI/LLM Operations
  {
    id: 'llm-performance-comparison',
    category: DashboardCategory.AIOps,
    title: 'Model Performance & Cost',
    purpose: 'Advanced A/B testing and performance benchmarking for LLMs (GPT-4o vs Claude)',
    refreshRate: 'On-demand',
    dataSources: ['OpenAI', 'Anthropic', 'Google', 'Meta'],
    metrics: [
      'Cost per Request ($)',
      'Latency (ms)',
      'Hallucination Rate (%)',
      'Token Usage (Prompt/Completion)'
    ],
    visualizations: [
      'Interactive A/B Testing Workbench',
      'Side-by-side Model Response Comparison',
      'Comparative Metric Chart: Cost vs Latency vs Hallucination'
    ],
    notes: 'CORE FEATURE: A/B Testing Workbench. Compare GPT-4o and Claude side-by-side. Track cost, latency, and hallucination rates across experiments.',
    alertThreshold: 'Hallucination Rate > 5%',
    hasInteractiveSandbox: true
  },
  {
    id: 'epb-agent-observability',
    category: DashboardCategory.AIOps,
    title: 'EPB Agent Observability',
    purpose: 'Real-time monitoring of Claude-powered agents and ReAct loops',
    refreshRate: 'Real-time (WebSocket)',
    dataSources: ['OTEL Spans', 'Supabase RLS', 'Agent Logs'],
    metrics: [
      'Success Rate (%)',
      'p95 Latency (ms)',
      'HITL Approval Rate',
      'ReAct Loop Depth'
    ],
    visualizations: [
      'Timeline: ReAct Step Execution',
      'Queue: HITL Pending Approvals',
      'Metric: Hallucination Detection Alerting'
    ],
    notes: 'Features persistent, dismissible banners for triggered performance alerts. Customizable alerts for p95 latency and failed ReAct loops.',
    alertThreshold: 'p95 Latency > 10s'
  },

  // CATEGORY 4: Marketing & Sales
  {
    id: 'marketing-funnel',
    category: DashboardCategory.MarketingSales,
    title: 'Growth Funnel Dashboard',
    purpose: 'Visualize user journey from acquisition to conversion',
    refreshRate: 'Daily',
    dataSources: ['GA4', 'Hubspot', 'Facebook Ads'],
    metrics: [
      'CAC (Customer Acquisition Cost)',
      'LTV/CAC Ratio',
      'MQL to SQL Conversion %',
      'ROAS (Return on Ad Spend)'
    ],
    visualizations: [
      'Funnel: Lead Journey',
      'Sankey: Traffic Sources',
      'Area: Conversion Trend'
    ],
    notes: 'Customizable alerts for CAC spikes (> $100) or ROAS drops (< 3x).'
  },

  // CATEGORY 6: Enterprise & Governance
  {
    id: 'security-compliance',
    category: DashboardCategory.EnterpriseGov,
    title: 'Security & Compliance Dashboard',
    purpose: 'Real-time SOC2/GDPR monitoring with interactive custom rule definitions',
    refreshRate: 'Real-time',
    dataSources: ['Auth Logs', 'VPC Flow Logs', 'IAM'],
    metrics: [
      'Failed Login Attempts',
      'Policy Violations',
      'Data Access Events',
      'Security Incidents'
    ],
    visualizations: [
      'Interactive Custom Alert Rule Builder',
      'Real-time Access Heatmap',
      'Compliance Status Breakdown'
    ],
    notes: 'CORE FEATURE: Custom Security Rule Builder. Defined policies for failed logins, policy violations, and unauthorized access events with immediate alerting.',
    alertThreshold: 'Failed Logins > 10/hour',
    hasInteractiveSandbox: true
  },
  {
    id: 'data-privacy-governance',
    category: DashboardCategory.EnterpriseGov,
    title: 'Data Privacy Governance',
    purpose: 'Monitor GDPR/CCPA data requests and storage residency',
    refreshRate: 'Real-time',
    dataSources: ['DB Audit Logs', 'Consent Manager'],
    metrics: [
      'PII Access Count',
      'Open DSRs (Data Subject Requests)',
      'Consent Revocation Rate',
      'Policy Compliance %'
    ],
    visualizations: [
      'Map: Data Residency Locations',
      'Bar: DSR Status',
      'Line: Access Frequency'
    ],
    notes: 'Alerts on unauthorized PII access or DSRs exceeding the 30-day resolution window.'
  }
];
