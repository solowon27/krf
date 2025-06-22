const User = require('../models/User');
const Donation = require('../models/Donation');
const { signToken } = require('../utils/auth');

module.exports = {
  Query: {
    getDonations: async () => {
      return await Donation.find().sort({ date: -1 });
    },

    getMe: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user._id);
    },
  },

  Mutation: {
    register: async (_, { firstName, email, password, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const newUser = new User({ firstName, email, password, role });
      await newUser.save();

      const token = signToken(newUser);
      return { token, user: newUser };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        throw new Error("Invalid credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addDonation: async (_, { donorName, item, message }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error("Only admins can add donations");
      }

      const donation = new Donation({ donorName, item, message, submittedBy: user._id });
      return await donation.save();
    },
  },

 Donation: {
   date: (parent) => parent.date?.toISOString() || null,

  submittedBy: async (parent) => {
   if (!parent.submittedBy) {
          // If submittedBy field is missing or null on the Donation document
          return null;
      }
   const user = await User.findById(parent.submittedBy);
   // Important: What if the user linked by submittedBy no longer exists?
   if (!user) {
          console.warn(`User with ID ${parent.submittedBy} not found for donation ${parent._id}.`);
          return null; // Return null if the user isn't found
      }
   return {
   id: user._id,
  firstName: user.firstName,
   email: user.email, // It's good practice to include email if your frontend queries it, even if not explicitly shown here
   role: user.role,
  };
   },
  },
};