import { PriorityLevel, BusinessImpact } from '../types';

export function getPriorityColor(priority: PriorityLevel): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-500';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-blue-500';
  }
}

export function getBusinessImpactLabel(impact: BusinessImpact): { label: string; emoji: string; color: string } {
  switch (impact) {
    case 'revenue-critical':
      return { label: 'Revenue-Critical', emoji: '🟣', color: 'text-purple-600 bg-purple-50 border-purple-200' };
    case 'pii-regulated':
      return { label: 'PII / Regulated', emoji: '🟡', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    case 'internal-tool':
      return { label: 'Internal Tool', emoji: '🔵', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    case 'development':
      return { label: 'Development', emoji: '⚫', color: 'text-gray-600 bg-gray-50 border-gray-200' };
  }
}

export function formatSLA(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function getSLAColor(minutes: number): string {
  if (minutes < 60) return 'text-red-600';
  if (minutes < 180) return 'text-orange-600';
  return 'text-green-600';
}

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
