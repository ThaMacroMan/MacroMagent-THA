'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bot,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
  Calendar,
  ExternalLink
} from 'lucide-react';

const mockJobs = [
  {
    id: 'job_001',
    agentName: 'Car Data Agent',
    status: 'completed',
    input: 'Research 2024 Toyota Camry specifications',
    output: 'Comprehensive analysis of 2024 Toyota Camry including specifications, pricing, and features...',
    paymentAmount: 100,
    currency: 'THA',
    createdAt: '2024-01-15T10:30:00Z',
    completedAt: '2024-01-15T10:31:23Z',
    txHash: '0x1234567890abcdef'
  },
  {
    id: 'job_002',
    agentName: 'Google Trends Agent',
    status: 'processing',
    input: 'Analyze trends for artificial intelligence',
    output: null,
    paymentAmount: 75,
    currency: 'THA',
    createdAt: '2024-01-15T11:00:00Z',
    completedAt: null,
    txHash: null
  },
  {
    id: 'job_003',
    agentName: 'Car Data Agent',
    status: 'failed',
    input: 'Compare electric SUVs',
    output: 'Payment verification failed. Please check your wallet balance.',
    paymentAmount: 100,
    currency: 'THA',
    createdAt: '2024-01-14T09:15:00Z',
    completedAt: null,
    txHash: null
  }
];

const mockStaking = {
  stakedAmount: 5000,
  tier: 'Silver',
  revenueShare: 20,
  totalEarned: 245.50,
  pendingRewards: 12.75,
  nextDistribution: '2024-01-20T00:00:00Z'
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your agent jobs, staking, and earnings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Agent Jobs</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Staking Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,000 THA</div>
                <p className="text-xs text-muted-foreground">Silver tier active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245.50</div>
                <p className="text-xs text-muted-foreground">From revenue sharing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Job completion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest agent jobs and staking updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <p className="font-medium">{job.agentName}</p>
                        <p className="text-sm text-gray-600 truncate max-w-md">{job.input}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(job.status)}
                      <p className="text-sm text-gray-500 mt-1">
                        {job.paymentAmount} {job.currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Jobs History</CardTitle>
              <CardDescription>Track all your agent submissions and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="font-semibold">{job.agentName}</h3>
                          <p className="text-sm text-gray-600">Job ID: {job.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(job.status)}
                        <p className="text-sm font-medium mt-1">
                          {job.paymentAmount} {job.currency}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">Input</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{job.input}</p>
                      </div>

                      {job.output && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 mb-2">Output</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                            {job.output}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Created: {new Date(job.createdAt).toLocaleString()}</span>
                      {job.txHash && (
                        <a
                          href={`https://cardanoscan.io/transaction/${job.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                          View Transaction
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Staking Overview</CardTitle>
                <CardDescription>Your current staking position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Staked Amount:</span>
                  <span className="font-semibold">{mockStaking.stakedAmount.toLocaleString()} THA</span>
                </div>
                <div className="flex justify-between">
                  <span>Tier:</span>
                  <Badge className="bg-blue-100 text-blue-800">{mockStaking.tier}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Revenue Share:</span>
                  <span className="font-semibold">{mockStaking.revenueShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Distribution:</span>
                  <span className="font-semibold">
                    {new Date(mockStaking.nextDistribution).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
                <CardDescription>Your staking rewards and revenue shares</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Earned:</span>
                  <span className="font-semibold text-green-600">${mockStaking.totalEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Rewards:</span>
                  <span className="font-semibold text-blue-600">${mockStaking.pendingRewards}</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month:</span>
                  <span className="font-semibold">$23.45</span>
                </div>
                <Button className="w-full mt-4">Claim Rewards</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Staking History</CardTitle>
              <CardDescription>Your staking transactions and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Staking Reward</p>
                      <p className="text-sm text-gray-600">Monthly distribution</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+$12.75</p>
                    <p className="text-sm text-gray-500">Jan 15, 2024</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Revenue Share</p>
                      <p className="text-sm text-gray-600">From agent services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+$8.90</p>
                    <p className="text-sm text-gray-500">Jan 10, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Your current token balances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">T</span>
                    </div>
                    <span>THA Tokens</span>
                  </div>
                  <span className="font-semibold">1,247.50</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">₳</span>
                    </div>
                    <span>ADA</span>
                  </div>
                  <span className="font-semibold">156.75</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">$</span>
                    </div>
                    <span>USD Value</span>
                  </div>
                  <span className="font-semibold">$187.25</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet Address</CardTitle>
                <CardDescription>Your connected Cardano wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-mono text-sm break-all">
                    addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a429mgz5sjh7cvh2d9q0z8kg
                  </p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </Button>
                  <Button variant="outline" size="sm">
                    Copy Address
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Agent Payment</p>
                      <p className="text-sm text-gray-600">Car Data Agent - Job #001</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">-100 THA</p>
                    <p className="text-sm text-gray-500">Jan 15, 2024</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Staking Reward</p>
                      <p className="text-sm text-gray-600">Monthly distribution</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+12.75 THA</p>
                    <p className="text-sm text-gray-500">Jan 15, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}