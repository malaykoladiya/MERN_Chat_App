/**
 * This file contains the code to connect to a MongoDB database using Mongoose.
 */

import mongoose from "mongoose";

/**
 * Function to connect to the MongoDB database.
 * @returns {Promise<void>} - A promise that resolves when the connection is successful or rejects with an error.
 */
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Error connecting to mongoDB ", error.message);
    }
}

export default connectToMongoDB;