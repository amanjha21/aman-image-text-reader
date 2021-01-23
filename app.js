//Express init
const express =require('express');
const app = express();
//.env init & config
//check for prodution and load .env if yes
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

//view engine setup
app.set("view engine", 'ejs');

//Middleware
app.use(express.json());
//static folder
app.use(express.static('public'))

//Route
app.use('/', require('./routes/user'));

app.get('/',(req,res)=>{
    res.render('index')
});

//server listen setup
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log(`listening on port: ${PORT}`)});