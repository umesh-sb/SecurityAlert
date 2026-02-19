// Type definitions for the alert management system

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type BusinessImpact = 'revenue-critical' | 'pii-regulated' | 'internal-tool' | 'development';

export interface Alert {
  id: string;
  priority: PriorityLevel;
  title: string;
  businessUnit: string;
  businessImpact: BusinessImpact;
  riskScore: number;
  resource: string;
  slaMinutesRemaining: number;
  description: string;
  environment: 'production' | 'staging' | 'development';
  tags: string[];
  owner: string;
  complianceFrameworks: string[];
  rawData?: any;
  aiSummary?: string;
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  type: 'alert' | 'policy-change' | 'login' | 'access' | 'deployment';
}

export type ResolutionType = 'remediated' | 'false-positive' | 'accepted-risk' | 'escalated';

export interface Resolution {
  type: ResolutionType;
  summary: string;
  falsePositiveReason?: string;
  notes?: string;
}
