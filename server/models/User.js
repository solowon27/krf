const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // You'll need to install this: npm install bcryptjs

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    lowercase: true, // Stores emails in lowercase for consistency
    trim: true, // Removes whitespace from both ends of a string
    match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Enforce a minimum password length
  },
  role: { // Crucial for distinguishing admins from regular users
    type: String,
    enum: ['admin', 'user'], // Define possible roles
    default: 'user' // Default role for new users if not specified
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});


userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10); // 10 is a good default salt rounds
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Method to compare passwords for login ---
// You'll use this method in your login route
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;