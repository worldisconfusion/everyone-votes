import mongoose, { Document, Schema } from 'mongoose';

// User Interface
export interface IUser extends Document {
  mobile: string;
  aadharNumber: string;
  voterIdNumber: string;
  fullName: string;
  dateOfBirth: Date;
  constituency: string;
  isVerified: boolean;
  hasVoted: boolean;
  votedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const UserSchema: Schema = new Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{12}$/
  },
  voterIdNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{3}[0-9]{7}$/
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  constituency: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  votedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// OTP Interface
export interface IOTP extends Document {
  mobile: string;
  otp: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

// OTP Schema
const OTPSchema: Schema = new Schema({
  mobile: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Candidate Interface
export interface ICandidate extends Document {
  name: string;
  party: string;
  constituency: string;
  symbol: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

// Candidate Schema
const CandidateSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  party: {
    type: String,
    required: true,
    trim: true
  },
  constituency: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Vote Interface
export interface IVote extends Document {
  userId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId | null; // null for NOTA
  constituency: string;
  isNOTA: boolean;
  timestamp: Date;
}

// Vote Schema
const VoteSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensures one vote per user
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    default: null // null for NOTA votes
  },
  constituency: {
    type: String,
    required: true
  },
  isNOTA: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Voting Officer Interface
export interface IVotingOfficer extends Document {
  employeeId: string;
  name: string;
  constituency: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
}

// Voting Officer Schema
const VotingOfficerSchema: Schema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  constituency: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const OTP = mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);
export const Candidate = mongoose.models.Candidate || mongoose.model<ICandidate>('Candidate', CandidateSchema);
export const Vote = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);
export const VotingOfficer = mongoose.models.VotingOfficer || mongoose.model<IVotingOfficer>('VotingOfficer', VotingOfficerSchema);
