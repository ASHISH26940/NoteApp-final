import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
},{timestamps: true})

const Data = mongoose.model("Data",dataSchema);

export default Data;