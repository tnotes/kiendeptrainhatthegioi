const request = require("request");
const app = require('express')();
app.get('/',async function(req,res){
    req.headers['accept-encoding'] = '';
    req.headers['accept-language'] = '';

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
