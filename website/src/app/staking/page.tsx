import Link from "next/link";
import { TrendingUp, Users, DollarSign, Calendar, ArrowRight, Shield } from "lucide-react";

export default function StakingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">THA Token Staking</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stake your THA tokens to earn revenue from agent services, POCoP protocol, and exclusive holder benefits.
        </p>
      </div>

      {/* Staking Benefits */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <DollarSign className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Revenue Sharing</h3>
          <p className="text-gray-600 mb-4">
            Earn a percentage of all revenue generated from MacroMagent agents and POCoP protocol integration.
          </p>
          <div className="text-2xl font-bold text-green-600">15-25%</div>
          <div className="text-sm text-gray-500">of protocol revenue</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Shield className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Access</h3>
          <p className="text-gray-600 mb-4">
            Get priority access to new agents, discounted rates, and participate in governance decisions.
          </p>
          <div className="text-lg font-semibold text-blue-600">Beta access to all new agents</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Staking Rewards</h3>
          <p className="text-gray-600 mb-4">
            Earn additional THA tokens through staking rewards and protocol incentives.
          </p>
          <div className="text-2xl font-bold text-purple-600">5-10% APY</div>
          <div className="text-sm text-gray-500">variable rewards</div>
        </div>
      </div>

      {/* Staking Tiers */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Staking Tiers</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Bronze Tier</h3>
              <div className="text-3xl font-bold text-orange-600 mt-2">1,000 THA</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• 10% revenue share</li>
              <li>• 5% discount on agents</li>
              <li>• Basic staking rewards</li>
              <li>• Community access</li>
            </ul>
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Stake Bronze
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">Most Popular</span>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Silver Tier</h3>
              <div className="text-3xl font-bold text-blue-600 mt-2">10,000 THA</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• 20% revenue share</li>
              <li>• 15% discount on agents</li>
              <li>• Priority support</li>
              <li>• Beta agent access</li>
              <li>• Governance voting</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Stake Silver
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Gold Tier</h3>
              <div className="text-3xl font-bold text-yellow-600 mt-2">50,000 THA</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• 25% revenue share</li>
              <li>• 25% discount on agents</li>
              <li>• VIP support</li>
              <li>• Early agent access</li>
              <li>• Governance voting</li>
              <li>• Revenue analytics</li>
            </ul>
            <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Stake Gold
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How Staking Works</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Connect Wallet</h3>
            <p className="text-gray-600 text-sm">Connect your Cardano wallet containing THA tokens</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Choose Tier</h3>
            <p className="text-gray-600 text-sm">Select your staking tier based on THA amount</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Stake Tokens</h3>
            <p className="text-gray-600 text-sm">Lock your THA tokens in the staking contract</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Earn Rewards</h3>
            <p className="text-gray-600 text-sm">Receive revenue shares and staking rewards</p>
          </div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="bg-gray-900 text-white rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Protocol Statistics</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">$12,450</div>
            <div className="text-gray-300">Total Revenue Generated</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">2,847</div>
            <div className="text-gray-300">THA Tokens Staked</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
            <div className="text-gray-300">Active Stakers</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">8.5%</div>
            <div className="text-gray-300">Current APY</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the THA holder community and start earning from the growing MacroMagent ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Connect Wallet & Stake
          </button>
          <Link
            href="/agents"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
          >
            Try Agents First
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}