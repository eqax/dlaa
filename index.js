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

  let headers = req.headers
delete headers['x-forwarded-for']
delete headers['x-forwarded-proto']
delete headers['x-forwarded-port']
delete headers['host']
delete headers['x-forwarded-host']
delete headers['traceparent']
delete headers['connection']
  
  if(headers.authorization) headers.authorization = "Bot " + headers.authorization
  if(req.body){
  let dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, headers: headers, body: JSON.stringify(req.body)}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, body: JSON.stringify(req.body)}).catch(err =>{})

  let dataText = await dataFetch.text()
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
        }else{
          
  let dataFetch = await fetch(('https://discord.com' + req.originalUrl), {method: req.method, headers: headers}).catch(err =>{})
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
