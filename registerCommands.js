const botToken = '';
const applicationId = '';

const https = require('https');

const data = new TextEncoder().encode(
  JSON.stringify([
    {
      name: 'uwuify',
      description: 'uwuifies the provided text~',
      options: [
        {
          type: 3,
          name: 'text',
          description: 'what text should I uwuify? owo',
          required: true,
        },
      ],
    },
    {
      name: 'invite',
      description: 'add me to your discord server~ uwu',
    },
  ]),
);

const options = {
  hostname: 'discord.com',
  path: `/api/v9/applications/${applicationId}/commands`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    Authorization: `Bot ${botToken}`,
  },
};

// eslint-disable-next-line consistent-return
const req = https.request(options, (res) => {
  if (res.statusCode === 200) return console.log('Commands were successfully registered! 🎉');

  res.on('data', (d) => console.log(`Something went wrong\n${res.statusCode} - ${d}`));
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
