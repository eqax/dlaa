const express = require("express");
const app = express();
const fs = require("fs");
let fetch = require('node-fetch')
var discordIndexHTML = fs.readFileSync(__dirname + "/index.html", { encoding: "utf8" });

app.use("*", async (req, res, next) => {
	res.setHeader("access-control-allow-origin", "*");
	next();
});

app.use("/src", express.static(__dirname + "/src"));

app.use("/:data*", async (req, res) => {
  if(req.originalUrl === '/assets/0.2d737cc92c807c265e1f.css') return res.sendFile(__dirname + "/style1.css")
  if(req.originalUrl === '/assets/532.d49196785d17cb9b60a9.css') return res.sendFile(__dirname + "/style2.css")
  if(req.originalUrl === '/app') return res.sendFile(__dirname + "/app.html")
  if(req.originalUrl === '/login') return res.sendFile(__dirname + "/login.html")

  let headers = req.headers
  var headersNew = {}
if(headers['x-super-properties']) headersNew['x-super-properties'] = headers['x-super-properties']
  if(headers['user-agent']) headersNew['user-agent'] = headers['user-agent']
if(headers['x-discord-locale']) headersNew['x-discord-locale'] = headers['x-discord-locale']
if(headers['authorization']) headersNew['authorization'] = headers['authorization']
if(headers['cookie']) headersNew['cookie'] = headers['cookie']

  console.log(headersNew)
  if(headersNew.authorization) headersNew.authorization = "Bot " + headersNew.authorization
  if(req.body){
  let dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, headers: headersNew, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, body: JSON.stringify(req.body)}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
        }else{
          console.log('https://discord.com' + req.originalUrl)
  let dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, headers: headersNew}).catch(err =>{})
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
