var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var app = express();
app.use(bodyParser.json());

var PORT = process.env.PORT || 5000;

//mongoose.connect("mongodb://localhost/chatbotDB");
mongoose.connect("mongodb+srv://satyamnaidu:satyamnaidu@cluster0.dcljf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

var {Schema} = mongoose;
var contactInfoSchema = new Schema({
    name: String,
    email:String
});

mongoose.model('contact',contactInfoSchema);
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