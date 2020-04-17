module.exports = {
    name: 'help',
    description: 'Shows the info about the bot',
    execute(message, args) {
        let helpembed = new Discord.RichEmbed({
            title: "**Hewwo! I'm uwutranslator!**",
            description: "I uwu-ify messages. @mention me and type any text for me to translate! >wO\n\nExample: **@uwutranslator Hello world! I am alive!**\n"
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
        helpembed.addField(
            "Legal Mumbo Jumbo",
            "[Terms of Service](https://github.com/TheOnlyGhostwolf/uwutranslator/wiki/Terms-of-Service) | [Privacy Policy](https://github.com/TheOnlyGhostwolf/uwutranslator/wiki/Privacy-Policy)",
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
        message.channel.send(helpembed)
    },
};