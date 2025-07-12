const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');

// 🔧 Import GraphQL
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// 🔧 Import your existing JWT middleware
const { authMiddleware } = require('./utils/auth');

const startServer = async () => {
  const app = express();

  // Middleware
// Middleware
   app.use(cors({
  origin: 'https://www.konehs-foundation.org', // REMOVED the trailing slash
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
  app.use(express.json());

  // 🔧 Use your JWT authentication middleware
  app.use(authMiddleware);

  // --- NEW: Contact Form Submission Endpoint ---
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation (you can add more robust validation)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, Email, and Message are required fields.' });
    }

    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service (e.g., 'Outlook365', 'SendGrid', custom SMTP)
        auth: {
          user: process.env.EMAIL_USER, // Your sending email address
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVING_EMAIL,
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-bottom: 20px;">New Contact Form Submission</h2>

            <p style="margin-bottom: 10px;"><strong style="color: #0056b3;">Name:</strong> <span style="color: #555;">${name}</span></p>
            <p style="margin-bottom: 10px;"><strong style="color: #0056b3;">Email:</strong> <span style="color: #555;">${email}</span></p>
            <p style="margin-bottom: 10px;"><strong style="color: #0056b3;">Subject:</strong> <span style="color: #555;">${subject || 'N/A'}</span></p>

            <div style="background-color: #fff; border: 1px solid #eee; border-radius: 4px; padding: 15px; margin-top: 20px;">
              <p style="margin-top: 0; margin-bottom: 10px;"><strong style="color: #0056b3;">Message:</strong></p>
              <p style="white-space: pre-wrap; margin-bottom: 0; color: #555;">${message}</p>
            </div>

            <p style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #888;">
              This email was sent from your website's contact form.
            </p>
          </div>
        `,
      };
      // Send the email
      await transporter.sendMail(mailOptions);

      console.log('Contact form email sent successfully!');
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending contact form email:', error);
      res.status(500).json({ message: 'Failed to send message.', error: error.message });
    }
  });
  // --- END NEW: Contact Form Submission Endpoint ---

//sexurity measure  
const secret = process.env.JWT_SECRET || 'fallbacksecret'; // Use a fallback for local dev if dotenv not loaded
const expiration = process.env.JWT_EXPIRATION || '2h';

   // Apollo Server setup with context
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user // 🔧 Inject authenticated user
    }),
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // MongoDB connection
  mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // dbName: 'yourDatabaseName' // Optional: force database name if not in URI
  })
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
};

startServer();