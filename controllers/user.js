import userModel from "../models/user.js"
import services from "../helper/services.js";

const send = services.setResponse;
import bcrypt from 'bcrypt';
const saltRounds = 10;

class user {
    static addUser = async (req, res) => {
        try {
            console.log("inside addUser")          
            if (services.hasValidatorErrors(req, res)) {
                return;
            }

            let matchEmail = await userModel.findOne({ email: req.body.email });
            if (matchEmail) {
                return send(res, 404, "User Already Exists!", null)
            }

            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const user = new userModel({
                name: req.body.name,
                timeZone: req.body.timeZone,
                email: req.body.email,
                password: hashedPassword,
            });

            const userData = await user.save();
            return send(res, 200, "User Successfully Registered", { "_id": userData._id });
        } catch (error) {
            console.log('error :>> ', error);
        }
    }  
}

export default user;