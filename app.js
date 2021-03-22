var express = require("express");
var bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());

var PORT = process.env.PORT || 5000;

app.get('/',function(req,res){
    res.send("test");
})

//adding the dialogflow routes to a separate file in the folder named routes
require('./routes/dialogFlowRoutes')(app);

// app.post('/api/text_query', async function(req, res) {
//     res.send("text");
    
// });


// app.post('/api/event_query', async function(req, res) {
//     res.send("event"); 
//});


app.listen(PORT,function(){
    console.log("Chatbot for Investors Server has Started");
});