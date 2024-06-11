import { CronJob } from "cron"

const timezoneArray = ["Asia/Dubai", "Europe/Berlin", "Asia/Kolkata"]

for (const timezone of timezoneArray) {
    const getJobInfo = new CronJob(`04 22 * * *`, () => {
        try {
            // Your logical scripts to run at 12AM
            console.log(`Hello world from - ${timezone}`);
        } catch (error) {
            console.log(`Error in cron script : ${error.message}`)
        }
    },
        null, // onComplete
        true, // start
        timezone, // "Asia/Dubai", "Europe/Berlin", "Asia/Kolkata"
    );
    console.log(`Cron job successfully added for timezone - ${getJobInfo.cronTime.timeZone}`);
}