let express=require("express")
let app=express()
let WS=require("express-ws")(app)
app.use(express.static(__dirname+"/view"))
let port=process.env.PORT||3000
app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
           ws.send("GOOD")
            
//             WS.getWss().clients.forEach(function client(A){
//                 if(ws!=A){
//                     A.send(JSON.stringify({
//                      name:A.personName,
//                      msg:data.msg
//                      }))
//                 }
//             })

        
})
})



app.listen(port)
