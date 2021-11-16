const { verifyRequest, respond, uwuify } = require('./functions');

// eslint-disable-next-line consistent-return
module.exports = async (req, res) => {
  if (!req.headers['x-signature-ed25519'] || !req.headers['x-signature-timestamp']) return res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  if (!await verifyRequest(req)) return res.status(401).send('');

  try {
    const interaction = req.body;

    if (interaction.type === 1) return res.status(200).send({ type: 1 });
    if (interaction.type === 2) {
      if (interaction.data.name === 'uwuify') return respond(interaction, res, { type: 4, data: { content: uwuify(interaction.data.options[0].value) } });
      if (interaction.data.name === 'invite') {
        return respond(interaction, res, {
          type: 4,
          data: {
            content: ':woozy_face: s-so you want to add me to your discord server?',
            components: [{
              type: 1,
              components: [{
                type: 2, style: 5, label: 'do it then!~~', url: `https://discord.com/oauth2/authorize?client_id=${process.env.appId}&scope=applications.commands`,
              }],
            }],
            flags: 64,
          },
        });
      }
    }
    return respond(interaction, res, { type: 4, data: { content: 'Unknown interaction. Please report it to the developer @ my bio', flags: 64 } });
  } catch (e) {
    res.status(500).send('An error has occured.');
    console.error(e);
  }
};
