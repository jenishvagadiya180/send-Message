import services from "../helper/services.js";
import notification from "../models/notification.js"
import notificationModel from "../models/notification.js";

const send = services.setResponse;


class notification {
    static sendNotification = async (req, res, next) => {
        try {
            console.log("inside sendNotification")
            if (services.hasValidatorErrors(req, res)) {
                return;
            }          

            const message = new notificationModel({
                message: req.body.message,
                sentTo: req.body.sentTo              
            });

            const messageData = await message.save();
            console.log('messageData :>> ', messageData);
            return send(res, 200, "message Successfully Sent", { "_id": messageData._id })

        } catch (error) {
            console.log('error.message :>> ', error.message);
            next(error)
        }
    }
}

export default notification;