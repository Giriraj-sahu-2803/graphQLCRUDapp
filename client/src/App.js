//import logo from './logo.svg';
//import './App.css';
//components
import BookList from './components/bookList'
import AddBook from './components/AddBook'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
    <h1>Reading List</h1>
    <BookList/>
    <AddBook/>
    </div>
  </ApolloProvider>
  );
}

export default App;
