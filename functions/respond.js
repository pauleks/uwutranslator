const axios = require("axios");

module.exports = (client, message, content, additional = null) => {
    return new Promise(function (resolve, reject) {
        var data = {
            type: 4,
            data: {
                content: null,
                embeds: [],
                flags: 64
            }
        };

        data.data.content = content || '';
        if (additional) {
            delete data.data.flags;
            additional = additional.toJSON();
            data.data.embeds.push(additional);
        }

        axios({
            method: `POST`,
            headers: {
                Authorization: `Bot ${client.token}`,
                "Content-Type": "application/json",
                Accept: "*/*",
            },
            url: `https://discord.com/api/v8/interactions/${message.id}/${message.token}/callback`,
            data: data
        }).then(() => resolve()).catch((err) => reject(err));
    });
};