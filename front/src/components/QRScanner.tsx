import React, { useState, useRef, useEffect } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import { AstarNFTService } from '../services/AstarNFTService';

interface QRScannerProps {
  onScanSuccess?: (tokenId: string, isValid: boolean) => void;
  onScanError?: (error: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const { api } = usePolkadot();
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [result, setResult] = useState<{ tokenId: string; isValid: boolean } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const verifyTicket = async (tokenId: string) => {
    if (!api) {
      onScanError?.('API not connected');
      return;
    }

    try {
      const nftService = new AstarNFTService(api);
      const ticket = await nftService.getTicketById(tokenId);
      
      const isValid = ticket !== null;
      setResult({ tokenId, isValid });
      onScanSuccess?.(tokenId, isValid);
    } catch (error: any) {
      onScanError?.(error.message || 'Verification failed');
    }
  };

  const handleManualVerify = () => {
    if (manualInput.trim()) {
      verifyTicket(manualInput.trim());
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      onScanError?.('Failed to access camera');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Scan Ticket QR Code</h3>

        {/* Camera View */}
        {scanning ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white"></div>
            </div>
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Stop Camera
            </button>
          </div>
        ) : (
          <button
            onClick={startCamera}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold"
          >
            Start Camera
          </button>
        )}

        {/* Manual Input */}
        <div className="mt-6 pt-6 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter Ticket ID manually:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="TICKET-123456"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={handleManualVerify}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Verify
            </button>
          </div>
        </div>

        {/* Verification Result */}
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {result.isValid ? (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <div>
                <p className={`font-semibold ${result.isValid ? 'text-green-800' : 'text-red-800'}`}>
                  {result.isValid ? 'Valid Ticket' : 'Invalid Ticket'}
                </p>
                <p className={`text-sm ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {result.tokenId}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
