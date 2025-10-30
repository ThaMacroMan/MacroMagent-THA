import { Agent } from '@/types/agent';

export const AGENTS: Agent[] = [
  {
    id: 'car-data-agent',
    name: 'Car Data Agent',
    description: 'Comprehensive automotive research agent with access to detailed vehicle specifications, makes, models, trims, and engine information. Perfect for car buyers, enthusiasts, and automotive professionals.',
    category: 'Automotive',
    apiUrl: 'http://localhost:8001', // Assuming this runs on port 8001
    icon: '🚗',
    capabilities: [
      'Vehicle specifications lookup',
      'Make and model research',
      'Trim level comparisons',
      'Engine specifications',
      'CarAPI integration'
    ],
    pricing: {
      amount: '10000000',
      unit: 'lovelace'
    },
    inputSchema: [
      {
        id: 'text',
        type: 'string',
        name: 'Research Query',
        data: {
          description: 'Enter your automotive research query. Can be about specific cars, comparisons, or general vehicle information.',
          placeholder: 'Example: Find all 2020 Ford F-150 trims and their engine specs'
        }
      }
    ]
  },
  {
    id: 'google-trends-agent',
    name: 'Google Trends Agent',
    description: 'Data extraction specialist that analyzes Google Trends data, providing insights into search popularity, regional rankings, and trending topics with structured markdown reports.',
    category: 'Data Analysis',
    apiUrl: 'http://localhost:8002', // Assuming this runs on port 8002
    icon: '📊',
    capabilities: [
      'Google Trends data extraction',
      'Search popularity analysis',
      'Regional trend comparisons',
      'Related queries analysis',
      'Structured data reporting'
    ],
    pricing: {
      amount: '10000000',
      unit: 'lovelace'
    },
    inputSchema: [
      {
        id: 'text',
        type: 'string',
        name: 'Trends Query',
        data: {
          description: 'Enter a topic or search term to analyze Google Trends data for.',
          placeholder: 'Example: artificial intelligence trends'
        }
      }
    ]
  }
];

// Agent registry utilities
export const getAgentById = (id: string): Agent | undefined => {
  return AGENTS.find(agent => agent.id === id);
};

export const getAgentsByCategory = (category: string): Agent[] => {
  return AGENTS.filter(agent => agent.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(AGENTS.map(agent => agent.category))];
};