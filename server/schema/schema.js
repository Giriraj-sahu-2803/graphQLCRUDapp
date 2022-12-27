const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
// const books = [
//   { name: "NOWG1", genre: "Fantasy1", id: "1", authorId: "1" },
//   { name: "NOWG2", genre: "Fantasy2", id: "2", authorId: "2" },
//   { name: "NOWG3", genre: "Fantasy3", id: "3", authorId: "3" },
//   { name: "NOWG4", genre: "Fantasy2", id: "4", authorId: "1" },
//   { name: "NOWG5", genre: "Fantasy3", id: "5", authorId: "2" },
//   { name: "NOWG6", genre: "Fantasy2", id: "6", authorId: "3" },
//   { name: "NOWG7", genre: "Fantasy3", id: "7", authorId: "1" },
// ];
// const authors = [
//   { name: "WG", age: 33, id: "1" },
//   { name: "WG2", age: 22, id: "2" },
//   { name: "WG3", age: 44, id: "3" },
// ];
const AuthorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parents, args) {
        return _.find(authors, { id: parents.authorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parents, args) {
        const book = await Book.findById(args.id);
        return { ...book._doc, id: book._id.toString() };
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parents, args) {
        const author = await Author.findById(args.id);
        return { ...author._doc, id: author._id.toString() };
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parents, args) {
        const books = await Book.find();
        const returningBooks=books.map((res)=>{return {...res._doc,id:res._id.toString()}});
        return returningBooks;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        const authors = await Author.find();
        const returningAuthors=authors.map((res)=>{return {...res._doc,id:res._id.toString()}})
        return returningAuthors;
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const author = Author({
          name: args.name,
          age: args.age,
        });
        const addedAuthor = await author.save();
        return { ...addedAuthor._doc, id: addedAuthor._id.toString() };
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const book = Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        const updatedBook = await book.save();
        console.log(updatedBook);
        return { ...updatedBook._doc, id: updatedBook._id.toString() };
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
