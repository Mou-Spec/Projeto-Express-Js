const mysql = require("mysql2")


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '244466666',
    database: 'ecoguia'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com banco de dados', err);
    } else {
        console.log('Conectado ao banco de dados com sucesso.');
    }
});

module.exports = db;
