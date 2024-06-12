import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './database/connectDB.js';
import user from './routes/user.js'
import { scheduleNotification } from './schedule/greeting.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030

//Function for Connecting Database
connectDatabase()

app.use(express.json());
app.use("/user", user)

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
    scheduleNotification() //for schedule a cron Job for sending a notification
});