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
  console.log(req.method)
  console.log(req.headers)
  if(req.params['0']){
    
    if(req.body){
    
  let dataFetch = await fetch(('https://discord.com/' + req.params.data + req.params['0']), {method: req.method, body: JSON.stringify(req.body), headers: req.headers})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com/' + req.params.data + req.params['0']), {method: req.method, body: JSON.stringify(req.body)})

  let dataText = await dataFetch.text()
  console.log('https://discord.com/' + req.params.data+ req.params['0'])
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
      
    }else{
    
  let dataFetch = await fetch(('https://discord.com/' + req.params.data + req.params['0']), {method: req.method, headers: req.headers}).catch(err =>{})
  if(!dataFetch) dataFetch = await fetch(('https://discord.com/' + req.params.data + req.params['0']), {method: req.method})
  let dataText = await dataFetch.text()
  console.log('https://discord.com/' + req.params.data+ req.params['0'])
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
      
    
}

  }else{
  let dataFetch = await fetch('https://discord.com/' + req.params.data)
  let dataText = await dataFetch.text()
  console.log('https://discord.com/' + req.params.data)
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
