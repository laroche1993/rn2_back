require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
//routes
const user_routes = require("../src/routes/users_routes")
const login = require('../src/routes/login')
const cars = require('./routes/cars_router')
const articles = require('./routes/articles_routes')
const buyCar = require('./routes/buy_cars_routes')
const sellCar = require('./routes/sell_car_routes')
const pawnCar = require('./routes/pawn_car_routes')


//Database
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost/rn2"

async function connectDatabase() {
  try {
    await mongoose.connect(URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
    console.log("Database is conected")
  } catch (error) {
    console.log(error)
  }


}
connectDatabase()

//Settings
app.set("port", process.env.PORT || 3000)

//Midelwares
app.use(express.json())
app.use(cors())
//Routes
app.use("/api/users",user_routes)
app.use("/api/login",login)
app.use("/api/cars",cars)
app.use("/api/articles",articles)
app.use('/api/buyCar',buyCar)
app.use('/api/sellCar',sellCar)
app.use('/api/pawnCar',pawnCar)

//StaticFiles

//server
app.listen(app.get("port"), () => {
  console.log("Server is running in" + app.get("port"))
});