import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:Object,
        required:true,
    },
    updatedAt:{
        type:Date,
    },
},{timestamps:true});

const Data = mongoose.model("Data",dataSchema);

export default Data;