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
app.use("/:data.:data2", async (req, res) => {
  let dataFetch = await fetch('https://discord.com/' + req.params.data + "." + req.params.data2)
  let dataText = await dataFetch.text()
  console.log('https://discord.com/'+ req.params.data + "." + req.params.data2)
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
  
	res.send();
});

app.use("/:data", async (req, res) => {
  let dataFetch = await fetch('https://discord.com/' + req.params.data)
  let dataText = await dataFetch.text()
  console.log('https://discord.com/' + req.params.data)
  try {
  
    let s = JSON.parse(dataText)
    
    return res.json(s)
    
  } catch {
return res.send(dataText)
}
  
	res.send();
});



app.use("/", async (req, res) => {
	res.send(discordIndexHTML);
});

app.listen(3000, () => {
	console.log("server listening on :3000");
});
