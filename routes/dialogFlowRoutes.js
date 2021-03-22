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
        let responses = await sessionClient
        .detectIntent(request);

    res.send(responses[0].queryResult)
});
    app.post('/api/df_event_query', (req, res) => {
        res.send({'do': 'event query'})
    });
}