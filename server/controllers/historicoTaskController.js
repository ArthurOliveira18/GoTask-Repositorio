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
        const [results] = await pool.query('SELECT * FROM historicoTask');
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
    if (!idCrianca || !idTask || !dias || dias.length === 0) {
        console.error("Dados incompletos recebidos:", req.body);
        return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
        const values = dias.map(day => [idCrianca, idTask, day, 0, new Date()]);
        console.log("Valores a serem inseridos no banco:", values);

        await pool.query(
            'INSERT INTO historicoTask (CriancaT, Task, dia, feita, dataTask) VALUES ?',
            [values]
        );

        res.status(201).json({ message: "Tarefa adicionada ao histórico da criança" });
    } catch (error) {
        console.error("Erro ao adicionar tarefa ao histórico:", error);
        res.status(500).json({ message: "Erro ao adicionar tarefa ao histórico" });
    }
};

module.exports = { getHistoricoTasks, createHistoricoTasks };
