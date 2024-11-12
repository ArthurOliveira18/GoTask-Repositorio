const mysql = require('mysql2');

// Configuração da conexão do banco de dados
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gotask",
  port: 3306
}).promise();

pool.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");
  }
});

// Pegar do banco
const getTasks = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM task');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Criar do banco
const createTasks = async (req, res) => {
  const { Nome_task, Pontos_task, responsavelId } = req.body;

  // Verifique se os dados estão chegando corretamente
  console.log('Dados recebidos:', { Nome_task, Pontos_task, responsavelId });

  try {
    const [result] = await pool.query(
      'INSERT INTO task (Nome_task, Pontos_task , status , responsavel) VALUES (?, ?, ? ,?)',
      [Nome_task, Pontos_task, 0, responsavelId]  // Dados enviados do frontend
    );
    res.json({ id: result.insertId, Nome_task, Pontos_task, responsavelId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);  // Exibe o erro no console
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

const editTasks = async (req, res) => {

}

const deleteTasks = async (req, res) => {

}



module.exports = { getTasks, createTasks, editTasks, deleteTasks };
