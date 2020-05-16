var commands = {
    ping: async function(message, client) {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(
            client.ws.ping
          )}ms`);
    },
    shutdown: function(message, developer, client, process) {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
            message.channel.send(":warning: Only the bot developer can use this command");
            return;
        }
        message.channel.send("I-I don't feel so good... qwq | Shutting down...").then(m => {
            client.destroy();
            process.exit(1);
        });
    },
    blacklist: function(message, developer, args, blacklist) {
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
    },
    eval: function(message, developer, args, process, client) {
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
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
    help: function(message, Discord, client) {
        var helpembed = new Discord.MessageEmbed({
                title: "**Hewwo! I'm " + client.user.username + "!**",
                description: "I uwu-ify messages. @mention me and type any text for me to translate! >wO\n\nExample: **<@" + client.user.id + "> Please forgive me, father, for my sins!**\n"
            })
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
            .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, message.author.avatarURL())
        message.channel.send(helpembed)
    }
};

module.exports = commands;

const clean = text => {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
};
