<div align="center">
    <img src="https://i.imgur.com/FspqOKi.png">

"It just works" - Ghostwolf

</div>

---

<h2 align="center">uwutranslator</h2>

uwutranslator is an open-source bot, which purpose is to bring more fun to your server by "translating" messages and turning them into so called "uwu styled" messages.

<h3>Table of Contents</h3>

- [Usage](#usage)
- [Contributing](#contributing)
- [Self-hosting](#self-hosting)
- [License](#license)

<h2 align="center">Usage</h2>

One of the most important features of uwutranslator is that it doesn't have any prefix - instead, it responds to mentions. So, if you want to interact with uwutranslator, you'll need to mention it. The mention must be in the front of the message in order for the bot to respond.

uwutranslator has a few commands, which are listed below:
- `--help` - displays the help message
- `--ping` - measures the time how long does it take for the bot to interact with Discord
- `--eval` - evals the provided message ![dev-only-badge]
- `--shutdown` - completely shutdowns the bot ![dev-only-badge]

If the bot is mentioned and no other arguments are provided, the bot will reply to user with this message:
> Hewwo **[user]**! (^w^)/
I'm [**bot**], I uwu-ify messages. If you want to check how to use me, use `[bot] --help` command :3

If the bot is mentioned and any other arguments are provided which are not listed here, the bot will "uwu-ify" the message.


<h2 align="center">Contributing</h2>

No contributions are welcomed anymore on this repository. You are free to fork this repo and add your own features there.


<h2 align="center">Self-hosting</h2>

### You are allowed to self-host the bot, but remember to accommodate with the license. 

#### Step 0
[Download and install Node.js to your machine if you haven't done it yet](https://nodejs.org/en/download/). To check the version of Node.js, run:
```
$ node -v
```
This should output the version you're currently using, for example:
```
v12.16.1
```

#### Step 1
Navigate to the bot's folder and install the required dependencies:
```
$ npm i
```

#### Step 2
Modify `.env.example` - add required values where needed:
- `TOKEN` - your bot's token, which can be found in [Discord Developers page](https://discord.com/developers)
- `DEVELOPER` - your user ID

Rename `.env.example` to `.env` 

#### Step 3:
Run:
```
$ node index.js
```

If the console shows "Logged in as..." - congratulations! The bot is running. Enjoy! :sparkles:

<h2 align="center">License</h2>

[Licensed under GNU General Public License v3.0](https://github.com/TheOnlyGhostwolf/uwutranslator/blob/master/LICENSE)

[dev-only-badge]: https://img.shields.io/badge/DEVELOPER-only-f00.svg?longCache=true&style=flat-square
