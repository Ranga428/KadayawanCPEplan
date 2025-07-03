"use client"

import { useState, useEffect } from "react"
import { Check, X, Calendar, Users, DollarSign, Layout, Palette, Target, CheckSquare } from "lucide-react"

export default function KadayawanKodex() {
  const [activeTab, setActiveTab] = useState("activities")
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  const [progress, setProgress] = useState(0)

  const tabs = [
    { id: "activities", label: "Activities", icon: Target },
    { id: "layout", label: "Layout", icon: Layout },
    { id: "visuals", label: "Visuals", icon: Palette },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "roles", label: "Roles", icon: Users },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "checklist", label: "Checklist", icon: CheckSquare },
  ]

  const activities = [
    {
      id: "sumobot",
      title: "🤖 Mini Sumobot Arena",
      description:
        "Compact sumo bot demonstrations in a small tribal-themed circle. Perfect for intimate room settings with close spectator viewing.",
      focus: "Robotics & Embedded Systems",
      materials: [
        "2 Sumo bots (borrowed from lab)",
        "Circular arena mat (1m diameter)",
        "Tribal pattern border tape",
        "Simple manual scoreboard",
        "Extension cord for charging",
      ],
      budget: "₱300-400",
      tip: "Use existing bots, create small arena with printed tribal border design",
      backup: "Manual operation, no electronics needed for arena",
    },
    {
      id: "debug",
      title: "💻 Code Quest: Quick Debug",
      description:
        "Simple debugging challenges on printed sheets with Mindanao-themed variables. No laptops needed for small room setup.",
      focus: "Software Logic & Debugging",
      materials: [
        "Printed code challenge sheets (50 copies)",
        "Answer sheets with explanations",
        "Pens/pencils for participants",
        "Timer (phone app)",
        "Small prizes (stickers)",
      ],
      budget: "₱150-200",
      tip: "Fully offline activity, just printing costs",
      backup: "No technical dependencies - completely paper-based",
    },
    {
      id: "breadboard",
      title: "🔌 Simple LED Circuits",
      description:
        "Basic LED blinking circuits on mini breadboards. Scaled down for small room with 2-3 stations maximum.",
      focus: "Circuit Design & Electronics",
      materials: [
        "3 mini breadboards",
        "LEDs (red, yellow, green - tribal colors)",
        "Resistors and jumper wires",
        "2 Arduino Uno boards",
        "Instruction cards (laminated)",
      ],
      budget: "₱600-800",
      tip: "Reuse lab Arduinos, buy only consumable components",
      backup: "Battery-powered LED circuits without Arduino",
    },
    {
      id: "binary",
      title: "🔢 Binary Beads: Tribal Encoding",
      description:
        "Create binary name representations using traditional Mindanao colors. Perfect low-cost, high-impact activity.",
      focus: "Binary Logic & Data Representation",
      materials: [
        "Beads in tribal colors (red, black, yellow, white)",
        "Elastic string",
        "Binary conversion chart (printed)",
        "Small containers for bead organization",
        "Instruction guide with cultural context",
      ],
      budget: "₱200-300",
      tip: "Source from local craft stores, emphasize cultural significance",
      backup: "No technical dependencies - fully manual activity",
    },
    {
      id: "qr",
      title: "📱 Mini QR Trail",
      description:
        "Simplified QR experience with 3-4 stations around the small room. Includes cultural trivia and CpE facts.",
      focus: "Networks & Mobile Technology",
      materials: [
        "4 QR code posters (A4 size)",
        "Backup cards with same content",
        "Simple trail map",
        "Completion stamps",
        "Small completion tokens",
      ],
      budget: "₱100-150",
      tip: "Free QR generation, minimal printing costs",
      backup: "Physical cards with all QR content available",
    },
    {
      id: "feedback",
      title: "📝 Feedback Corner",
      description: "Simple feedback collection with cultural stamp station. Compact setup perfect for room corner.",
      focus: "Data Collection & User Experience",
      materials: [
        "Feedback forms (printed)",
        "2 custom stamps with tribal designs",
        "Ink pads",
        "Small completion stickers",
        "Feedback collection box",
      ],
      budget: "₱150-200",
      tip: "Design simple stamps, use basic materials",
      backup: "Completely offline - no technical dependencies",
    },
  ]

  // Significantly reduced budget for small room setup
  const budgetItems = [
    {
      category: "Electronics & Components",
      amount: 800,
      description: "Mini breadboards, LEDs, resistors, basic components",
    },
    {
      category: "Cultural Materials",
      amount: 300,
      description: "Tribal-colored beads, strings, craft supplies",
    },
    {
      category: "Printing & Visuals",
      amount: 400,
      description: "Posters, instruction cards, QR codes, backdrop print",
    },
    {
      category: "Decorative Elements",
      amount: 350,
      description: "Tribal patterns, banig design, room decoration",
    },
    {
      category: "Activity Supplies",
      amount: 200,
      description: "Stamps, ink, stickers, completion tokens",
    },
    {
      category: "Contingency (10%)",
      amount: 205,
      description: "Emergency supplies and unexpected costs",
    },
  ]

  // Expanded roles for 15+ people team
  const roles = [
    {
      title: "Project Lead & Coordinator",
      members: "1 person",
      description: "Overall project management and team coordination",
      responsibilities: [
        "Oversee entire booth operation and timeline",
        "Coordinate between all teams and resolve conflicts",
        "Make executive decisions during the event",
        "Ensure all activities run smoothly and on schedule",
        "Handle external communications and VIP visitors",
        "Monitor budget and resource allocation",
      ],
    },
    {
      title: "Technical Team Lead",
      members: "1 person + 3 assistants",
      description: "Manages all technical activities and troubleshooting",
      responsibilities: [
        "Lead: Oversee all technical operations and team coordination",
        "Assistant 1: Manage sumobot arena and demonstrations",
        "Assistant 2: Handle breadboard circuits and LED activities",
        "Assistant 3: Troubleshoot electronics and backup systems",
        "Ensure all technical equipment functions properly",
        "Train team members on technical explanations",
      ],
    },
    {
      title: "Cultural Ambassadors Team",
      members: "4 people",
      description: "Shares cultural stories, context, and traditional knowledge",
      responsibilities: [
        "Ambassador 1: Welcome visitors with cultural greetings and booth introduction",
        "Ambassador 2: Guide binary beads activity with cultural storytelling",
        "Ambassador 3: Explain Mindanao traditions and their connection to technology",
        "Ambassador 4: Roving cultural guide and backup for other ambassadors",
        "Share traditional knowledge and local customs",
        "Connect cultural elements to modern technology concepts",
      ],
    },
    {
      title: "Activity Station Hosts",
      members: "4 people",
      description: "Dedicated hosts for each major activity station",
      responsibilities: [
        "Host 1: Code Quest station - guide debugging challenges",
        "Host 2: QR Trail coordinator - manage digital scavenger hunt",
        "Host 3: Feedback station - collect responses and distribute stamps",
        "Host 4: Floating host - assist busy stations and manage queues",
        "Explain activity instructions clearly and patiently",
        "Encourage participation and celebrate completions",
      ],
    },
    {
      title: "Setup & Logistics Team",
      members: "3 people",
      description: "Handles physical setup, materials, and room management",
      responsibilities: [
        "Member 1: Room decoration and visual setup specialist",
        "Member 2: Materials organization and supply management",
        "Member 3: Crowd flow management and safety coordinator",
        "Arrange booth layout according to floor plan",
        "Maintain cleanliness and organization throughout event",
        "Handle setup, breakdown, and equipment transport",
      ],
    },
    {
      title: "Documentation & Media Team",
      members: "2 people",
      description: "Captures experiences and manages digital presence",
      responsibilities: [
        "Member 1: Primary photographer/videographer for activities",
        "Member 2: Social media manager and real-time content creator",
        "Document visitor interactions and memorable moments",
        "Create engaging social media content during the event",
        "Interview participants and collect testimonials",
        "Compile end-of-day highlights and success stories",
      ],
    },
  ]

  // Compressed timeline for July 17 event
  const timelineItems = [
    {
      phase: "Immediate Planning",
      duration: "July 3-7 (This Week)",
      tasks: [
        "Finalize activity details for small room",
        "Order materials from local suppliers",
        "Design and print visual materials",
        "Assign specific team roles to all 15+ members",
        "Create offline backup content",
        "Conduct initial team meeting and orientation",
      ],
    },
    {
      phase: "Preparation Sprint",
      duration: "July 8-14 (Next Week)",
      tasks: [
        "Test electronic components and backup systems",
        "Print and laminate all materials",
        "Prepare cultural storytelling content and scripts",
        "Conduct comprehensive team training sessions",
        "Organize materials in labeled, portable containers",
        "Practice station rotations and backup coverage",
      ],
    },
    {
      phase: "Final Preparation",
      duration: "July 15-16 (2 Days Before)",
      tasks: [
        "Complete full dress rehearsal with all team members",
        "Test all backup systems and contingency plans",
        "Brief entire team on room layout and emergency procedures",
        "Prepare day-of-event supplies and emergency kits",
        "Confirm final material checklist and team assignments",
        "Conduct final team coordination meeting",
      ],
    },
    {
      phase: "Event Day",
      duration: "July 17 (Event Day)",
      tasks: [
        "Early room setup with full team (2 hours before)",
        "Test all systems and activate backup protocols",
        "Brief entire team on final procedures and roles",
        "Launch activities with coordinated team deployment",
        "Execute continuous documentation and feedback collection",
        "Conduct post-event debrief and celebration",
      ],
    },
  ]

  // Streamlined checklist for quick implementation
  const checklistItems = [
    { id: "materials-ordered", text: "All materials ordered from local suppliers", category: "Preparation" },
    { id: "room-measured", text: "Room dimensions measured and layout planned", category: "Setup" },
    { id: "printing-done", text: "All materials printed and laminated", category: "Preparation" },
    { id: "electronics-tested", text: "Arduino and LED circuits tested", category: "Technical" },
    { id: "cultural-content", text: "Cultural stories and context prepared", category: "Content" },
    { id: "qr-codes-ready", text: "QR codes created with backup cards", category: "Technical" },
    { id: "team-assigned", text: "All 15+ team roles assigned and communicated", category: "Team" },
    { id: "supplies-organized", text: "All supplies organized in portable containers", category: "Setup" },
    { id: "backup-plans", text: "Offline alternatives prepared for all activities", category: "Risk Mitigation" },
    { id: "rehearsal-done", text: "Full team rehearsal completed", category: "Team" },
    { id: "room-decorations", text: "Tribal decorations and backdrop ready", category: "Visual" },
    { id: "feedback-system", text: "Feedback collection system prepared", category: "Documentation" },
    { id: "team-training", text: "All team members trained on their specific roles", category: "Team" },
    { id: "coordination-system", text: "Team communication and coordination system established", category: "Team" },
  ]

  // Detailed visual design specifications
  const visuals = [
    {
      title: "Tribal Color Palette & Patterns",
      description: "Authentic Mindanao color scheme with traditional pattern integration",
      elements: [
        "Primary Colors: Deep Red (#8B0000), Golden Yellow (#FFD700), Pure White (#FFFFFF)",
        "Accent Colors: Forest Green (#228B22), Rich Black (#000000)",
        "Banig Pattern: Woven mat design with geometric diamond shapes",
        "Tribal Motifs: Stylized mountains, rivers, and traditional symbols",
        "Typography: Bold sans-serif for tech, script font for cultural elements",
      ],
    },
    {
      title: "Compact Room Layout Design",
      description: "Optimized visual flow for small space with maximum cultural impact",
      elements: [
        "Central backdrop: 2m x 1.5m banig-inspired design with LED accents",
        "Station markers: A4 size with tribal border patterns",
        "Floor decals: Directional arrows in traditional motifs",
        "Hanging elements: Small tribal flags and tech symbols",
        "Lighting: Warm LED strips to highlight cultural elements",
      ],
    },
    {
      title: "Cultural-Tech Fusion Graphics",
      description: "Visual elements that seamlessly blend tradition with technology",
      elements: [
        "Circuit board patterns integrated with banig weaving designs",
        "Binary code displayed in traditional bead color sequences",
        "QR codes framed with tribal geometric borders",
        "Arduino diagrams styled with indigenous art elements",
        "Welcome signage in English and local Bisaya/Cebuano phrases",
      ],
    },
    {
      title: "Activity Station Visual Identity",
      description: "Consistent visual branding across all activity stations",
      elements: [
        "Station headers: White text on red background with yellow accents",
        "Instruction cards: Cream background with black text and red borders",
        "Progress indicators: Traditional bead counting system visualization",
        "Completion stamps: Custom tribal-tech fusion designs",
        "Photo props: Traditional hats, tech gadgets, cultural items",
      ],
    },
  ]

  useEffect(() => {
    const completed = Object.values(checkedItems).filter(Boolean).length
    const total = checklistItems.length
    setProgress((completed / total) * 100)
  }, [checkedItems])

  const handleChecklistToggle = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const openModal = (content: any) => {
    setModalContent(content)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalContent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-800 via-yellow-600 to-green-700 py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M20 20h60v60h-60z%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.1)%22 strokeWidth=%222%22/%3E%3Cpath d=%22M30 30l40 40M70 30l-40 40%22 stroke=%22rgba(255,255,255,0.1)%22 strokeWidth=%221%22/%3E%3C/svg%3E')] animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 animate-bounce">🏷️ Kadayawan Kodex</h1>
          <p className="text-2xl mb-4 opacity-90">Navigating Innovation from Culture to Circuit</p>
          <p className="text-lg mb-8 opacity-80">Small Room Setup • July 17, 2025 • 15+ Team Members</p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-white/30 animate-pulse">
            <span className="font-bold">👥 Full Team Deployment • ₱2,255 Budget</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 font-bold ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-700 to-yellow-600 border-red-600 transform -translate-y-1 shadow-lg shadow-red-600/40"
                    : "bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50"
                }`}
              >
                <IconComponent size={20} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                🎯 Compact Room Activities (July 17)
              </h2>
              <div className="bg-yellow-600/10 p-6 rounded-2xl border border-yellow-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">👥 Team Advantage with 15+ Members</h3>
                <p className="mb-4">With a full team of 15+ people, we can provide exceptional visitor experience:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>
                        <strong>Dedicated hosts</strong> for each activity station
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>
                        <strong>Multiple cultural ambassadors</strong> for storytelling
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>
                        <strong>Comprehensive backup coverage</strong> for all roles
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>
                        <strong>Professional documentation</strong> and media team
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    onClick={() => openModal(activity)}
                    className="bg-gradient-to-br from-red-600/10 to-yellow-600/10 p-8 rounded-2xl border-2 border-red-600/30 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/30 group"
                  >
                    <h3 className="text-xl font-bold mb-4 text-yellow-400">{activity.title}</h3>
                    <p className="mb-4 text-gray-300 leading-relaxed">{activity.description}</p>
                    <div className="bg-green-600/20 px-4 py-2 rounded-full text-sm border border-green-600/50 mb-4 inline-block">
                      {activity.focus}
                    </div>
                    <div className="bg-blue-600/20 px-4 py-2 rounded-full text-sm border border-blue-600/50 mb-4 inline-block ml-2">
                      👥 Full Team Support
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border-l-4 border-yellow-500">
                      <strong className="text-yellow-400">Budget: {activity.budget}</strong>
                      <p className="text-sm text-gray-400 mt-2">{activity.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === "layout" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                🏗️ Small Room Layout with Full Team Deployment
              </h2>
              <div className="bg-white/5 p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-8">4m x 4m Room with 15+ Team Members</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {[
                    {
                      title: "1. Welcome Corner",
                      subtitle: "Cultural Ambassadors (2)",
                      desc: "Banig backdrop + Greeting team",
                      color: "from-red-600/20 to-yellow-600/20 border-red-600/40",
                    },
                    {
                      title: "2. Sumobot Circle",
                      subtitle: "Tech Team (2)",
                      desc: "Arena + Technical specialists",
                      color: "from-yellow-600/20 to-green-600/20 border-yellow-600/40",
                    },
                    {
                      title: "3. Circuit Station",
                      subtitle: "Tech Assistants (2)",
                      desc: "Breadboards + LED guidance",
                      color: "from-green-600/20 to-blue-600/20 border-green-600/40",
                    },
                    {
                      title: "4. Binary Beads",
                      subtitle: "Cultural Guides (2)",
                      desc: "Storytelling + Crafting",
                      color: "from-blue-600/20 to-purple-600/20 border-blue-600/40",
                    },
                    {
                      title: "5. Code Challenge",
                      subtitle: "Activity Host (1)",
                      desc: "Paper challenges + Support",
                      color: "from-purple-600/20 to-pink-600/20 border-purple-600/40",
                    },
                    {
                      title: "6. QR Trail + Feedback",
                      subtitle: "Coordination Team (2)",
                      desc: "Digital trail + Documentation",
                      color: "from-pink-600/20 to-red-600/20 border-pink-600/40",
                    },
                  ].map((zone, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${zone.color} p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer`}
                    >
                      <div className="font-bold text-sm mb-2">{zone.title}</div>
                      <div className="text-yellow-400 mb-1 text-xs">{zone.subtitle}</div>
                      <div className="text-xs text-gray-400">{zone.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-green-600/10 p-6 rounded-2xl border border-green-600/30">
                  <h4 className="text-xl font-bold mb-4 text-green-400">👥 Team Deployment Advantages</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="font-bold text-green-300">Comprehensive Coverage</div>
                      <div>• Dedicated person for each activity</div>
                      <div>• Backup coverage for breaks/emergencies</div>
                      <div>• Specialized roles for maximum efficiency</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-green-300">Enhanced Experience</div>
                      <div>• Personal attention for each visitor</div>
                      <div>• Multiple cultural storytellers</div>
                      <div>• Professional documentation team</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-green-300">Risk Management</div>
                      <div>• Multiple people trained per activity</div>
                      <div>• Immediate problem resolution</div>
                      <div>• Continuous operation capability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visuals Tab */}
          {activeTab === "visuals" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                🎨 Tribal-Tech Visual Design System
              </h2>

              {/* Color Palette Section */}
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
                  🎨 Authentic Mindanao Color Palette
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-red-800 border-4 border-white/20 mb-2"></div>
                    <div className="font-bold text-red-400">Deep Red</div>
                    <div className="text-xs text-gray-400">#8B0000</div>
                    <div className="text-xs">Strength & Courage</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500 border-4 border-white/20 mb-2"></div>
                    <div className="font-bold text-yellow-400">Golden Yellow</div>
                    <div className="text-xs text-gray-400">#FFD700</div>
                    <div className="text-xs">Prosperity & Joy</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white border-4 border-gray-400 mb-2"></div>
                    <div className="font-bold text-white">Pure White</div>
                    <div className="text-xs text-gray-400">#FFFFFF</div>
                    <div className="text-xs">Peace & Unity</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-700 border-4 border-white/20 mb-2"></div>
                    <div className="font-bold text-green-400">Forest Green</div>
                    <div className="text-xs text-gray-400">#228B22</div>
                    <div className="text-xs">Nature & Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-black border-4 border-white/20 mb-2"></div>
                    <div className="font-bold text-gray-300">Rich Black</div>
                    <div className="text-xs text-gray-400">#000000</div>
                    <div className="text-xs">Depth & Mystery</div>
                  </div>
                </div>
                <div className="bg-yellow-600/10 p-4 rounded-xl border border-yellow-600/30">
                  <h4 className="font-bold text-yellow-400 mb-2">🌟 Cultural Significance</h4>
                  <p className="text-sm text-gray-300">
                    These colors represent traditional Mindanao textiles and are commonly found in banig weaving, tribal
                    clothing, and ceremonial decorations throughout the region.
                  </p>
                </div>
              </div>

              {/* Visual Design Elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visuals.map((visual, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-600/10 to-yellow-600/10 p-8 rounded-2xl border-2 border-red-600/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <h3 className="text-xl font-bold mb-4 text-yellow-400">{visual.title}</h3>
                    <p className="mb-4 text-gray-300">{visual.description}</p>
                    <div className="space-y-2">
                      {visual.elements.map((element, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pattern Examples */}
              <div className="bg-white/10 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-red-400">🔶 Traditional Pattern Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-800 to-yellow-600 w-24 h-24 mx-auto rounded-xl mb-4 flex items-center justify-center">
                      <div className="text-white font-bold text-xs">
                        BANIG
                        <br />
                        PATTERN
                      </div>
                    </div>
                    <h4 className="font-bold text-red-400 mb-2">Banig Weaving</h4>
                    <p className="text-sm text-gray-400">Diamond and zigzag patterns from traditional mat weaving</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-700 to-yellow-600 w-24 h-24 mx-auto rounded-xl mb-4 flex items-center justify-center">
                      <div className="text-white font-bold text-xs">
                        TRIBAL
                        <br />
                        MOTIFS
                      </div>
                    </div>
                    <h4 className="font-bold text-green-400 mb-2">Tribal Symbols</h4>
                    <p className="text-sm text-gray-400">Mountains, rivers, and ancestral symbols</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-600 to-red-800 w-24 h-24 mx-auto rounded-xl mb-4 flex items-center justify-center">
                      <div className="text-white font-bold text-xs">
                        CIRCUIT
                        <br />
                        FUSION
                      </div>
                    </div>
                    <h4 className="font-bold text-yellow-400 mb-2">Tech Integration</h4>
                    <p className="text-sm text-gray-400">Circuit patterns styled with traditional elements</p>
                  </div>
                </div>
              </div>

              {/* Typography & Signage */}
              <div className="bg-green-600/10 p-6 rounded-2xl border border-green-600/30">
                <h3 className="text-xl font-bold mb-4 text-green-400">📝 Typography & Language Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-300 mb-3">Bilingual Signage</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          <strong>Welcome:</strong> "Maayong pag-abot!" / "Welcome!"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          <strong>Try:</strong> "Sulayi!" / "Try it!"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          <strong>Thank you:</strong> "Salamat!" / "Thank you!"
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-300 mb-3">Font Choices</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          <strong>Headers:</strong> Bold sans-serif for tech content
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          <strong>Cultural:</strong> Script/decorative for traditional elements
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          <strong>Body:</strong> Clean, readable fonts for instructions
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Budget Tab */}
          {activeTab === "budget" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                💰 Budget Remains Optimized Despite Large Team
              </h2>
              <div className="bg-green-600/10 p-6 rounded-2xl border border-green-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-400">💡 Team Size vs Budget Efficiency</h3>
                <p className="mb-4">Having 15+ team members doesn't increase material costs - it increases value:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        <strong>Same materials needed</strong> - activities don't change
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        <strong>Better execution</strong> - more hands, better results
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        <strong>Enhanced experience</strong> - personal attention for visitors
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        <strong>Risk reduction</strong> - backup coverage for everything
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white/5 rounded-2xl overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-red-700 to-yellow-600">
                      <th className="p-4 text-left font-bold">Category</th>
                      <th className="p-4 text-left font-bold">Amount</th>
                      <th className="p-4 text-left font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetItems.map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                        <td className="p-4 font-semibold">{item.category}</td>
                        <td className="p-4 text-green-400 font-bold">₱{item.amount}</td>
                        <td className="p-4 text-gray-300">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gradient-to-r from-green-700 to-blue-700">
                      <td className="p-4 font-bold">TOTAL</td>
                      <td className="p-4 font-bold text-xl">
                        ₱{budgetItems.reduce((sum, item) => sum + item.amount, 0)}
                      </td>
                      <td className="p-4 font-bold">Maximum impact with full team</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Team Value Proposition */}
              <div className="bg-blue-600/10 p-6 rounded-2xl border border-blue-600/30">
                <h3 className="text-xl font-bold mb-4 text-blue-400">👥 Value of Large Team (No Extra Cost)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-blue-300 mb-3">Quality Enhancement</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Personal attention for each visitor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Professional documentation and media</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Multiple cultural storytellers</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-300 mb-3">Operational Excellence</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Zero downtime - continuous operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Immediate problem resolution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Smooth visitor flow management</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-300 mb-3">Learning Opportunity</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>All 15+ members gain event experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Specialized skill development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Team collaboration and leadership</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === "roles" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                👥 Comprehensive Team Structure (15+ Members)
              </h2>

              {/* Team Overview */}
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 rounded-2xl border border-blue-600/30">
                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">🎯 Team Deployment Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl mb-3">👑</div>
                    <h4 className="font-bold text-blue-300 mb-2">Leadership Layer</h4>
                    <p className="text-sm text-gray-400">Project Lead + Technical Lead coordinate overall operations</p>
                  </div>
                  <div>
                    <div className="text-4xl mb-3">⚙️</div>
                    <h4 className="font-bold text-blue-300 mb-2">Execution Layer</h4>
                    <p className="text-sm text-gray-400">Specialized teams handle specific activities and functions</p>
                  </div>
                  <div>
                    <div className="text-4xl mb-3">🛡️</div>
                    <h4 className="font-bold text-blue-300 mb-2">Support Layer</h4>
                    <p className="text-sm text-gray-400">Logistics, documentation, and backup coverage</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-600/10 to-yellow-600/10 p-8 rounded-2xl border-2 border-red-600/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    <h3 className="text-xl font-bold mb-2 text-yellow-400 text-center">{role.title}</h3>
                    <div className="text-center mb-4">
                      <span className="bg-red-600/20 px-3 py-1 rounded-full text-sm border border-red-600/50">
                        {role.members}
                      </span>
                    </div>
                    <p className="mb-6 text-gray-300 text-center text-sm">{role.description}</p>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <h4 className="font-bold mb-3 text-yellow-300">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check size={14} className="text-yellow-400 mt-1 flex-shrink-0" />
                            <span className="text-xs">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Team Coordination System */}
              <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 p-8 rounded-2xl border border-green-600/30">
                <h3 className="text-2xl font-bold mb-6 text-center text-green-400">
                  🔄 Team Coordination & Communication
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-green-300 mb-4">📱 Communication Structure</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <div className="font-bold text-sm">Main Group Chat</div>
                          <div className="text-xs text-gray-400">All 15+ members for general coordination</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <div className="font-bold text-sm">Leadership Channel</div>
                          <div className="text-xs text-gray-400">Project Lead + Team Leads for decisions</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <div className="font-bold text-sm">Emergency Hotline</div>
                          <div className="text-xs text-gray-400">Direct line to Project Lead for urgent issues</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-300 mb-4">⚡ Backup & Rotation System</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                          A
                        </div>
                        <div>
                          <div className="font-bold text-sm">Cross-Training</div>
                          <div className="text-xs text-gray-400">Each person trained on 2-3 different roles</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                          B
                        </div>
                        <div>
                          <div className="font-bold text-sm">Shift Rotation</div>
                          <div className="text-xs text-gray-400">Planned breaks and position rotations</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                          C
                        </div>
                        <div>
                          <div className="font-bold text-sm">Floating Support</div>
                          <div className="text-xs text-gray-400">Dedicated members for backup coverage</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Team Assignment Chart */}
              <div className="bg-yellow-600/10 p-6 rounded-2xl border border-yellow-600/30">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">📋 Quick Team Assignment Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-3">Primary Assignments (15 people)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Project Lead:</span>
                        <span className="text-yellow-400">1 person</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical Team:</span>
                        <span className="text-yellow-400">4 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cultural Ambassadors:</span>
                        <span className="text-yellow-400">4 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activity Hosts:</span>
                        <span className="text-yellow-400">4 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup & Logistics:</span>
                        <span className="text-yellow-400">3 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Documentation:</span>
                        <span className="text-yellow-400">2 people</span>
                      </div>
                      <div className="border-t border-yellow-600/30 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Core Team:</span>
                          <span className="text-yellow-400">18 people</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-3">Flexible Deployment</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Extra members can be assigned based on team preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Consider creating additional specialized roles (e.g., VIP guide, social media specialist)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Some members can serve as dedicated backup/relief team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Additional members enhance quality without increasing costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                📅 Team Coordination Timeline for July 17
              </h2>

              {/* Team Coordination Alert */}
              <div className="bg-blue-600/10 p-6 rounded-2xl border border-blue-600/30">
                <h3 className="text-xl font-bold mb-4 text-blue-400">👥 Large Team Coordination Priority</h3>
                <p className="mb-4">With 15+ team members, coordination becomes critical for success:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>
                        <strong>Early role assignment</strong> - everyone knows their specific duties
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>
                        <strong>Multiple training sessions</strong> - accommodate everyone's schedule
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>
                        <strong>Clear communication channels</strong> - group chats and backup contacts
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>
                        <strong>Comprehensive rehearsal</strong> - full team practice run
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 via-yellow-600 to-green-600 rounded-full"></div>
                <div className="space-y-12">
                  {timelineItems.map((item, index) => (
                    <div
                      key={index}
                      className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10">
                          <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.phase}</h3>
                          <p className="text-sm text-gray-400 mb-4">{item.duration}</p>
                          <ul className="space-y-2">
                            {item.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-slate-900"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Meeting Schedule */}
              <div className="bg-red-600/10 p-8 rounded-2xl border border-red-600/30">
                <h3 className="text-2xl font-bold mb-6 text-center text-red-400">📅 Essential Team Meetings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-red-300 mb-3">🚨 This Week (July 3-7)</h4>
                    <ul className="space-y-3">
                      <li className="bg-white/5 p-3 rounded-lg">
                        <div className="font-bold text-sm">Initial Team Meeting</div>
                        <div className="text-xs text-gray-400">Introduce project, assign primary roles</div>
                        <div className="text-xs text-red-400">Duration: 1.5 hours</div>
                      </li>
                      <li className="bg-white/5 p-3 rounded-lg">
                        <div className="font-bold text-sm">Team Leaders Coordination</div>
                        <div className="text-xs text-gray-400">Detailed planning with team leads</div>
                        <div className="text-xs text-red-400">Duration: 1 hour</div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-3">📋 Next Week (July 8-14)</h4>
                    <ul className="space-y-3">
                      <li className="bg-white/5 p-3 rounded-lg">
                        <div className="font-bold text-sm">Skills Training Sessions</div>
                        <div className="text-xs text-gray-400">Technical, cultural, and activity training</div>
                        <div className="text-xs text-yellow-400">Duration: 2-3 sessions, 1 hour each</div>
                      </li>
                      <li className="bg-white/5 p-3 rounded-lg">
                        <div className="font-bold text-sm">Full Team Rehearsal</div>
                        <div className="text-xs text-gray-400">Complete run-through with all members</div>
                        <div className="text-xs text-yellow-400">Duration: 2 hours</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Metrics for Large Team */}
              <div className="bg-green-600/10 p-6 rounded-2xl border border-green-600/30">
                <h3 className="text-xl font-bold mb-4 text-center text-green-400">✅ Team Readiness Checkpoints</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-2">👥</div>
                    <h4 className="font-bold text-green-300 mb-1">Week 1</h4>
                    <p className="text-xs text-gray-400">All 15+ members assigned roles and briefed</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🎓</div>
                    <h4 className="font-bold text-green-300 mb-1">Week 2</h4>
                    <p className="text-xs text-gray-400">Everyone trained on their specific responsibilities</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🎭</div>
                    <h4 className="font-bold text-green-300 mb-1">July 15-16</h4>
                    <p className="text-xs text-gray-400">Full team rehearsal completed successfully</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🚀</div>
                    <h4 className="font-bold text-green-300 mb-1">July 17</h4>
                    <p className="text-xs text-gray-400">Coordinated team execution and success</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === "checklist" && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                ✅ Enhanced Checklist for Large Team Coordination
              </h2>

              {/* Progress Bar */}
              <div className="bg-white/10 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-lg">
                Progress: <span className="font-bold text-green-400">{Math.round(progress)}%</span> Complete
                <span className="text-sm text-gray-400 ml-4">
                  ({Object.values(checkedItems).filter(Boolean).length}/{checklistItems.length} items)
                </span>
              </p>

              {/* Team Coordination Priority */}
              <div className="bg-blue-600/10 p-6 rounded-2xl border border-blue-600/30">
                <h3 className="text-xl font-bold mb-4 text-blue-400">👥 Team Coordination Priorities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-300">Immediate Actions (This Week)</h4>
                    {checklistItems.slice(6, 10).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleChecklistToggle(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                          checkedItems[item.id]
                            ? "bg-green-600/10 border-green-600/30 opacity-75"
                            : "bg-blue-600/10 border-blue-600/30"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                            checkedItems[item.id]
                              ? "bg-green-500 border-green-500"
                              : "border-blue-400 hover:border-blue-300"
                          }`}
                        >
                          {checkedItems[item.id] && <Check size={14} className="text-white" />}
                        </div>
                        <span className={`flex-1 text-sm ${checkedItems[item.id] ? "line-through text-gray-400" : ""}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-300">Material & Setup Tasks</h4>
                    {checklistItems.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleChecklistToggle(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                          checkedItems[item.id]
                            ? "bg-green-600/10 border-green-600/30 opacity-75"
                            : "bg-yellow-600/10 border-yellow-600/30"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                            checkedItems[item.id]
                              ? "bg-green-500 border-green-500"
                              : "border-yellow-400 hover:border-yellow-300"
                          }`}
                        >
                          {checkedItems[item.id] && <Check size={14} className="text-white" />}
                        </div>
                        <span className={`flex-1 text-sm ${checkedItems[item.id] ? "line-through text-gray-400" : ""}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remaining checklist items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-green-300">Final Preparation Items</h4>
                  {checklistItems.slice(10).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleChecklistToggle(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                        checkedItems[item.id]
                          ? "bg-green-600/10 border-green-600/30 opacity-75"
                          : "bg-green-600/10 border-green-600/30"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          checkedItems[item.id]
                            ? "bg-green-500 border-green-500"
                            : "border-green-400 hover:border-green-300"
                        }`}
                      >
                        {checkedItems[item.id] && <Check size={14} className="text-white" />}
                      </div>
                      <span className={`flex-1 text-sm ${checkedItems[item.id] ? "line-through text-gray-400" : ""}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-purple-300 mb-3">Team Management Success Factors</h4>
                  <div className="space-y-4">
                    <div className="bg-purple-600/10 p-4 rounded-xl border border-purple-600/30">
                      <h5 className="font-bold text-purple-400 mb-2">Communication Excellence</h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Group chat active and responsive</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Emergency contact system established</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Regular check-ins scheduled</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/10 p-4 rounded-xl border border-purple-600/30">
                      <h5 className="font-bold text-purple-400 mb-2">Backup Systems</h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Cross-training completed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Floating support team ready</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Emergency procedures documented</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Team Readiness Assessment */}
              <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 p-8 rounded-2xl border border-green-600/30">
                <h3 className="text-2xl font-bold mb-6 text-center text-green-400">
                  🎯 Large Team Readiness Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-4xl mb-3">{progress >= 80 ? "🟢" : progress >= 60 ? "🟡" : "🔴"}</div>
                    <h4 className="font-bold mb-2">Overall Progress</h4>
                    <p className="text-sm text-gray-400">
                      {progress >= 80 ? "Team Ready!" : progress >= 60 ? "On Track" : "Need Coordination"}
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl mb-3">
                      {checklistItems.filter((item) => item.category === "Team").every((item) => checkedItems[item.id])
                        ? "👥"
                        : "📋"}
                    </div>
                    <h4 className="font-bold mb-2">Team Coordination</h4>
                    <p className="text-sm text-gray-400">
                      {checklistItems.filter((item) => item.category === "Team").every((item) => checkedItems[item.id])
                        ? "All Members Coordinated"
                        : "Assign Roles & Train"}
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl mb-3">
                      {checklistItems
                        .filter((item) => item.category === "Preparation")
                        .every((item) => checkedItems[item.id])
                        ? "📦"
                        : "⏰"}
                    </div>
                    <h4 className="font-bold mb-2">Materials Ready</h4>
                    <p className="text-sm text-gray-400">
                      {checklistItems
                        .filter((item) => item.category === "Preparation")
                        .every((item) => checkedItems[item.id])
                        ? "All Materials Secured"
                        : "Order Materials Now"}
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl mb-3">🎭</div>
                    <h4 className="font-bold mb-2">Team Rehearsal</h4>
                    <p className="text-sm text-gray-400">
                      {checkedItems["rehearsal-done"] ? "Rehearsal Complete" : "Schedule Full Team Practice"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalContent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 p-8 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-3xl text-yellow-400 hover:text-red-400 transition-colors"
            >
              <X />
            </button>

            <h3 className="text-2xl font-bold mb-4 text-yellow-400">{modalContent.title}</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">{modalContent.description}</p>

            <div className="flex gap-3 mb-6">
              <div className="bg-green-600/20 px-4 py-2 rounded-full text-sm border border-green-600/50 inline-block">
                {modalContent.focus}
              </div>
              <div className="bg-blue-600/20 px-4 py-2 rounded-full text-sm border border-blue-600/50 inline-block">
                👥 Full Team Support
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border-l-4 border-yellow-500 mb-6">
              <h4 className="font-bold mb-3 text-yellow-400">Materials & Equipment:</h4>
              <ul className="space-y-2">
                {modalContent.materials?.map((material: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-600/20 p-4 rounded-xl border-l-4 border-red-600 mb-6">
              <strong className="text-red-400">Budget: {modalContent.budget}</strong>
              <p className="text-sm text-gray-400 mt-2">{modalContent.tip}</p>
            </div>

            {modalContent.backup && (
              <div className="bg-green-600/20 p-4 rounded-xl border-l-4 border-green-600">
                <h4 className="font-bold text-green-400 mb-2">🛡️ Backup System</h4>
                <p className="text-sm text-gray-300">{modalContent.backup}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
