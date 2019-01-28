const express = require('express');
const app = express();
const request = require('request');

let getData = (req)=>{
    return new Promise(resolve=>{
        let pipe = req.pipe(request.get('https://api.ipify.org/?format=json'));
        let result = '';
        pipe.on('data',function(chunk) {
            result += chunk.toString();
        });
        pipe.on('end',function(){
            resolve(result)
        })
    })
};
app.get('/',async function(req,res,next) {
    let data = await getData(req);
    res.send(data)
})
app.listen(process.env.PORT || 3000)