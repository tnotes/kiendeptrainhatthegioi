const request = require("request");
const app = require('express')();
app.get('/',async function(req,res){
    req.headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    };
    let requestOptions  = {
        method: "GET",
        uri: "https://www.whatismyip.com/",
    };
    let response = req.pipe(request(requestOptions));
    let result = '';
    response.on('data',chunked=>{
        result += chunked.toString();
    });
    response.on('end',function(){
        res.send(result);
    })
    response.on("error", error => {
        console.error(error.message);
    });
});

app.listen(process.env.PORT || 80);
