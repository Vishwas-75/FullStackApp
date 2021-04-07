const graphql = require('graphql');
const {
     GraphQLObjectType,
     GraphQLString,
     GraphQLInt,
     GraphQLID,
     GraphQLList,
     GraphQLSchema,
     GraphQLNonNull
} = graphql;
const Book = require('../models/book');
const Author = require('../models/author');

let books = [
     {
          id: '1',
          name: 'The Red Dot',
          genre: 'Horror',
          authorId: '1'
     },
     {
          id: '2',
          name: 'Two Birds',
          genre: 'Love',
          authorId: '2'
     },
     {
          id: '3',
          name: 'Idiots',
          genre: 'Comedy',
          authorId: '2'
     },
     {
          id: '4',
          name: 'CovelentBond',
          genre: 'Friends',
          authorId: '3'
     }, {
          id: '5',
          name: 'Horny',
          genre: 'Sex',
          authorId: '3'
     }, {
          id: '6',
          name: '3days',
          genre: 'Joy',
          authorId: '3'
     },

];

let authors = [
     {
          id: '1',
          name: 'Jhon Snow',
          age: 36
     }, {
          id: '2',
          name: 'Steve Rogers',
          age: 35
     }, {
          id: '3',
          name: 'Will Smith',
          age: 40
     },

]


const BookType = new GraphQLObjectType({

     name: 'Book',
     fields: () => (
          {
               bookId: {
                    type: GraphQLID
               },
               name: {
                    type: GraphQLString
               },
               genre: {
                    type: GraphQLString
               },
               authorId: {
                    type: GraphQLID
               },
               author: {
                    type: AuthorType,
                    resolve(parent, args) {

                         return Author.findOne({authorId: parent.authorId})
                    }

               }

          }
     )

});

const AuthorType = new GraphQLObjectType({

     name: 'Author',
     fields: () => (
          {
               authorId: {
                    type: GraphQLID
               },
               name: {
                    type: GraphQLString
               },
               age: {
                    type: GraphQLInt
               },
               books: {
                    type: GraphQLList(BookType),
                    resolve: async (parent, _) => {
                         let Books = await Book.find({authorId: parent.authorId});
                         return Books;

                    }

               }

          }
     )

});

const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
          book: {
               type: BookType,
               args: {
                    bookId: {
                         type: GraphQLID
                    }
               },
               resolve: async (parent, args) => {
                    let book = await Book.findOne({bookId: args.bookId})
                    console.log(args.bookId);
                    console.log(book)
                    return book
               }
          },


          author: {
               type: AuthorType,
               args: {
                    authorId: {
                         type: GraphQLID
                    }
               },
               resolve: async (parent, args) => {
                    let author = await  Author.findOne({authorId:1})
                    console.log(author)
                    return author
               }
          },

          allBooks: {
               type: GraphQLList(BookType),
               resolve: async () => {
                    let books = await Book.find({});
                    return books;
               }
          },

          allAuthors: {
               type: GraphQLList(AuthorType),
               resolve: async () => {
                    let authors = await Author.find();
                    return authors;
               }
          }
     }


});

const Mutation = new GraphQLObjectType({
     name: 'Mutation',
     fields: {
          addAuthor: {
               type: AuthorType,
               args: {
                    authorId: {
                         type: new GraphQLNonNull(GraphQLInt)
                    },
                    name: {
                         type: new GraphQLNonNull(GraphQLString) 
                    },
                    age: {
                         type: new GraphQLNonNull(GraphQLInt) 
                    }
               },
               resolve: async (parent, args) => {
                    let author = new Author({authorId: args.authorId, name: args.name, age: args.age});
                    let response;
                    console.log(args.name, args.age);


                    return author.save().then((res) => {
                         response = res;
                         return res
                    }).catch((err) => {
                         response = err;
                         return err
                    })


               }
          },
          addBook: {
               type: BookType,
               args: {
                    bookId: {
                         type:new GraphQLNonNull(GraphQLInt)
                    },
                    name: {
                         type:new GraphQLNonNull(GraphQLString)
                    },
                    genre: {
                         type:new GraphQLNonNull(GraphQLString)
                    },
                    authorId: {
                         type: new GraphQLNonNull(GraphQLInt)
                    }

               },
               resolve: async (parents, args) => {
                    let book = new Book({bookId: args.bookId, name: args.name, genre: args.genre, authorId: args.authorId})

                    console.log(book)

                    return book.save().then((res) => {
                         return res
                    }).catch((err) => {
                         return err;
                    });
               }
          },
          deleteAuthor: {
               type: AuthorType,
               args: {
                    authorId: {
                         type: GraphQLID
                    }
               },
               resolve: async (parent, args) => {
                    console.log(args)
                    const Removed = await Author.findOneAndDelete({age:args.authorId});
                    if (! Removed) {
                         throw new Error('error')
                    }
                    return Removed;

               }

          },
          deleteBook: {
               type: BookType,
               args: {
                    bookId: {
                         type: GraphQLID
                    }
               },
               resolve: async (_, args) => {
                    const removed = await Book.findOneAndDelete({bookId: args.bookId})
                    if (! removed) {
                         throw new Error("error")
                    }
                    return removed;
               }
          }
     }

})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation});
