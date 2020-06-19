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
        message.channel.send("I-I don't feel so good... qwq (Shutting down...)").then(m => {
            console.log('\x1b[31m%s\x1b[0m', `The shutdown command was executed by the developer ${message.author.tag}, the bot is shutting down.`)
            client.destroy();
            process.exit(1);
        });
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
                title: `**Hewwo! I'm ${client.user.username}!**`,
                description: `I uwu-ify messages. @mention me and type any text for me to translate! >wO\n\nExample: **<@${client.user.id}> Please forgive me, father, for my sins!**`
            })
            .setThumbnail("https://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif")
            .addField("Original developer", "[Ghostwolf](https://ghostwolf.me)", true)
            .addField("Original special thanks", "Tea, Elias, Dragonic, Pretzel - for letting the original uwutranslator to take off!", true)
            .addField("Support the original developer!", "[Buy me a coffee!](https://ko-fi.com/ghostwolf)", true)
            .setColor(16761576)
            .setTimestamp(message.createdAt)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        message.channel.send(helpembed)
    }
};

module.exports = commands;

function clean(text) {
    if (typeof text === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}