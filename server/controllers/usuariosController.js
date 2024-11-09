const mysql = require('mysql2');

// Configuração da conexão do banco de dados
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
}).promise();

const getUsers = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM responsavel');
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

const createUser = async (req, res) => {
    const { Nome_Resp, Email, Senha } = req.body;
    
    // Verifique se os dados estão chegando corretamente
    console.log('Dados recebidos:', { Nome_Resp, Email, Senha });
    
    try {
      const [result] = await pool.query(
        'INSERT INTO responsavel (Email, Senha, Nome_Resp) VALUES (?, ?, ?)',
        [Email, Senha, Nome_Resp]  // Dados enviados do frontend
      );
      res.json({ id: result.insertId, Email, Senha, Nome_Resp });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);  // Exibe o erro no console
      res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  };
  


module.exports = { getUsers, createUser };
