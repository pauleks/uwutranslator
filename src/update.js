// This code is mostly focused on brand new bot accounts with no registered interactions.
// In many cases, this shouldn't hit the ratelimit.

console.log("All interactions will be updated! Give me a sec...");

const { default: axios } = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

const { token, public } = require("./config.json");
const { validateToken } = require("./functions/validations");

validateToken(token).catch((err) => {
    console.log(err);
    process.exit(1);
});

const data = {
    commands: [
        {
            name: "uwuify",
            description: "uwuifies your message!",
            options: [{
                type: 3,
                name: "message",
                description: "What text do you want to uwuify?",
                required: true
            }]
        },
        {
            name: "invite",
            description: "Add uwutranslator to your server."
        }
    ]
}

client.on("ready", () => {
    data.url = `https://discord.com/api/v9/applications/${client.user.id}/commands`;
    axios.get(data.url, { headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json", Accept: "*/*" } }).then((res) => {
        res.data.forEach((interaction) => {
            axios.delete(data.url+`/${interaction.id}`, { headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json", Accept: "*/*" } });
        });

        data.commands.forEach((interaction) => {
            if (interaction.name == "invite" && !public) return;
            axios.post(data.url, JSON.stringify(interaction), { headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json", Accept: "*/*" } })
        });

        client.destroy();
        console.log(`Successfully registered all interactions.\n\nCongrats! Next time, just use "npm run start" to launch the bot.`);
    });
});

client.login(token).catch((err) => console.error(err));