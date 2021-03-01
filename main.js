const Discord = require("discord.js");
const chalk = require("chalk");
const axios = require("axios");

const client = new Discord.Client();
const { token } = require("./config.json");

const uwuify = require("./commands/uwuify");
const invite = require("./commands/invite");

const prepareInteractions = (client) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://discord.com/api/v8/applications/${client.user.id}/commands`, { headers: { 'Authorization': `Bot ${token}` } }).then((res) => {
            if (res.data.length == 0) {
                const data = [
                    {
                        name: "uwuify",
                        description: "uwuify text!",
                        options: [
                            {
                                type: 3,
                                name: "text",
                                description: "Text to uwuify... owo",
                                required: true
                            }
                        ]
                    },
                    {
                        name: "invite",
                        description: "Add me to your server!",
                    }
                ];

                data.forEach((command) => {
                    axios({
                        method: `POST`,
                        headers: {
                            Authorization: `Bot ${token}`,
                            "Content-Type": "application/json",
                            Accept: "*/*",
                        },
                        url: `https://discord.com/api/v8/applications/${client.user.id}/commands`,
                        data: JSON.stringify(command)
                    }).then(() => {
                        console.log(chalk`{green Registered} {cyan /${command.name}}`);
                    }).catch((err) => reject(err.response.data.message));
                });

                resolve(1);
            } else resolve(0);
        }).catch((err) => reject(err));
    });
}

client.on(`ready`, () => {
    prepareInteractions(client).then((result) => {
        if (result == 1) console.log(chalk`\n{yellow Finished some preparations!}\n`);
        
        console.log(chalk`\n\n{magenta ~~ uwutranslator ~~}\n\nAdd {magenta uwutranslator} to your server using this link: {cyan https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands}`);
    }).catch((err) => console.log(chalk`{red Something went wrong:}\n` + err));
});

client.on(`raw`, (packet) => {
    if (packet.t === "INTERACTION_CREATE") {
        if (packet.d.data.name == "uwuify") uwuify(client, packet.d);
        if (packet.d.data.name == "invite") invite(client, packet.d);
    }
});

if (!token || token == "YOUR_TOKEN_HERE") {
    console.log(chalk`{red Token wasn't provided! Exiting!}`);
    process.exit(1);
} else {
    client.login(token).catch((err) => {
        console.log(chalk`{red Something went wrong while trying to login:}\n` + err);
        process.exit(1);
    });
}