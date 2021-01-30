const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config({path: './config/config.env'})
const baseRoutes = require("./routes/index")
const errrorHandler = require("./middleware/error")

const app = express();
app.use(cors())
app.use(express.json());
app.use("",baseRoutes)
app.use(errrorHandler)


const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
