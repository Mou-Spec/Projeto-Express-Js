const db = require('../connect/db');

const Usuario = {
    getAll: () => {
        return new Promise((resolve,reject)=> {
            db.query('SELECT * FROM usuarios', (err,result) => {
                if(err) reject (err);
                else resolve(result);
            });
        });
    },
    
    create: (nome,email,senha) => {
        return new Promise((resolve,reject) => {
            const sql = 'INSERT INTO usuarios (nome,email, senha, telefone, endereco) VALUES (?,?, ?, ?, ?)';

            db.query(sql,[nome,email,senha], (err,result) => {
                if (err) reject(err);

                else resolve(result);
        });
    });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM usuarios WHERE id = ?';

            db.query(sql, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = Usuario;