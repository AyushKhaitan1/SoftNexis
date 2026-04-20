import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './src/db/connect.js';
import rateLimit from 'express-rate-limit';
import { securityHeaders } from './src/middleware/security.js';
import taskRouter from './src/routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

// 1. Security & Logging Middleware Pipeline
app.use(helmet()); // Sets standard secure HTTP headers
app.use(securityHeaders); // Custom requested headers
app.use(morgan('dev')); // Logs requests to the console
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON payloads

// 2. Rate Limiting (Pro Tip) - Max 100 requests per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api/', apiLimiter);

// 3. API Routes (Versioned as per Pro Tips)
app.use('/api/v1/tasks', taskRouter);

// 4. Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 5. Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 TaskFlow API is running securely on http://localhost:${PORT}`);
    console.log(`➡️  Test endpoint: http://localhost:${PORT}/api/v1/tasks\n`);
});