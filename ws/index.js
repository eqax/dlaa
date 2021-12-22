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
if(this.ready === true) {res()}
    }, 500)
    
})

  this.wss.send(msg)
})

}
   
   async _start(){
this.wss = new ws( "wss://gateway.discord.gg/v=7" , [] )

this.wss.on("ready" , async () =>{
this.ready = true
})
this.wss.on("close" , async () =>{
this.ready = false
this.wss = new ws( "wss://gateway.discord.gg/v=7" , [] )
})
this.wss.on("message" , async msg =>{
/*
  let m;
try {m = JSON.parse(msg)} catch { return; }
    console.log(msg)

  let auth = (token) => {
  this.wss.token = token
  console.log(token)
  this.wss.send(`{"op":2,"d":{"token":"${token}","capabilities":61,"properties":{"os":"Windows","browser":"Chrome","device":"","browser_user_agent":"NodeJS (GROUPjs)","browser_version":"88.0.4324.182","os_version":"10","referrer":"https://www.google.com/","referring_domain":"www.google.com","search_engine":"google","referrer_current":"","referring_domain_current":"","release_channel":"stable","client_build_number":77606,"client_event_source":null},"presence":{"status":"dnd","since":0,"activities":[],"afk":false},"compress":false,"client_state":{"guild_hashes":{},"highest_last_message_id":"0","read_state_version":0,"user_guild_settings_version":-1}}}`)
  this.tokenSended = true
}
  if(m.t == null && this.tokenSended === false) return auth(this.token)
*/
this.client.send(msg)
})
}
   
 }
module.exports = Client;