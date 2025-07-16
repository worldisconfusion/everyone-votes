interface User {
  id: string;
  mobile: string;
  aadharNumber: string;
  voterID: string;
  name: string;
  dateOfBirth: string;
  constituency: string;
  hasVoted: boolean;
  createdAt: Date;
}

interface Candidate {
  id: string;
  name: string;
  party: string;
  constituency: string;
  photoUrl: string;
  description: string;
}

interface Vote {
  id: string;
  userId: string;
  candidateId: string | null;
  constituency: string;
  isNOTA: boolean;
  timestamp: Date;
}

interface Officer {
  id: string;
  employeeId: string;
  name: string;
  password: string;
  constituency: string;
  role: string;
}

// Mock data storage
class MockDatabase {
  private users: User[] = [];
  private candidates: Candidate[] = [];
  private votes: Vote[] = [];
  private officers: Officer[] = [];
  private otpStorage: Map<string, { otp: string; expires: Date }> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize mock candidates
    this.candidates = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        party: 'Indian National Congress',
        constituency: 'Mumbai North',
        photoUrl: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=RK',
        description: 'Experienced leader focused on urban development and infrastructure.'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        party: 'Bharatiya Janata Party',
        constituency: 'Mumbai North',
        photoUrl: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=PS',
        description: 'Young politician advocating for digital India and entrepreneurship.'
      },
      {
        id: '3',
        name: 'Mohammed Ali',
        party: 'Aam Aadmi Party',
        constituency: 'Mumbai North',
        photoUrl: 'https://via.placeholder.com/150x150/059669/FFFFFF?text=MA',
        description: 'Community leader working for transparent governance.'
      },
      {
        id: '4',
        name: 'Sunita Patel',
        party: 'Indian National Congress',
        constituency: 'Mumbai South',
        photoUrl: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=SP',
        description: 'Social worker dedicated to women empowerment and education.'
      },
      {
        id: '5',
        name: 'Vikram Singh',
        party: 'Bharatiya Janata Party',
        constituency: 'Mumbai South',
        photoUrl: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=VS',
        description: 'Former businessman focusing on economic development.'
      },
      {
        id: '6',
        name: 'Anita Roy',
        party: 'Trinamool Congress',
        constituency: 'Delhi Central',
        photoUrl: 'https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=AR',
        description: 'Advocate for environmental protection and sustainable development.'
      },
      {
        id: '7',
        name: 'Ravi Gupta',
        party: 'Bharatiya Janata Party',
        constituency: 'Delhi Central',
        photoUrl: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=RG',
        description: 'Technology enthusiast promoting smart city initiatives.'
      },
      {
        id: '8',
        name: 'Meera Joshi',
        party: 'Indian National Congress',
        constituency: 'Delhi East',
        photoUrl: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=MJ',
        description: 'Healthcare professional working for better medical facilities.'
      },
      {
        id: '9',
        name: 'Arun Kumar',
        party: 'Aam Aadmi Party',
        constituency: 'Delhi East',
        photoUrl: 'https://via.placeholder.com/150x150/059669/FFFFFF?text=AK',
        description: 'Education reformist focusing on quality schooling for all.'
      },
      {
        id: '10',
        name: 'Kavya Reddy',
        party: 'Indian National Congress',
        constituency: 'Bangalore North',
        photoUrl: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=KR',
        description: 'IT professional advocating for tech innovation and job creation.'
      },
      {
        id: '11',
        name: 'Suresh Babu',
        party: 'Bharatiya Janata Party',
        constituency: 'Bangalore North',
        photoUrl: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=SB',
        description: 'Agricultural expert promoting farmer welfare schemes.'
      },
      {
        id: '12',
        name: 'Lakshmi Devi',
        party: 'Janata Dal',
        constituency: 'Bangalore South',
        photoUrl: 'https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=LD',
        description: 'Women rights activist and social entrepreneur.'
      }
    ];

    // Initialize mock officers
    this.officers = [
      {
        id: '1',
        employeeId: 'VO001',
        name: 'Admin Officer',
        password: 'admin123',
        constituency: 'All',
        role: 'admin'
      },
      {
        id: '2',
        employeeId: 'VO002',
        name: 'Mumbai North Officer',
        password: 'admin123',
        constituency: 'Mumbai North',
        role: 'officer'
      },
      {
        id: '3',
        employeeId: 'VO003',
        name: 'Mumbai South Officer',
        password: 'admin123',
        constituency: 'Mumbai South',
        role: 'officer'
      },
      {
        id: '4',
        employeeId: 'VO004',
        name: 'Delhi Central Officer',
        password: 'admin123',
        constituency: 'Delhi Central',
        role: 'officer'
      },
      {
        id: '5',
        employeeId: 'VO005',
        name: 'Delhi East Officer',
        password: 'admin123',
        constituency: 'Delhi East',
        role: 'officer'
      }
    ];

    // Add some mock votes for demo
    this.votes = [
      {
        id: '1',
        userId: 'mock-user-1',
        candidateId: '1',
        constituency: 'Mumbai North',
        isNOTA: false,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        userId: 'mock-user-2',
        candidateId: '2',
        constituency: 'Mumbai North',
        isNOTA: false,
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        userId: 'mock-user-3',
        candidateId: null,
        constituency: 'Mumbai South',
        isNOTA: true,
        timestamp: new Date(Date.now() - 900000)
      }
    ];

    // Add some mock users
    this.users = [
      {
        id: 'mock-user-1',
        mobile: '9876543210',
        aadharNumber: '123456789012',
        voterID: 'ABC1234567',
        name: 'Demo User 1',
        dateOfBirth: '1990-01-01',
        constituency: 'Mumbai North',
        hasVoted: true,
        createdAt: new Date()
      }
    ];
  }

  async sendOTP(mobile: string): Promise<{ success: boolean; otp?: string; message: string }> {
    // Clear any existing OTP for this mobile
    this.otpStorage.delete(mobile);
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    this.otpStorage.set(mobile, { otp, expires });
    
    console.log(`OTP sent to ${mobile}: ${otp} (expires at ${expires.toISOString()})`);
    
    return {
      success: true,
      otp,
      message: 'OTP sent successfully'
    };
  }

  async verifyOTP(mobile: string, otp: string): Promise<{ success: boolean; message: string }> {
    const storedOTP = this.otpStorage.get(mobile);
    
    console.log(`Verifying OTP for ${mobile}: ${otp}`);
    console.log(`Stored OTP:`, storedOTP);
    
    if (!storedOTP) {
      return { success: false, message: 'OTP not found or expired' };
    }
    
    if (new Date() > storedOTP.expires) {
      this.otpStorage.delete(mobile);
      return { success: false, message: 'OTP expired' };
    }
    
    if (storedOTP.otp !== otp) {
      return { success: false, message: 'Invalid OTP' };
    }
    
    // Keep OTP for a short while after verification to prevent immediate expiry
    setTimeout(() => {
      this.otpStorage.delete(mobile);
    }, 30000); // Delete after 30 seconds
    
    return { success: true, message: 'OTP verified successfully' };
  }

  async findUserByMobile(mobile: string): Promise<User | null> {
    return this.users.find(user => user.mobile === mobile) || null;
  }

  async findUserByAadhar(aadharNumber: string): Promise<User | null> {
    return this.users.find(user => user.aadharNumber === aadharNumber) || null;
  }

  async findUserByVoterID(voterID: string): Promise<User | null> {
    return this.users.find(user => user.voterID === voterID) || null;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // ENSURE UNIQUE REGISTRATION - PREVENT DUPLICATE AADHAR, VOTER ID, MOBILE
    const existingMobile = this.users.find(user => user.mobile === userData.mobile);
    if (existingMobile) {
      throw new Error('Mobile number already registered');
    }
    
    const existingAadhar = this.users.find(user => user.aadharNumber === userData.aadharNumber);
    if (existingAadhar) {
      throw new Error('Aadhar number already registered');
    }
    
    const existingVoterID = this.users.find(user => user.voterID === userData.voterID);
    if (existingVoterID) {
      throw new Error('Voter ID already registered');
    }
    
    // Validate age (must be 18+)
    const birthDate = new Date(userData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0)) {
      throw new Error('User must be at least 18 years old to register');
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    
    console.log(`User registered: ${userData.name} (Mobile: ${userData.mobile}, Constituency: ${userData.constituency})`);
    
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  async getCandidatesByConstituency(constituency: string): Promise<Candidate[]> {
    return this.candidates.filter(candidate => candidate.constituency === constituency);
  }

  async findCandidateById(id: string): Promise<Candidate | null> {
    return this.candidates.find(candidate => candidate.id === id) || null;
  }

  async getAllCandidates(): Promise<Candidate[]> {
    return this.candidates;
  }

  async createVote(voteData: Omit<Vote, 'id' | 'timestamp'>): Promise<Vote> {
    // ENSURE ONE VOTE PER PERSON PER CONSTITUENCY
    const existingVote = this.votes.find(vote => vote.userId === voteData.userId);
    if (existingVote) {
      throw new Error('User has already voted');
    }
    
    // Verify user exists and is in the same constituency
    const user = await this.findUserById(voteData.userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.constituency !== voteData.constituency) {
      throw new Error('User can only vote in their registered constituency');
    }
    
    if (user.hasVoted) {
      throw new Error('User has already voted');
    }
    
    // Verify candidate exists in the same constituency (if not NOTA)
    if (!voteData.isNOTA && voteData.candidateId) {
      const candidate = await this.findCandidateById(voteData.candidateId);
      if (!candidate) {
        throw new Error('Candidate not found');
      }
      
      if (candidate.constituency !== voteData.constituency) {
        throw new Error('Candidate not in the same constituency');
      }
    }
    
    const newVote: Vote = {
      ...voteData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    this.votes.push(newVote);
    await this.updateUser(voteData.userId, { hasVoted: true });
    
    console.log(`Vote recorded: User ${voteData.userId} voted in ${voteData.constituency}${voteData.isNOTA ? ' for NOTA' : ' for candidate ' + voteData.candidateId}`);
    
    return newVote;
  }

  async findOfficerByEmployeeId(employeeId: string): Promise<Officer | null> {
    return this.officers.find(officer => officer.employeeId === employeeId) || null;
  }

  async getVotingStats(): Promise<any> {
    const totalUsers = this.users.length;
    const totalVotes = this.votes.length;
    
    const candidateVotes: { [key: string]: number } = {};
    let notaVotes = 0;
    
    this.votes.forEach(vote => {
      if (vote.isNOTA) {
        notaVotes++;
      } else if (vote.candidateId) {
        candidateVotes[vote.candidateId] = (candidateVotes[vote.candidateId] || 0) + 1;
      }
    });

    const constituencies = ['Mumbai North', 'Mumbai South', 'Delhi Central', 'Delhi East', 'Bangalore North', 'Bangalore South'];
    const constituencyStats: { [key: string]: any } = {};
    
    constituencies.forEach(constituency => {
      const constituencyUsers = this.users.filter(u => u.constituency === constituency);
      const constituencyVotes = this.votes.filter(v => v.constituency === constituency);
      const mockRegistered = Math.floor(Math.random() * 100) + 50;
      
      constituencyStats[constituency] = {
        registered: constituencyUsers.length + mockRegistered,
        voted: constituencyVotes.length,
        pending: (constituencyUsers.length + mockRegistered) - constituencyVotes.length
      };
    });

    return {
      totalRegistered: totalUsers + 300,
      totalVoted: totalVotes,
      totalPending: (totalUsers + 300) - totalVotes,
      voteDistribution: {
        candidates: this.candidates.map(candidate => ({
          id: candidate.id,
          name: candidate.name,
          party: candidate.party,
          constituency: candidate.constituency,
          votes: candidateVotes[candidate.id] || 0
        })),
        nota: notaVotes
      },
      constituencyBreakdown: constituencyStats,
      recentActivity: this.votes
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10)
        .map(vote => {
          const candidate = vote.isNOTA ? null : this.candidates.find(c => c.id === vote.candidateId);
          const user = this.users.find(u => u.id === vote.userId);
          
          return {
            id: vote.id,
            voterName: user?.name || 'Anonymous Voter',
            candidateName: vote.isNOTA ? 'NOTA' : candidate?.name || 'Unknown Candidate',
            constituency: vote.constituency,
            timestamp: vote.timestamp
          };
        })
    };
  }

  async seedData(): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'Mock data seeded successfully'
    };
  }

  async getConstituencies(): Promise<string[]> {
    return ['Mumbai North', 'Mumbai South', 'Delhi Central', 'Delhi East', 'Bangalore North', 'Bangalore South'];
  }

  // COMPREHENSIVE VERIFICATION FLOW
  async verifyUserForVoting(userId: string): Promise<{ 
    canVote: boolean; 
    message: string; 
    user?: User; 
    verificationSteps: { [key: string]: boolean } 
  }> {
    const user = await this.findUserById(userId);
    
    const verificationSteps = {
      userExists: !!user,
      hasValidMobile: false,
      hasValidAadhar: false,
      hasValidVoterID: false,
      isEligibleAge: false,
      hasNotVotedYet: false,
      isInValidConstituency: false
    };

    if (!user) {
      return {
        canVote: false,
        message: 'User not found',
        verificationSteps
      };
    }

    // Check mobile verification
    verificationSteps.hasValidMobile = /^[6-9]\d{9}$/.test(user.mobile);
    
    // Check Aadhar verification
    verificationSteps.hasValidAadhar = /^\d{12}$/.test(user.aadharNumber);
    
    // Check Voter ID verification
    verificationSteps.hasValidVoterID = /^[A-Z]{3}[0-9]{7}$/.test(user.voterID);
    
    // Check age eligibility
    const birthDate = new Date(user.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    verificationSteps.isEligibleAge = age >= 18;
    
    // Check if user has not voted yet
    verificationSteps.hasNotVotedYet = !user.hasVoted;
    
    // Check if user is in a valid constituency
    const validConstituencies = await this.getConstituencies();
    verificationSteps.isInValidConstituency = validConstituencies.includes(user.constituency);

    const allVerificationsPassed = Object.values(verificationSteps).every(step => step === true);

    if (!allVerificationsPassed) {
      const failedSteps = Object.entries(verificationSteps)
        .filter(([_, passed]) => !passed)
        .map(([step, _]) => step);
      
      return {
        canVote: false,
        message: `Verification failed: ${failedSteps.join(', ')}`,
        user,
        verificationSteps
      };
    }

    return {
      canVote: true,
      message: 'User verified successfully and can vote',
      user,
      verificationSteps
    };
  }

  // ENHANCED VOTE VALIDATION
  async validateVoteRequest(userId: string, candidateId: string | null, isNOTA: boolean): Promise<{
    isValid: boolean;
    message: string;
    user?: User;
    candidate?: Candidate;
  }> {
    const userVerification = await this.verifyUserForVoting(userId);
    
    if (!userVerification.canVote) {
      return {
        isValid: false,
        message: userVerification.message
      };
    }

    const user = userVerification.user!;

    // Validate vote choice
    if (!isNOTA && !candidateId) {
      return {
        isValid: false,
        message: 'Must select a candidate or NOTA'
      };
    }

    if (isNOTA && candidateId) {
      return {
        isValid: false,
        message: 'Cannot select both candidate and NOTA'
      };
    }

    // If voting for a candidate, verify candidate
    if (!isNOTA && candidateId) {
      const candidate = await this.findCandidateById(candidateId);
      
      if (!candidate) {
        return {
          isValid: false,
          message: 'Candidate not found'
        };
      }

      if (candidate.constituency !== user.constituency) {
        return {
          isValid: false,
          message: 'Candidate not in your constituency'
        };
      }

      return {
        isValid: true,
        message: 'Vote request is valid',
        user,
        candidate
      };
    }

    // NOTA vote
    return {
      isValid: true,
      message: 'NOTA vote request is valid',
      user
    };
  }
}

export const mockDB = new MockDatabase();