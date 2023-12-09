require('dotenv').config();
const express=require("express");

var cors = require('cors')
const path=require('path')
const db=require('./config/mongoose')
const port=process.env.PORT;
// Creating session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passportLocalStraget');

// requiring mongo-store, so that we can use the existing user even after server start
const MongoStore = require('connect-mongo');

const app=express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded())

// parse application/json
app.use(express.json())

// app.use(express.static(path.join(__dirname,'../frontend/login/build')))
// app.get('*',(req,res)=>{
//   res.sendFile(path.join("../frontend/login/build/index.html"))
// })
// mongo store is used to store the session cookie in the db 
app.use(session({
  name: "Intern",
  // change secret during before deployment in production 
  secret: "Intern",
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create({
      mongoUrl:process.env.MONGO_DB_URL ,
      autoRemove: 'disabled'
  },
      (err) => {
          console.log(err || 'connect-mongo setup ok');
      }
  )
}))


app.use(passport.initialize());

app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}))


app.use('/',require('./router/index'))
app.listen(port,
function (err){
  if(err){
    console.log(`server error on port ${port}`)

  }
  else{
    console.log(`server is running on ${port}`);
  }
      

})