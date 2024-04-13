import express from "express";
import Model from "../models/data";


const router=express.Router();

//post method

router.post('/post',async (req,res)=>{
    const data=new Model({
        name:req.body.name,
        age:req.body.age
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
router.get('/getAll',(req,res)=>{
    res.send('Get All API');
})
//get by ID Method
router.get('/getOne/:id',(req,res)=>{
    res.send(req.params.id);
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