import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n📦 MongoDB Connected: ${conn.connection.host}\n`);
    } catch (error) {
        console.error(`\n❌ Database Error: ${error.message}\n`);
        process.exit(1); 
    }
};

export default connectDB;