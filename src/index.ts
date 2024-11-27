import express from 'express';
import cors from 'cors';
import router from './routes';



const app = express();
const PORT = process.env.PORT || 3000;  // Use environment variable for PORT if available

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api', router);

// Start the server and log that the server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
