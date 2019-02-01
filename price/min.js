const request = require('request-promise');
const cheerio = require('cheerio');
let FINDid = (text,startS,lastS)=>{
    let start = text.indexOf(startS) + startS.length;
    let last = text.indexOf(lastS,start);
    let sub = text.substring(
        start,last
    );
    return sub;
};

let getPriceInItemShopee = (shopID,itemID)=>{
    return new Promise(resolve=>{
        request.get('https://shopee.vn/api/v2/item/get?itemid='+itemID+'&shopid='+shopID,(err,res,body)=> {

            let obj = JSON.parse(body);
            resolve({
                id:itemID.toString(),
                price: parseInt(obj.item.price_min.toString().slice(0, -5)),
                name: obj.item.name
            })
        })
    })
};
let shopeeMIN = async (keyword,req)=>{
    let option = {
        method: 'GET',
        url: 'https://shopee.vn/api/v2/search_items/?by=price&keyword=' + encodeURIComponent(keyword) + '&limit=20&newest=0&order=asc&page_type=search',
    };
    let body = await req.pipe(request(option));
    if(!body){
        return await shopeeMIN(keyword,req)
    }
    let list = JSON.parse(body);
    let priceMap = list.items.map(e => getPriceInItemShopee(e.shopid, e.itemid));
    let data = await Promise.all(priceMap);
    return {shopeeMIN:data}

};

let lazadaMIN = async (keyword,req) => {

    let option = {
        method: 'GET',
        url: 'https://www.lazada.vn/'

    };
    let body = await req.pipe(request(option));
    return body


};

let sendoMIN = async (keyword,req) => {

        let option = {
            method: 'GET',
            url: 'https://www.sendo.vn/m/wap_v2/search/product?p=1&q='+encodeURIComponent(keyword)+'&s=100&search_algo=algo3&sortType=rank',
        };
    let body = await req.pipe(request(option));
    if(!body){
        return await sendoMIN(keyword,req)
    }
    let list = JSON.parse(body);
    list = list.result.data.map(e => {
        return {
            id: e.product_id.toString(),
            price: e.final_price,
            name: e.name
        }
    });

    return {sendoMIN:list}
};

let tikiMIN = async (keyword,req) => {

    let option = {
        method: 'GET',
        url: 'https://tiki.vn/api/v2/products?q=' + encodeURIComponent(keyword) + '&limit=1200&page=1&include=badges,product_links,brand,category,stock_item&aggregations=1',
    };
    let body = await req.pipe(request(option));
    if(!body){
        return await tikiMIN(keyword,req)
    }
    let objResult = JSON.parse(body);
    let list = objResult['data'];
    list = list.map(e => {
        return {
            id:e.id.toString(),
            price: parseInt(e.price),
            name: e.name
        }
    });

    return {tikiMIN:list}


};

let adayroiMIN = async (keyword,req) => {

    let option = {
        method:'GET',
        url:'https://www.adayroi.com/tim-kiem?text=' + encodeURIComponent(keyword)
    };
    let body = await req.pipe(request(option));

    if(!body){
        return await adayroiMIN(keyword,req)
    }
    let list = [];
    let $ = cheerio.load(body);
    $("div.product-list__container").find("div.product-item__wrapper-improvement").each(function () {
        let name = $(this).find("a.product-item__info-title").text();
        let price = parseInt($(this).find("span.product-item__info-price-sale").text().replace('đ', '').replace(/\./g, ''));
        let id = FINDid($(this).html(),'offer=','_');
        list.push({id,name,price})

    });


    return {adayroiMIN:list}

};

let lotteMIN = async (keyword,req) => {
    let option = {
        method: 'post',
        url: 'https://www.lotte.vn/api/v1/products/query',
        form: {"params":{"page":0,"query":keyword,"hitsPerPage":4000,"facets":[{"type":"categories","limit":20000},{"type":"product_brand","limit":2000},{"type":"price","limit":20000},{"type":"udropship_vendor","limit":20000}],"analyticsTags":"pc"}}
        ,

    };
    let body = await req.pipe(request(option));

    if(!body){
        return await lotteMIN(keyword,req)
    }
    let list = JSON.parse(body).hits.map(e=>{
        return {
            id:e.id,
            price:e.price_default,
            name:e.name
        }


    });

    return {lotteMIN:list}

};


module.exports = async (keyword,req) => {

    let result = await lazadaMIN(keyword,req);
    return result
};

