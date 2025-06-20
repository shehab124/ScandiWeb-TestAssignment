# E-commerce System Entity Relationship Diagram
## Entity Relationship Diagram

```mermaid
erDiagram
    Category {
        string name PK
        string __typename
    }

    Product {
        string id PK
        string name
        boolean inStock
        string description
        string category FK
        string brand
        string __typename
    }

    ProductGallery {
        string product_id FK
        string image_url
    }

    AttributeSet {
        int id PK
        string name
        string type
        string product_id FK
        string __typename
    }

    Attribute {
        int id PK
        string displayValue
        string value
        int attribute_set_id FK
        string __typename
    }

    Price {
        string id PK
        decimal amount
        string currency_id FK
        string __typename
    }

    Currency {
        string id PK
        string label
        string symbol
        string __typename
    }

    ProductPrice {
        string product_id FK
        string price_id FK
    }

    %% Relationships
    Category ||--o{ Product : "has"
    Product ||--o{ ProductGallery : "contains"
    Product ||--o{ AttributeSet : "has"
    AttributeSet ||--o{ Attribute : "contains"
    Product ||--o{ ProductPrice : "has"
    ProductPrice }o--|| Price : "references"
    Price }o--|| Currency : "uses"
```

## Database Schema

### Tables

#### 1. categories
```sql
CREATE TABLE categories (
    name VARCHAR(50) PRIMARY KEY,
    __typename VARCHAR(20) DEFAULT 'Category'
);
```

#### 2. products
```sql
CREATE TABLE products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inStock BOOLEAN DEFAULT true,
    description TEXT,
    category VARCHAR(50),
    brand VARCHAR(100),
    __typename VARCHAR(20) DEFAULT 'Product',
    FOREIGN KEY (category) REFERENCES categories(name)
);
```

#### 3. product_gallery
```sql
CREATE TABLE product_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(100),
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

#### 4. attribute_sets
```sql
CREATE TABLE attribute_sets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('text', 'swatch') NOT NULL,
    product_id VARCHAR(100),
    __typename VARCHAR(20) DEFAULT 'AttributeSet',
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

#### 5. attributes
```sql
CREATE TABLE attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    display_value VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    attribute_set_id INT,
    __typename VARCHAR(20) DEFAULT 'Attribute',
    FOREIGN KEY (attribute_set_id) REFERENCES attribute_sets(id) ON DELETE CASCADE
);
```

#### 6. currencies
```sql
CREATE TABLE currencies (
    id VARCHAR(10) PRIMARY KEY,
    label VARCHAR(10) NOT NULL,
    symbol VARCHAR(5) NOT NULL,
    __typename VARCHAR(20) DEFAULT 'Currency'
);
```

#### 7. prices
```sql
CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    currency_id VARCHAR(10),
    __typename VARCHAR(20) DEFAULT 'Price',
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
);
```

#### 8. product_prices
```sql
CREATE TABLE product_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(100),
    price_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES prices(id)
);
```

## Key Features

1. **Normalized Design**: The schema is normalized to reduce data redundancy
2. **Product-Specific Attributes**: Each product has its own attribute sets and values
3. **Multi-currency Support**: Prices are separated from products to support multiple currencies
4. **Image Gallery**: Products can have multiple images with ordering
5. **Category Management**: Simple category system with product categorization

## Sample Data Population

Based on the provided JSON, here are some sample INSERT statements:

```sql
-- Categories
INSERT INTO categories (name) VALUES ('all'), ('clothes'), ('tech');

-- Currencies
INSERT INTO currencies (id, label, symbol) VALUES ('USD', 'USD', '$');

-- Products
INSERT INTO products (id, name, inStock, description, category, brand)
VALUES ('huarache-x-stussy-le', 'Nike Air Huarache Le', true, '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy');

-- Attribute Sets (specific to each product)
INSERT INTO attribute_sets (name, type, product_id) VALUES ('Size', 'text', 'huarache-x-stussy-le');

-- Attributes (specific to each attribute set)
INSERT INTO attributes (display_value, value, attribute_set_id) VALUES
('40', '40', 1),
('41', '41', 1),
('42', '42', 1),
('43', '43', 1);

-- Prices
INSERT INTO prices (amount, currency_id) VALUES (144.69, 'USD');
```
