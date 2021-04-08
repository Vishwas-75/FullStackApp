const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors =require('cors')

const app = express()

//alllow cross origin request 
app.use(cors())
mongoose.connect('mongodb://localhost/fullStackApp', { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true})
mongoose.set("useCreateIndex", true)
mongoose.connection.once('open',()=>
{
  console.log('connected to dataBase')
})


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,

}));

app.listen(4000., () => {
  console.log("now listening for request  port 4000");
})