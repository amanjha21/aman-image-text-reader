//require express, fs, multer and tesseract.js
const express=require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const {createWorker}  = require("tesseract.js");
let textFetched = "";
let fileName="";
//storage setup using multer
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
       cb(null, "./uploads") 
    },
    filename:(req, file, cb)=>{
cb(null,file.originalname);
fileName = file.originalname;
    }
});
//upload setup using multer
const upload = multer({
    storage: storage
}).single("pic");

//view engine setup
app.set("view engine", 'ejs');
app.get('/',(req,res)=>{
    res.render('index')
});
app.use(express.static('public'))


//route for post req
app.post('/',(req,res)=>{
upload(req,res,err=>{
fs.readFile(`./uploads/${req.file.originalname}`, (err, data)=>{
    if(err) return console.log('your error is',err);
    
    (async () => {
        const worker = createWorker({ logger: progress =>{ 
            // console.log(progress);            
        }});
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(data);
        textFetched= text;
        // console.log(textFetched);
        // console.log(fileName)
        // console.log(curProgress.value);
        res.render('textToVoice',{text: textFetched})
        // fs.unlink(`./uploads/${fileName}`)
        fs.unlink(`./uploads/${fileName}`, (err => { 
            if (err) console.log(err); 
            else { 
              console.log(`\nDeleted file: ${fileName}`); 
            
            } 
          })); 
      })();

})

})
})


const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=>{console.log('listening')});


