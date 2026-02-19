import { Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockAlerts } from '../data/mockAlerts';
import { getPriorityColor, getBusinessImpactLabel, formatSLA, getSLAColor } from '../utils/alertUtils';

export function AlertQueue() {
  const navigate = useNavigate();
  
  const sortedAlerts = [...mockAlerts].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-3xl mb-2">Security Alert Queue</h1>
          <p className="text-gray-600">Prioritized by business impact and risk</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Info Banner */}
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-900 mb-1">
                <strong>Context over Volume:</strong> Alerts are sorted by actual business risk, not just technical severity.
              </p>
              <p className="text-blue-700">
                Risk Score = Severity × Asset Criticality × Internet Exposure × Business Impact
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Priority</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Alert Title</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Business Unit</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Business Impact</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Risk Score</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Resource</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">SLA</th>
                </tr>
              </thead>
              <tbody>
                {sortedAlerts.map((alert, index) => {
                  const priorityColor = getPriorityColor(alert.priority);
                  const businessImpact = getBusinessImpactLabel(alert.businessImpact);
                  const slaColor = getSLAColor(alert.slaMinutesRemaining);

                  return (
                    <tr 
                      key={alert.id}
                      onClick={() => navigate(`/alert/${alert.id}`)}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${priorityColor}`} />
                          <span className="text-sm capitalize text-gray-700">{alert.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{alert.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{alert.businessUnit}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm ${businessImpact.color}`}>
                          <span>{businessImpact.emoji}</span>
                          <span>{businessImpact.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{alert.riskScore}</span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                          {alert.resource}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${slaColor}`} />
                          <span className={`text-sm ${slaColor}`}>
                            {formatSLA(alert.slaMinutesRemaining)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Annotations */}
        <div className="mt-8 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div>
                <h3 className="text-sm mb-2">The "Business Impact" Badge</h3>
                <p className="text-sm text-gray-600">
                  We replace abstract severity with concrete business context. A red badge here means "This affects revenue." 
                  Arjun knows immediately that the Payments alert takes priority over the Marketing alert, even if the Marketing 
                  alert was technically 'High' severity.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div>
                <h3 className="text-sm mb-2">Risk Score</h3>
                <p className="text-sm text-gray-600">
                  The score is calculated as: Severity × Asset Criticality × Internet Exposure × Business Impact. 
                  This ensures the queue is sorted by actual risk to the company, not just the cloud provider's severity rating.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div>
                <h3 className="text-sm mb-2">SLA Timer</h3>
                <p className="text-sm text-gray-600">
                  A visible countdown clock enforces compliance without needing to check a separate system. 
                  It adds healthy pressure to resolve business-critical issues first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
