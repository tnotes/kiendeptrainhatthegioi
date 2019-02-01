const request = require("request");
const fs = require('fs');
const app = require('express')();
app.get('/',async function(req,res){
    let content = fs.readFileSync('./lazada.html','utf-8');
    res.send(content)
});
app.listen(process.env.PORT || 80);
