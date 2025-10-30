import Link from "next/link";
import { Car, TrendingUp, Image as ImageIcon, ExternalLink, Clock, DollarSign } from "lucide-react";

const agents = [
  {
    id: "car-data",
    name: "Car Data Agent",
    description: "Comprehensive vehicle research with specifications, trims, makes, and models from trusted automotive databases. Get detailed information about any vehicle including pricing, features, and comparisons.",
    category: "Research",
    price: 100,
    currency: "THA",
    status: "active",
    icon: Car,
    tags: ["automotive", "research", "specifications", "vehicles"],
    inputFields: [
      { name: "query", type: "text", description: "Vehicle make, model, or research question", required: true }
    ]
  },
  {
    id: "google-trends",
    name: "Google Trends Agent",
    description: "Analyze search trends, regional interest, and related queries with comprehensive data visualization. Perfect for market research, content planning, and trend analysis.",
    category: "Analytics",
    price: 75,
    currency: "THA",
    status: "active",
    icon: TrendingUp,
    tags: ["trends", "analytics", "market research", "google"],
    inputFields: [
      { name: "keywords", type: "text", description: "Keywords or topics to analyze", required: true },
      { name: "timeframe", type: "select", description: "Time period for analysis", required: false }
    ]
  },
  {
    id: "stock-photos",
    name: "Stock Photos Agent",
    description: "Find and curate high-quality stock images with intelligent search and categorization capabilities. Coming soon with advanced image analysis and copyright-safe results.",
    category: "Media",
    price: 50,
    currency: "THA",
    status: "coming-soon",
    icon: ImageIcon,
    tags: ["images", "media", "stock photos", "visual"],
    inputFields: [
      { name: "search_query", type: "text", description: "Image search terms", required: true }
    ]
  }
];

export default function AgentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Agent Marketplace</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover and use specialized AI agents powered by CrewAI and secured by Cardano blockchain.
          All transactions are trustless and THA holders get exclusive benefits.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <div key={agent.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="h-10 w-10 text-blue-600" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    agent.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {agent.status === 'active' ? 'Active' : 'Coming Soon'}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{agent.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{agent.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-900 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {agent.price} {agent.currency}
                  </div>
                  <span className="text-sm text-gray-500">{agent.category}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Input Fields:</h4>
                    <div className="space-y-1">
                      {agent.inputFields.map((field) => (
                        <div key={field.name} className="text-xs text-gray-600">
                          <span className="font-medium">{field.name}</span>
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                          <span className="ml-2 text-gray-500">({field.type})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Response time: ~30 seconds
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                {agent.status === 'active' ? (
                  <Link
                    href={`/agents/${agent.id}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    Use Agent
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Agent Payments Work</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit Request</h3>
              <p className="text-gray-600 text-sm">Fill out the agent form with your requirements and submit your job</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pay with THA/ADA</h3>
              <p className="text-gray-600 text-sm">Complete payment via Masumi on Cardano blockchain for trustless transactions</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">Receive your AI-generated results once payment is confirmed on-chain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}