var express = require("express");


var app = express();

const PORT = process.env.PORT || 5000;

app.get('/',function(req,res){
    res.send("test");
})

app.listen(PORT,function(){
    console.log("Chatbot for Investors Server has Started");
});