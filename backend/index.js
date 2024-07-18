const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cors());
app.use(bodyParser.json());


const uri = process.env.ATLAS_SECRET;

(async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); 
    }
})();

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected successfully');
});

//routes

app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'));



app.get('/',(req,res)=>{
    res.send("hello world")
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
