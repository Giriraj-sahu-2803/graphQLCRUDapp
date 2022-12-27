import { gql } from "@apollo/client";

const GET_BOOKS_QUERY = gql`
  query {
    books {
      name
      id
    }
  }
`;
const GET_AUTHORS_QUERY = gql`
  query {
    authors {
      name
      age
      id
    }
  }
`;
const ADD_BOOK_MUTATION=(name,genre,author)=>{
  return  gql`
  mutation{
      addBook(name:name,genre:genre,author:author){
        name
        id
      }
  }
  ` 
}

export { GET_BOOKS_QUERY, GET_AUTHORS_QUERY,ADD_BOOK_MUTATION };
