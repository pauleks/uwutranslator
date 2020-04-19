module.exports = {
    name: 'uwu-ify',
    description: 'Uwu-ifies your message!',
    execute(str, args) {
        str = command + " " + args.join(" ");
            
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
            str = str + "~~";
            return str;
        }

        function isFirstletteraLetter(firstletter) {
            return firstletter.match(/[a-z]/i);
        }

        if (
            str.includes("discord.gg") ||
             str.includes("discordapp.com/invite")
        ) {
            message
                .reply("don't send invite links using me >:(")
        } else {
            if (str.slice(-1) == " ") str = str.substring(0, str.length - 1);
            var uwuifiedstr = uwuify(str);
            var firstletter = uwuifiedstr.substring(0, 1);

            uwuifiedstr =
                uwuifiedstr +
                " " +
                faces[Math.floor(Math.random() * faces.length)];
            if (isFirstletteraLetter(firstletter) !== null) {
                uwuifiedstr = firstletter + "-" + uwuifiedstr;
            }
            let uwuembed = new Discord.RichEmbed({
                description: uwuifiedstr
            });
            uwuembed.setColor(16761576);
            uwuembed.setFooter(
                "Requested by " +
                message.author.tag +
                " | @mention me to uwu-ify messages",
                message.author.avatarURL
            );
            message.channel.send(uwuembed)
        }
    },
};
