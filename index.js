const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
       extended:true
}));
mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology:true

});
var db = mongoose.connection;
db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("Connected to database"));
app.post('/signup',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var data = {
        "name":name,
        "email":email,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });
    return res.redirect('signin.html');
})
app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":"*"
    })
    return res.redirect('home.html');
}).listen(3000);
console.log("listening on port 3000")

