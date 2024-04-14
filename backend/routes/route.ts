import express from "express";
import Model from "../models/data";


const router=express.Router();

//post method

router.post('/post',async (req,res)=>{
    const data=new Model({
        id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        updatedAt:req.body.updatedAt
    });
    try{
        const savedData=await data.save();
        res.status(200).json(savedData);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

//Get all Method
router.get('/getAll',async(req,res)=>{
    try{
        const data=await Model.find();
        res.status(200).json(data);
    }catch(err)
    {
        res.status(500).json({message:err.message});
    }
})
//get by ID Method
router.get('/getOne/:id',async (req,res)=>{
    try{
        const data=await Model.findById(req.params.id);
        res.status(200).json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Update by Method ID

router.patch('/update/:id',(req,res)=>{
    res.send('Update API by ID');
})

//delete by Id Method

router.delete('/delete/:id',(req,res)=>{
    res.send('Delete API by ID');
})

export default router;