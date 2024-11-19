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

// Função para listar as tasks do histórico
const getHistoricoTasks = async (req, res) => {
    try {
        const [results] = await pool.query('select * from historicoTask as ht join task as t on t.idTask = ht.Task;');
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Função para criar uma nova entrada no histórico de tasks
const createHistoricoTasks = async (req, res) => {
    console.log("Recebendo requisição POST para /historicoTask...");
    console.log("Corpo da requisição:", req.body);

    const { idCrianca, idTask, dias } = req.body;

    // Verificação dos dados recebidos
    if (!idCrianca || !idTask || !dias) {
        console.error("Dados incompletos recebidos:", req.body);
        return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
        // Cria a query diretamente com os dados no formato correto
        await pool.query(
            'INSERT INTO historicoTask (CriancaT, Task, dia, feita, dataTask) VALUES (?, ?, ?, ?, ?)',
            [idCrianca, idTask, dias, 0, new Date()]
        );

        res.status(201).json({ message: "Tarefa adicionada ao histórico da criança" });
    } catch (error) {
        console.error("Erro ao adicionar tarefa ao histórico:", error);
        res.status(500).json({ message: "Erro ao adicionar tarefa ao histórico" });
    }
};

const updateTaskStatus = async (req, res) => {
    const { idHistoricoTask } = req.params;
    const { feita } = req.body;
  
    if (feita === undefined) {
      return res.status(400).json({ message: "Campo 'feita' é obrigatório." });
    }
  
    try {
      await pool.query(
        'UPDATE historicoTask SET feita = ? WHERE idHistoricoTask = ?',
        [feita, idHistoricoTask]
      );
      res.status(200).json({ message: "Status da tarefa atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      res.status(500).json({ message: "Erro ao atualizar status da tarefa." });
    }
  };
  

  
module.exports = { getHistoricoTasks, createHistoricoTasks, updateTaskStatus };
