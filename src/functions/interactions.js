// It is not expected for the bot to take more than 3 seconds to respond

const { token } = require("../config.json");
const axios = require("axios");

module.exports.respond = (interaction, content, embed = null, button = null) => {
    return new Promise((resolve, reject) => {
        var data = {
            type: 4,
            data: {
                content: content || '',
                embeds: [],
                components: [{
                    type: 1,
                    components: []
                }]
            }
        }

        if (embed) {
            embed = embed.toJSON();
            data.data.embeds.push(embed);
        } else delete data.data.embeds;

        if (button) {
            data.data.components[0].components.push(button);
        } else delete data.data.components;

        axios.post(`https://discord.com/api/v9/interactions/${interaction.id}/${interaction.token}/callback`, 
            JSON.stringify(data), 
            { headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json", Accept: "*/*" }
        }).then(() => resolve()).catch((err) => reject(err));
    });
}