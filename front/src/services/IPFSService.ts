import { create, IPFSHTTPClient } from 'ipfs-http-client';

export interface IPFSUploadResult {
  cid: string;
  url: string;
}

export class IPFSService {
  private client: IPFSHTTPClient | null = null;
  private gateway: string = 'https://ipfs.io/ipfs/';

  constructor() {
    try {
      // Use Infura IPFS (free tier)
      this.client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
      });
    } catch (error) {
      console.error('Failed to initialize IPFS client:', error);
    }
  }

  /**
   * Upload JSON metadata to IPFS
   */
  async uploadJSON(data: any): Promise<IPFSUploadResult> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }

    try {
      const jsonString = JSON.stringify(data);
      const result = await this.client.add(jsonString);
      
      return {
        cid: result.path,
        url: `${this.gateway}${result.path}`,
      };
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload to IPFS');
    }
  }

  /**
   * Upload image file to IPFS
   */
  async uploadFile(file: File): Promise<IPFSUploadResult> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }

    try {
      const result = await this.client.add(file);
      
      return {
        cid: result.path,
        url: `${this.gateway}${result.path}`,
      };
    } catch (error) {
      console.error('IPFS file upload error:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  /**
   * Retrieve data from IPFS
   */
  async retrieve(cid: string): Promise<any> {
    try {
      const response = await fetch(`${this.gateway}${cid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch from IPFS');
      }
      return await response.json();
    } catch (error) {
      console.error('IPFS retrieve error:', error);
      throw new Error('Failed to retrieve from IPFS');
    }
  }

  /**
   * Get IPFS URL from CID
   */
  getURL(cid: string): string {
    return `${this.gateway}${cid}`;
  }

  /**
   * Pin content to ensure it stays on IPFS
   */
  async pin(cid: string): Promise<void> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }

    try {
      await this.client.pin.add(cid);
    } catch (error) {
      console.error('IPFS pin error:', error);
      // Non-critical, continue
    }
  }
}

// Singleton instance
export const ipfsService = new IPFSService();
