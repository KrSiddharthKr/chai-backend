// write code in db folder and import it in index file which the code will be clean, separated and modular
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async () => {
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB connected !! DB Host ${connectionInstance.connection.host}`)
        // console.log(connectionInstance);
        console.log(connectionInstance.connection.host);
    }
    catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1);
    }
}

export default connectDB