const { Router } = require('express');
const express=require('express');
const Artical=require('./../models/artical')
const route=express();
module.exports=route

route.get('/new',(req,res)=>{
      res.render('articals/new',{artical:new Artical()});
})

route.get('/edit/:id',async(req,res)=>{
      const artical=await Artical.findById(req.params.id)
      res.render('articals/edit',{artical:artical});
})
route.get('/:slug',async (req,res)=>{
      const artical=await Artical.findOne({slug:req.params.slug})
      if(!artical)
      res.redirect('/')
      res.render('articals/show',{artical:artical})
})

route.delete('/:id',async(req,res)=>{
      await Artical.findByIdAndDelete(req.params.id)
      res.redirect('/')
})
route.post('/',async(req,res,next)=>{
   req.artical=new Artical()
   next()
},saveArticalAndRedirect('new'))


route.put('/:id',async(req,res,next)=>{
      req.artical=await  Artical.findById(req.params.id)
      next()
   },saveArticalAndRedirect('edit'))

function saveArticalAndRedirect(path)
{
      return async(req,res)=>
      {
            let artical=req.artical
            
                  artical.title=req.body.title,
                  artical.description=req.body.description,
                  artical.markdown=req.body.markdown
            
                try{
                 artical=await artical.save()
                 res.redirect(`/artical/${artical.slug}`)
                } catch(e){
                  console.log(e)
                     res.render(`articals/${path}`,{artical:artical})
                }  
      }
}