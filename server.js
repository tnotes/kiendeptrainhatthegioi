const express = require('express');
const app = express();
let got = require('got');

app.get('/',async (req,res)=>{

    let response = req.pipe(got.stream('https://whatismyipaddress.com/')).pipe(res)

});

app.listen(process.env.PORT || 3000)