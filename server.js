const express = require('express');
const app = express();
const http = require('http');

app.get('/',function(req,res,next) {
    var request   = require('request');
    var pipe      = req.pipe(request.get('https://api.ipify.org/?format=json'));
    var response  = [];

    pipe.on('data',function(chunk) {
        res.send(chunk.toString());
    });


})
app.listen(process.env.PORT || 3000)