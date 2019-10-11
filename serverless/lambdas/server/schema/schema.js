const graphql = require("graphql")
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = graphql;
const {
  getBook,
  getBooks,
  getBooksByAuthor,
  getAuthor,
  getAuthors
} = require('../database/dynamodb')


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        console.log(`Retrieving author with id ${parent.authorId}`)
        return await getAuthor(parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        console.log(`Retrieving books by author ${parent.name}`)
        return await getBooksByAuthor(parent.id)
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // code to get data from db
        console.log(`Retrieving book with id ${args.id}`)
        return await getBook(args.id)
      }
    },
    books: {
      type: GraphQLList(BookType),
      async resolve(parent, args) {
        console.log(`Retrieving books`)
        return await getBooks()
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        console.log(`Retrieving author with id ${args.id}`)
        return await getAuthor(args.id)
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      async resolve(parent, args) {
        console.log(`Retrieving authors`)
        return await getAuthors()
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
