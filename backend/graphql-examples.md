# GraphQL Query Examples

## Test your GraphQL API with these queries

### 1. Get All Products (Basic Info)
```graphql
query {
  products {
    id
    name
    inStock
    brand
    price {
      amount
      symbol
    }
    category {
      name
    }
  }
}
```

### 2. Get Single Product (Full Details)
```graphql
query {
  product(id: "nike-air-huarache-le") {
    id
    name
    inStock
    description
    brand
    category {
      name
    }
    price {
      amount
      currency
      symbol
    }
    gallery {
      id
      url
      order
    }
    attributes {
      name
      type
      values
    }
  }
}
```

### 3. Get Products by Category
```graphql
query {
  productsByCategory(category: "clothes") {
    id
    name
    inStock
    brand
    price {
      amount
      symbol
    }
  }
}
```

### 4. Get All Categories
```graphql
query {
  categories {
    id
    name
  }
}
```

### 5. Minimal Product Query (Fast)
```graphql
query {
  product(id: "playstation-5") {
    id
    name
    price {
      amount
      symbol
    }
  }
}
```

## How to Test

1. **Using curl:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { id name price { amount } } }"}' \
  http://localhost:8000/graphql
```

2. **Using a GraphQL client (like Insomnia, Postman, or Apollo Studio)**

3. **Using the browser console:**
```javascript
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: '{ products { id name price { amount } } }'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Expected Response Structure

For a product query, you should get:
```json
{
  "data": {
    "product": {
      "id": "nike-air-huarache-le",
      "name": "Nike Air Huarache Le",
      "inStock": true,
      "description": "<p>Great sneakers for everyday use!</p>",
      "brand": "Nike x Stussy",
      "category": {
        "name": "clothes"
      },
      "price": {
        "amount": 144.69,
        "currency": "USD",
        "symbol": "$"
      },
      "gallery": [
        {
          "id": 1,
          "url": "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
          "order": 1
        }
      ],
      "attributes": [
        {
          "name": "Size",
          "type": "text",
          "values": ["40", "41", "42", "43"]
        }
      ]
    }
  }
}
```

## Performance Notes

- **Basic queries** (without gallery/attributes) will be faster
- **Full product queries** will execute multiple database queries
- **Gallery and attributes** are only fetched when requested
- **Category and price** are always included with the main product query
