const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');


const postRoute = require('./routes/posts')
const userRoute = require('./routes/users')

const app = express()
dotenv.config()

//middle ware 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())
app.use('/api/posts',postRoute)
app.use('/api/user', userRoute)

//connect db
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.CONNECT_DB)
    .then(()=> app.listen(5000,() =>console.log("server is running at 5000")))
    .catch((error) => console.log(error.message))