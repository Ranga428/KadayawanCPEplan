import ValidationReport from "@/components/validation-report"

export default function ValidationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-orange-400 to-green-400 bg-clip-text text-transparent">
            🛠️ Masterplan Validation Report
          </h1>
          <p className="text-xl text-gray-300">
            Comprehensive analysis of your Kadayawan Kodex booth implementation plan
          </p>
        </div>
        <ValidationReport />
      </div>
    </div>
  )
}
