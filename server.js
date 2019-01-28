const express = require('express');
const app = express();
const request = require('request');
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/post',async (req,res)=>{


    let option = {
        method: 'GET',
        url: 'https://api.ipify.org/?format=json',
        header: req.headers
    };
    req.pipe(request(option)).pipe(res)
});



app.listen(process.env.PORT || 3000)