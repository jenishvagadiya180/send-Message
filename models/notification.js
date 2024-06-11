import mongoose, { Schema } from "mongoose";

const noticationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    sentTo: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    createdAt: Number,
    updatedAt: Number

},
    { timestamps: true });
const notificationModel = mongoose.model("notification", noticationSchema)


export default notificationModel;
