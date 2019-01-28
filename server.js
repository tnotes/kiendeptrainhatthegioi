const express = require('express');
const app = express();
const request = require('request');


app.get('/',function(req,res,next) {
    var pipe      = req.pipe(request.get('https://api.ipify.org/?format=json'));
    var response  = [];

    pipe.on('data',function(chunk) {
        res.send(chunk.toString());
    });


})
app.listen(process.env.PORT || 3000)