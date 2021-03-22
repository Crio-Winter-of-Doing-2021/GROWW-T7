'use strict';
var dialogflow = require('dialogflow');
var config = require('../config/keys');

var structjson = require('./structjson.js');

var projectId = config.googleProjectID;
var sessionId = config.dialogFlowSessionID;
var languageCode = config.dialogFlowSessionLanguageCode;

var credentials = {
    client_email: config.googleClientEmail,
    private_key:
    config.googlePrivateKey,
};

var sessionClient = new dialogflow.SessionsClient({projectId, credentials});
var sessionPath = sessionClient.sessionPath(projectId, sessionId);


module.exports = {
    textQuery: async function(text, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function(event, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },


    handleAction: function(responses){
        return responses;
    },


} 