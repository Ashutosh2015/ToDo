const express=require('express');
const app=express();
const mongoose=require('mongoose')
const articalRoute=require('./routes/artical')
const artical=require('./models/artical')
const methodOverride=require('method-override')
mongoose.connect('mongodb://localhost/blog')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/',async(req,res)=>
{
     const articals=await artical.find().sort({createdDate:'desc'});
      res.render('articals/index',{articals:articals});
})
app.use('/artical',articalRoute)
app.listen(100,()=>{
      console.log("Listining to local host 100");
}) 