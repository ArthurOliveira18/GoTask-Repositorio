// const pool = require('../index');
const mysql = require('mysql2');

// Conexão com o banco
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


const getBeneficio = async (req, res) => {

    let query = 'SELECT * FROM beneficio;'
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};



// Rota para criar a criança, agora com o ID do responsável
const createBeneficio = async (req, res) => {
    const { Nome_ben, pontos_ben, idResp } = req.body;

    if (!Nome_ben || !pontos_ben || !idResp) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const query = 'INSERT INTO beneficio (Nome_ben, pontos_ben, RespB) VALUES (?, ?, ?)';
    const values = [Nome_ben, pontos_ben, idResp];

    pool.query(query, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao cadastrar benefício', error });
        }
        res.status(201).json({ message: 'Benefício cadastrado com sucesso', idBeneficio: result.insertId });
    });
};

// Rota para buscar um benefício por ID
const getBeneficioById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM beneficio WHERE idBeneficio = ?';
    pool.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).json({ message: 'Benefício não encontrado.' });
      res.json(results[0]);
    });
  };
  
  // Rota para atualizar um benefício
  const updateBeneficio = (req, res) => {
    const { id } = req.params;
    const { Nome_ben, pontos_ben } = req.body;
    const query = 'UPDATE beneficio SET Nome_ben = ?, pontos_ben = ? WHERE idBeneficio = ?';
    pool.query(query, [Nome_ben, pontos_ben, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Benefício atualizado com sucesso!' });
    });
  };

  const deleteBeneficio = (req, res) => {
    const { id } = req.params;

    // Primeiro, verificar se o benefício existe
    const checkQuery = 'SELECT * FROM beneficio WHERE idBeneficio = ?';
    pool.query(checkQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao verificar o benefício', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Benefício não encontrado.' });
        }

        // Tenta excluir o benefício
        const deleteQuery = 'DELETE FROM beneficio WHERE idBeneficio = ?';
        pool.query(deleteQuery, [id], (error, result) => {
            if (error) {
                // Se houver um erro de chave estrangeira (como dependência em outra tabela), retornamos um erro
                if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({ message: 'Não é possível excluir o benefício, ele está em uso em outro lugar.' });
                }
                return res.status(500).json({ message: 'Erro ao excluir o benefício', error: error });
            }
            // Se a exclusão foi bem-sucedida
            res.json({ message: 'Benefício excluído com sucesso!' });
        });
    });
};
  
  module.exports = { getBeneficio, createBeneficio, getBeneficioById, updateBeneficio, deleteBeneficio };
  
