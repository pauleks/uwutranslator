var uwuify = {
    custom: function(str, message) {
        if (str.slice(-1) == " ") str = str.substring(0, str.length - 1);

        str = str.replace(/(?:r|l)/g, "w");
        str = str.replace(/(?:R|L)/g, "W");
        str = str.replace(/n([aeiou])/g, "ny$1");
        str = str.replace(/N([aeiou])/g, "Ny$1");
        str = str.replace(/N([AEIOU])/g, "NY$1");
        str = str.replace(/ove/g, "uv");
        str = str + "\~\~";

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