var uwuify = {
    custom: function(str, message, data, Discord) {
        var datavar = Object.values(data);
        if (str.slice(-1) == " ") str = str.substring(0, str.length - 1);
        
        for (var loop = 0; loop < datavar[2].length; loop++) {
            for (var j = 0; j < datavar[2][loop][0].length; j++) {
                str = str.replace(datavar[2][loop][0][j], datavar[2][loop][1][Math.floor(Math.random() * datavar[2][loop][1].length)]);
            }
        }

        str = str.replace(/(?:r|l)/g, "w");
        str = str.replace(/(?:R|L)/g, "W");
        str = str.replace(/n([aeiou])/g, "ny$1");
        str = str.replace(/N([aeiou])/g, "Ny$1");
        str = str.replace(/N([AEIOU])/g, "NY$1");
        str = str.replace(/ove/g, "uv");
        str = str + "\~\~";

        //var firstletter = str.substring(0, 1);
        var uwuifiedstr = str;

        let uwuembed = new Discord.MessageEmbed({
            description: uwuifiedstr
        });
        uwuembed.setColor(16761576);
        uwuembed.setFooter("Requested by " + message.author.tag + " | @mention me to uwu-ify messages", message.author.avatarURL());
        message.channel.send(uwuembed);
    }
}

module.exports = uwuify;