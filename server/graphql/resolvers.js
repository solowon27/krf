const User = require('../models/User');
const Donation = require('../models/Donation');
const { signToken } = require('../utils/auth');

module.exports = {
  Query: {
    // Public query to get all donations
    getDonations: async () => {
      return await Donation.find().sort({ date: -1 }); // Latest first
    },

    // Authenticated user info
    getMe: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user._id);
    }
  },

  Mutation: {
    // User registration (admin or normal user)
    register: async (_, { email, password, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const newUser = new User({ email, password, role });
      await newUser.save();

      const token = signToken(newUser);
      return { token, user: newUser };
    },

    // Login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        throw new Error("Invalid credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Admin-only: add donation
    addDonation: async (_, { donorName, item, message }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error("Only admins can add donations");
      }

      const donation = new Donation({ donorName, item, message });
      return await donation.save();
    }
  }
};
