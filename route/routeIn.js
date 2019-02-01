const express = require('express');
const route = express.Router();
const fs = require('fs');
let min = require('../price/min');
const {lazadaShop,sendoShop,tikiShop,shopeeShop,adayroiShop,lotteShop} = require('../price/shop');

route.get('/quet-thong-tin',async (req,res)=>{
    let data = await min('microlab',req)
    res.send(data)
});
module.exports = route;
