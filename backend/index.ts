import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';
import bodyParser from 'body-parser';

const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kaizol:kcL8ddwaZzYYnpS0@cluster0.q3za38c.mongodb.net/')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.error(error);
})

app.get('/api/test',(req,res)=>{
    res.json({ message: "success!!" });
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});

