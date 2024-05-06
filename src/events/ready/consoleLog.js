require("colors");

module.exports = (client) => {
    console.log(`[INFO] ${client.user.username} est en ligne !`.bgBlue);
}