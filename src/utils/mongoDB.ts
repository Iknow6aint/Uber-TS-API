import mongoose, { ConnectOptions } from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
    try {
        const dbUrl = 'mongodb+srv://iknowsaint:Jajabone@cluster0.jrwwqte.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URL
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

export default connectToDatabase;
