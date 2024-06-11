import express from "express";
const router = express.Router();
import notification from '../controllers/notification.js';
import { body } from 'express-validator';

router.post("/sendNotification", 
    [
        body("message").exists().isLength({ min: 2 }).withMessage("Invalid Message"),    
    ]
    , notification.sendNotification);



export default router;