import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NFTTicket } from '../services/AstarNFTService';

interface TicketCardProps {
  ticket: NFTTicket;
  showQR?: boolean;
  onTransfer?: (tokenId: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, showQR = false, onTransfer }) => {
  const { metadata, tokenId } = ticket;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={metadata.image}
          alt={metadata.eventName}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-blue-600">{metadata.ticketType}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{metadata.eventName}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{metadata.eventDate}</span>
          </div>
          
          {metadata.seatNumber && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Seat: {metadata.seatNumber}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-gray-600 text-sm">Price</span>
            <span className="text-lg font-bold text-blue-600">{metadata.price}</span>
          </div>
        </div>

        {showQR && (
          <div className="flex justify-center py-4 bg-gray-50 rounded-lg mb-4">
            <QRCodeSVG value={tokenId} size={150} />
          </div>
        )}

        <div className="flex gap-2">
          {!showQR && (
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              View QR Code
            </button>
          )}
          
          {onTransfer && (
            <button
              onClick={() => onTransfer(tokenId)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Transfer
            </button>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">Token ID: {tokenId}</p>
          <p className="text-xs text-gray-500">Event ID: {metadata.eventId}</p>
        </div>
      </div>
    </div>
  );
};
