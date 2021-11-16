# uwutranslator but serverless (for Vercel)

Small code rewrite for serverless ([Vercel](https://vercel.com/)) platform. 

## Setup

Click the following button to instantly create a project on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TheOnlyGhostwolf/uwutranslator/tree/serverless&env=publicKey,botToken,appId)

Fill in the required environment variables:
- ` appId ` - application's ID, which you can find under "General Information" tab
- ` publicKey ` - application's public key, which you can find under "General Information" tab
- ` botToken ` - application's bot token, which you can find under "Bot" tab (you'll need to create a bot user)

After the bot is deployed, copy the URL from "Domains" section in the dashboard.

![Tutorial image](https://i.kawaii.sh/iUsrCw_.png)

Go to your application's page on Discord, paste the copied domain to "Interactions Endpoint URL" field and save the changes.

![Tutorial Image #2](https://i.kawaii.sh/3YCH7mS.png)

If you're setting up the bot for the first time ever, please run ` registerCommands.js ` file in some way lol.

🎉 The bot is now alive! Enjoy!