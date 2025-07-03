"use client"

import { CheckCircle, AlertTriangle, XCircle, Lightbulb } from "lucide-react"

export default function ValidationReport() {
  const validationResults = [
    {
      category: "Theme & Concept Alignment",
      status: "excellent",
      score: 95,
      findings: [
        "✅ 'Culture to Circuit' theme perfectly executed",
        "✅ Tribal-tech fusion concept is innovative and engaging",
        "✅ Educational focus aligns with CpE curriculum",
        "⚠️ Consider adding more specific Mindanao cultural elements",
      ],
    },
    {
      category: "Budget Feasibility",
      status: "good",
      score: 85,
      findings: [
        "✅ ₱3,000-₱5,000 range is realistic for student budget",
        "✅ Smart cost-cutting through lab equipment reuse",
        "✅ Local sourcing strategy reduces costs",
        "⚠️ Add 10% contingency for unexpected expenses",
        "❌ LED strips might exceed budget - consider alternatives",
      ],
    },
    {
      category: "Space & Layout Optimization",
      status: "good",
      score: 80,
      findings: [
        "✅ 3m x 3m layout is well-planned and efficient",
        "✅ Logical visitor flow from entry to exit",
        "✅ Modular station design allows flexibility",
        "⚠️ Sumobot arena might need more space for spectators",
        "⚠️ Consider noise levels between stations",
      ],
    },
    {
      category: "Team Structure & Roles",
      status: "excellent",
      score: 90,
      findings: [
        "✅ Clear role definitions with specific responsibilities",
        "✅ Appropriate team size (9-12 members total)",
        "✅ Good balance of technical and creative roles",
        "✅ Backup coverage for critical functions",
      ],
    },
    {
      category: "Activity Design & Engagement",
      status: "excellent",
      score: 92,
      findings: [
        "✅ Activities cover core CpE competencies",
        "✅ Progressive difficulty levels accommodate all visitors",
        "✅ Cultural integration is meaningful, not superficial",
        "✅ QR trail creates cohesive experience",
        "⚠️ Need backup activities for high traffic periods",
      ],
    },
    {
      category: "Technical Implementation",
      status: "good",
      score: 78,
      findings: [
        "✅ QR code integration is practical and scalable",
        "✅ Materials are readily available locally",
        "⚠️ Need reliable internet for QR functionality",
        "⚠️ Laptop security and power management concerns",
        "❌ No backup plan for technical failures",
      ],
    },
  ]

  const recommendations = [
    {
      priority: "High",
      category: "Risk Mitigation",
      items: [
        "Create offline backup versions of all QR content",
        "Prepare portable power banks for electronic components",
        "Designate a technical troubleshooter role",
        "Test all equipment 48 hours before the event",
      ],
    },
    {
      priority: "Medium",
      category: "Enhancement Opportunities",
      items: [
        "Add a 'Tech Talk' schedule every 30 minutes",
        "Create Instagram-worthy photo spots with tribal-tech aesthetics",
        "Develop a simple mobile app instead of multiple QR destinations",
        "Include a 'Future CpE' career counseling mini-session",
      ],
    },
    {
      priority: "Low",
      category: "Nice-to-Have Features",
      items: [
        "Live streaming of sumobot matches",
        "Digital leaderboard for activities",
        "Augmented reality elements using phone cameras",
        "Collaboration with local artisans for authentic materials",
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="text-green-400" size={24} />
      case "good":
        return <AlertTriangle className="text-yellow-400" size={24} />
      case "needs-work":
        return <XCircle className="text-red-400" size={24} />
      default:
        return <AlertTriangle className="text-gray-400" size={24} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "border-green-500/30 bg-green-500/10"
      case "good":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "needs-work":
        return "border-red-500/30 bg-red-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  const overallScore = Math.round(
    validationResults.reduce((sum, result) => sum + result.score, 0) / validationResults.length,
  )

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-3xl border border-purple-500/30">
        <h2 className="text-3xl font-bold mb-4">Overall Validation Score</h2>
        <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-4">
          {overallScore}/100
        </div>
        <p className="text-xl text-gray-300">
          {overallScore >= 90
            ? "Excellent - Ready for Implementation"
            : overallScore >= 80
              ? "Good - Minor Adjustments Needed"
              : overallScore >= 70
                ? "Fair - Significant Improvements Required"
                : "Needs Major Revision"}
        </p>
      </div>

      {/* Detailed Validation Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validationResults.map((result, index) => (
          <div key={index} className={`p-6 rounded-2xl border-2 ${getStatusColor(result.status)}`}>
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(result.status)}
              <h3 className="text-xl font-bold">{result.category}</h3>
              <span className="ml-auto text-2xl font-bold">{result.score}/100</span>
            </div>
            <div className="space-y-2">
              {result.findings.map((finding, idx) => (
                <div key={idx} className="text-sm flex items-start gap-2">
                  <span className="flex-shrink-0">{finding.split(" ")[0]}</span>
                  <span>{finding.substring(finding.indexOf(" ") + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          Implementation Recommendations
        </h2>
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="text-yellow-400" size={24} />
              <h3 className="text-xl font-bold">{rec.category}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  rec.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : rec.priority === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {rec.priority} Priority
              </span>
            </div>
            <ul className="space-y-2">
              {rec.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Implementation Timeline Validation */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-3xl border border-blue-500/30">
        <h3 className="text-2xl font-bold mb-6 text-center">Recommended Implementation Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { week: "Week 1", tasks: ["Finalize team roles", "Order materials", "Design visuals"], status: "critical" },
            { week: "Week 2", tasks: ["Build components", "Test electronics", "Print materials"], status: "important" },
            { week: "Week 3", tasks: ["Setup practice", "QR code testing", "Team training"], status: "important" },
            { week: "Event Day", tasks: ["Early setup", "Final testing", "Go live!"], status: "critical" },
          ].map((phase, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 ${
                phase.status === "critical" ? "border-red-500/30 bg-red-500/10" : "border-blue-500/30 bg-blue-500/10"
              }`}
            >
              <h4 className="font-bold mb-2">{phase.week}</h4>
              <ul className="space-y-1 text-sm">
                {phase.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
