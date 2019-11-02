const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');
app.use(express.static(publicPath));

// app.post('/',(req,res) => {
//  res.render('index.html');
// });

app.listen(port,() =>{
    console.log(`server is up on port ${port}`);
})