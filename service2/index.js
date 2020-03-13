const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/a',(req,res)=>{
    console.log("hello")
    return data;
    // res.json(data);
});

const data = [
    {
        "id": 1,
        "info": "This is from service 2"
    }
]



app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
});