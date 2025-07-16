// Mock database connection for demo purposes
// This completely avoids MongoDB and uses only in-memory mock data

import { mockDB } from './mockDatabase';

// Mock connection function that returns success immediately
async function connectDB(): Promise<{ success: boolean }> {
  // For demo purposes, we don't need actual database connection
  // The mockDB is already initialized and ready to use
  console.log('Using mock database - no MongoDB connection required');
  
  // Return a simple success response
  return Promise.resolve({
    success: true,
    message: 'Mock database ready'
  });
}

// Export the mock connection function
export default connectDB;

// Also export the mock database instance for direct use
export { mockDB };