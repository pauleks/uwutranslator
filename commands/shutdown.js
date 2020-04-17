module.exports = {
    name: 'shutdown',
    description: 'Shutdowns the bot - DEVELOPER only',
    execute(message, args) {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
            message.channel.send(
                ":warning: Only the bot developer can use this command"
            );
            return;
        }
        message.channel
            .send("I-I don't feel so good... qwq | Shutting down...")
            .then(m => {
                client.destroy();
                process.exit(1);
            });
    },
};