var handling = { function(message_global, error, axios, webhook, errorwebhook) {
    var message = message_global;
        if (error.code == 50013) {
            message.channel.send(":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Embed Links** in this server.").catch(() => {
                message.author.send(":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Send Messages** in that server.").catch(() => {
                    axios.post(webhook, {
                        content: ":x: I tried sending an error DM to " + message.author.tag + ", but they have their DMs closed :|"
                    })
                })
            })
        } else {
            const errorid = makeid(7);
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
    }
};

function makeid (length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports = handling;