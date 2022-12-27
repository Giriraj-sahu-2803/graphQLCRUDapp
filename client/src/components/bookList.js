import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
function BookList() {
  const { data, loading, error } = useQuery(GET_BOOKS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const displayBooks = () => {
    return data.books.map((book) => <li key={book.id}>{book.name}</li>);
  };
  return (
    <>
      <h1>Book List</h1>
      <ul>{displayBooks()}</ul>
    </>
  );
}

export default BookList;
