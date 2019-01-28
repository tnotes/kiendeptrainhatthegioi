const express = require('express');
const app = express();
const request = require('request');

app.get('/',(req,res)=>{

    let option = {
        method: 'GET',
        url: 'https://www.sendo.vn/m/wap_v2/search/product?p=1&q=microlab%2Bm108&s=60&search_algo=algo1&sortType=rank',
        header:req.headers
    };
    let pipe = req.pipe(request(option));
    let result = '';
    pipe.on('data',chunked=>{
        result += chunked.toString();
    })
    pipe.on('end',function(){
        res.send(result)
    })
});
app.get('/test',(req,res)=>{
    req.pipe(request('https://api.ipify.org/?format=json')).pipe(res)
})


app.listen(process.env.PORT || 3000)