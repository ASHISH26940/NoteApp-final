import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/route';
import bodyParser from "body-parser";
const mongoString = 'mongodb+srv://kaizol:kcL8ddwaZzYYnpS0@cluster0.q3za38c.mongodb.net/';




mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//bhai dekh in future tereko yaha ek problem aayega samajhne ke liye so first of all tu karega ki tu apne database ko connect karega toh uske liye tujhe ek string chahiye hogi jo ki tere database ka url hoga toh uske liye tu ek string bana lega jaise ki maine banaya hai mongoString fir tu usko mongoose.connect() me pass karega aur uske baad tujhe ek connection object milega jise tu database me store kar lega aur uske baad tujhe ek event listener chahiye hoga jisse tu pata kar sake ki database connect hua hai ya nahi toh uske liye tu database.on() me error event pass karega aur uske andar ek function jisme tu console.log() kar lega error ko aur uske baad tujhe ek event listener chahiye hoga jisse tu pata kar sake ki database connect hua hai ya nahi toh uske liye tu database.once() me connected event pass karega aur uske andar ek function jisme tu console.log() kar lega 'Database Connected' ko.
 //upar wala toh chatgpt se kiya hua h jhel h but ek simple chiz tujhko bol raha hu yaha dekh

const app = express();
app.use(bodyParser.json());//yeh line ko upar wala line ke thik niche likhna nahi likhega toh fir 1 din jayega waste hoga

app.use('/api', routes);



app.listen(5000, () => {
    console.log(`Server Started at 5000`)
})