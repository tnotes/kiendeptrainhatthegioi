const min = require('./min');
let {lotteShop,lazadaShop,shopeeShop,adayroiShop,tikiShop,sendoShop}  = require('./shop');
let found = (keyword,name)=> keyword.trim().split(' ').some(r=> RegExp(r, "i").test(name.trim().split(' ')));
module.exports = async obj=>{

    let [{lazadaShopPrice},{shopeeShopPrice},{adayroiShopPrice},{tikiShopPrice,TikiOtherPrice},{lotteShopPrice},{sendoShopPrice}] = await Promise.all([lazadaShop(obj.lazadaSHOP),shopeeShop(obj.shopeeSHOP),adayroiShop(obj.adayroiSHOP),tikiShop(obj.tikiSHOP),lotteShop(obj.lotteSHOP),sendoShop(obj.sendoSHOP)]);
    let {lotteMIN,lazadaMIN,shopeeMIN,adayroiMIN,tikiMIN,sendoMIN} = await min(obj.keyword);
    tikiMIN = tikiMIN.concat(TikiOtherPrice);

    let keyword = obj.keyword.trim();
    tikiMIN = tikiMIN.filter(e=>{
        if(found(keyword,e.name) === true){
            return e
        }
    });

    adayroiMIN = adayroiMIN.filter(e=>{
        if(found(keyword,e.name) === true){
            return e
        }
    });

    lazadaMIN = lazadaMIN.filter(e=>{
        if(found(keyword,e.name) === true){
            return e
        }
    });



    return {
        keyword:obj.keyword,

        lazadaShopPrice,
        shopeeShopPrice,
        adayroiShopPrice,
        tikiShopPrice,
        lotteShopPrice,
        sendoShopPrice,

        lotteMIN,
        lazadaMIN,
        shopeeMIN,
        adayroiMIN,
        tikiMIN,
        sendoMIN
    };



};

