var dialogflow = require('dialogflow');
var config = require('../config/keys');

var sessionClient = new dialogflow.SessionsClient();

var sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);


module.exports = function app() {


    app.post('/api/df_text_query', (req, res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        };
        sessionClient
            .detectIntent(request)
            .then(responses => {
                console.log('Detected intent');
                const result = responses[0].queryResult;
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
        res.send({'do': 'text query'})
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({'do': 'event query'})
    });
}