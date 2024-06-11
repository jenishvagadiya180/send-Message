import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import moment from "moment";


class services {
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

    static setResponse = async (res, statusCode, message, data) => {
        await res.send(this.response(statusCode, message, data));
    }

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

    static userTokenGenerate = async (emailPasswordObj, expireTime) => {
        const token = await jwt.sign(emailPasswordObj, process.env.SECURITY_KEY, { expiresIn: expireTime });
        return token;
    }

    static jwtVerify(token) {
        try {
            const verifyUser = jwt.verify(token, process.env.SECURITY_KEY);

            if (moment().unix() > verifyUser.exp) {
                return true;
            }
            return false
        }
        catch (error) {
            return true
        }
    }

    static responseData(status, message, data, totalRecord) {
        let responseData = {
            status: status,
            message: message,
            data: data,
            "recordsTotal": totalRecord,
            "recordsFiltered": totalRecord,
        };
        return responseData;
    }

}

export default services;