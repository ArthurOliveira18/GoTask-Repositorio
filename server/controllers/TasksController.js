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
  const { Nome_task, Pontos_task, RespT } = req.body;

  // Verifique se os dados estão chegando corretamente
  console.log('Dados recebidos:', { Nome_task, Pontos_task, RespT });

  try {
    const [result] = await pool.query(
      'INSERT INTO task (Nome_task, Pontos_task , status, RespT) VALUES (?, ?, ?, ?)',
      [Nome_task, Pontos_task, 0, RespT]  // Dados enviados do frontend
    );
    res.json({ id: result.insertId, Nome_task, Pontos_task });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);  // Exibe o erro no console
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};


// Pegar tarefa pelo ID
const getTaskById = async (req, res) => {
  const { idTask } = req.params;  // O ID da tarefa vem pela URL
  const query = 'SELECT * FROM task WHERE idTask = ?';  // Consulta para buscar a tarefa pelo ID

  try {
    const [results] = await pool.query(query, [idTask]);

    // Verifica se encontrou algum resultado
    if (results.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Retorna os dados da tarefa
    const task = results[0];  // Pega o primeiro resultado, pois esperamos apenas um
    res.json({
      idTask: task.idTask,
      Nome_task: task.Nome_task,
      Pontos_task: task.Pontos_task,
      RespT: task.RespT
    });
  } catch (err) {
    return res.status(500).send({ message: "Erro ao acessar o banco de dados", error: err });
  }
};


// Editar tarefa
const editTasks = async (req, res) => {
  const { idTask } = req.params; // ID da tarefa a ser atualizada
  const { Nome_task, Pontos_task, RespT } = req.body; // Dados recebidos

  if (!Nome_task || !Pontos_task || !RespT) {
    return res.status(400).json({ message: "Dados inválidos." });
  }

  try {
    const query = `
      UPDATE task
      SET Nome_task = ?, Pontos_task = ?, RespT = ?
      WHERE idTask = ?;
    `;
    const [result] = await pool.query(query, [Nome_task, Pontos_task, RespT, idTask]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.json({ message: "Tarefa atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
};

const deleteTask = async (req, res) => {
  const { idTask } = req.params;

  try {
    // Excluir os registros na tabela 'historicotask' que referenciam a tarefa
    await pool.query('DELETE FROM historicotask WHERE Task = ?', [idTask]);

    // Agora excluir a tarefa da tabela 'task'
    const [result] = await pool.query('DELETE FROM task WHERE idTask = ?', [idTask]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a tarefa:', error);
    res.status(500).json({
      message: 'Erro ao excluir tarefa',
      error: error.message,
      stack: error.stack
    });
  }
};

module.exports = { getTasks, createTasks, editTasks, getTaskById, deleteTask };
