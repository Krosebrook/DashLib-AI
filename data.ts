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
    notes: 'SOC2 compliant data fetching. Features a custom alerting UI to monitor MRR growth rate with thresholds.',
    alertThreshold: 'If MRR < 5% of target growth'
  },
  {
    id: 'churn-analysis',
    category: DashboardCategory.SaaSFinancial,
    title: 'Churn & Retention Analytics',
    purpose: 'Analyze customer attrition patterns and cohort retention',
    refreshRate: 'Daily',
    dataSources: ['Stripe', 'Segment', 'CRM'],
    metrics: [
      'Gross Churn Rate',
      'Net Revenue Retention (NRR)',
      'Customer Lifetime Value (LTV)',
      'Logo Churn'
    ],
    visualizations: [
      'Cohort Retention Heatmap',
      'Bar: Churn by Reason',
      'Line: LTV Trend'
    ],
    notes: 'Focus on identifying segments with highest churn risk.'
  },

  // CATEGORY 2: Product & Usage
  {
    id: 'feature-adoption',
    category: DashboardCategory.ProductUsage,
    title: 'Feature Adoption Dashboard',
    purpose: 'Measure how users interact with core and new product features',
    refreshRate: 'Real-time',
    dataSources: ['Amplitude', 'Mixpanel', 'Segment'],
    metrics: [
      'Feature Activation %',
      'Time to First Value (TTFV)',
      'Daily Usage Frequency',
      'Stickiness (DAU/MAU)'
    ],
    visualizations: [
      'Funnel: Feature Onboarding',
      'Heatmap: Usage by Hour',
      'Bar: Top Features'
    ],
    notes: 'Essential for product managers to validate roadmaps.'
  },
  {
    id: 'customer-health',
    category: DashboardCategory.ProductUsage,
    title: 'Customer Health Scorecard',
    purpose: 'Proactive monitoring of account health to prevent churn',
    refreshRate: 'Daily',
    dataSources: ['Support Tickets', 'Usage Data', 'Surveys'],
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
    notes: 'Health score is calculated as a weighted average of usage, support, and sentiment.'
  },

  // CATEGORY 3: AI/LLM Operations (EPB Focused)
  {
    id: 'epb-agent-observability',
    category: DashboardCategory.AIOps,
    title: 'EPB Agent Observability',
    purpose: 'Real-time monitoring of Claude-powered agents, ReAct loops, and HITL workflows',
    refreshRate: 'Real-time (WebSocket)',
    dataSources: ['OTEL Spans', 'Supabase RLS', 'Agent Execution Logs'],
    metrics: [
      'Success Rate (%)',
      'p95 Latency (ms)',
      'Avg ReAct Steps',
      'HITL Approval Rate',
      'Token Count per Task'
    ],
    visualizations: [
      'Timeline: ReAct Loop Step Analysis',
      'Scatter: Latency vs Token Usage',
      'Queue: HITL Pending Approvals',
      'Bar: Tool Utilization'
    ],
    notes: 'Requires RBAC scoping. Engineers see technical traces; Managers see approval rates. Includes ReAct loop visualization.',
    alertThreshold: 'Success Rate < 95% or p95 Latency > 10s'
  },
  {
    id: 'epb-executive-governance',
    category: DashboardCategory.AIOps,
    title: 'EPB Executive Cost Governance',
    purpose: 'High-level ROI, budget tracking, and organization-scoped cost analysis',
    refreshRate: 'Hourly',
    dataSources: ['Cost Records', 'Organization Usage APIs'],
    metrics: [
      'Total Org Spend ($)',
      'Budget Remaining (%)',
      'Cost per Agent Type',
      'Estimated ROI (Hours Saved)'
    ],
    visualizations: [
      'Gauge: Monthly Budget Utilization',
      'Area Chart: Spending Trend vs Forecast',
      'Pie Chart: Cost Breakdown by Model'
    ],
    notes: 'Executive-scoped view. Enforces Org-level RLS. ROI is calculated based on agent task completion vs. manual human time estimates.',
    alertThreshold: 'Spend > 80% of Monthly Token Budget'
  },
  {
    id: 'llm-performance-comparison',
    category: DashboardCategory.AIOps,
    title: 'Model Performance Sandbox',
    purpose: 'Benchmark different LLMs on cost, quality, and speed',
    refreshRate: 'On-demand',
    dataSources: ['OpenAI', 'Claude', 'Llama 3'],
    metrics: [
      'Tokens per Second',
      'Cost per 1k Tokens',
      'Response Faithfulness Score',
      'Error Rate'
    ],
    visualizations: [
      'Bar: Latency Comparison',
      'Radar Chart: Model Strengths',
      'Table: Cost Efficiency'
    ],
    notes: 'Includes side-by-side prompt testing functionality.'
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
    notes: 'Integrate multi-touch attribution models where possible.'
  },

  // CATEGORY 5: Team & Operations
  {
    id: 'project-velocity',
    category: DashboardCategory.TeamOps,
    title: 'Agile Velocity Dashboard',
    purpose: 'Track engineering team throughput and sprint health',
    refreshRate: 'Daily',
    dataSources: ['Jira', 'GitHub', 'Linear'],
    metrics: [
      'Sprint Velocity',
      'Cycle Time',
      'PR Review Latency',
      'Deployment Frequency'
    ],
    visualizations: [
      'Burn-down Chart',
      'Control Chart: Cycle Time',
      'Stacked Bar: Scope Creep'
    ],
    notes: 'Useful for DORA metrics alignment.'
  },

  // CATEGORY 6: Enterprise & Governance (EPB Focused)
  {
    id: 'epb-compliance-audit',
    category: DashboardCategory.EnterpriseGov,
    title: 'EPB Compliance & Audit Trail',
    purpose: 'SOC2, GDPR, HIPAA, and EU AI Act readiness monitoring',
    refreshRate: 'Real-time',
    dataSources: ['Audit Logs', 'Policy Engine', 'Access Controls'],
    metrics: [
      'Incident Count',
      'Policy Violations',
      'Data Residency Status',
      'DSR Completion Rate'
    ],
    visualizations: [
      'Log Table: Immutable Audit Trail',
      'Status Matrix: Regulatory Compliance',
      'Heatmap: Access Patterns'
    ],
    notes: 'Admin-only view. Shows model lineage and hashed IP addresses for privacy.',
  },
  {
    id: 'security-compliance',
    category: DashboardCategory.EnterpriseGov,
    title: 'Security & Compliance Dashboard',
    purpose: 'SOC2/GDPR real-time monitoring and incident alerting',
    refreshRate: 'Real-time',
    dataSources: ['Auth Logs', 'VPC Flow Logs', 'IAM'],
    metrics: [
      'Failed Login Attempts',
      'Policy Violations',
      'Data Access Events',
      'Security Incidents'
    ],
    visualizations: [
      'Alert Dashboard: Events',
      'Heatmap: Access patterns',
      'Compliance Checklist'
    ],
    notes: 'Includes persistent banner for high-severity breaches.'
  }
];
