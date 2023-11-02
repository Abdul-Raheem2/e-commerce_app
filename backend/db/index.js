const Pool = require('pg').Pool;
const format = require('pg-format');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
 
//const query = (text, params, callback) => pool.query(text, params,callback);

//users

const userExists = async (email) => {
    return (await pool.query('SELECT id FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',[email])).rowCount;
}

const addUser = async (email,hashPassword,firstName,lastName) => {
    await pool.query('INSERT INTO users (email,password,first_name,last_name) VALUES ($1,$2,$3,$4)',[email,hashPassword,firstName,lastName]);
}

const findUserByEmail = async (email) => {
    return (await pool.query('SELECT id,email,password FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1', [email])).rows[0];
}

const findUserById = async (id) => {
    return (await pool.query('SELECT id,email,first_name,last_name FROM users WHERE id = $1 LIMIT 1', [id])).rows[0];
}

const updateUser = async (id,email,firstName,lastName) =>{
    return (await pool.query('UPDATE users SET email=$1,first_name=$2,last_name=$3 WHERE id=$4 RETURNING id,email,first_name,last_name',
    [email,firstName,lastName,id])).rows[0];
}

const updatePassword = async (id,password) => {
    await pool.query('UPDATE users SET password=$1 WHERE id=$2',[password,id]);
}

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1',[id]);
}

//products

const allProducts = async () => {
    return (await pool.query('SELECT id,name,price,category FROM products WHERE active = True')).rows;
}

const productsByCategory = async (category) => {
    return (await pool.query('SELECT id,name,price,category FROM products WHERE category = $1 AND active = True',[category])).rows;
}

const productById = async (id) => {
    return (await pool.query('SELECT id,name,description,price,category FROM products WHERE id = $1 LIMIT 1',[id])).rows[0];
}

//basket

const basketByUserID = async (userId) => {
    return (await pool.query(`SELECT products.id AS product_id,products.name AS name,products.price AS price,
    products.category AS category,baskets_products.quantity AS quantity FROM baskets_products 
    INNER JOIN products ON products.id = baskets_products.product_id WHERE user_id = $1`,[userId])).rows;
}

const addToBasket = async (userId,productId,quantity) => {
    await pool.query(`INSERT INTO baskets_products (user_id,product_id,quantity) VALUES ($1,$2,$3)`,
    [userId,productId,quantity]);
    return (await pool.query(`SELECT products.id AS product_id,products.name AS name,products.price AS price,
    products.category AS category,baskets_products.quantity AS quantity FROM baskets_products 
    INNER JOIN products ON products.id = baskets_products.product_id WHERE user_id = $1 AND product_id = $2 LIMIT 1`,
    [userId,productId])).rows[0];
}

const updateProductQuantity = async (userId,productId,quantity) => {
    const updatedProduct = await pool.query(`UPDATE baskets_products SET quantity = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *`,
    [userId,productId,quantity]);
    if(updatedProduct.rowCount ===1){
        return (await pool.query(`SELECT products.id AS product_id,products.name AS name,products.price AS price,
        products.category AS category,baskets_products.quantity AS quantity FROM baskets_products 
        INNER JOIN products ON products.id = baskets_products.product_id WHERE user_id = $1 AND product_id = $2 LIMIT 1`,
        [userId,productId])).rows[0];
    }
}

const deleteFromBasket = async (userId,productId) => {
    await pool.query('DELETE FROM baskets_products WHERE user_id = $1 and product_id = $2',[userId,productId]);
}

//orders (checkout)

const newOrder = async (userId,numProducts,totalCost) => {
    return (await pool.query(`INSERT INTO orders (user_id,order_date,num_products,total_cost,status)
    VALUES ($1,NOW(),$2,$3,$4) RETURNING *`,[userId,numProducts,totalCost,'pending'])).rows[0];
}

const deleteBasket = async (userId) => {
    await pool.query('DELETE FROM baskets_products WHERE user_id = $1',[userId]);
}

const addProductsToOrder = async (values) => {
    await pool.query(format('INSERT INTO orders_products (order_id,product_id,quantity) VALUES %L',values));
}

//orders
const allOrders = async (userId) => {
    return (await pool.query('SELECT * FROM orders WHERE user_id = $1',[userId])).rows;
}

const orderDetails = async (userId,orderId) => {
    const order = await pool.query('SELECT * FROM orders WHERE user_id = $1 AND id =$2 LIMIT 1',[userId,orderId]);
    if(order.rowCount){
        const orderProducts = await pool.query(`SELECT products.id AS product_id, orders_products.quantity AS quantity, 
        products.name AS name, products.description AS description, products.price AS price, products.category AS category
        FROM orders_products INNER JOIN products ON products.id = orders_products.product_id
        WHERE order_id = $1`,[orderId]);
        return({
            ...order.rows[0],
            products:orderProducts.rows
        })
    }
}

module.exports ={
    //query,
    userExists,
    addUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
    updatePassword,
    allProducts,
    productsByCategory,
    productById,
    basketByUserID,
    addToBasket,
    deleteFromBasket,
    updateProductQuantity,
    newOrder,
    deleteBasket,
    addProductsToOrder,
    allOrders,
    orderDetails
};