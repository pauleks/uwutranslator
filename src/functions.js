const nacl = require('tweetnacl');
const fetch = require('node-fetch');

module.exports.verifyRequest = (req) => {
  try {
    const PUBLIC_KEY = process.env.publicKey;
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    const body = JSON.stringify(req.body);

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex'),
    );

    return isVerified;
  } catch {
    return false;
  }
};

module.exports.respond = (interaction, res, data) => {
  fetch(`https://discord.com/api/interactions/${interaction.id}/${interaction.token}/callback`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(data).length,
      Authorization: `Bot ${process.env.botToken}`,
      'User-Agent': 'DiscordBot/uwutranslator',
    },
  }).then(() => res.status(200).send('Ok!')).catch(console.error);
};

const data = {
  faces: ['＾ω＾', '(≧◡≦)', '(≧∇≦)/', 'ヾ(・ω・ｏ)', ':3', 'OwO', 'UwU', 'uwu', 'owo', 'qwq'],
  replacements: [
    { toReplace: /(?:r|l)/g, with: 'w' },
    { toReplace: /n([aeiou])/g, with: 'ny$1' },
    { toReplace: /ove/g, with: 'uv' },
    { toReplace: /ame/g, with: 'ayme' },
  ],
};

module.exports.uwuify = (text) => {
  text = text.toLowerCase();

  data.replacements.forEach((letter) => {
    text = text.replace(letter.toReplace, letter.with);
  });

  if (text[0].match(/[a-z]/i)) text = `${text[0]}-${text}`;
  // eslint-disable-next-line no-useless-escape
  if (text[text.length - 1].match(/[a-z]/i)) text += '\~\~';
  text += ` ${data.faces[Math.floor(Math.random() * data.faces.length)]}`;

  return text;
};
