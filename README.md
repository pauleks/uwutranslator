<div align="center">
    <img src="https://i.imgur.com/FspqOKi.png">

"I hate this" - everyone

[Add uwutranslator to your server](https://discord.com/api/oauth2/authorize?client_id=764520885323300875&scope=applications.commands)

</div>

---

<h2 align="center">uwutranslator</h2>

uwutranslator is a Discord integration, that "uwuifies" your messages.

<h3>Table of Contents</h3>

- [Usage](#usage)
- [Contributing](#contributing)
- [Self-hosting](#self-hosting)
- [License](#license)

<h2 align="center">Usage</h2>

This bot uses slash commands to function! Start typing `/` to see all available commands!

!["Slash commands menu"](https://i.kawaii.sh/~1hjdTY.png "Slash commands menu")

!["uwutranslator in action"](https://i.kawaii.sh/dqITADa.png "uwutranslator in action")

<h2 align="center">Contributing</h2>

Only meaningful pull requests will be accepted. 

<h2 align="center">Self-hosting</h2>

#### Step 1
[Download and install Node.js to your machine if you haven't done it yet](https://nodejs.org/en/download/). To check the version of Node.js, run:
```
$ node -v
```
This should output the version you're currently using, for example:
```
v12.16.1
```

#### Step 2
Modify `config.example.json` in `src` folder - add required values where needed:
- `token` - your bot's token, which can be found in [Discord Developers page](https://discord.com/developers)
- `public` - specifies if the bot should have `invite` command, that would let the others to easily add the bot to the other servers.

Rename `config.example.json` to `config.json` 

#### Step 3
Run the following command:
```
$ npm run setup
```
Everything will be done automatically!

#### Step 4
Next time when you'll try to launch the bot again, just use:
```
$ npm run start
```

<h2 align="center">License</h2>

[Licensed under GNU General Public License v3.0](https://github.com/TheOnlyGhostwolf/uwutranslator/blob/master/LICENSE)
