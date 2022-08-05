const { App, WorkflowStep, subtype } = require('@slack/bolt');
const { getLogger } = require('@slack/web-api/dist/logger');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

//#region Massive Block
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
  console.log(await ack());

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
              "text": "Hello there <@U02K1UEUV9S> TEST! \n\nPlease select an option from the menu below:"
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
          },
          {
            "type": "image",
            "image_url": "https://slack-files.com/T1DD3JH3K-F03K5UJMXFH-081abbb18e",
            "alt_text": "inspiration"
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

app.view('view_1', async ({ ack}) => {
  await ack();
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
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Hello there <@U02K1UEUV9S>! \n\nPlease select an option from the menu below:"
            }
          },
          {
            "type": "image",
            "image_url": "https://files.slack.com/files-pri/T1DD3JH3K-F03KE320EK0/pexels-christian-heitz-842711.jpg?pub_secret=6666b11f23",
            "alt_text": "inspiration"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Test block with users select"
            },
            "accessory": {
              "type": "users_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Select a user",
                "emoji": true
              },
              "action_id": "users_select-action"
            }
          },
          {
            "type": "input",
            "element": {
              "type": "plain_text_input",
              "action_id": "input_action",
              "dispatch_action_config": {
                "trigger_actions_on": ["on_character_entered"]
              }
            },
            "label": {
              "type": "plain_text",
              "text": "Text Input",
              "emoji": true
            }
          }
        ]
        // blocks: [
        //   {
        //     "type": "input",
        //     "element": {
        //       "type": "plain_text_input",
        //       "action_id": "plain_text_input-action"
        //     },
        //     "label": {
        //       "type": "plain_text",
        //       "text": "Enter Some Text:",
        //       "emoji": true
        //     }
        //   }
        // ]
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

// User select Action listener for open-modal-button
app.action('input_action', async ({ ack, body, client, logger }) => {
  console.log("Text input action event received")
  await ack();
  console.log("Text input ack");
  // Update the message to reflect the action
  try {
    // Call views.update with the built-in client
    const result = await client.views.update({
      // Pass the view_id
      view_id: body.view.id,
      // Pass the current hash to avoid race conditions
      hash: body.view.hash,
      // View payload with updated blocks
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_2',
        title: {
          type: 'plain_text',
          text: 'Updated modal'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: '<@U02K1UEUV9S> updated the modal!'
            }
          },
          {
            type: 'image',
            image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
            alt_text: 'Yay! The modal was updated'
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

app.view({ callback_id: 'view_2', type: 'view_closed' }, async ({ ack, body, client, logger }) => {
  ack();
  console.log("Your State: " + `${JSON.stringify(body.view.state.values)}`)
});

// Message filtering for message event listener

async function newMessages({ message, next }) {
  if (!message.subtype || message.subtype == 'message_replied') {
    await next();
  }
}

app.message(newMessages, async ({message, client, logger}) => {
  console.log('Message reply received' + '\nmessage_ts: ' + message.ts + '\nmessage_thread_ts: ' + message.thread_ts);
  try {
    // Call chat.scheduleMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: message.channel,
      thread_ts: message.thread_ts,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Testing a modal button on iPhone"
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Open Form",
              "emoji": true
            },
            "value": "form_iPhone_opened",
            "action_id": "open-modal-button"
          }
        }
      ]
    });
  }
  catch (error) {
    logger.error(error);
  }
});

// Create a new WorkflowStep instance
const ws = new WorkflowStep('add_task', {
  edit: async ({ ack, step, configure }) => {
    console.log(`ack start`);
    await ack();
    console.log(`ack end`);

    const blocks = [
      {
        type: 'input',
        block_id: 'task_name_input',
        element: {
          type: 'plain_text_input',
          action_id: 'name',
          placeholder: {
            type: 'plain_text',
            text: 'Add a task name',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Task name',
        },
      },
      {
        type: 'input',
        block_id: 'task_description_input',
        element: {
          type: 'plain_text_input',
          action_id: 'description',
          placeholder: {
            type: 'plain_text',
            text: 'Add a task description',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Task description',
        },
      },
    ];

    await configure({ blocks });
  },
  save: async ({ ack, step, view, update }) => {
    await ack();

    const { values } = view.state;
    const taskName = values.task_name_input.name;
    const taskDescription = values.task_description_input.description;
                
    const inputs = {
      taskName: { value: taskName.value, skip_variable_replacement: false },
      taskDescription: { value: taskDescription.value }
    };

    const outputs = [
      {
        type: 'text',
        name: 'taskName',
        label: 'Task name',
      },
      {
        type: 'text',
        name: 'taskDescription',
        label: 'Task description',
      }
    ];

    console.log("inputs: " + JSON.stringify(inputs));
    console.log("outputs: " + JSON.stringify(outputs));
    await update({ inputs, outputs });
  },
  execute: async ({ step, complete, fail }) => {
    const { inputs } = step;
    console.log(step);

    const outputs = {
      taskName: inputs.taskName.value,
      taskDescription: inputs.taskDescription.value,
    };

    // signal back to Slack that everything was successful
    await complete({ outputs });
    // NOTE: If you run your app with processBeforeResponse: true option,
    // `await complete()` is not recommended because of the slow response of the API endpoint
    // which could result in not responding to the Slack Events API within the required 3 seconds
    // instead, use:
    // complete({ outputs }).then(() => { console.log('workflow step execution complete registered'); });

    // let Slack know if something went wrong
    // await fail({ error: { message: "Just testing step failure!" } });
    // NOTE: If you run your app with processBeforeResponse: true, use this instead:
    // fail({ error: { message: "Just testing step failure!" } }).then(() => { console.log('workflow step execution failure registered'); });
  },
});

app.step(ws);

const ws2 = new WorkflowStep('user_test', {
  edit: async ({ ack, step, configure }) => {
    console.log(`ack start`);
    await ack();
    console.log(`ack end`);

    const blocks = [
      {
        type: 'input',
        block_id: 'user_name_input',
        element: {
          type: 'users_select',
          action_id: 'user',
          placeholder: {
            type: 'plain_text',
            text: 'Select a user',
          },
        },
        label: {
          type: 'plain_text',
          text: 'User',
        },
      },
      {
        type: 'input',
        block_id: 'conversation_name_input',
        element: {
          type: 'conversations_select',
          action_id: 'conversation',
          placeholder: {
            type: 'plain_text',
            text: 'Select a conversation',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Conversation',
        },
      },
      {
        type: 'input',
        block_id: 'task_description_input',
        element: {
          type: 'plain_text_input',
          action_id: 'description',
          placeholder: {
            type: 'plain_text',
            text: 'Add a task description',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Task description',
        },
      },
    ];

    await configure({ blocks });
  },
  save: async ({ ack, step, view, update }) => {
    await ack();

    const { values } = view.state;
    const taskName = values.user_name_input.name;
    const taskDescription = values.task_description_input.description;
                
    const inputs = {
      taskName: { value: taskName.value, skip_variable_replacement: true },
      taskDescription: { value: taskDescription.value }
    };

    const outputs = [
      {
        type: 'text',
        name: 'taskName',
        label: 'Task name',
      },
      {
        type: 'text',
        name: 'taskDescription',
        label: 'Task description',
      }
    ];

    console.log("inputs: " + JSON.stringify(inputs));
    console.log("outputs: " + JSON.stringify(outputs));
    await update({ inputs, outputs });
  },
  execute: async ({ step, complete, fail }) => {
    const { inputs } = step;

    const outputs = {
      taskName: inputs.taskName.value,
      taskDescription: inputs.taskDescription.value,
    };

    // signal back to Slack that everything was successful
    await complete({ outputs });
    // NOTE: If you run your app with processBeforeResponse: true option,
    // `await complete()` is not recommended because of the slow response of the API endpoint
    // which could result in not responding to the Slack Events API within the required 3 seconds
    // instead, use:
    // complete({ outputs }).then(() => { console.log('workflow step execution complete registered'); });

    // let Slack know if something went wrong
    // await fail({ error: { message: "Just testing step failure!" } });
    // NOTE: If you run your app with processBeforeResponse: true, use this instead:
    // fail({ error: { message: "Just testing step failure!" } }).then(() => { console.log('workflow step execution failure registered'); });
  },
});

app.step(ws2);
//#endregion

app.message(`Jess`, async ({ message, say }) => {
  // RegExp matches are inside of context.matches
  const greeting = message.user;

  await say(`<@${greeting}>, how are you?`);
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();