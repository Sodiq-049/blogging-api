require('dotenv').config();
const http = require('http');
const app = require('./src/app'); // Import the app configuration
const connectDB = require('./src/config/db'); // Import the database connection function

// Connect to MongoDB
connectDB();

// Get the PORT from environment variables or use default
const PORT = process.env.PORT || 5000;

// Create the server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server errors gracefully
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('An unexpected server error occurred:', error);
  }
});
