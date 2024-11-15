// const pool = require('../index');
const mysql = require('mysql2');

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

// Conexão com o banco
const getChildren = async (req, res) => {

    let query = 'SELECT * FROM crianca;'
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Rota para criar a criança, agora com o ID do responsável
const createChildren = async (req, res) => {
    console.log(req.body); // Verificar o conteúdo de req.body

    const { nomeCrianca, dtNasc, pontos, responsavelId } = req.body;

    if (!responsavelId) {
        return res.status(400).json({ message: "Responsável não encontrado" });
    }

    const query = 'INSERT INTO crianca (nomeCrianca, dtNasc, pontos, responsavel) VALUES (?, ?, ?, ?)';
    const values = [nomeCrianca, dtNasc, 0, responsavelId]; // Aqui estamos passando o ID do responsável

    pool.query(query, values, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao cadastrar criança', error });
        }
        res.status(201).json({ message: 'Criança cadastrada com sucesso', idCrianca: result.insertId });
    });
};


module.exports = { getChildren, createChildren };
