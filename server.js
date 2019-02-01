const request = require("request-promise");
const app = require('express')();
app.get('/',async function(req,res){
    req.headers['accept-encoding'] = '';
    req.headers['accept-language'] = '';

    let requestOptions  = {
        method: "GET",
        uri: "https://www.whatismyip.com/",
    };
    let response = await req.pipe(request(requestOptions));
    res.send(response)
});

app.listen(process.env.PORT || 80);
