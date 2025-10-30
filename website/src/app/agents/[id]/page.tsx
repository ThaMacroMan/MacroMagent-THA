'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car, TrendingUp, Image as ImageIcon, DollarSign, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const agents = {
  'car-data': {
    id: "car-data",
    name: "Car Data Agent",
    description: "Comprehensive vehicle research with specifications, trims, makes, and models from trusted automotive databases. Get detailed information about any vehicle including pricing, features, and comparisons.",
    longDescription: "Our Car Data Agent provides comprehensive vehicle research capabilities powered by CrewAI and integrated with professional automotive databases. Whether you're researching a specific vehicle, comparing models, or analyzing market trends, this agent delivers accurate, sourced information with complete verification details.",
    category: "Research",
    price: 100,
    currency: "THA",
    status: "active",
    icon: Car,
    tags: ["automotive", "research", "specifications", "vehicles"],
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Your vehicle research question or specific vehicle details to look up",
          examples: ["2024 Toyota Camry specifications", "Compare Honda Civic vs Toyota Corolla", "Best SUVs under $50k"]
        }
      },
      required: ["query"]
    },
    sampleOutput: "Comprehensive vehicle analysis including specifications, pricing, features, and market comparisons with source citations."
  },
  'google-trends': {
    id: "google-trends",
    name: "Google Trends Agent",
    description: "Analyze search trends, regional interest, and related queries with comprehensive data visualization. Perfect for market research, content planning, and trend analysis.",
    longDescription: "The Google Trends Agent analyzes search interest patterns across Google Search, providing insights into trending topics, regional variations, and related search queries. Perfect for content creators, marketers, and researchers looking to understand public interest and behavior patterns.",
    category: "Analytics",
    price: 75,
    currency: "THA",
    status: "active",
    icon: TrendingUp,
    tags: ["trends", "analytics", "market research", "google"],
    inputSchema: {
      type: "object",
      properties: {
        keywords: {
          type: "string",
          description: "Keywords or topics to analyze trends for",
          examples: ["artificial intelligence", "sustainable energy", "remote work tools"]
        },
        timeframe: {
          type: "string",
          enum: ["past_7_days", "past_30_days", "past_90_days", "past_12_months", "past_5_years"],
          description: "Time period for trend analysis",
          default: "past_12_months"
        }
      },
      required: ["keywords"]
    },
    sampleOutput: "Trend analysis with interest over time charts, regional rankings, related queries, and rising topics."
  },
  'stock-photos': {
    id: "stock-photos",
    name: "Stock Photos Agent",
    description: "Find and curate high-quality stock images with intelligent search and categorization capabilities. Coming soon with advanced image analysis and copyright-safe results.",
    longDescription: "The Stock Photos Agent will help you find and curate high-quality, copyright-safe images for your projects. Using advanced AI analysis, it will match your search terms with relevant, high-resolution images from trusted stock photo libraries.",
    category: "Media",
    price: 50,
    currency: "THA",
    status: "coming-soon",
    icon: ImageIcon,
    tags: ["images", "media", "stock photos", "visual"],
    inputSchema: {
      type: "object",
      properties: {
        search_query: {
          type: "string",
          description: "Descriptive search terms for the images you need",
          examples: ["modern office workspace", "happy family outdoors", "technology startup team"]
        }
      },
      required: ["search_query"]
    },
    sampleOutput: "Curated selection of high-quality stock images with metadata, licensing information, and download links."
  }
};

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const agent = agents[agentId as keyof typeof agents];

  if (!agent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
          <Link href="/agents" className="text-blue-600 hover:text-blue-700">
            ← Back to Agents
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = agent.icon;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setJobId(`job_${Date.now()}`);
      setIsSubmitting(false);
    }, 2000);
  };

  const isFormValid = agent.inputSchema.required.every(field =>
    formData[field] && formData[field].trim() !== ''
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/agents" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agents
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <IconComponent className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-600">{agent.category}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  agent.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {agent.status === 'active' ? 'Active' : 'Coming Soon'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center text-2xl font-bold text-gray-900">
              <DollarSign className="h-5 w-5" />
              {agent.price} {agent.currency}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              ~30 seconds response
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Agent</h2>
            <p className="text-gray-700 mb-4">{agent.longDescription}</p>
            <p className="text-gray-600 text-sm">{agent.description}</p>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Output */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Output</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{agent.sampleOutput}</p>
            </div>
          </div>

          {/* Job Status */}
          {jobId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-medium text-green-900">Job Submitted Successfully!</h3>
                  <p className="text-green-700 text-sm">Job ID: {jobId}</p>
                  <p className="text-green-700 text-sm mt-1">
                    Payment required: {agent.price} {agent.currency}. Complete payment via your connected wallet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Use This Agent</h2>

            {agent.status === 'active' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {Object.entries(agent.inputSchema.properties).map(([fieldName, fieldSchema]: [string, any]) => (
                  <div key={fieldName}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      {agent.inputSchema.required.includes(fieldName) && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {fieldSchema.enum ? (
                      <select
                        value={formData[fieldName] || fieldSchema.default || ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select {fieldName.replace(/_/g, ' ')}</option>
                        {fieldSchema.enum.map((option: string) => (
                          <option key={option} value={option}>
                            {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <textarea
                        value={formData[fieldName] || ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        placeholder={fieldSchema.examples ? fieldSchema.examples[0] : fieldSchema.description}
                        rows={fieldName === 'query' || fieldName === 'keywords' ? 3 : 2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    )}

                    {fieldSchema.description && (
                      <p className="text-xs text-gray-500 mt-1">{fieldSchema.description}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isFormValid && !isSubmitting
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : `Submit Job (${agent.price} ${agent.currency})`}
                </button>

                {!isFormValid && (
                  <div className="flex items-center text-sm text-orange-600 mt-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Please fill in all required fields
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-8">
                <IconComponent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600 text-sm">
                  This agent is currently in development. Check back soon for updates!
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Payment Method:</span>
                <span className="font-medium">Masumi/Cardano</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <span>Response Time:</span>
                <span className="font-medium">~30 seconds</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <span>THA Holder Discount:</span>
                <span className="font-medium text-green-600">25% off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}