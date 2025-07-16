import { mockDB } from '@/lib/mockDatabase';

export default async function seedDatabase() {
  try {
    console.log('Using mock database - no MongoDB connection required');
    
    // The mock database is already initialized with sample data
    // We just need to call the seedData method to confirm it's ready
    const result = await mockDB.seedData();
    
    console.log('Mock database seeding completed successfully!');
    console.log('\nSample Voting Officer Credentials:');
    console.log('Employee ID: VO001, Password: admin123 (All constituencies - Admin)');
    console.log('Employee ID: VO002, Password: admin123 (Mumbai North)');
    console.log('Employee ID: VO003, Password: admin123 (Mumbai South)');
    console.log('Employee ID: VO004, Password: admin123 (Delhi Central)');
    console.log('Employee ID: VO005, Password: admin123 (Delhi East)');

    const allCandidates = await mockDB.getAllCandidates();
    const constituencies = await mockDB.getConstituencies();

    return {
      candidates: allCandidates.length,
      votingOfficers: 5,
      constituencies: constituencies.length,
      message: 'Mock database initialized successfully'
    };

  } catch (error) {
    console.error('Database seeding error:', error);
    throw error;
  }
}
