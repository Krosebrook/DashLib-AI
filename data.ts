
import { Template, DashboardCategory } from './types';

export const templates: Template[] = [
  // ===========================================================================
  // EXISTING TEMPLATES (Preserved)
  // ===========================================================================
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
  },

  // ===========================================================================
  // NEW: INTINC.COM - FRONT OF HOUSE (Fleet Ops, Driver Safety, Dispatch)
  // ===========================================================================
  
  // --- FOH: Live Operations & Dispatch ---
  {
    id: 'fleet-live-map-ops',
    category: DashboardCategory.TeamOps,
    title: 'Global Fleet Live Map',
    purpose: 'Real-time geospatial tracking of all active assets with status indicators',
    refreshRate: 'Real-time (10s poll)',
    dataSources: ['GPS Telematics', 'Google Maps API', 'Vehicle Status'],
    metrics: ['Active Vehicles', 'Idling Vehicles', 'Offline Devices', 'Geofence Breaches'],
    visualizations: ['Map: Clustered Asset View', 'List: Real-time Status Feed', 'Counter: Operational Availability'],
    notes: 'FOH Core. Needs identifying moving vs stopped assets instantly.'
  },
  {
    id: 'route-adherence-monitor',
    category: DashboardCategory.TeamOps,
    title: 'Route Adherence Monitor',
    purpose: 'Compare planned vs actual routes to detect unauthorized deviation',
    refreshRate: '5 min',
    dataSources: ['Dispatch System', 'GPS Breadcrumbs'],
    metrics: ['Out-of-Route Miles', 'ETA Slippage', 'Unplanned Stops', 'Schedule Adherence %'],
    visualizations: ['Map: Path Comparison Overlay', 'Bar: Deviations by Driver', 'KPI: Wasted Fuel (Route Gap)'],
    notes: 'Critical for logistics efficiency.'
  },
  {
    id: 'geofence-activity-log',
    category: DashboardCategory.TeamOps,
    title: 'Geofence Activity Log',
    purpose: 'Monitor entry/exit times for yards, customer sites, and restricted zones',
    refreshRate: 'Real-time',
    dataSources: ['Geospatial Engine', 'Telematics Event Bus'],
    metrics: ['Time on Site', 'Unauthorized Entries', 'Yard Turnaround Time', 'Daily Site Visits'],
    visualizations: ['Timeline: Entry/Exit Events', 'Heatmap: Site Congestion', 'Table: Dwell Time Analysis'],
    notes: 'Automates proof of delivery and yard management.'
  },
  {
    id: 'job-dispatch-queue',
    category: DashboardCategory.TeamOps,
    title: 'Job Dispatch Queue',
    purpose: 'Drag-and-drop assignment interface for fleet managers',
    refreshRate: 'Real-time',
    dataSources: ['ERP Work Orders', 'Driver Mobile App'],
    metrics: ['Unassigned Jobs', 'Jobs at Risk', 'Avg Completion Time', 'Driver Availability'],
    visualizations: ['Kanban: Job Status', 'Gantt: Driver Schedule', 'Map: Job Density'],
    notes: 'FOH Dispatcher main view.'
  },
  {
    id: 'asset-utilization-heat',
    category: DashboardCategory.ProductUsage,
    title: 'Asset Utilization Heatmap',
    purpose: 'Identify under-used vehicles and optimize fleet sizing',
    refreshRate: 'Daily',
    dataSources: ['Ignition On/Off Logs', 'Odometer'],
    metrics: ['Utilization Rate %', 'Ghost Assets (0 miles)', 'Peak Usage Hours', 'Miles per Day'],
    visualizations: ['Heatmap: Usage by Hour/Day', 'Scatter: Age vs Utilization', 'Bar: Bottom 10% Assets'],
    notes: 'Used to right-size the fleet.'
  },
  {
    id: 'cold-chain-monitor',
    category: DashboardCategory.ProductUsage,
    title: 'Reefer Cold Chain Monitor',
    purpose: 'Live temperature tracking for refrigerated trailers (FSMA Compliance)',
    refreshRate: 'Real-time',
    dataSources: ['Temp Sensors', 'Reefer Unit ECU'],
    metrics: ['Current Temp', 'Setpoint Deviation', 'Door Open Events', 'Fuel Level (Reefer)'],
    visualizations: ['Line: Temp vs Time', 'Gauge: Current Zone Temp', 'Alert Feed: Spoilage Risk'],
    notes: 'Alerts if temp deviates > 2 degrees for > 15 mins.'
  },
  {
    id: 'trailer-tracking',
    category: DashboardCategory.TeamOps,
    title: 'Trailer & Asset Tracker',
    purpose: 'Locate non-powered assets via battery-powered GPS/IoT',
    refreshRate: '12 hours',
    dataSources: ['IoT Gateways', 'Asset Tags'],
    metrics: ['Dormant Trailers', 'Trailers in Detention', 'Battery Life (Tags)', 'Yard Distribution'],
    visualizations: ['Map: Trailer Pools', 'Bar: Detention Days', 'Pie: Status (Loaded/Empty)'],
    notes: 'Prevents "lost" trailers.'
  },
  {
    id: 'driver-messaging-hub',
    category: DashboardCategory.TeamOps,
    title: 'Driver Messaging Hub',
    purpose: 'Central comms center between dispatch and in-cab tablets',
    refreshRate: 'Real-time',
    dataSources: ['Mobile App API', 'Text-to-Speech Service'],
    metrics: ['Unread Messages', 'Avg Response Time', 'Emergency Alerts', 'Broadcast Status'],
    visualizations: ['Chat Interface', 'List: Broadcast History', 'Map: Message Location Context'],
    notes: 'Includes macro responses for safety.'
  },
  {
    id: 'fuel-pilferage-watch',
    category: DashboardCategory.EnterpriseGov,
    title: 'Fuel Pilferage Watch',
    purpose: 'Detect anomalies between fuel card transactions and tank level sensors',
    refreshRate: 'Hourly',
    dataSources: ['Fuel Card API', 'CAN Bus Fuel Level'],
    metrics: ['Suspected Theft Events', 'Gallons Variance', 'Location Mismatches', 'Non-Tank Fillups'],
    visualizations: ['Scatter: Transaction vs Tank Level', 'Map: Theft Hotspots', 'Table: Flagged Transactions'],
    notes: 'Compares GPS location of pump vs truck.'
  },

  // --- FOH: Driver Safety & Mentor Program ---
  {
    id: 'driver-safety-scorecard',
    category: DashboardCategory.ProductUsage,
    title: 'Driver Safety Scorecard',
    purpose: 'Individual performance grading based on FICO® Safe Driving Score',
    refreshRate: 'Daily',
    dataSources: ['Accelerometer', 'Speeding Logs', 'Cornering Events'],
    metrics: ['FICO® Score', 'Speeding Events/100mi', 'Harsh Braking Count', 'Distraction Score'],
    visualizations: ['Radial Gauge: Overall Score', 'Trend: Score Last 90 Days', 'Radar: Behavior Breakdown'],
    notes: 'The core visual for the "Mentor" app.'
  },
  {
    id: 'harsh-event-viewer',
    category: DashboardCategory.ProductUsage,
    title: 'Harsh Event Video Viewer',
    purpose: 'Review dashcam footage triggered by g-force events',
    refreshRate: 'On-Event',
    dataSources: ['Dashcam Cloud', 'G-Force Sensor'],
    metrics: ['Video Available', 'G-Force Peak', 'Speed at Impact', 'Driver Tag'],
    visualizations: ['Video Player Container', 'Line: G-Force Trace', 'Map: Event Location'],
    notes: 'Used by safety managers for coaching.'
  },
  {
    id: 'speeding-heatmap',
    category: DashboardCategory.ProductUsage,
    title: 'Speeding Profile Heatmap',
    purpose: 'Identify where and when drivers habitually speed',
    refreshRate: 'Daily',
    dataSources: ['GPS Speed', 'Posted Speed Limits DB'],
    metrics: ['Speeding > 10mph over', 'Duration of Speeding', 'School Zone Violations', 'Highway vs City'],
    visualizations: ['Heatmap: Speeding by Time/Day', 'Map: Speeding Corridors', 'Bar: Worst Offenders'],
    notes: 'Focus on persistent behavior modification.'
  },
  {
    id: 'distracted-driving-ai',
    category: DashboardCategory.AIOps,
    title: 'Distracted Driving AI Detection',
    purpose: 'Computer vision analysis of driver attentiveness (Phone use, Smoking)',
    refreshRate: 'Real-time',
    dataSources: ['In-Cab AI Camera', 'Edge Processor'],
    metrics: ['Phone Use Events', 'Drowsiness Alerts', 'Seatbelt Violations', 'Face Obstructed'],
    visualizations: ['Timeline: Distraction Events', 'Pie: Distraction Types', 'Trend: Alert Reduction'],
    notes: 'AI running on the edge device.'
  },
  {
    id: 'gamification-leaderboard',
    category: DashboardCategory.TeamOps,
    title: 'Safety Leaderboard',
    purpose: 'Gamified ranking of drivers to incentivize safe behavior',
    refreshRate: 'Daily',
    dataSources: ['Driver Scorecard', 'Team Hierarchy'],
    metrics: ['Rank', 'Safety Streak (Days)', 'Points Earned', 'Badge Status'],
    visualizations: ['List: Top 10 Drivers', 'List: Most Improved', 'Confetti Animation: Winners'],
    notes: 'Foster friendly competition.'
  },
  {
    id: 'coaching-effectiveness',
    category: DashboardCategory.ProductUsage,
    title: 'Coaching Effectiveness Tracker',
    purpose: 'Measure if manager interventions actually improve driver scores',
    refreshRate: 'Weekly',
    dataSources: ['Coaching Log', 'Safety Scores'],
    metrics: ['Coached Drivers', 'Post-Coach Improvement %', 'Recidivism Rate', 'Overdue Coaching'],
    visualizations: ['Line: Pre vs Post Coaching Score', 'Bar: Manager Activity', 'Table: At-Risk Drivers'],
    notes: 'HR/Safety Ops view.'
  },
  {
    id: 'accident-probability-model',
    category: DashboardCategory.AIOps,
    title: 'Accident Probability AI',
    purpose: 'Predictive model identifying drivers most likely to crash next month',
    refreshRate: 'Weekly',
    dataSources: ['Historical Crashes', 'Near Misses', 'Weather Data'],
    metrics: ['High Risk Drivers', 'Predicted Crash Rate', 'Risk Factors', 'Intervention Urgency'],
    visualizations: ['Scatter: Risk vs Exposure', 'List: Top 50 Risk Queue', 'Trend: Fleet Risk Index'],
    notes: 'Proactive intervention tool.'
  },
  {
    id: 'mobile-eye-adas',
    category: DashboardCategory.AIOps,
    title: 'ADAS / Mobileye Alerts',
    purpose: 'Monitor Advanced Driver Assistance System triggers',
    refreshRate: 'Real-time',
    dataSources: ['Mobileye', 'Vehicle CAN Bus'],
    metrics: ['Forward Collision Warnings', 'Lane Departure', 'Pedestrian Warnings', 'Headway Monitoring'],
    visualizations: ['Bar: Events by Type', 'Heatmap: Lane Drift Hotspots', 'Gauge: Following Distance'],
    notes: 'Hard braking precursor analysis.'
  },
  {
    id: 'seatbelt-compliance',
    category: DashboardCategory.EnterpriseGov,
    title: 'Seatbelt Compliance Log',
    purpose: 'Enforce safety policy regarding seatbelt usage',
    refreshRate: 'Real-time',
    dataSources: ['Seatbelt Sensor', 'Speed Odometer'],
    metrics: ['Unbuckled Miles', 'Unbuckled > 5mph Events', 'Driver Click-Rate', 'Violations Count'],
    visualizations: ['Bar: Violations by Driver', 'Trend: Compliance %', 'List: Recent Infractions'],
    notes: 'Zero tolerance policy tool.'
  },
  {
    id: 'positive-recognition',
    category: DashboardCategory.TeamOps,
    title: 'Positive Recognition Feed',
    purpose: 'Highlight good driving behavior to balance negative coaching',
    refreshRate: 'Daily',
    dataSources: ['Safety Data', 'Peer Review'],
    metrics: ['Crash-Free Miles', 'Perfect Score Days', 'Customer Compliments', 'Fuel Saved'],
    visualizations: ['Feed: "Kudos" Stream', 'Card: Driver of the Month', 'Trend: Positive Reinforcement'],
    notes: 'Retention tool.'
  },

  // ===========================================================================
  // NEW: INTINC.COM - BACK OF HOUSE (Maintenance, Compliance, Financial)
  // ===========================================================================

  // --- BOH: Vehicle Health & Maintenance ---
  {
    id: 'preventative-maintenance',
    category: DashboardCategory.TeamOps,
    title: 'Preventative Maintenance Schedule',
    purpose: 'Track upcoming service intervals based on engine hours and mileage',
    refreshRate: 'Daily',
    dataSources: ['Odometer', 'Engine Hours', 'Service History'],
    metrics: ['Overdue Services', 'Due in < 500mi', 'Predicted Shop Load', 'Service Compliance %'],
    visualizations: ['Table: PM Schedule', 'Gantt: Shop Availability', 'Pie: Service Type Distribution'],
    notes: 'Automated workflow triggers.'
  },
  {
    id: 'dtc-fault-codes',
    category: DashboardCategory.TeamOps,
    title: 'DTC Fault Code Center',
    purpose: 'Real-time engine diagnostics and "Check Engine" light triage',
    refreshRate: 'Real-time',
    dataSources: ['J1939/OBDII Bus', 'Manufacturer Error DB'],
    metrics: ['Active Red Lamps', 'Active Amber Lamps', 'Critical Engine Faults', 'Code Frequency'],
    visualizations: ['List: Priority Faults', 'Pareto: Top Failing Components', 'Map: Breakdown Risk'],
    notes: 'Links codes to troubleshooting guides.'
  },
  {
    id: 'tire-pressure-tpms',
    category: DashboardCategory.TeamOps,
    title: 'Tire Pressure (TPMS) Watch',
    purpose: 'Monitor tire health to prevent blowouts and improve fuel economy',
    refreshRate: '15 min',
    dataSources: ['TPMS Sensors', 'Ambient Temp'],
    metrics: ['Critical Under-inflation', 'Rapid Leak Alerts', 'High Temp Alerts', 'Avg PSI Variance'],
    visualizations: ['Car Diagram: Tire Status', 'List: Low PSI Assets', 'Trend: Fleet Avg Pressure'],
    notes: 'Major fuel saver.'
  },
  {
    id: 'battery-voltage-health',
    category: DashboardCategory.TeamOps,
    title: 'Battery Voltage Health',
    purpose: 'Detect failing batteries before they cause no-starts',
    refreshRate: 'Hourly',
    dataSources: ['Battery Voltage Sensor', 'Cranking Voltage'],
    metrics: ['Low Voltage Alerts', 'Bad Cranking Amps', 'Alternator Status', 'Replacement Due'],
    visualizations: ['Line: Voltage Drop on Crank', 'List: Replace Immediately', 'Gauge: Fleet Health'],
    notes: 'Winter readiness tool.'
  },
  {
    id: 'ev-fleet-charging',
    category: DashboardCategory.TeamOps,
    title: 'EV Fleet Charging Hub',
    purpose: 'Manage electric vehicle range and charging schedules',
    refreshRate: 'Real-time',
    dataSources: ['BMS (Battery Mgmt System)', 'Charger API'],
    metrics: ['Avg SoC (State of Charge)', 'Range Anxiety Alerts', 'Charging Sessions Active', 'kWh Consumed'],
    visualizations: ['Bar: Fleet SoC Distribution', 'Map: Range Radius', 'Line: Charging Peak Load'],
    notes: 'EV transition management.'
  },
  {
    id: 'work-order-turnaround',
    category: DashboardCategory.TeamOps,
    title: 'Work Order Turnaround',
    purpose: 'Analyze shop efficiency and asset downtime',
    refreshRate: 'Daily',
    dataSources: ['Maintenance Software', 'Time Clocks'],
    metrics: ['Avg Repair Time', 'Wrench Time %', 'Parts Wait Time', 'Backlog Count'],
    visualizations: ['Trend: Downtime Days', 'Bar: Technician Efficiency', 'Pie: Reason for Repair'],
    notes: 'Shop manager view.'
  },
  {
    id: 'parts-inventory-forecast',
    category: DashboardCategory.SaaSFinancial,
    title: 'Parts Inventory Forecast',
    purpose: 'Predict spare parts usage based on fleet mileage',
    refreshRate: 'Weekly',
    dataSources: ['Inventory DB', 'Fleet Mileage Prediction'],
    metrics: ['Stockout Risk', 'Inventory Value', 'Obsolete Parts', 'Turnover Rate'],
    visualizations: ['Bar: Low Stock Alerts', 'Trend: Tire Usage', 'Table: Order Recommendations'],
    notes: 'Supply chain optimization.'
  },
  {
    id: 'breakdown-response',
    category: DashboardCategory.TeamOps,
    title: 'Roadside Breakdown Response',
    purpose: 'Track efficiency of emergency roadside assistance',
    refreshRate: 'Real-time',
    dataSources: ['Dispatch', '3rd Party Towing API'],
    metrics: ['Active Breakdowns', 'Avg Time to Rescue', 'Towing Costs', 'Vendor Performance'],
    visualizations: ['Map: Stranded Assets', 'Timer: Active Incident Duration', 'Bar: Breakdown Causes'],
    notes: 'Critical operational recovery.'
  },
  {
    id: 'engine-hours-miles',
    category: DashboardCategory.ProductUsage,
    title: 'Engine Hours vs Miles',
    purpose: 'Identify idling-heavy assets vs highway assets for maintenance planning',
    refreshRate: 'Daily',
    dataSources: ['ECU Logs'],
    metrics: ['Avg Speed', 'Idle % of Engine Hours', 'PTO (Power Take Off) Usage', 'Total Hours'],
    visualizations: ['Scatter: Miles vs Hours', 'Bar: High Idle Assets', 'Gauge: Fleet Efficiency'],
    notes: 'Construction/Mixed fleet focus.'
  },
  {
    id: 'warranty-recovery',
    category: DashboardCategory.SaaSFinancial,
    title: 'Warranty Recovery Tracker',
    purpose: 'Ensure repairs covered by warranty are not paid out of pocket',
    refreshRate: 'Weekly',
    dataSources: ['Asset VIN DB', 'Work Orders'],
    metrics: ['Warranty Claims Open', 'Recovered Costs', 'Missed Warranty Opportunities', 'Expiring Warranties'],
    visualizations: ['Bar: Recovery $ by OEM', 'List: Potential Claims', 'Timeline: Expiry Risk'],
    notes: 'Financial leakage plug.'
  },

  // --- BOH: Compliance, Legal, Risk ---
  {
    id: 'hos-eld-compliance',
    category: DashboardCategory.EnterpriseGov,
    title: 'HOS / ELD Compliance Center',
    purpose: 'Manage Hours of Service logs and prevent DOT violations',
    refreshRate: 'Real-time',
    dataSources: ['ELD Logs', 'Driver Duty Status'],
    metrics: ['HOS Violations', 'Uncertified Logs', 'Form & Manner Errors', 'Drivers in Violation'],
    visualizations: ['Grid: Driver Duty Status', 'Bar: Violation Types', 'Table: Audit Risk'],
    notes: 'Mandatory for US trucking.'
  },
  {
    id: 'dvir-inspection-logs',
    category: DashboardCategory.EnterpriseGov,
    title: 'DVIR Inspection Logs',
    purpose: 'Track pre-trip and post-trip Driver Vehicle Inspection Reports',
    refreshRate: 'Real-time',
    dataSources: ['Mobile App Inputs'],
    metrics: ['Missing Inspections', 'Defects Reported', 'Defects Repaired', 'Sign-off Status'],
    visualizations: ['Bar: Completion Rate', 'Pie: Defect Severity', 'List: Open Safety Defects'],
    notes: 'DOT compliance requirement.'
  },
  {
    id: 'ifta-tax-reporting',
    category: DashboardCategory.EnterpriseGov,
    title: 'IFTA Fuel Tax Reporting',
    purpose: 'Calculate miles driven per jurisdiction/state for tax purposes',
    refreshRate: 'Monthly',
    dataSources: ['GPS Odometer', 'State Boundaries'],
    metrics: ['Taxable Miles', 'Fuel Purchased by State', 'MPG by Jurisdiction', 'Tax Liability'],
    visualizations: ['Map: Miles by State', 'Table: IFTA Summary', 'Trend: Tax Cost'],
    notes: 'Automates quarterly filing.'
  },
  {
    id: 'unidentified-driving',
    category: DashboardCategory.EnterpriseGov,
    title: 'Unidentified Driving Records',
    purpose: 'Assign "ghost" miles to drivers to maintain ELD compliance',
    refreshRate: 'Daily',
    dataSources: ['ELD Unassigned Logs', 'GPS'],
    metrics: ['Unassigned Miles', 'Unassigned Drive Segments', 'Resolved %', 'Risk Score'],
    visualizations: ['Map: Segment Visualizer', 'List: Suggestion Engine', 'Trend: Backlog'],
    notes: 'Audit risk reduction.'
  },
  {
    id: 'crash-reconstruction',
    category: DashboardCategory.EnterpriseGov,
    title: 'Crash Reconstruction Viewer',
    purpose: 'Forensic analysis of data immediately preceding an accident',
    refreshRate: 'Static (On Request)',
    dataSources: ['Blackbox (ECM)', 'Accelerometers', 'GPS'],
    metrics: ['Speed at Impact', 'Brake Status', 'Throttle position', 'Seatbelt Status'],
    visualizations: ['Synched Graph: Speed/RPM/Brake', '3D Map: Trajectory', 'Video: Sync'],
    notes: 'Legal/Insurance defense tool.'
  },
  {
    id: 'insurance-risk-profile',
    category: DashboardCategory.EnterpriseGov,
    title: 'Insurance Risk Profile',
    purpose: 'Aggregated risk score for negotiating insurance premiums',
    refreshRate: 'Monthly',
    dataSources: ['Safety Scores', 'Claims History'],
    metrics: ['Fleet Risk Index', 'Claim Frequency', 'Loss Ratio', 'Premium Forecast'],
    visualizations: ['Trend: Risk Reduction', 'Bar: Claims by Region', 'Gauge: Insurability Score'],
    notes: 'Financial BOH.'
  },
  {
    id: 'driver-license-monitoring',
    category: DashboardCategory.EnterpriseGov,
    title: 'Driver License Monitoring (MVR)',
    purpose: 'Track CDL expiration and medical card status',
    refreshRate: 'Weekly',
    dataSources: ['HRIS', 'DMV API'],
    metrics: ['Expired Licenses', 'Expiring < 30 Days', 'Medical Card Status', 'Suspended Licenses'],
    visualizations: ['List: Compliance Alerts', 'Timeline: Expiry Horizon', 'Pie: Qualification Status'],
    notes: 'Prevents unqualified drivers.'
  },
  {
    id: 'co2-emissions-esg',
    category: DashboardCategory.EnterpriseGov,
    title: 'Fleet Carbon Footprint (ESG)',
    purpose: 'Track CO2 emissions for corporate sustainability reporting',
    refreshRate: 'Monthly',
    dataSources: ['Fuel Burn', 'Emission Factors'],
    metrics: ['Total CO2 (Tons)', 'CO2 per Mile', 'Carbon Offset', 'EV Reduction Impact'],
    visualizations: ['Area: Emissions Trend', 'Bar: Emissions by Asset Class', 'Card: ESG Goal Progress'],
    notes: 'Sustainability reporting.'
  },

  // --- BOH: Executive & Financial ---
  {
    id: 'total-cost-ownership',
    category: DashboardCategory.SaaSFinancial,
    title: 'Total Cost of Ownership (TCO)',
    purpose: 'Holistic view of fleet costs per mile/asset',
    refreshRate: 'Monthly',
    dataSources: ['Fuel', 'Maintenance', 'Lease', 'Insurance'],
    metrics: ['Cost Per Mile (CPM)', 'Total Fleet Spend', 'Depreciation', 'Variable vs Fixed Costs'],
    visualizations: ['Stacked Bar: Cost Breakdown', 'Trend: CPM', 'List: Most Expensive Assets'],
    notes: 'The "Bottom Line" dashboard.'
  },
  {
    id: 'fuel-spend-analysis',
    category: DashboardCategory.SaaSFinancial,
    title: 'Fuel Spend Analysis',
    purpose: 'Deep dive into the largest variable cost',
    refreshRate: 'Daily',
    dataSources: ['Fuel Cards', 'Market Prices'],
    metrics: ['Total Fuel Cost', 'Avg MPG', 'Price/Gallon Avg', 'Inefficiency Cost (Idling)'],
    visualizations: ['Trend: Fuel Price vs Spend', 'Bar: MPG by Truck Make', 'Map: Expensive Fuel Zones'],
    notes: 'Procurement optimization.'
  },
  {
    id: 'idle-cost-calculator',
    category: DashboardCategory.SaaSFinancial,
    title: 'Idle Cost Calculator',
    purpose: 'Quantify the financial waste of unnecessary idling',
    refreshRate: 'Daily',
    dataSources: ['Ignition Logs', 'Fuel Rate'],
    metrics: ['Wasted Gallons', 'Wasted Dollars', 'Idle %', 'Equivalent Miles Lost'],
    visualizations: ['Bar: Cost by Driver', 'Trend: Reduction Progress', 'KPI: Annualized Waste'],
    notes: 'Behavioral change financial impact.'
  },
  {
    id: 'device-health-iot',
    category: DashboardCategory.AIOps,
    title: 'Telematics Device Health (IoT)',
    purpose: 'Monitor the connectivity and status of the tracking hardware itself',
    refreshRate: 'Hourly',
    dataSources: ['Device Heartbeats', 'Cellular Network'],
    metrics: ['Devices Offline > 24h', 'GPS Lock Failures', 'Data Lag', 'Firmware Version'],
    visualizations: ['Bar: Health by Model', 'Map: Signal Strength Deadzones', 'Table: RMA Candidates'],
    notes: 'Ensures data integrity.'
  },
  {
    id: 'cellular-data-usage',
    category: DashboardCategory.SaaSFinancial,
    title: 'Cellular Data Usage',
    purpose: 'Monitor SIM card data consumption to prevent overage charges',
    refreshRate: 'Daily',
    dataSources: ['Carrier API (AT&T/Verizon)'],
    metrics: ['Total GB Used', 'Overage Risk', 'Top Consumers', 'Zero-Usage SIMs'],
    visualizations: ['Bar: Usage by Asset', 'Line: Monthly Projection', 'Pie: Carrier Split'],
    notes: 'IT/Ops cost control.'
  },
  {
    id: 'roi-safety-program',
    category: DashboardCategory.SaaSFinancial,
    title: 'Safety Program ROI',
    purpose: 'Correlate safety scores with accident cost reduction',
    refreshRate: 'Quarterly',
    dataSources: ['Safety Scores', 'Claims Costs'],
    metrics: ['Crash Rate Reduction', 'Claims Savings', 'Program Cost', 'Net ROI'],
    visualizations: ['Line: Scores vs Costs (Inverse)', 'Bar: Savings Year-over-Year', 'KPI: Payback Period'],
    notes: 'Justifies the safety platform spend.'
  },
  {
    id: 'fleet-replacement-planning',
    category: DashboardCategory.SaaSFinancial,
    title: 'Fleet Replacement Planning',
    purpose: 'Determine optimal time to sell/replace assets',
    refreshRate: 'Monthly',
    dataSources: ['Market Values', 'Maintenance Curves'],
    metrics: ['Assets Due for Replacement', 'Resale Value Est', 'Maintenance Cost > Asset Value', 'New Asset Capex'],
    visualizations: ['Scatter: Age vs Cost', 'List: Replacement Queue', 'Bar: Budget Forecast'],
    notes: 'Lifecycle management.'
  }
];
