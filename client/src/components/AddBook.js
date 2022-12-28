import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION,GET_BOOKS_QUERY } from "../queries/queries";



function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthorId] = useState("");
  const { data, loading, error ,refetch} = useQuery(GET_AUTHORS_QUERY);
  const [addBook, { data: bookdata, loading: bookLoading, error: bookError }] =
    useMutation(ADD_BOOK_MUTATION);

  
    if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const displayAuthors = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error: {error.message}</p>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = async function (e) {
    e.preventDefault();
    console.log({ name, genre, author });
    await addBook({
      variables: {
        name: name,
        genre: genre,
        author: author.toString(),
      },
    }).then(()=>{
    
    });
  };
  return (
    <div>
      {/* {console.log(data)} */}
      {console.log(bookdata)}
      <form
        id="add-book"
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Genre :</label>
          <input
            type="text"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Author :</label>
          <select
            onChange={(e) => {
              setAuthorId(e.target.value);
            }}
          >
            <option>Select Author</option>
            {displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default AddBook;
