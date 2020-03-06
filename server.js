let express=require("express")
let app=express()
let WS=require("express-ws")(app)
app.use(express.static(__dirname+"/view"))
let port=process.env.PORT||3000

app.get("/",(req,res)=>{
    res.render(__dirname+"/view/index.html")
})


app.ws('/chat', function(ws, req) {
    ws.on('message', function(msg) {
        let data=JSON.parse(msg)
        if(data.type=="name"){
            ws.personName=data.data
            console.log( ws.personName)
            }
            WS.getWss().clients.forEach(function client(A){
                if(ws!=A){
                    A.send(JSON.stringify({
                     name:A.personName,
                     msg:data.msg
                     }))
                }
            })

        
})
})



app.listen(port)
