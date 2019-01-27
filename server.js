const express = require('express');
const app = express();
let http = require('http');
//let router = ...

app.get('/', (req, response) => {
    var options = {
        host: 'api.ipify.org',
        port:80,
        path:'/?format=json',
        method:'GET',
        header:req.headers
    }
    http.get(options,function(res){
        let data = '';

        // A chunk of data has been recieved.
        res.on('data', (chunk) => {
            data += chunk.toString();
        });
        res.on('end',function(){
            response.send(data)
        })


    })


})
app.listen(process.env.PORT || 3000)