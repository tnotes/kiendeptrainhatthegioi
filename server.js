const https = require("https");
const app = require('express')();
app.get('/',async function(req,res) {
    req.pipe(https.get("https://api.ipify.org/?format=json", response => {
        let responseBody = "";

        response.on("data", dataChunk => {
            responseBody += dataChunk;

        });

        response.on("end", end => {
            res.send(responseBody);
        });

    }));
});
app.listen(process.env.PORT || 80);