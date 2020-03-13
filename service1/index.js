const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 3000;
const mqSvc = require('./mq');

app.get('/',async (req,res)=>{
    let m = await mqSvc.connectMQ("test");
    res.json({'result': m})
})


app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
});




