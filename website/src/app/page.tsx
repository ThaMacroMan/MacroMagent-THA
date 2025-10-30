import Link from "next/link";
import { ArrowRight, Bot, Zap, Shield, Users, TrendingUp, Car, Search, Image as ImageIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              MacroMagent Agent Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Access powerful AI agents on the Cardano blockchain. Built exclusively for THA token holders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agents"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Explore Agents
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/staking"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                THA Staking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MacroMagent?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of AI-powered services with blockchain-backed reliability and THA holder benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Bot className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Powerful AI Agents</h3>
              <p className="text-gray-600">
                Access specialized AI agents for research, data analysis, and automated tasks powered by CrewAI.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Security</h3>
              <p className="text-gray-600">
                All transactions secured by Cardano blockchain with Masumi payment integration for trustless operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">THA Holder Benefits</h3>
              <p className="text-gray-600">
                Exclusive access, discounted rates, and revenue sharing for THA token holders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Agents</h2>
            <p className="text-lg text-gray-600">
              Discover our collection of specialized AI agents ready to help with your tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <Car className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Car Data Agent</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive vehicle research with specifications, trims, makes, and models from trusted automotive databases.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Active</span>
                <span className="text-sm text-gray-500">100 THA</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <TrendingUp className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Google Trends Agent</h3>
              <p className="text-gray-600 mb-4">
                Analyze search trends, regional interest, and related queries with comprehensive data visualization.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Active</span>
                <span className="text-sm text-gray-500">75 THA</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <ImageIcon className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stock Photos Agent</h3>
              <p className="text-gray-600 mb-4">
                Find and curate high-quality stock images with intelligent search and categorization capabilities.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-600">Coming Soon</span>
                <span className="text-sm text-gray-500">50 THA</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/agents"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Agents
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* THA Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">THA Holder Perks</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              As a THA token holder, you get exclusive access to premium features and revenue sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Priority Access</h3>
              <p className="text-gray-300 text-sm">Skip queues and get faster response times</p>
            </div>

            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Revenue Sharing</h3>
              <p className="text-gray-300 text-sm">Earn from POCoP and agent service revenue</p>
            </div>

            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Discounted Rates</h3>
              <p className="text-gray-300 text-sm">Reduced fees on all agent services</p>
            </div>

            <div className="text-center">
              <Bot className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Beta Access</h3>
              <p className="text-gray-300 text-sm">Try new agents before public release</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/staking"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-block"
            >
              Learn About THA Staking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
