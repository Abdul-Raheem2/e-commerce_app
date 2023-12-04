CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password varchar(100),
    first_name TEXT,
    auth_method TEXT
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    price INTEGER,
    category TEXT,
    active BOOLEAN,
    image TEXT
);

CREATE TABLE baskets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE baskets_products(
    basket_id INTEGER,
    product_id INTEGER,
    quantity INTEGER CHECK (quantity >=0),
    PRIMARY KEY (basket_id,product_id),
    FOREIGN KEY (basket_id) REFERENCES baskets(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    order_date timestamptz,
    num_products INTEGER,
    total_cost INTEGER,
    status TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE orders_products(
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER CHECK (quantity >=0),
    PRIMARY KEY (order_id,product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);