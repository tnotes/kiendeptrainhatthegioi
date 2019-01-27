const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const request = require('request');
    var options = {

        url: 'https://api.ipify.org/?format=json',
        encoding: null, // make response body to Buffer.
        method: 'GET'
    };
    (async ()=>{
        const buffer = request.get(options);
        buffer.on('data',chunked=>{
           res.send(chunked.toString())
        })
    })();

})
app.listen(1998)