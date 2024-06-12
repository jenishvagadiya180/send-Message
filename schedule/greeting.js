import { CronJob } from "cron"
import services from "../helper/services.js";
import userModel from "../models/user.js";


//For scheduling a notification at 09:00 AM worldwide
const scheduleNotification = async (req, res) => {
    try {
        console.log("inside sendNotification")

        const userData = await userModel.aggregate([
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
        console.log('userData :>> ', userData);

        userData.forEach(user => {
            console.log('user.timeZone :>> ', user.timeZone);
            const getJobInfo = new CronJob(`00 09 * * *`, async () => {
                try {
                    console.log(`Sending messages!!!`);
                    await services.sendNotification(user.users)
                } catch (error) {
                    console.log('Error in cron script  :>> ', error.message);
                    throw new Error(error.message)
                }
            },
                null,
                true,
                user.timeZone,
            );
        });

    } catch (error) {
        console.log('error.message :>> ', error.message);

    }

}

export { scheduleNotification };