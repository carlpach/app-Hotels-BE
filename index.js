const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors")

//const MoviesRoutes = require('./src/api/routes/movies.routes');
const roomRoutes = require ("./src/api/routes/room.route")
const experienceRoutes = require('./src/api/routes/experience.route');
const accommodationRoutes = require('./src/api/routes/accommodation.route');
const userRouter = require('./src/api/routes/user.route');

const {connect} = require('./src/utils/db');
const { isAuth } = require('./src/middlewares/auth');
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
const app = express();
connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, PATCH'); //Decimos que metodos tenemos permitidos
  res.header('Access-Control-Allow-Credentials', 'true'); //permitimos la conexión con credenciales(Bearer token)
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // permitimos los headers del tipo Content-Type
  next();
})

app.use(cors(
  {
    origin: "*",  //si sabemos origenes podemos ponerlos en un array
    // origin: "*", // permito todas las conexiones
    credentials: true
  }
))


app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 


app.use('/accommodation', accommodationRoutes);
app.use('/experience', experienceRoutes);
app.use('/rooms' , roomRoutes);
app.use('/users', userRouter);


app.listen(PORT,  () => console.log('listening on port', PORT));