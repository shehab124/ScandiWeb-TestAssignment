import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import ProductList from './components/ProductList/ProductList.tsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
  } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { useState } from 'react';
import { Category } from './classes/Category';
import ProductDetails from './components/ProductDetails/ProductDetails.tsx';


const errorLink = onError(({ graphQLErrors}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations }) => {
      alert(`Graphql error ${message} at ${locations?.[0]?.line}:${locations?.[0]?.column}`);
    });
  }
})

const link = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost/graphql',
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(new Category("1", "ALL"));

  return (
      <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          <Routes>
            <Route path="/" element={<ProductList selectedCategory={selectedCategory}/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </div>
      </ApolloProvider>
  )
}

export default App
