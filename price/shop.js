
const request = require('request-promise');

let FINDid = (text,startS,lastS)=>{
    let start = text.indexOf(startS) + startS.length;
    let last = text.indexOf(lastS,start);
    let sub = text.substring(
        start,last
    );
    return sub;
};

let lazadaShop = async (url,req) => {
    let result = {
        lazadaShopPrice:{
            id:null,
            price:0,
            name:null
        }
    };
    if((url || '').toString().includes('lazada.vn') === false) return result;
    let option = {
        method: 'GET',
        url: url
    };

    let body = await req.pipe(request(option));
    if(!body){
        return await lazadaShop(url,req)
    }
    if(body.includes('"pdt_name":"')){
        result = ({
            lazadaShopPrice:{
                id:FINDid(body,'item_id=','&'),
                price:parseInt(FINDid(body,'"price":',',')),
                name:FINDid(body,'"pdt_name":"','"')
            }
        })
    }
    return result;

};

let sendoShop = async (url,req) => {
    let result = {
        sendoShopPrice:{
            id:null,
            price:0,
            name:null
        }
    };
    if((url || '').toString().includes('sendo.vn') === false) return result;

    let option = {
            method: 'GET',
            url: url,
        };
    let body = await req.pipe(request(option));
    if(!body){
        return await sendoShop(url,req)
    }
    if(body.includes('"product":{"id":')){
        result = {
            sendoShopPrice:{
                id:FINDid(body,'"product":{"id":',','),
                price:parseInt(FINDid(body,'"final_price":',',')),
                name:FINDid(body,'"data":{"title":"','"')
            }
        };
    }
    return result


};

let tikiShop = async (url,req) => {
    let result = {
        tikiShopPrice: {
            id: null,
            price: 0,
            name: null
        },
        TikiOtherPrice:[]
    };
    if((url || '').toString().includes('tiki.vn') === false) return result;

    let option = {
            method: 'GET',
            url: url,
        };
    let body = await req.pipe(request(option));
    if(!body){
        return await tikiShop(url)
    }
    if (body.includes('productId: "')) {
        let ListOtherSeller = JSON.parse(FINDid(body, "otherSeller =", ";"));
        let TikiOtherPrice = ListOtherSeller.map(e => {
            return {
                id: e.product_id.toString(),
                price: e.price,
                name: FINDid(body, 'property="og:title" content="','"')

            }
        });
        result = {
            tikiShopPrice: {
                id: FINDid(body, 'productId: "', '"'),
                price: parseInt(FINDid(body, "'price': '", "'")),
                name: FINDid(body, 'property="og:title" content="','"')

            },
            TikiOtherPrice
        };
    }
    return result


};

let shopeeShop = async (url,req)=>{
    let result = {
        shopeeShopPrice: {
            id: null,
            price: 0,
            name: null
        }
    };
    if((url || '').toString().includes('shopee.vn') === false) return result;
    let section = url.split('.');
    let itemID = section[section.length-1];
    let ShopID = section[section.length-2];

    let option = {
        method: 'GET',
        url: 'https://shopee.vn/api/v2/item/get?itemid='+itemID+'&shopid='+ShopID,
    };
    let body = await req.pipe(request(option));
    if(!body){
        return await shopeeShop(url)
    }
    if(body !== 'Not Acceptable!'){
        result = {
            shopeeShopPrice:{
                id:JSON.parse(body).item.itemid.toString(),
                price:parseInt(JSON.parse(body).item.price.toString().slice(0, -5)),
                name:JSON.parse(body).item.name
            }
        };
    }
    return result



};

let adayroiShop = async (url,req)=>{
    let result = {
        adayroiShopPrice:{
            id:null,
            price: 0,
            name:null
        }
    };
    if((url || '').toString().includes('adayroi.com') === false) return result;

    let option = {
        method: 'GET',
        url: url,
    };
    let body = await req.pipe(request(option));
    if(!body){
        return await adayroiShop(url)
    }
    if(body.includes('data-product="')){
        result = {
            adayroiShopPrice:{
                id:FINDid(body,'data-product="','"'),
                price: parseInt(FINDid(body,'"offerPrice":',',')) || 0,
                name:FINDid(body,'"altText":"','"')
            }
        };
    }
    return result




};

let lotteShop = async (url,req)=>{
    let result =  {
        lotteShopPrice:{
            id:null,
            price:0,
            name:null
        }
    };
    if((url || '').toString().includes('lotte.vn') === false) return result;

        let option = {
            method: 'GET',
            url: url,
        };
    let body = await req.pipe(request(option));
    if(!body){
        return await lotteShop(url)
    }
    if(body.includes('"productID":"')){
        result = {
            lotteShopPrice:{
                id:FINDid(body,'"productID":"','"'),
                price:parseInt(FINDid(body,'"price":"','"')),
                name:FINDid(body,'"Product","name":"','"')
            }
        };
    }
    return result;



};

module.exports = {lazadaShop,sendoShop,tikiShop,shopeeShop,adayroiShop,lotteShop};