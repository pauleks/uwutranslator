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
const token = process.env.TOKEN;
const webhook = process.env.WEBHOOK;
const errorwebhook = process.env.ERRORWEBHOOK;
const dbltoken = process.env.DBLTOKEN;
const developer = process.env.DEVELOPER;
var message_global;

const client = new Discord.Client();
const talkedRecently = new Set();

var misc = require('./cmds/commands.js');
var data = require('./cmds/data.js');
var uwuifying = require('./cmds/uwuify.js');
var errors = require('./cmds/error.js');


console.log("\n██╗░░░██╗░██╗░░░░░░░██╗██╗░░░██╗████████╗██████╗░░█████╗░███╗░░██╗░██████╗██╗░░░░░░█████╗░████████╗░█████╗░██████╗░\n██║░░░██║░██║░░██╗░░██║██║░░░██║╚══██╔══╝██╔══██╗██╔══██╗████╗░██║██╔════╝██║░░░░░██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗\n██║░░░██║░╚██╗████╗██╔╝██║░░░██║░░░██║░░░██████╔╝███████║██╔██╗██║╚█████╗░██║░░░░░███████║░░░██║░░░██║░░██║██████╔╝\n██║░░░██║░░████╔═████║░██║░░░██║░░░██║░░░██╔══██╗██╔══██║██║╚████║░╚═══██╗██║░░░░░██╔══██║░░░██║░░░██║░░██║██╔══██╗\n╚██████╔╝░░╚██╔╝░╚██╔╝░╚██████╔╝░░░██║░░░██║░░██║██║░░██║██║░╚███║██████╔╝███████╗██║░░██║░░░██║░░░╚█████╔╝██║░░██║\n░╚═════╝░░░░╚═╝░░░╚═╝░░░╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝\n");

function statuschange() {
    client.user.setActivity(`${data.statuses[Math.floor(Math.random() * data.statuses.length)]} | @${
      client.user.username
    } --help`);
}

process.on("unhandledRejection", error => {
    console.error("Unhandled promise rejection:", error);
    errors.function(message_global, error, axios, webhook, errorwebhook);
});

client.on("ready", () => {
    console.log('\x1b[32m%s\x1b[0m', `Logged in as ${client.user.tag}. I can see ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    setInterval(statuschange, 120000);
});
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
client.on("message", async message => {
    message_global = message;
    if (message.author.bot || message.channel.type != "text") return;
    let isPrefix = message.content;
    if (isPrefix.startsWith("<@!" + client.user.id + ">") || isPrefix.startsWith("<@" + client.user.id + ">")) {

        var args = message.content.slice(22).trim().split(/ +/g);
        var command = args.shift();
        var str = command + " " + args.join(" ");

        console.log('\x1b[33m%s\x1b[0m', `Command ran by ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id}) in ${message.guild.name} (Guild ID: ${message.guild.id}): ${str}`);

        if (talkedRecently.has(message.author.id)) {
            message.react('⏱️');
            return;
        } else {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 3000);
            if (command == "" || command == " ") {
                message.channel.send(`Hewwo <@${message.author.id}>! (^w^)/\n\nI'm **${client.user.username}**, I uwu-ify messages. If you want to check how to use me, use \`@${client.user.username} --help\` command :3`);
            } else if (command === "--ping") {
                misc.ping(message, client);
            } else if (command === "--shutdown") {
                misc.shutdown(message, developer, client, process);
            } else if (command == "--blacklist") {
                misc.blacklist(message, developer, args, blacklist);
            } else if (command === "--eval") {
                misc.eval(message, developer, args, process, client);
            } else if (command === "--help") {
                misc.help(message, Discord, client);
            } else if (str.includes("discord.gg") || str.includes("discordapp.com/invite") || str.includes("discord.com/invite")) {
                message.reply(`:rage: Don't send invite links using me, ${message.author.mention}`);
            } else {
                uwuifying.custom(str, message, data, Discord);
            }
        }
    }
});
client.login(token);