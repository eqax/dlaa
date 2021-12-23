let ws = require('ws')

class Client extends Object {
constructor (client , req, ws, auth, id) {
  super  ()
this._start()
this.client= client
this.ready = false
this.client.on('message', async (msg) =>{

     await new Promise((res , rej) =>{ 

    var stop = false
    
    setInterval(() =>{ 
    if(stop === true) return;
if(this.ready === true) {stop === true; res()}
    }, 500)
    
})
   try {
     return this.wss.send(JSON.stringify(JSON.parse(Buffer.from(msg).toString("utf8")))) } catch(e) { 
       return this.wss.send(msg) };

  


})
}
  
  
   async _start(){
this.wss = new ws( "wss://remote-auth-gateway.discord.gg/?v=1" , [] , {
headers: {Origin: "https://discord.com",
"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
Host: "remote-auth-gateway.discord.gg",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
}})

this.wss.on("open" , async () =>{
this.ready = true
})
this.wss.on("close" , async () =>{
this.client.close()
  this.ready = false
})
this.wss.on("message" , async msg =>{
   try {
     return this.client.send(JSON.stringify(JSON.parse(Buffer.from(msg).toString("utf8")))) } catch(e) { 
       console.log(e)
       return this.client.send(msg) };




})
}
   
 }
module.exports = Client;

/*let ws = require('ws')

class Client extends Object {
constructor (client , req, ws, auth, id) {
  super  ()
this._start()
this.client= client
this.ready = false
this.client.on('message', async (msg) =>{

     await new Promise((res , rej) =>{ 

    var stop = false
    
    setInterval(() =>{ 
    if(stop === true) return;
if(this.ready === true) {stop === true; res()}
    }, 500)
    
})
   try {
     console.log(JSON.parse(Buffer.from(msg).toString("utf8")))
     return this.wss.send(JSON.stringify(JSON.parse(Buffer.from(msg).toString("utf8")))) } catch(e) { 
       console.log(e)
       return this.wss.send(msg) };

  
  console.log('ready-send')


})

}
   
   async _start(){
this.wss = new ws( "wss://gateway.discord.gg/?encoding=json&v=7&compress=zlib-stream" , [] )

this.wss.on("open" , async () =>{
this.ready = true
  console.log('ready')
})
this.wss.on("close" , async () =>{
this.client.close()
  this.ready = false
    console.log('c;ose')
})
this.wss.on("message" , async msg =>{


this.client.send(msg)


})
}
   
 }
module.exports = Client;*/