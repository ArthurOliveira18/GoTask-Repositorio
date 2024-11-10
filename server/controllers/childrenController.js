const mysql = require('mysql2');

// Conexão com o banco de dados
const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

// Função para obter as crianças associadas ao responsável logado
const getChildren = async (req, res) => {
    const responsavelId = req.headers['responsavel-id']; // Pega o id do responsável no cabeçalho

    if (!responsavelId) {
        return res.status(400).json({ message: 'Responsável não informado' });
    }

    // Query para selecionar as crianças associadas ao responsável
    const query = 'SELECT * FROM crianca WHERE responsavel = ?';
    
    pool.query(query, [responsavelId], (err, results) => {
        if (err) {
            return res.status(500).send(err); // Em caso de erro, retorna 500 com a mensagem do erro
        }
        res.json(results); // Retorna as crianças filtradas pelo id do responsável
    });
};




// Função para criar a criança
const createChildren = async (req, res) => {
    const { nomeCrianca, dtNasc } = req.body;
    const responsavelId = req.headers['responsavel-id']; // Obtém o id do responsável do cabeçalho

    if (!responsavelId) {
        return res.status(400).json({ message: 'Responsável não informado' });
    }

    try {
        const query = 'INSERT INTO crianca (nomeCrianca, dtNasc, pontos, responsavel) VALUES (?, ?, ?, ?)';
        pool.query(query, [nomeCrianca, dtNasc, 0, responsavelId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao criar criança', error: err });
            }
            res.status(201).json({ idCrianca: result.insertId, nomeCrianca, dtNasc, responsavel: responsavelId });
        });
    } catch (error) {
        console.error('Erro ao criar criança:', error);
        res.status(500).json({ message: 'Erro ao criar criança', error });
    }
};

module.exports = { getChildren, createChildren };
