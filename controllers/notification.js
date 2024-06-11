import { CronJob } from "cron"
import services from "../helper/services.js";
import notificationModel from "../models/notification.js";
import userModel from "../models/user.js";

const send = services.setResponse;


class notification {
    static sendNotification = async (req, res, next) => {
        try {
            console.log("inside sendNotification")
            if (services.hasValidatorErrors(req, res)) {
                return;
            }   

            const results = await userModel.aggregate([
                {
                  $group: {
                    _id: "$timeZone",
                    users: {
                      $push: {
                        _id: "$_id",
                        name: "$name",
                        email: "$email",
                        password: "$password",
                        timeZone: "$timeZone"
                      }
                    }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    timeZone: "$_id",
                    users: 1
                  }
                }
              ]);

              console.log('results :>> ', results);
          

            // let userData = await userModel.find();
            // console.log('userData :>> ', userData);
            // if (userData) {
            //     return send(res, 404, "User Not Found!", null)
            // }

            // userData.forEach(user => {
            //     const getJobInfo = new CronJob(`04 22 * * *`, () => {
            //         try {                        
            //             console.log(`Hello, Good Morning ` + user.name );
            //         } catch (error) {
            //             console.log('Error in cron script  :>> ', error.message);
            //             throw new Error(error.message)                     
            //         }
            //     },
            //         null, // onComplete
            //         true, // start
            //         user.timezone, // "Asia/Dubai", "Europe/Berlin", "Asia/Kolkata"
            //     );
            //     console.log(`Cron job successfully added for timezone - ${getJobInfo.cronTime.timeZone}`);
            // });

            // const message = new notificationModel({
            //     message: req.body.message,
            //     sentTo: req.body.sentTo              
            // });

            // const messageData = await message.save();
            // console.log('messageData :>> ', messageData);
            // return send(res, 200, "message Successfully Sent", { "_id": messageData._id })

            return send(res, 200, "message Successfully Sent",results)

        } catch (error) {
            console.log('error.message :>> ', error.message);
            next(error)
        }
    }
}

export default notification;