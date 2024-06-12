
import { validationResult } from "express-validator";
import notificationModel from "../models/notification.js";


class services {
    //for Give the Response for incoming Request
    static response = (code, message, data) => {
        if (data == null) {
            return {
                "status": code,
                "message": message
            }
        }
        else {
            return {
                "status": code,
                "message": message,
                "responseData": data
            }
        }
    }

    //For set the Response
    static setResponse = async (res, statusCode, message, data) => {
        await res.send(this.response(statusCode, message, data));
    }

    //For check Validation Errors
    static hasValidatorErrors = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let msg = "Validation Failed";
            this.setResponse(res, 402, msg, errors.array())
            return true;
        } else {
            return false;
        }
    }

    //For create notification in notification collection
    static sendNotification = async (users) => {
        try {
            console.log('users :>> ', users);
            const messages = users.map((user) => {
                return { message: "Hello Good Morning " + user.name, sentTo: user._id }
            })

            const message = await notificationModel.insertMany(messages);
            console.log('message :>> ', message);
        }
        catch (error) {
            console.log('Error is coming inside sendNotification :>> ', error.message);
        }
    }

}

export default services;