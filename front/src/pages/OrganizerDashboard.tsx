import React, { useState, useEffect } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';

interface EventStats {
  eventId: string;
  eventName: string;
  totalTickets: number;
  soldTickets: number;
  revenue: string;
  checkIns: number;
  royalties: string;
}

export const OrganizerDashboard: React.FC = () => {
  const { isConnected } = usePolkadot();
  const [events, setEvents] = useState<EventStats[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      loadEventStats();
    }
  }, [isConnected]);

  const loadEventStats = () => {
    // Mock data
    const mockStats: EventStats[] = [
      {
        eventId: 'EVT-001',
        eventName: 'Polkadot Summit 2025',
        totalTickets: 500,
        soldTickets: 387,
        revenue: '38,700 DOT',
        checkIns: 245,
        royalties: '1,240 DOT',
      },
      {
        eventId: 'EVT-002',
        eventName: 'Web3 Conference',
        totalTickets: 300,
        soldTickets: 256,
        revenue: '12,800 DOT',
        checkIns: 189,
        royalties: '640 DOT',
      },
    ];
    setEvents(mockStats);
    if (mockStats.length > 0) {
      setSelectedEvent(mockStats[0].eventId);
    }
  };

  const selectedEventData = events.find(e => e.eventId === selectedEvent);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Wallet Not Connected</h2>
          <p className="text-yellow-700">Please connect your wallet to access the organizer dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizer Dashboard</h1>
        <p className="text-gray-600">Manage your events and track performance</p>
      </div>

      {/* Event Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
        <select
          value={selectedEvent || ''}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 bg-white"
        >
          {events.map((event) => (
            <option key={event.eventId} value={event.eventId}>
              {event.eventName}
            </option>
          ))}
        </select>
      </div>

      {selectedEventData && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Tickets Sold</p>
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {selectedEventData.soldTickets}/{selectedEventData.totalTickets}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {Math.round((selectedEventData.soldTickets / selectedEventData.totalTickets) * 100)}% sold
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Revenue</p>
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{selectedEventData.revenue}</p>
              <p className="text-sm text-gray-500 mt-1">Primary sales</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Check-ins</p>
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{selectedEventData.checkIns}</p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((selectedEventData.checkIns / selectedEventData.soldTickets) * 100)}% attendance
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Royalties</p>
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{selectedEventData.royalties}</p>
              <p className="text-sm text-gray-500 mt-1">Secondary market</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Create New Event
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Export Attendee List
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Check-in Scanner
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Event Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event ID:</span>
                  <span className="font-mono">{selectedEventData.eventId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity:</span>
                  <span className="font-medium">{selectedEventData.totalTickets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium text-blue-600">
                    {selectedEventData.totalTickets - selectedEventData.soldTickets}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Ticket Price:</span>
                  <span className="font-medium">100 DOT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Ticket Sold</p>
                    <p className="text-sm text-gray-500">VIP Ticket #387</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 min ago</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Check-in</p>
                    <p className="text-sm text-gray-500">Ticket #245</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">15 min ago</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Royalty Received</p>
                    <p className="text-sm text-gray-500">8 DOT from resale</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
