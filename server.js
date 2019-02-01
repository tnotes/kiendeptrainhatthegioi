const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const route = require('./route/routeIn');
app.use(function(req,res,next){
    req.headers['accept-encoding'] = '';
    req.headers['accept-language'] = '';
    return next()
});
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit:'50mb'}));

app.use('/api',route);

app.listen(process.env.PORT || 8080);