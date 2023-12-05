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

INSERT INTO products (name,description,price,category,active,image)
VALUES
('red','A primary colour',199,'Primary',True,'#ff0000'),
('blue','A primary colour',199,'Primary',True,'#0000ff'),
('yellow','A primary colour',199,'Primary',True,'#ffff00'),
('orange','A secondary colour made by mixing red and yellow',299,'Secondary',True,'#ffa500'),
('purple','A secondary colour made by mixing red and blue',299,'Secondary',True,'#800080'),
('green','A secondary colour made by mixing blue and yellow',299,'Secondary',True,'#008000'),
('teal','A tertiary colour made by mixing blue and green',499,'Tertiary',True,'#008080'),
('chartreuse','A tertiary colour made by mixing yellow and green',499,'Tertiary',True,'#7fff00'),
('vermilion','A tertiary colour made by mixing red and orange',499,'Tertiary',True,'#e34324'),
('magenta','A tertiary colour made by mixing red and purple',499,'Tertiary',True,'#ff00ff'),
('violet','A tertiary colour made by mixing blue and purple',499,'Tertiary',True,'#ee82ee'),
('amber','A tertiary colour made by mixing yellow and orange',499,'Tertiary',True,'#ffbf00'),
('black','The very darkest colour owing to the absence of or complete absorption of light; the opposite of white',99,'Other',True,'#000000'),
('white','The colour of milk or fresh snow, due to the reflection of all visible rays of light; the opposite of black',99,'Other',True,'#ffffff');