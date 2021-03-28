var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
// app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
// app.use(cors());

var PORT = process.env.PORT || 5000;

//mongoose.connect("mongodb://localhost/chatbotDB");
mongoose.connect("mongodb+srv://satyamnaidu:satyamnaidu@cluster0.dcljf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.set('useFindAndModify',false);

// var stockSchema = mongoose.Schema({
//     title:String,
//     description:String,
//     price:Number
// })

var {Schema} = mongoose;
var contactInfoSchema = new Schema({
    name: String,
    email:String
});

//const StockMessage = mongoose.model('StockMessage',stockSchema);

var contact = mongoose.model('contact',contactInfoSchema);
app.get('/',function(req,res){
    res.send("test");
})

// app.get('/stocks',async function(req,res){
//     try {
//         const stockMessages = await StockMessage.find();
//         console.log(stockMessages)
//     } catch (error) {
//         res.status(404).json("Error");
//     }
// });

// app.post('/stocks',async function(req,res){
//     const stock = req.body;
//     const newStock = new StockMessage(stock);
//     try {
//         await newStock.save();
//         res.status(201).json(newStock);
//     } catch (error) {
//         res.status(404).json("Error");
//     }
// })

//adding the dialogflow routes to a separate file in the folder named routes
require('./routes/dialogFlowRoutes')(app);
require('./routes/signin')(app);


app.listen(PORT,function(){
    console.log("Chatbot for Investors Server has Started");
});