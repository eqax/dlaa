var wss = new ws( "wss://scalloped-mahogany-chronometer.glitch.me/?encoding=json&v=6&compress=zlib-stream" , [] )

this.ready = false
wss.on("close" , async () =>{
wss = new ws( "wss://gateway.discord.gg/v=7" , [] )
})
wss.on("message" , async msg =>{

})