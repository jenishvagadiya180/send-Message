import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        console.log('process.env.DATABASE_URL :>> ', process.env.DATABASE_URL);
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('connected Successfully');
    } catch (err) {
        console.log(err);
    }
}
export default connectDatabase;

