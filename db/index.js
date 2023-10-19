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
module.exports = {query,userExists,addUser};