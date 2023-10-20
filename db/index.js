const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
 
const query = (text, params, callback) => pool.query(text, params,callback);

const userExists = async (email) => {
    return (await pool.query('SELECT id FROM users WHERE LOWER(email) = LOWER($1)',[email])).rowCount;
}

const addUser = async (email,hashPassword,first_name,last_name) => {
    return await pool.query('INSERT INTO users (email,password,first_name,last_name) VALUES ($1,$2,$3,$4)',[email,hashPassword,first_name,last_name]);
}

const findUserByEmail = async (email) => {
    const results = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    return(results.rows[0]);
}

const findUserById = async (id) => {
    const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return(results.rows[0]);
}
module.exports = {query,userExists,addUser,findUserByEmail,findUserById};