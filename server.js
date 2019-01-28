const express = require('express');
const app = express();
const request = require('request');
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.all('/post',async (req,res)=>{


    let option = {
        method: 'GET',
        url: 'https://www.sendo.vn/m/wap_v2/search/product?p=1&q=microlab&s=100&search_algo=algo3&sortType=rank',
        header: req.headers,
        json:true
    };
    req.pipe(request(option)).pipe(res)
});



app.listen(process.env.PORT || 3000)