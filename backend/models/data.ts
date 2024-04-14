import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    content:{
        required: true,
        type: Object
    },
    updatedAt:{
        required: true,
        type: Date
    }
},{timestamps: true})

const Data = mongoose.model("Data",dataSchema);

export default Data;