var request = require("request"), iconv  = require('iconv-lite');
const app = require('express')();
app.get('/',async function(req,res){
    let requestOptions  = { encoding: null, method: "GET", uri: req.query.url};
    let response = req.pipe(request(requestOptions));
    let result = '';
    response.on('data',chunked=>{
        result += iconv.decode(new Buffer(chunked), "UTF-8");
    });
    response.on('end',function(){
        res.send(result);
    })
});
app.listen(process.env.PORT || 3000);
