import { Alert } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    priority: 'critical',
    title: 'S3 Public Read Access Enabled',
    businessUnit: 'Payments',
    businessImpact: 'revenue-critical',
    riskScore: 98,
    resource: 'payment-logs-prod',
    slaMinutesRemaining: 150,
    description: 'S3 bucket containing payment transaction logs is publicly accessible',
    environment: 'production',
    tags: ['PCI', 'Payments', 'S3'],
    owner: '@payments-team',
    complianceFrameworks: ['PCI-DSS', 'SOC2'],
    aiSummary: 'Critical security issue detected: The S3 bucket "payment-logs-prod" has been configured to allow public read access. This bucket contains payment transaction logs that include sensitive customer data. Immediate action required to block public access and verify no unauthorized data access occurred.',
    timeline: [
      {
        id: 'event-001',
        timestamp: new Date(Date.now() - 15 * 60000),
        title: 'Suspicious Login Detected',
        description: 'Login from new IP address: 185.220.101.42 (TOR exit node)',
        type: 'login'
      },
      {
        id: 'event-002',
        timestamp: new Date(Date.now() - 10 * 60000),
        title: 'S3 Bucket Policy Modified',
        description: 'User "deploy-bot" modified bucket policy to allow public read access',
        type: 'policy-change'
      },
      {
        id: 'event-003',
        timestamp: new Date(Date.now() - 5 * 60000),
        title: 'Alert Triggered',
        description: 'Public S3 bucket detected by automated security scan',
        type: 'alert'
      }
    ],
    rawData: {
      bucketName: 'payment-logs-prod',
      region: 'us-east-1',
      publicAccessBlockEnabled: false,
      bucketPolicy: {
        Statement: [{
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: 'arn:aws:s3:::payment-logs-prod/*'
        }]
      }
    }
  },
  {
    id: 'alert-002',
    priority: 'high',
    title: 'IAM Role Overprivileged',
    businessUnit: 'Marketing',
    businessImpact: 'internal-tool',
    riskScore: 32,
    resource: 'marketing-site-dev',
    slaMinutesRemaining: 195,
    description: 'IAM role has excessive permissions beyond required scope',
    environment: 'development',
    tags: ['IAM', 'Marketing', 'Development'],
    owner: '@marketing-team',
    complianceFrameworks: ['SOC2'],
    aiSummary: 'IAM role "marketing-site-dev-role" has been granted admin-level permissions. While this is a development environment, the role has access to production resources through cross-account permissions. Recommend applying principle of least privilege.',
    timeline: [
      {
        id: 'event-004',
        timestamp: new Date(Date.now() - 120 * 60000),
        title: 'IAM Role Created',
        description: 'New IAM role created by user "john.doe"',
        type: 'deployment'
      },
      {
        id: 'event-005',
        timestamp: new Date(Date.now() - 90 * 60000),
        title: 'Permissions Escalated',
        description: 'Admin policy attached to role',
        type: 'policy-change'
      },
      {
        id: 'event-006',
        timestamp: new Date(Date.now() - 30 * 60000),
        title: 'Alert Triggered',
        description: 'Overprivileged role detected by policy analyzer',
        type: 'alert'
      }
    ]
  },
  {
    id: 'alert-003',
    priority: 'high',
    title: 'Unencrypted RDS Database',
    businessUnit: 'Customer Data',
    businessImpact: 'pii-regulated',
    riskScore: 85,
    resource: 'user-db-prod',
    slaMinutesRemaining: 105,
    description: 'Production database storing PII is not encrypted at rest',
    environment: 'production',
    tags: ['RDS', 'PII', 'Encryption'],
    owner: '@data-team',
    complianceFrameworks: ['GDPR', 'SOC2', 'HIPAA'],
    aiSummary: 'RDS database instance "user-db-prod" is configured without encryption at rest. This database contains personally identifiable information (PII) including customer names, email addresses, and phone numbers. Encryption must be enabled to comply with GDPR and HIPAA requirements.',
    timeline: [
      {
        id: 'event-007',
        timestamp: new Date(Date.now() - 240 * 60000),
        title: 'Database Deployed',
        description: 'RDS instance created without encryption parameter',
        type: 'deployment'
      },
      {
        id: 'event-008',
        timestamp: new Date(Date.now() - 60 * 60000),
        title: 'Compliance Scan Initiated',
        description: 'Weekly compliance check started',
        type: 'access'
      },
      {
        id: 'event-009',
        timestamp: new Date(Date.now() - 45 * 60000),
        title: 'Alert Triggered',
        description: 'Unencrypted database detected',
        type: 'alert'
      }
    ]
  },
  {
    id: 'alert-004',
    priority: 'medium',
    title: 'Unused Security Group',
    businessUnit: 'Engineering',
    businessImpact: 'development',
    riskScore: 15,
    resource: 'sg-dev-unused-2024',
    slaMinutesRemaining: 480,
    description: 'Security group with permissive rules has no attached resources',
    environment: 'development',
    tags: ['Security Group', 'Cleanup'],
    owner: '@devops-team',
    complianceFrameworks: [],
    aiSummary: 'Security group "sg-dev-unused-2024" allows inbound traffic from 0.0.0.0/0 on multiple ports but is not attached to any resources. While not an active threat, this represents attack surface that should be cleaned up.',
    timeline: [
      {
        id: 'event-010',
        timestamp: new Date(Date.now() - 720 * 60000),
        title: 'Security Group Created',
        description: 'Created during infrastructure testing',
        type: 'deployment'
      },
      {
        id: 'event-011',
        timestamp: new Date(Date.now() - 180 * 60000),
        title: 'Alert Triggered',
        description: 'Orphaned security group detected',
        type: 'alert'
      }
    ]
  },
  {
    id: 'alert-005',
    priority: 'low',
    title: 'CloudWatch Logs Retention Too Long',
    businessUnit: 'Engineering',
    businessImpact: 'internal-tool',
    riskScore: 8,
    resource: 'app-logs-staging',
    slaMinutesRemaining: 1440,
    description: 'Log retention set to 365 days increases storage costs',
    environment: 'staging',
    tags: ['CloudWatch', 'Cost Optimization'],
    owner: '@platform-team',
    complianceFrameworks: [],
    aiSummary: 'CloudWatch log group "app-logs-staging" is configured with 365-day retention for a staging environment. Reducing retention to 30 days would save approximately $45/month while maintaining adequate log history for non-production environments.',
    timeline: [
      {
        id: 'event-012',
        timestamp: new Date(Date.now() - 360 * 60000),
        title: 'Cost Analysis Run',
        description: 'Monthly cost optimization scan completed',
        type: 'access'
      },
      {
        id: 'event-013',
        timestamp: new Date(Date.now() - 300 * 60000),
        title: 'Alert Triggered',
        description: 'Cost optimization opportunity identified',
        type: 'alert'
      }
    ]
  }
];
