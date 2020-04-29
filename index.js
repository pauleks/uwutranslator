/*
    uwutranslator - Discord bot, which uwu-ifies your messages
    Copyright (C) 2020 Paulius (Ghostwolf) Gečas

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/
const Discord = require("discord.js");
const dotenv = require("dotenv").config();
const axios = require("axios");
const fs = require('fs');

const token = process.env.TOKEN;
const webhook = process.env.WEBHOOK;
const errorwebhook = process.env.ERRORWEBHOOK;
const dbltoken = process.env.DBLTOKEN;
const developer = process.env.DEVELOPER;

const client = new Discord.Client();

const talkedRecently = new Set();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const prefix = message => {
    return (message.content.startsWith("<@!" + client.user.id + ">") || message.content.startsWith("<@" + client.user.id + ">"))
}

function statuschange() {
    client.user.setActivity(
        `${statuses[Math.floor(Math.random() * statuses.length)]} | @${
      client.user.username
    } --help`
    );
}

process.on("unhandledRejection", error => {
    console.error("Unhandled promise rejection:", error);
});

client.on("ready", () => {
    axios.post(webhook, {
        content: "Bot has started, with " +
            client.users.cache.size +
            " users, in " +
            client.channels.cache.size +
            " channels of " +
            client.guilds.cache.size +
            " guilds."
    });
    console.log(
        `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
    );
    setInterval(statuschange, 120000);
});
client.on("guildCreate", guild => {
    axios.post(webhook, {
        content: ":green_square: New guild joined: " +
            guild.name +
            " (id: " +
            guild.id +
            "). This guild has " +
            guild.memberCount +
            " members!"
    });
    console.log(
        `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );
});
client.on("guildDelete", guild => {
    axios.post(webhook, {
        content: ":red_square: I have been removed from: " +
            guild.name +
            " (id: " +
            guild.id +
            ")"
    });
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
        if (message.author.bot || message.channel.type != "text" && !prefix) return;
        var argument = message.content
            .slice(22)
            .trim()
            .split(/ +/g);
        var command = argument.shift();
        var str = command + " " + argument.join(" ");
        axios.post(webhook, {
            content: ":robot: Command ran by " +
                message.author.username +
                "#" +
                message.author.discriminator +
                " (ID: `" +
                message.author.id +
                "`) in " +
                message.guild.name +
                " (Guild ID: `" +
                message.guild.id +
                "`): " +
                str
        });
        if (talkedRecently.has(message.author.id)) {
            message.channel.send(
                "Wait 5 seconds before using me again. - " + message.author
            );
            return;
          }
          try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            message.channel
              .send(clean(evaled), {
                code: "xl"
              })
              .catch(error => errored(error));
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
        } else if (command === "--help") {
          let helpembed = new Discord.RichEmbed({
            title: "**Hewwo! I'm uwutranslator!**",
            description:
              "I uwu-ify messages. @mention me and type any text for me to translate! >wO\n\nExample: **@uwutranslator Hello world! I am alive!**\n"
          });
          helpembed.setFooter(
            message.author.displayAvatarURL,
            message.author.username + "#" + message.author.discriminator
          );
          helpembed.setThumbnail(
            "https://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif"
          );
          helpembed.addField("Developer", "Ghostwolf#6735", true);
          helpembed.addField(
            "Add me to your server!",
            "[Click here](https://discordapp.com/oauth2/authorize?client_id=635507578008240165&permissions=84992&scope=bot)",
            true
          );
          helpembed.addField("Special thanks", "Tea, Elias, Dragonic, Pretzel", true);
          helpembed.addField(
            "Website",
            "[Click here](https://uwutranslator.ghostwolf.me)",
            true
          );
          helpembed.addField(
            "Support the developer!",
            "[Buy me a coffee!](https://ko-fi.com/ghostwolf)",
            true
          );
          helpembed.addField(
            "Vote for me on DBL!",
            "[Click here](https://top.gg/bot/635507578008240165/vote)",
            true
          );
          helpembed.setColor(16761576);
          helpembed.setTimestamp(message.createdAt);
          helpembed.setFooter(
            "Requested by " +
              message.author.username +
              "#" +
              message.author.discriminator,
            message.author.avatarURL
          );
          message.channel.send(helpembed).catch(error => errored(error));
          talkedRecently.add(message.author.id);
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
          }, 5000);
        } else if (
          str.includes("discord.gg") ||
          str.includes("discordapp.com/invite")
        ) {
          message
            .reply("don't send invite links using me >:(")
            .catch(error => errored(error));
        } else {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 5000);
            if (command == "" || command == " ") {
                message.channel
                    .send(
                        "Hewwo <@" +
                        message.author.id +
                        ">! (^w^)/\n\nI'm **" +
                        client.user.username +
                        "**, I uwu-ify messages. If you want to check how to use me, use **<@!" +
                        client.user.id +
                        "> --help** command :3"
                    )
                return;
            }

            if (command.startsWith("--")) {
                command.replace("--", "");;
                if (!client.commands.has(command) || command == "uwu-ify");
                    client.commands.get("uwu-ify").execute(str, args);
                return;
                try {
                    client.commands.get(command).execute(message, args);
                } catch (error) {
                    console.error(error);
                    message.reply('there was an error trying to execute that command!');
                }
            }
        }
    }
);
client.login(token);

/*const DBL = require("dblapi.js");
const dbl = new DBL(dbltoken, client);
// Optional events
dbl.on('posted', () => {
    axios.post(
        webhook, {
            content: ":thumbsup: Just posted my server count to DBL!"
        }
    );
})
dbl.on('error', e => {
    axios.post(
        webhook, {
            content: ":fire: Something went wrong while trying to post server count to DBL: " + e
        }
    );
})*/