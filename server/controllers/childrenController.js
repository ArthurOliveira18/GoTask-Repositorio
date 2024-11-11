// const pool = require('../index');
const mysql = require('mysql2');

// Conexão com o banco
const getChildren = async (req, res) => {
    const pool = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "gotask",
        port: 3306
    });


    pool.connect((erro) => {
        if (erro) {
            console.log(erro);
        } else {
            console.log("Conectado com sucesso");
        }
    });

    let query = 'SELECT * FROM crianca;'
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};



const createChildren = async (req, res) => {
    // Capturando os dados do req.body com os mesmos nomes das colunas no MySQL
    const { nomeCrianca, dtNasc, pontos, responsavel } = req.body;

    // Query de inserção no MySQL com os nomes corretos das colunas
    const query = 'INSERT INTO crianca (nomeCrianca, dtNasc, pontos, responsavel) VALUES (?, ?, ?, ?)';
    const values = [nomeCrianca, dtNasc, 0, responsavel];

    // Executa a query
    conn.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar criança', error });
        }
        res.status(201).json({ message: 'Criança cadastrada com sucesso', idCrianca: result.insertId });
    });
};


module.exports = { getChildren, createChildren };
