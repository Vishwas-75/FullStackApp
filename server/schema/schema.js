
import  graphql from 'graphql';


import {GraphQLObjectType,GraphQLString,GraphQLSchema} from 'graphql';

let books=[
  {id:'1',name:'The Red Dot',genre:'Horror'},
  {id:'2',name:'Two Birds',genre:'Love'},
  {id:'3',name:'Idiots',genre:'Comedy'},
];


const BookType=new GraphQLObjectType({
   
    name:'Book',
    fields:()=>
    ({
      id:{type:GraphQLString},
      name:{type:GraphQLString},
      genre:{type:GraphQLString}
    })

});

const RootQuery=new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book:{
      type:BookType,
      args:{id:{type:GraphQLString}},
      resolve(parent,args){
         //code to get data from db//
          // console.log(Books.find((book)=>book.id===args.id))
        //  return Books.find((book)=>book.id===id)
        // console.log(_.find(books,{id:args.id}));

       return books.find(({id})=>id === args.id);
        // return _.find(books, {id: args.id});
       
      }
    }
  }


})

export default new GraphQLSchema({
  query:RootQuery
});

 