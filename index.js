"use strict"
/*
* BIN CHECKER JS
* API BY : LOOKUP.BINLIST.NET
* AUTHOR : RyuJin Framework
*/

const fs = require('fs');
const request = require('request');
const lolcatjs = require('lolcatjs');
const readlineSync  = require('readline-sync');
const delay = require('delay');

//DELAY BIAR GAK REQUEST TIMEOUT ANJENG.
const DANTOI = 100;
// MEMEMK BAPAKKAU

var tanyaFile = readlineSync.question('CC FILE LIST >> ');
var listfile = fs.readFileSync(tanyaFile).toString().replace(/\r\n|\r|\n/g, " ").split(" ");


const callback = async (error,response,body)=>{
    if (!error && response.statusCode == 200) {

        var parsing = JSON.parse(body);
        
        var brand = parsing.scheme.toUpperCase();
        var type = parsing.type.toUpperCase();
        var bank = parsing.bank.name;
        var bankUri = parsing.bank.url;
        var country = parsing.country.alpha2;
        var flag = parsing.country.emoji;
        var countryName = parsing.country.name.toUpperCase();
        var bins = response.request.headers.tobin;
        var fullcc = response.request.headers.full;

        lolcatjs.options.seed = Math.round(Math.random() * 1000);
        lolcatjs.options.colors = true;
        lolcatjs.fromString(`${bins} => [${country}]  ${brand} - ${type} - ${bank} - ${countryName}[${country}] - ${bankUri} `);
        fs.appendFileSync('output/'+country+'.txt',fullcc+'\n');
    }else{
      
         delay(100);
        var bins = response.request.headers.full;
        checkBin(bins);
    }

}
const checkBin = async (bin) =>{

    var tobin = bin.substr(0,6);
    const options = {
        url: 'https://lookup.binlist.net/'+tobin,
        headers:{
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0',
        'Accept-Version': '3',
        'full': bin,
        'tobin': tobin
            }
         }
    
    request(options,callback);
}

(async() => {

for(var cici in listfile)
{
    var bintol = listfile[cici];
    await checkBin(bintol);
    await delay(DANTOI);
    
}

})();