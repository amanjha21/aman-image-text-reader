const router = require('express').Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const tesseract = require('../utils/tesseract')
const textRecog = tesseract;


router.post('/', upload.single('pic'), async(req,res)=>{
    try {
        // res.write('<h1>please wait loading...</h1>');
        //uploading to cloudinary
        const result = await cloudinary
        .uploader
        .upload(req.file.path,{
            folder:"image-text-reader",
            use_filename: true, 
            unique_filename: false
        });
       
                text = await textRecog(result.secure_url);
                
                res.render('textToVoice',{text: text})
                //deleting from cloudinary
                cloudinary.uploader.destroy(result.public_id);
            
    } catch (error) {
        console.log(error);
    }
    
})


module.exports = router;