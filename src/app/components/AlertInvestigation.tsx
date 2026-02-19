import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Clock, Shield, Building2, Users, FileText, CheckCircle2 } from 'lucide-react';
import { mockAlerts } from '../data/mockAlerts';
import { getPriorityColor, getBusinessImpactLabel, formatTimestamp } from '../utils/alertUtils';
import { ResolutionModal } from './ResolutionModal';

export function AlertInvestigation() {
  const { alertId } = useParams();
  const navigate = useNavigate();
  const [showRawData, setShowRawData] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  
  const alert = mockAlerts.find(a => a.id === alertId);

  if (!alert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Alert Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Queue
          </button>
        </div>
      </div>
    );
  }

  const priorityColor = getPriorityColor(alert.priority);
  const businessImpact = getBusinessImpactLabel(alert.businessImpact);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Queue</span>
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${priorityColor}`} />
                <h1 className="text-2xl">{alert.title}</h1>
              </div>
              <p className="text-gray-600">{alert.description}</p>
            </div>
            <button
              onClick={() => setShowResolutionModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Resolve Alert
            </button>
          </div>
        </div>
      </header>

      {/* Three Panel Layout */}
      <main className="px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel: Timeline */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline
              </h2>
              <div className="space-y-4">
                {alert.timeline?.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index < alert.timeline!.length - 1 && (
                      <div className="absolute left-2 top-8 bottom-0 w-px bg-gray-200" />
                    )}
                    <div className="flex gap-3">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 flex-shrink-0 relative z-10" />
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-gray-900 mb-1">{event.title}</p>
                        <p className="text-xs text-gray-600 mb-1">{event.description}</p>
                        <p className="text-xs text-gray-500">{formatTimestamp(event.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel: Alert Details */}
          <div className="col-span-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                AI-Generated Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                {alert.aiSummary}
              </p>

              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowRawData(!showRawData)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3"
                >
                  {showRawData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Raw Alert Data (JSON)
                </button>
                {showRawData && (
                  <pre className="bg-gray-50 p-4 rounded text-xs overflow-x-auto">
                    {JSON.stringify(alert.rawData || { message: 'No raw data available' }, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Dynamic Remediation Playbook */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Remediation Playbook
              </h2>
              <div className="space-y-3">
                {alert.priority === 'critical' && alert.title.includes('S3') && (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 1: Block Public Access</p>
                        <p className="text-xs text-gray-600 mb-2">Enable S3 Block Public Access settings</p>
                        <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Execute via AWS CLI
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 2: Review Access Logs</p>
                        <p className="text-xs text-gray-600">Check CloudTrail for unauthorized access</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 3: Notify Security Team</p>
                        <p className="text-xs text-gray-600">Alert {alert.owner} of the incident</p>
                      </div>
                    </div>
                  </>
                )}
                {alert.title.includes('IAM') && (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 1: Review Required Permissions</p>
                        <p className="text-xs text-gray-600">Identify minimum necessary permissions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 2: Apply Least Privilege</p>
                        <p className="text-xs text-gray-600">Update IAM policy with scoped permissions</p>
                      </div>
                    </div>
                  </>
                )}
                {alert.title.includes('Unencrypted') && (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 1: Create Encrypted Snapshot</p>
                        <p className="text-xs text-gray-600">Backup current database state</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <input type="checkbox" className="mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">Step 2: Enable Encryption</p>
                        <p className="text-xs text-gray-600">Restore from encrypted snapshot</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Context & Action Hub */}
          <div className="col-span-3">
            <div className="space-y-4">
              {/* Resource Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Resource Details
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs text-gray-600 mb-1">Resource Name</dt>
                    <dd className="text-sm">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">{alert.resource}</code>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-600 mb-1">Environment</dt>
                    <dd className="text-sm capitalize">{alert.environment}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-600 mb-1">Tags</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {alert.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Business Context Card */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-sm mb-4 flex items-center gap-2 text-blue-900">
                  <Users className="w-4 h-4" />
                  Business Context
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs text-blue-700 mb-1">Business Unit</dt>
                    <dd className="text-sm text-blue-900">{alert.businessUnit}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-blue-700 mb-1">Business Impact</dt>
                    <dd>
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${businessImpact.color}`}>
                        <span>{businessImpact.emoji}</span>
                        <span>{businessImpact.label}</span>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-blue-700 mb-1">Compliance</dt>
                    <dd className="text-sm text-blue-900">
                      {alert.complianceFrameworks.length > 0 
                        ? alert.complianceFrameworks.join(', ')
                        : 'None'
                      }
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-blue-700 mb-1">Team Owner</dt>
                    <dd className="text-sm text-blue-900">
                      <a href="#" className="hover:underline">{alert.owner}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Annotation */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-xs">
                    4
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">
                      <strong>Business Context Card:</strong> Answers "Why should I care?" immediately. 
                      See compliance requirements and revenue impact at a glance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annotation for Playbook */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-sm">
              5
            </div>
            <div>
              <h3 className="text-sm mb-2">Dynamic Remediation Playbook</h3>
              <p className="text-sm text-gray-600">
                Instead of a blank text box, we provide a checklist. The system knows this is a {alert.title.toLowerCase()} 
                and suggests specific steps with one-click buttons. This guides junior analysts and speeds up everyone else.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Resolution Modal */}
      {showResolutionModal && (
        <ResolutionModal
          alert={alert}
          onClose={() => setShowResolutionModal(false)}
          onResolve={() => {
            setShowResolutionModal(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
}
