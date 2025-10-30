import Link from 'next/link';
import { AVAILABLE_AGENTS } from '@/lib/agents';
import { AgentCard } from '@/components/AgentCard';
import { Header } from '@/components/Header';

export default function Home() {
  const activeAgents = AVAILABLE_AGENTS.filter(agent => agent.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            THA Agent Marketplace
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Access powerful AI agents built on Masumi's decentralized payment network.
            Use $THA tokens to unlock premium AI capabilities and support the ecosystem.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/agents"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Agents
            </Link>
            <Link
              href="/dashboard"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              My Dashboard
            </Link>
          </div>
        </section>

        {/* Featured Agents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Featured Agents
          </h2>

          {activeAgents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                No active agents available at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Choose an Agent
              </h3>
              <p className="text-slate-600">
                Browse our collection of specialized AI agents designed for specific tasks and use cases.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Pay with $THA
              </h3>
              <p className="text-slate-600">
                Use your $THA tokens to pay for agent services through Masumi's secure payment network.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Get Results
              </h3>
              <p className="text-slate-600">
                Receive high-quality AI-generated results delivered securely to your dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {activeAgents.length}
              </div>
              <div className="text-slate-600">Active Agents</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $THA
              </div>
              <div className="text-slate-600">Payment Token</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-slate-600">Always Available</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}