const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')



const app = express()
 
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