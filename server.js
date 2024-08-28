const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const userRoutes = require('./routes/userRoutes');
const dbConnect = require('./db/db');
const cors = require('cors');

//saving express into a variable
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//DB connection
dbConnect();

//routes
app.use('/api/users', userRoutes);



//running server
app.listen(PORT, (req,res) => {
    console.log(`Server running on port ${PORT}`)
});
