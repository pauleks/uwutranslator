var uwuify = {
    custom: function(str, message, data, Discord) {
        var datavar = Object.values(data);
        if (str.slice(-1) == " ") str = str.substring(0, str.length - 1);

        for (var loop = 0; loop < datavar[1].length; loop++) {
            for (var j = 0; j < datavar[1][loop][0].length; j++) {
                while (str.includes(datavar[1][loop][0][j])) {
                    str = str.replace(datavar[1][loop][0][j], datavar[1][loop][1]);
                }
            }
        }

        for (var loop = 0; loop < datavar[2].length; loop++) {
            for (var j = 0; j < datavar[2][loop][0].length; j++) {
                while (str.includes(datavar[2][loop][0][j])) {
                    str = str.replace(datavar[2][loop][0][j], datavar[2][loop][1][Math.floor(Math.random() * datavar[2][loop][1].length)]);
                }
            }
        }

        str = str.replace(/(?:r|l)/g, "w");
        str = str.replace(/(?:R|L)/g, "W");
        str = str.replace(/n([aeiou])/g, "ny$1");
        str = str.replace(/N([aeiou])/g, "Ny$1");
        str = str.replace(/N([AEIOU])/g, "NY$1");
        str = str.replace(/ove/g, "uv");

        if (str[0].match(/[a-z]/i))
            str = str[0] + "-" + str;

        if (str[str.length - 1].match(/[a-z]/i))
            str = str + "\~\~";

        let uwuembed = new Discord.MessageEmbed({
            description: str
        });

        uwuembed.setColor(16761576);
        uwuembed.setFooter("Requested by " + message.author.tag + " | @mention me to uwu-ify messages", message.author.avatarURL());
        message.channel.send(uwuembed);
    }
}

module.exports = uwuify;