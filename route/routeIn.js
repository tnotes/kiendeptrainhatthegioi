const express = require('express');
const route = express.Router();
const db = require('../db/mongo');
const fs = require('fs');
let min = require('../price/min');
const {lazadaShop,sendoShop,tikiShop,shopeeShop,adayroiShop,lotteShop} = require('../price/shop');
route.post('/luu-thong-tin',(async (req,res)=>{
    let object = {
        username:req.cookies.username,
        keyword: req.body.keyword || null,
        lotteSHOP: req.body.lotteSHOP || null,
        sendoSHOP: req.body.sendoSHOP || null,
        tikiSHOP: req.body.tikiSHOP || null,
        lazadaSHOP: req.body.lazadaSHOP || null,
        adayroiSHOP: req.body.adayroiSHOP || null,
        shopeeSHOP: req.body.shopeeSHOP || null,
        filter:req.body.filter || []

    };
    db.Compare.updateOne({username:object.username,keyword:object.keyword},object,{upsert:true},(err,result)=>{
        res.send(result)
    });
}));

route.get('/quet-thong-tin',async (req,res)=>{
    let data = await min('microlab',req)
    res.send(data)
});
module.exports = route;
