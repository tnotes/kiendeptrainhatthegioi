const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const request = require('request');
    var options = {

        url: 'https://api.ipify.org/?format=json',
        encoding: null, // make response body to Buffer.
        method: 'GET',
        header:req.headers
    };

        let buffer = request(options);
        buffer.on('data',chunked=>{
           res.send(chunked.toString())
        })


})
app.listen(process.env.PORT || 3000)