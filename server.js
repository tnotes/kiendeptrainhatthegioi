const express = require('express');
const app = express();

app.get('/',async (req,res)=>{

    const got = require('got');
    let result = '';
    let response = req.pipe(got.stream('https://whatismyipaddress.com/'));
    response.on('data',chunked=>result+=chunked.toString('binary'));
    response.on('end',function(){
        res.send(result);
    })
});

app.listen(80)