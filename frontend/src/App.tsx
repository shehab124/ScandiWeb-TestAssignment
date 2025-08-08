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
import type { Category } from './interfaces/Category.ts';
import ProductDetails from './components/ProductDetails/ProductDetails.tsx';
import { CartProvider } from 'react-use-cart';


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
  const [selectedCategory, setSelectedCategory] = useState<Category>({id: "1", name: "ALL"});
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
      <ApolloProvider client={client}>
        <CartProvider>
          <div className="App">
            <Router>
              <Navbar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              />
              <Routes>
                <Route path={`/${selectedCategory.name}`} element={<ProductList selectedCategory={selectedCategory}/>} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>

                            {/* Cart Overlay */}
              {isCartOpen && (
                <div
                  className="cart-overlay"
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 500,
                    pointerEvents: 'auto'
                  }}
                  data-testid='cart-overlay'
                />
              )}
            </Router>
          </div>
        </CartProvider>
      </ApolloProvider>
  )
}

export default App
