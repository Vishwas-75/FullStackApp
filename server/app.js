import express from 'express';
import {graphqlHTTP}   from 'express-graphql';
import { buildSchema } from  'graphql';
import schema from './schema/schema.js';

const app=express()



app.use('/graphql', graphqlHTTP({
   schema,
   graphiql:true,
  
}));

app.listen(4000.,()=>{
  console.log("now listening for request  port 4000");
})