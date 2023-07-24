const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors")


const roomRoutes = require('./src/api/routes/room.route');
const bookingRoutes = require('./src/api/routes/booking.route');
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

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:4200", "http://127.0.0.1:5500"],
  // origin: "*", // permito todas las conexiones
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 


app.use('/accommodation', accommodationRoutes);
app.use('/bookings', bookingRoutes);
app.use('/rooms', roomRoutes);
app.use('/users', userRouter);

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json('Route not found');
});

// Manejo de errores inesperados
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(`Error: ${error.message || "Unexpected error"}`);
});

app.listen(PORT,  () => console.log('listening on port', PORT));