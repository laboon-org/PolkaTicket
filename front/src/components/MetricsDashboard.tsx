import React, { useState, useEffect } from 'react';

interface PlatformMetrics {
  totalTicketsSold: number;
  totalRevenue: string;
  activeEvents: number;
  totalUsers: number;
  avgTicketPrice: string;
  platformFees: string;
  growthRate: number;
  crossChainTransfers: number;
}

interface ComparisonData {
  platform: string;
  fees: string;
  gasOptimization: string;
  crossChain: boolean;
  privacy: boolean;
  dynamicNFT: boolean;
}

export const MetricsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    totalTicketsSold: 12847,
    totalRevenue: '1,284,700 DOT',
    activeEvents: 156,
    totalUsers: 8934,
    avgTicketPrice: '100 DOT',
    platformFees: '64,235 DOT',
    growthRate: 127,
    crossChainTransfers: 342,
  });

  const competitorData: ComparisonData[] = [
    {
      platform: 'Poka Ticket (Ours)',
      fees: '2%',
      gasOptimization: '90%',
      crossChain: true,
      privacy: true,
      dynamicNFT: true,
    },
    {
      platform: 'Ticketmaster',
      fees: '15-20%',
      gasOptimization: 'N/A',
      crossChain: false,
      privacy: false,
      dynamicNFT: false,
    },
    {
      platform: 'Eventbrite',
      fees: '3.5% + $1.59',
      gasOptimization: 'N/A',
      crossChain: false,
      privacy: false,
      dynamicNFT: false,
    },
    {
      platform: 'GET Protocol',
      fees: '5%',
      gasOptimization: '60%',
      crossChain: false,
      privacy: false,
      dynamicNFT: false,
    },
  ];

  const costSavings = [
    { scenario: 'Concert (10,000 tickets @ $100)', traditional: '$150,000', ours: '$20,000', savings: '$130,000 (87%)' },
    { scenario: 'Conference (500 tickets @ $200)', traditional: '$15,000', ours: '$2,000', savings: '$13,000 (87%)' },
    { scenario: 'Sports Event (50,000 tickets @ $50)', traditional: '$375,000', ours: '$50,000', savings: '$325,000 (87%)' },
  ];

  return (
    <div className="space-y-8">
      {/* Platform Metrics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Platform Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Total Tickets Sold</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{metrics.totalTicketsSold.toLocaleString()}</p>
            <p className="text-sm mt-2 opacity-80">+{metrics.growthRate}% this month</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Total Revenue</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{metrics.totalRevenue}</p>
            <p className="text-sm mt-2 opacity-80">Platform fees: {metrics.platformFees}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Active Events</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{metrics.activeEvents}</p>
            <p className="text-sm mt-2 opacity-80">Avg: {metrics.avgTicketPrice}/ticket</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Total Users</p>
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">{metrics.totalUsers.toLocaleString()}</p>
            <p className="text-sm mt-2 opacity-80">{metrics.crossChainTransfers} cross-chain transfers</p>
          </div>
        </div>
      </div>

      {/* Competitive Comparison */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Competitive Analysis</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas Optimization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cross-Chain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Privacy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dynamic NFT</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {competitorData.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${index === 0 ? 'text-blue-900' : 'text-gray-900'}`}>
                        {item.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={index === 0 ? 'text-green-600 font-semibold' : 'text-gray-900'}>
                        {item.fees}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.gasOptimization}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.crossChain ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.privacy ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.dynamicNFT ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cost Savings */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Cost Savings Analysis</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scenario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traditional (15%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poka Ticket (2%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {costSavings.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.scenario}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600">{item.traditional}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{item.ours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-bold">{item.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Key Differentiators */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Key Differentiators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Privacy-First</h3>
            <p className="text-gray-600 text-sm">Zero-knowledge proofs enable anonymous check-ins without revealing identity</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Dynamic NFTs</h3>
            <p className="text-gray-600 text-sm">Tickets evolve with usage, earning badges and increasing collectible value</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Cross-Chain</h3>
            <p className="text-gray-600 text-sm">XCM enables seamless transfers between Astar and Moonbeam networks</p>
          </div>
        </div>
      </div>
    </div>
  );
};
