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
const client = new Discord.Client();
const talkedRecently = new Set();
var Datastore = require("nedb"),
  blacklist = new Datastore({
    filename: ".data/datafile",
    autoload: true
  });
const clean = text => {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
};
const faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^", "✧w✧", "♥w♥", "(˘³˘)", "(。U⁄ ⁄ω⁄ ⁄ U。)", "(ᵘʷᵘ)", "(ᵕᴗ ᵕ⁎)", "uwU", "◔w◔", "⓪w⓪", "‿︵𝓇𝒶𝓌𝓇‿︵ ʘwʘ", "øwø", "ÓwÓ", "ÕwÕ", "@w@", "ᅌwᅌ", "ʘwʘ", "(✿◠‿◠)", "(●´ω｀●)", "(づ｡◕‿‿◕｡)づ", "≧◡≦", "(◡‿◡✿)", "(\*^ -^\*)", "(∪ ◡ ∪)", "(✿◠‿◠)", "╰(◡‿◡✿╰)", "(ﾉ◕ヮ◕)ﾉ\*:･ﾟ✧", "(￣ｰ￣)", "ヽ(゜∇゜)ノ", "(◕ω◕✿)", "(〃^∇^)ﾉ", "(\´｡• ᵕ •｡`)", "ヽ(>∀<☆)ノ", "ヽ(\*・ω・)ﾉ", "☆ ～('▽^人)", "(´ ω \`♡)", "(๑˃ᴗ˂)ﻭ", "( ´ ▽ \` ).｡ｏ♡", "╰(\*´︶`\*)╯♡", "ヽ(♡‿♡)ノ", "( ´ ∀ `)ノ～ ♡", "♡ ～('▽^人)", "( ´ ▽ \` ).｡ｏ♡", "Σ>―(〃°ω°〃)♡→", "(´,,•ω•,,)♡", "( ˘⌣˘)♡(˘⌣˘ )", "(„ಡωಡ„)", "(ノ\*°▽°\*)", "(｡･ω･｡)ﾉ♡", "(=^･ω･^=)", "╰(◡‿◡✿╰)", "(´･ω･\`)", "(=^-ω-^=)", "ヽ(=^･ω･^=)丿", "ʚ(\*´꒳\`\*)ɞ", "(´♡ω♡\`)", "★~(◡﹏◕✿)", "★~(◡ω◕✿)", "★~(◡﹏◡✿)", "★~(◠︿⊙✿)", "｡◕ ‿ ◕｡", "(◠︿◠✿)"];
const statuses = ["with uwu faces", 'a game called "OwO what\'s this?!?"', "*notices shitpost* uwu what's this?", "@mention me to uwu-ify messages", "with s-senpai~~", "Coded by code monkeys at uwu headquawews", "Hewwo dewr~!", "Stay safe! uwu", "Stay home!", "Remember to wash your hands!"];

function uwuify(str) {
  str = str.replace(/god/g, "gawd");
  str = str.replace(/God/g, "Gawd");
  str = str.replace(/father/gi, "daddy");
  str = str.replace(/papa/gi, "papi");
  str = str.replace(/mom/g, "mommy");
  str = str.replace(/mother/g, "mommy");
  str = str.replace(/(?:r|l)/g, "w");
  str = str.replace(/(?:R|L)/g, "W");
  str = str.replace(/n([aeiou])/g, "ny$1");
  str = str.replace(/N([aeiou])/g, "Ny$1");
  str = str.replace(/N([AEIOU])/g, "NY$1");
  str = str.replace(/ove/g, "uv");
  str = str + "\~\~";
  return str;
}

function errored(error, message) {
  if (error.code == 50013) message.channel.send(":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Embed Links** in this server.").catch(() => {
    message.author.send(":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Send Messages** in that server.").catch(() => {
      axios.post(webhook, {
        content: ":x: I tried sending an error DM to " + message.author.tag + ", but they have their DMs closed :|"
      });
    })
  })
  else {
    const errorid = makeid(6);
    axios.post(errorwebhook, {
      content: "`" + errorid + "` - " + message.author.tag + " - ID: " + message.author.id + ":\n```" + error + "```"
    });
    message.channel.send(":warning: Something went wrong while executing your command. If you need more help, you can join my support server @ <https://discord.gg/eq6kwNJ> and give this code for error troubleshooting: `" + errorid + "`").catch(() => {
      message.author.send(":warning: Something went wrong while executing your command. If you need more help, you can join my support server @ <https://discord.gg/eq6kwNJ> and give this code for error troubleshooting: `" + errorid + "`").catch(() => {
        axios.post(errorwebhook, {
          content: ":x: I tried sending a DM to " + message.author.tag + "about the error `" + errorid + "` but they have their DMs closed :|"
        });
      })
    })
  }
};
async function isBlacklisted(message) {
  await blacklist.find({
    userid: message.author.id
  }, function(err, result) {
    if (result[0] != undefined) {
      message.react("🚫");
      message.author.send("🚫 You have been blacklisted from using the bot for not following out Terms of Service. If you would like to appeal, please join our server @ <https://discord.gg/eq6kwNJ> and head ovet to #support to appeal.\n\nYou can find our Terms of Service here: https://github.com/TheOnlyGhostwolf/uwutranslator/wiki/Terms-of-Service");
      return true;
    }
    if (err) {
      console.log("Couldn't check if the user is blacklisted: " + err)
      return false;
    };
  });
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function statuschange() {
  client.user.setActivity(`${statuses[Math.floor(Math.random() * statuses.length)]} | @${
      client.user.username
    } --help`);
}
process.on("unhandledRejection", error => {
  console.error("Unhandled promise rejection:", error);
});
client.on("ready", () => {
  axios.post(webhook, {
    content: "Logged in as " + client.user.tag + ". I can see " + client.users.cache.size + " users, in " + client.channels.cache.size + " channels of " + client.guilds.cache.size + " guilds."
  });
  console.log(`Logged in as ${client.user.tag}. I can see ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  setInterval(statuschange, 120000);
});
client.on("guildCreate", guild => {
  axios.post(webhook, {
    content: ":green_square: New guild joined: " + guild.name + " (id: " + guild.id + "). This guild has " + guild.memberCount + " members!"
  });
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
client.on("guildDelete", guild => {
  axios.post(webhook, {
    content: ":red_square: I have been removed from: " + guild.name + " (id: " + guild.id + ")"
  });
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
client.on("message", async message => {
  if (message.author.bot || message.channel.type != "text") return;
  const messagebutstring = message.content;
  if (messagebutstring.startsWith("<@!" + client.user.id + ">") || messagebutstring.startsWith("<@" + client.user.id + ">")) {
    if (isBlacklisted(message) == true) {
      return;
    };
    var args = message.content.slice(22).trim().split(/ +/g);
    var command = args.shift();
    var str = command + " " + args.join(" ");
    axios.post(webhook, {
      content: ":robot: Command ran by " + message.author.username + "#" + message.author.discriminator + " (ID: `" + message.author.id + "`) in " + message.guild.name + " (Guild ID: `" + message.guild.id + "`): " + str
    });
    if (talkedRecently.has(message.author.id)) {
      message.react('⏱️');
      return;
    } else {
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 3000);
      if (command == "" || command == " ") {
        message.channel.send("Hewwo <@" + message.author.id + ">! (^w^)/\n\nI'm **" + client.user.username + "**, I uwu-ify messages. If you want to check how to use me, use **<@!" + client.user.id + "> --help** command :3").catch(error => errored(error, message));
      } else if (command === "--ping") {
        const m = await message.channel.send("Ping?").catch(error => errored(error, message));
        m.edit(`Pong! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(
            client.ping
          )}ms`).catch(error => errored(error, message));
      } else if (command === "--shutdown") {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
          message.channel.send(":warning: Only the bot developer can use this command");
          return;
        }
        message.channel.send("I-I don't feel so good... qwq | Shutting down...").then(m => {
          client.destroy();
          process.exit(1);
        });
      } else if (command == "--blacklist") {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
          message.channel.send(":warning: Only the bot developer can use this command");
          return;
        }
        blacklist.find({
          userid: args
        }, function(err, result) {
          if (result[0] == undefined) {
            blacklist.insert({
              userid: args
            }, function(err, userAdded) {
              if (err) {
                console.log("There's a problem with the database: ", err);
                message.channel.send(
                  ":x: There was an error while trying to add the user to the blacklist. Please try again later."
                );
              } else if (userAdded) {
                console.log(
                  "New user with ID " + args + " inserted to the blacklist"
                );
                message.channel.send(
                  "New user with ID " + args + " inserted to the blacklist"
                );
              }
            });
          } else {
            blacklist.remove({
              userid: args
            }, {
              multi: true
            }, function(err) {
              if (err) {
                console.log("There's a problem with the database: ", err);
                message.channel.send(
                  ":x: There was an error while trying to remove the user from the blacklist. Please try again later."
                );
              } else {
                console.log("User " + args + " removed from the blacklist");
                message.channel.send(
                  "User " + args + " removed from the blacklist"
                );
              }
            });
          }
        })
      } else if (command === "--eval") {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
          message.channel.send(":warning: Only the bot developer can use this command");
          return;
        }
        try {
          const code = args.join(" ");
          let evaled = eval(code);
          if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
          message.channel.send(clean(evaled), {
            code: "xl"
          }).catch(error => errored(error, message));
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      } else if (command === "--help") {
        var helpembed = new Discord.MessageEmbed({
            title: "**Hewwo! I'm uwutranslator!**",
            description: "I uwu-ify messages. @mention me and type any text for me to translate! >wO\n\nExample: **@uwutranslator Hello world! I am alive!**\n"
          })
          .setFooter(message.author.displayAvatarURL, message.author.username + "#" + message.author.discriminator)
          .setThumbnail("https://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif")
          .addField("Developer", "[Ghostwolf#6735](https://ghostwolf.me)", true)
          .addField("Add me to your server!", "[Click here](https://discordapp.com/oauth2/authorize?client_id=635507578008240165&permissions=84992&scope=bot)", true)
          .addField("Special thanks", "Tea, Elias, Dragonic, Pretzel", true)
          .addField("Website", "[Click here](https://uwutranslator.ghostwolf.me)", true)
          .addField("Support the developer!", "[Buy me a coffee!](https://ko-fi.com/ghostwolf)", true)
          .addField("Vote for me on DBL!", "[Click here](https://top.gg/bot/635507578008240165/vote)", true)
          .addField("Legal Mumbo Jumbo", "[Terms of Service](https://github.com/TheOnlyGhostwolf/uwutranslator/wiki/Terms-of-Service) | [Privacy Policy](https://github.com/TheOnlyGhostwolf/uwutranslator/wiki/Privacy-Policy)", true)
          .setColor(16761576)
          .setTimestamp(message.createdAt)
          .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
        message.channel.send(helpembed).catch(error => errored(error, message));
      } else if (str.includes("discord.gg") || str.includes("discordapp.com/invite")) {
        message.reply("don't send invite links using me >:(").catch(error => errored(error, message));
      } else {
        if (str.slice(-1) == " ") str = str.substring(0, str.length - 1);
        var uwuifiedstr = uwuify(str);
        var firstletter = uwuifiedstr.substring(0, 1);
        uwuifiedstr = firstletter + "-" + uwuifiedstr + " " + faces[Math.floor(Math.random() * faces.length)] + " ";
        let uwuembed = new Discord.MessageEmbed({
          description: uwuifiedstr
        });
        uwuembed.setColor(16761576);
        uwuembed.setFooter("Requested by " + message.author.tag + " | @mention me to uwu-ify messages", message.author.avatarURL());
        message.channel.send(uwuembed).catch(error => errored(error, message));
      }
    }
  }
});
client.login(token);
/*
// REMOVE THIS IF YOUR BOT ISN'T LISTED ON TOP.GG
const DBL = require("dblapi.js");
const dbl = new DBL(dbltoken, client);
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