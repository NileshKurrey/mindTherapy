import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParer from 'cookie-parser'
import UserRoutes from './routes/User.routes.js';
dotenv.config({
    path:'./.env'
})
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParer())


//Routes
const Port = process.env.PORT ;
app.use('/api/v1/user', UserRoutes);
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});