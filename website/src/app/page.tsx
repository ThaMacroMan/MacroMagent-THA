import { AgentGrid } from '@/components/AgentGrid';
import { Header } from '@/components/Header';
import { AGENTS } from '@/config/agents';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            THA Agent Hub
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Discover and interact with AI agents powered by CrewAI and Masumi.
            THA holders can access premium AI services with seamless Cardano payments.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              🔒 Secure • ⚡ Fast • 💎 Decentralized
            </span>
          </div>
        </section>

        {/* Agent Grid */}
        <section>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
            Available Agents
          </h2>
          <AgentGrid agents={AGENTS} />
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-slate-500 dark:text-slate-400">
          <p className="mb-4">
            Built with ❤️ for the THA community using Next.js, TypeScript, and Masumi
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
