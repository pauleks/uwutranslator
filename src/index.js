const Discord = require("discord.js");
const client = new Discord.Client();

const { token, public } = require("./config.json");
const { validateToken } = require("./functions/validations");
const { uwuify } = require("./functions/uwuify");
const { respond } = require("./functions/interactions");

class InviteButton {
    constructor(id) {
        this.type = 2;
        this.style = 5;
        this.label = "Invite me!";
        this.url = `https://discord.com/oauth2/authorize?client_id=${id}&scope=applications.commands`;
    }
}

client.on("ready", () => {
    console.log(`The bot is ready! Logged in as ${client.user.tag}`);
    console.log(`Use this link to add me to your server: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands`);
    if (!public) console.log(`Make sure to turn off "Public bot" option in Discord Developers page!`);
});

client.on("raw", (packet) => {
    if (packet.t != "INTERACTION_CREATE") return;
    if (packet.d.data.name == "invite") {
        const button = new InviteButton(client.user.id);
        respond(packet.d, `You can add me to your server using the link below :3`, null, button).catch((err) => console.log(`Something went wrong while trying to execute a command: ${err}`));;
    } else if (packet.d.data.name == "uwuify") {
        uwuify(packet.d.data.options[0].value).then((text) => {
            const embed = new Discord.MessageEmbed({
                description: text,
                color: 16761576
            });
            respond(packet.d, ``, embed).catch((err) => console.log(`Something went wrong while trying to execute a command: ${err}`));
        });
    }

});

validateToken(token).then(() => {
    client.login(token).catch((err) => console.error(`Something went wrong while logging in:\n${err}`));
}).catch((err) => console.error(err));