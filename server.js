let express = require("express");
let app = express();
let WS = require("express-ws")(app);
app.use(express.static(__dirname + "/view"));
let port=process.env.PORT||3000

app.ws("/chat", function(ws, req) {
  ws.on("message", function(msg) {
    let V = JSON.parse(msg);
    if (V.type == "name") {
      ws.personName = V.data;
    }
    WS.getWss().clients.forEach(function client(A) {
    //   console.log("CLIENTS:", A.personName);

      if (A.personName ===V.for) {
        A.send(
          JSON.stringify({
            name: ws.personName,
            msg: V.msg
          })
        );
        
      }else{
          console.log("TRG Client:",V.for)
      }
    });
  });
});

app.listen(port);

// WS.getWss().clients.forEach(function client(A){
//                 if(ws!=A){
//                     A.send(JSON.stringify({
//                      name:A.personName,
//                      msg:data.msg
//                      }))
//                 }
//             })
