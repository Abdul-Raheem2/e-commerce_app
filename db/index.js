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

const addUser = async (email,hashPassword,first_name,last_name) => {
    await pool.query('INSERT INTO users (email,password,first_name,last_name) VALUES ($1,$2,$3,$4)',[email,hashPassword,first_name,last_name]);
}

const findUserByEmail = async (email) => {
    const results = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1', [email]);
    return(results.rows[0]);
}

const findUserById = async (id) => {
    const results = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
    return(results.rows[0]);
}

const updateUser = async (id,email,first_name,last_name) =>{
    await pool.query('UPDATE users SET email=$1,first_name=$2,last_name=$3 WHERE id=$4',
    [email,first_name,last_name,id]);
}

const updatePassword = async (id,password) => {
    await pool.query('UPDATE users SET password=$1 WHERE id=$2',[password,id]);
}

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1',[id]);
}

//products

const allProducts = async () => {
    const results = await pool.query('SELECT * FROM products');
    return results.rows;
}

const productsByCategory = async (category) => {
    const results = await pool.query('SELECT * FROM products WHERE category = $1',[category]);
    return results.rows;
}

const productById = async (id) => {
    const results = await pool.query('SELECT * FROM products WHERE id = $1 LIMIT 1',[id]);
    return results.rows[0];
}

//basket

const basketByUserID = async (user_id) => {
    const results = await pool.query(`SELECT products.id AS product_id,products.name AS name,products.price AS price,
    products.category AS category,baskets_products.quantity AS quantity FROM baskets_products 
    INNER JOIN products ON products.id = baskets_products.product_id WHERE user_id = $1`,[user_id]);
    return results.rows;
}

const addToBasket = async (user_id,product_id,quantity) => {
    const InsertResults = await pool.query(`INSERT INTO baskets_products (user_id,product_id,quantity) VALUES ($1,$2,$3)`,
    [user_id,product_id,quantity]);
    const newProduct = await pool.query(`SELECT products.id AS product_id,products.name AS name,products.price AS price,
    products.category AS category,baskets_products.quantity AS quantity FROM baskets_products 
    INNER JOIN products ON products.id = baskets_products.product_id WHERE user_id = $1 AND product_id = $2 LIMIT 1`,[user_id,product_id]);
    return newProduct.rows[0];
}

const updateProductQuantity = async (user_id,product_id,quantity) => {
    const results = await pool.query(`UPDATE baskets_products SET quantity = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *`,
    [user_id,product_id,quantity]);
    if(results.rowCount ===1){
        const updatedProduct = await pool.query(`SELECT products.id AS product_id,products.name AS name,products.price AS price,
        products.category AS category,baskets_products.quantity AS quantity FROM baskets_products 
        INNER JOIN products ON products.id = baskets_products.product_id WHERE user_id = $1 AND product_id = $2 LIMIT 1`,[user_id,product_id]);
        return updatedProduct.rows[0];
    }
}

const deleteFromBasket = async (user_id,product_id) => {
    await pool.query('DELETE FROM baskets_products WHERE user_id = $1 and product_id = $2',[user_id,product_id]);
}

//orders (checkout)

const newOrder = async (userId,numProducts,totalCost) => {
    const results = await pool.query(`INSERT INTO orders (user_id,order_date,num_products,total_cost)
    VALUES ($1,NOW(),$2,$3) RETURNING *`,[userId,numProducts,totalCost]);
    return results.rows[0];
}

const deleteBasket = async (userId) => {
    await pool.query('DELETE FROM baskets_products WHERE user_id = $1',[userId]);
}

const addProductsToOrder = async (values) => {
    await pool.query(format('INSERT INTO orders_products (order_id,product_id,quantity) VALUES %L',values));
}

/* const basketToOrder = async (userId,orderId) => {
    const results = await pool.query (`WITH basket AS (
        DELETE FROM baskets_products WHERE user_id = $1 RETURNING *
    )
    INSERT INTO orders_products (product_id,quantity) 
    SELECT `)
}
 */
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
    addProductsToOrder
};