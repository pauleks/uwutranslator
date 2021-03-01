const Discord = require("discord.js");
const respond = require("../functions/respond");
const faces = ["＾ω＾", "(≧◡≦)", "(≧∇≦)/", "ヾ(・ω・ｏ)"];

module.exports = (client, message) => {
    var str = message.data.options[0].value;

    str = str.replace(/(?:r|l)/g, "w");
    str = str.replace(/(?:R|L)/g, "W");
    str = str.replace(/n([aeiou])/g, "ny$1");
    str = str.replace(/N([aeiou])/g, "Ny$1");
    str = str.replace(/N([AEIOU])/g, "NY$1");
    str = str.replace(/ove/g, "uv");

    if (str[0].match(/[a-z]/i))
        str = str[0] + "-" + str;

    if (str[str.length - 1].match(/[a-z]/i))
        str += "\~\~";
    
    str += ` ${faces[Math.floor(Math.random() * faces.length)]}`;

    const embed = new Discord.MessageEmbed()
        .setColor(16761576)
        .setDescription(str);

    respond(client, message, '', embed);
}