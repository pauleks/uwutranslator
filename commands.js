var commands = {
    hello: function() {
        console.log("Hi");
    },
    ping: async function(message) {
    	console.log("Fuck yeah I'm here");
        const m = await message.channel.send("Ping?").catch(error => errored(error, message));
        m.edit(`Pong! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(
            client.ws.ping
          )}ms`).catch(error => errored(error, message));
    },
    shutdown: function(message, developer) {
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
    blacklist: function(message, developer) {
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
    eval: function(message, developer) {
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
    },
    help: function(message) {
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
    },
    error: function(error, message) {
        if (error.code == 50013) {
            message.channel.send(":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Embed Links** in this server.").catch(() => {
                message.author.send(":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Send Messages** in that server.").catch(() => {
                    axios.post(webhook, {
                        content: ":x: I tried sending an error DM to " + message.author.tag + ", but they have their DMs closed :|"
                    })
                })
            })
        } else {
            const errorid = makeid(6);
            axios.post(errorwebhook, {
                content: "`" + errorid + "` - " + message.author.tag + " - ID: " + message.author.id + ":\n```" + error + "```"
            });
            message.channel.send(":warning: Something went wrong while executing your command. If you need more help, you can join my support server @ <https://discord.gg/eq6kwNJ> and give this code for error troubleshooting: `" + errorid + "`").catch(() => {
                message.author.send(":warning: Something went wrong while executing your command. If you need more help, you can join my support server @ <https://discord.gg/eq6kwNJ> and give this code for error troubleshooting: `" + errorid + "`").catch(() => {
                    axios.post(errorwebhook, {
                        content: ":x: I tried sending a DM to " + message.author.tag + "about the error `" + errorid + "` but they have their DMs closed :|"
                    });
                });
            });
        }
    },
    makeid: function(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
};