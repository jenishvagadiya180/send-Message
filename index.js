import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './database/connectDB.js';
import user from './routes/user.js'
import notification from './routes/notification.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030

connectDatabase()

app.use(express.json());
app.use("/user", user)
app.use("/notification", notification)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));