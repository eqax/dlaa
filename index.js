const express = require("express");
const app = express();
const fs = require("fs");
let fetch = require('node-fetch')
var discordIndexHTML = fs.readFileSync(__dirname + "/index.html", { encoding: "utf8" });

app.use("/src", express.static(__dirname + "/src"));
const bodyParser = require('body-parser');
console.log('Started')
 app.use(bodyParser.json({limit: "50mb"}));

app.use("/:data*", async (req, res) => {
  if(req.originalUrl === '/assets/0.2d737cc92c807c265e1f.css') return res.sendFile(__dirname + "/style1.css")
  if(req.originalUrl === '/assets/532.d49196785d17cb9b60a9.css') return res.sendFile(__dirname + "/style2.css")
  if(req.originalUrl === '/app') return res.sendFile(__dirname + "/app.html")
  if(req.originalUrl === '/login') return res.sendFile(__dirname + "/login.html")
  if(req.originalUrl === '/') return res.sendFile(__dirname + "/index.html")

  let headers = req.headers
  var headersNew = {}
if(headers['x-super-properties']) headersNew['x-super-properties'] = headers['x-super-properties']
  if(headers['user-agent']) headersNew['user-agent'] = headers['user-agent']
if(headers['x-discord-locale']) headersNew['x-discord-locale'] = headers['x-discord-locale']
if(headers['authorization']) headersNew['authorization'] = headers['authorization']
if(headers['cookie']) headersNew['cookie'] = headers['cookie']
if(headers['x-fingerprint']) headersNew['x-fingerprint'] = headers['x-fingerprint']
if(headers['content-type']) headersNew['content-type'] = headers['content-type']

  if(headersNew.authorization) headersNew.authorization = "Bot " + headersNew.authorization
  console.log(req.body)
  if(JSON.stringify(req.body) !== `{}`){
  let dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, headers: headersNew, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
        }else{
          console.log('https://discord.com' + req.originalUrl)
          console.log(headersNew)
          headersNew.cookie = "__dcfduid=b084f140592411ecbbcd73a0aaaf0ee3; __sdcfduid=b084f141592411ecbbcd73a0aaaf0ee3669b331e49b2c9a09e0e3332142c7007fb4b0c870f0b7b1ca0829943efa1e457; _gcl_au=1.1.2093678557.1639077469; _ga=GA1.2.437062768.1639077470; __stripe_mid=132ec104-4c67-43fd-ab26-90c6f2543b78d19d80; _gid=GA1.2.2143043352.1639737311; _fbp=fb.1.1639825120353.632815993; locale=en-US; OptanonConsent=isIABGlobal=false&datestamp=Tue+Dec+21+2021+23%3A20%3A07+GMT%2B0300+(%D8%A7%D9%84%D8%AA%D9%88%D9%82%D9%8A%D8%AA+%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A+%D8%A7%D9%84%D8%B1%D8%B3%D9%85%D9%8A)&version=6.17.0&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1&AwaitingReconsent=false"
  let dataFetch = await fetch(('https://discord.com' + req.originalUrl.replace('v6', 'v9')), {method: req.method, headers: headersNew}).catch(err =>{})
  console.log(dataFetch)
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
}

});


app.use("/", async (req, res) => {
	res.send(discordIndexHTML);
});

app.listen(3000, () => {
	console.log("server listening on :3000");
});
