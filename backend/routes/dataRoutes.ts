import express from 'express';
import Data from '../models/data';

const router =express.Router();

router.get('/notes',async(req,res)=>{
    try{
        const data=await Data.find({});
    res.json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});

router.post('/api/notes',async(req,res)=>{
    try{
        const newData=new Data(req.body);
        const savedData=await newData.save();
        res.status(201).json(savedData);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

export default router;