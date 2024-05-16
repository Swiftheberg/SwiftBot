require("colors");
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

module.exports = async (client) => {
    console.log(`[INFO] ${client.user.username} est en ligne !`.bgBlue);

    if (!mongoURL) return;
    mongoose.set('strictQuery', true);
    if (await mongoose.connect(mongoURL)) {
        console.log(`[INFO] Connected to the database`.green);
    }
}