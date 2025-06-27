CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inStock BOOLEAN DEFAULT true,
    description TEXT,
    category_id INT,
    brand VARCHAR(100),
    __typename VARCHAR(20) DEFAULT 'Product',
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(100),
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE attribute_sets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('text', 'swatch') NOT NULL,
    product_id VARCHAR(100),
    __typename VARCHAR(20) DEFAULT 'AttributeSet',
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    display_value VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    attribute_set_id INT,
    __typename VARCHAR(20) DEFAULT 'Attribute',
    FOREIGN KEY (attribute_set_id) REFERENCES attribute_sets(id) ON DELETE CASCADE
);

CREATE TABLE currencies (
    id VARCHAR(10) PRIMARY KEY,
    label VARCHAR(10) NOT NULL,
    symbol VARCHAR(5) NOT NULL,
    __typename VARCHAR(20) DEFAULT 'Currency'
);

CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    currency_id VARCHAR(10),
    __typename VARCHAR(20) DEFAULT 'Price',
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
);

CREATE TABLE product_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(100),
    price_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES prices(id)
);
