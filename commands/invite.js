const respond = require("../functions/respond");

module.exports = (client, message) => {
    respond(client, message, `(uwu)/ add me to your server using this link: <https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands>`);
}