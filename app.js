const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/sendmessage', async ({ command, ack, client }) => {
  // Acknowledge command request
  await ack();

  try{
    const result = await client.chat.postMessage({
      channel: command.text,
      text: "Slash Command Triggered!"
    });

    console.log(result);
  }

  catch (error) {
    console.error(error);
  }

  
});

app.command('/sendthread', async ({ command, ack, client }) => {
  await ack();

  try{
    const result = await client.chat.postMessage({
      channel: U02K1UEUV9S,
      thread_ts: command.text,
      text: "Slash Command Threaded!"
    });

    console.log(result);
  }

  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();