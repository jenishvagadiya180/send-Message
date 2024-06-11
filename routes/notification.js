import express from "express";
const router = express.Router();
import notification from '../controllers/notification.js';
import auth from "../helper/middleware.js";
import { body } from 'express-validator';

router.post("/sendNotification", auth,
    [
        body("message").exists().isLength({ min: 2 }).withMessage("Invalid Message"),     
        body("sentTo").exists().isMongoId().withMessage("Invalid userId"), 
    ]
    , notification.sendNotification);



export default router;