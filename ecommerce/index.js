const express = require("express")
const bodyParser = require('body-parser')
const path = require("path")
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

const {
  logErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errosHandler')

// app
const app = express()

// middlewares
app.use(bodyParser.json())

// static files 
app.use("/static", express.static(path.join(__dirname, "public")))

// View engines setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// routes
app.use("/products", productsRouter)
app.use("/api/products", productsApiRouter)

// redirect
app.get('/', function(req, res){
  res.redirect('/products')
})

// error handlers
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`)
});

