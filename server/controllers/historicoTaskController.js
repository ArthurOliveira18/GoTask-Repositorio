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
const getHistoricoTasks = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM task');
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

const createHistoricoTasks = async (req, res) => {
    const { idCrianca, idTask, dias } = req.body;

    // Verifique se os dados estão chegando corretamente
    if (!idCrianca || !idTask || !dias || dias.length === 0) {
        return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
        const values = dias.map(day => [idCrianca, idTask, day, 0, new Date()]);
        await pool.query('INSERT INTO historicoTask (CriancaT, Task, dia, feita, dataTask) VALUES ?', [values]);
        res.status(201).json({ message: "Tarefa adicionada ao histórico da criança" });
    } catch (error) {
        console.error("Erro ao adicionar tarefa ao histórico:", error);
        res.status(500).json({ message: "Erro ao adicionar tarefa ao histórico" });
    }
};







module.exports = { getHistoricoTasks, createHistoricoTasks };
