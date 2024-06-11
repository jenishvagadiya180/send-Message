import express from "express";
const router = express.Router();
import user from '../controllers/user.js';
import { body } from 'express-validator';


router.post("/registration",
    [
        body("name").exists().isLength({ min: 2 }).withMessage("Invalid Name"),
        body("timeZone").exists().withMessage("Invalid TimeZone"),
        body("email").exists().isEmail().withMessage("Invalid Email"),
        body("password").exists().isLength({ min: 8 }).withMessage("Invalid Password")
    ]
    , user.addUser);

export default router;