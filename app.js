const { App } = require('@slack/bolt');
const { getLogger } = require('@slack/web-api/dist/logger');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

let messageTS = 0;

app.command('/sendmessage', async ({ command, ack, client }) => {
  // Acknowledge command request
  await ack();

  try{
    const result = await client.chat.postMessage({
      channel: command.text,
      text: "Slash Command Triggered!",
      blocks: [{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Push this button to open a modal!"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Open Modal",
            "emoji": true
          },
          "value": "modal_open_1",
          "action_id": "modal-button-click"
        }
      }]
    });

    console.log(result);
  }

  catch (error) {
    console.error(error);
  }

  
});

app.command('/sendmessage2', async ({ command, ack, client }) => {
  // Acknowledge command request
  await ack();

  try{
    const result = await client.chat.postMessage({
      channel: command.text,
      text: "Slash Command Triggered!",
      blocks: [{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Push this button to open a modal!"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Open Modal",
            "emoji": true
          },
          "value": "modal_open_2",
          "action_id": "open-modal-button"
        }
      }]
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
      channel: "U02K1UEUV9S",
      thread_ts: command.text,
      text: "Slash Command Threaded!"
    });

    console.log(result);
  }

  catch (error) {
    console.error(error);
  }
});

app.command('/buttontest', async ({ command, ack, client }) => {
  await ack();

  try{
    const result = await client.chat.postMessage({
      channel: "C02NCBQS1PV",
      text: "Slash Command Triggered!",
      blocks: [
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Test 1",
                "emoji": true
              },
              "value": "Test_1",
              "action_id": "actionTest-01"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Test 2",
                "emoji": true
              },
              "value": "Test_2",
              "action_id": "actionTest-02"
            }
          ]
        }
      ]
    });

    messageTS = result.ts;
    console.log(result);
  }

  catch (error) {
    console.error(error);
  }
});

app.action('actionTest-01', async ({ ack, body, client, logger }) => {
  await ack();

  try {

    const result = await client.chat.update({
      channel: "C02NCBQS1PV",
      ts: `${messageTS}`,
      blocks: [],
      text: "Slash Command Triggered"
    })

    console.log(messageTS)
  }

  catch (error) {
    console.log(error)
  }

  try {
    const result = await client.chat.postMessage({
      channel: "C02NCBQS1PV",
      text: "Slash Command Triggered!",
      blocks: [
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Test 3",
                "emoji": true
              },
              "value": "Test_3",
              "action_id": "actionTest-03"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Test 4",
                "emoji": true
              },
              "value": "Test_4",
              "action_id": "actionTest-04"
            }
          ]
        }
      ]
    });

    messageTS = result.ts;
    console.log(messageTS)
  }

  catch (error) {
    console.error(error);
  }

});

app.action('actionTest-02', async ({ ack, body, client, logger }) => {
  await ack();

  try {

    const result = await client.chat.update({
      channel: "C02NCBQS1PV",
      ts: `${messageTS}`,
      blocks: [],
      text: "Slash Command Triggered"
    })

    console.log(messageTS)
  }

  catch (error) {
    console.log(error)
  }

  try {
    const result = await client.chat.postMessage({
      channel: "C02NCBQS1PV",
      text: "Slash Command Triggered!",
      blocks: [
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Test 3",
                "emoji": true
              },
              "value": "Test_3",
              "action_id": "actionTest-03"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Test 4",
                "emoji": true
              },
              "value": "Test_4",
              "action_id": "actionTest-04"
            }
          ]
        }
      ]
    });
    
    messageTS = result.ts;
    console.log(messageTS)
  }

  catch (error) {
    console.error(error);
  }

});

app.action('actionTest-03', async ({ ack, body, client, logger }) => {
  await ack();

  try {

    const result = await client.chat.update({
      channel: "C02NCBQS1PV",
      ts: `${messageTS}`,
      blocks: [],
      text: "Slash Command Complete!"
    })

    console.log(messageTS)
  }

  catch (error) {
    console.log(error)
  }

});

app.action('actionTest-04', async ({ ack, body, client, logger }) => {
  await ack();

  try {

    const result = await client.chat.update({
      channel: "C02NCBQS1PV",
      ts: `${messageTS}`,
      blocks: [],
      text: "Slash Command Complete!"
    })

    console.log(messageTS)
  }

  catch (error) {
    console.log(error)
  }

});

app.action('modal-button-click', async ({ ack, body, client, logger }) => {
  await ack();

  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Button Clicked Modal'
        },
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Hello there! \n\nPlease select an option from the menu below:"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "static_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select an item",
                  "emoji": true
                },
                "options": [
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Item 1",
                      "emoji": true
                    },
                    "value": "value-1"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Item 2",
                      "emoji": true
                    },
                    "value": "value-2"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Item 3",
                      "emoji": true
                    },
                    "value": "value-3"
                  }
                ],
                "action_id": "modal-action-submit"
              }
            ]
          }
        ]
      }
    });

    logger.info(result);
  }

  catch (error) {
    logger.error(error);
  }
});

app.view('view_1', async ({ ack, body, logger }) => {
  ack();
});

app.action('open-modal-button', async ({ ack, body, client, logger }) => {
  await ack();

  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'view_2',
        title: {
          type: 'plain_text',
          text: 'Button Clicked Modal'
        },
        close: {
          type: "plain_text",
          text: "Nevermind"
        },
        submit: {
          type: "plain_text",
          text: "Submit"
        },
        notify_on_close: true,
        blocks: [
          {
            "type": "input",
            "element": {
              "type": "plain_text_input",
              "action_id": "plain_text_input-action"
            },
            "label": {
              "type": "plain_text",
              "text": "Enter Some Text:",
              "emoji": true
            }
          }
        ]
      }
      // trigger_id: body.trigger_id,
      // view: {
      //   type: 'modal',
      //   callback_id: 'view_1',
      //   title: {
      //     type: 'plain_text',
      //     text: 'Button Clicked Modal'
      //   },
      //   blocks: [
      //     {
      //       "type": "section",
      //       "text": {
      //         "type": "mrkdwn",
      //         "text": "Hello there! \n\nPlease select an option from the menu below:"
      //       }
      //     },
      //     {
      //       "type": "actions",
      //       "elements": [
      //         {
      //           "type": "static_select",
      //           "placeholder": {
      //             "type": "plain_text",
      //             "text": "Select an item",
      //             "emoji": true
      //           },
      //           "options": [
      //             {
      //               "text": {
      //                 "type": "plain_text",
      //                 "text": "Item 1",
      //                 "emoji": true
      //               },
      //               "value": "value-1"
      //             },
      //             {
      //               "text": {
      //                 "type": "plain_text",
      //                 "text": "Item 2",
      //                 "emoji": true
      //               },
      //               "value": "value-2"
      //             },
      //             {
      //               "text": {
      //                 "type": "plain_text",
      //                 "text": "Item 3",
      //                 "emoji": true
      //               },
      //               "value": "value-3"
      //             }
      //           ],
      //           "action_id": "modal-action-submit"
      //         }
      //       ]
      //     }
      //   ]
      // }
    });

    logger.info(result);
  }

  catch (error) {
    logger.error(error);
  }
});

app.view({ callback_id: 'view_2', type: 'view_closed' }, async ({ ack, body, client, logger }) => {
  ack();
  console.log("Your State: " + `${JSON.stringify(body.view.state.values)}`)
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();