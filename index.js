const express = require('express');
const app = express();

app.listen(3002,()=>{
    console.log('Application Listening on Port 3002');
});

app.get('/',(req,resp) =>{
    resp.send('we are here bro yeaaaa without seeing any tutorial');
})