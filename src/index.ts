import cookieParser from 'cookie-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';



const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

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
connectToDatabase()

app.use('/', router());