const mysql = require('mysql2/promise');  // Alterado para 'mysql2/promise'

// Conexão com o banco
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

// Função para buscar as tarefas e crianças
const getChildrenTask = async (req, res) => {
    const { idResp } = req.params;

    console.log(`Recebendo solicitação para buscar tarefas para o responsável com ID: ${idResp}`); // Depuração

    const query = `
      SELECT 
        c.idCrianca AS criancaId, 
        c.nomeCrianca, 
        c.dtNasc, 
        c.pontos AS totalPoints, 
        t.idTask AS taskId, 
        t.Nome_task AS taskName, 
        t.Pontos_task AS taskPoints, 
        ht.dia, 
        ht.feita AS taskComplete,
        ht.dataTask,
        r.idResp AS responsavelId, 
        r.Nome_Resp AS responsavelNome
      FROM crianca c
      LEFT JOIN historicoTask ht ON c.idCrianca = ht.CriancaT
      LEFT JOIN task t ON ht.Task = t.idTask
      INNER JOIN responsavel r ON c.responsavel = r.idResp
      WHERE r.idResp = ?;
    `;

    try {
        
        const [results] = await pool.query(query, [idResp]);
        
        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar tarefas e crianças:", error); // Depuração
        res.status(500).json({ error: "Erro ao buscar os dados." });
    }
};

// Função para criar e inserir dados no histórico de tarefas
const createInsert = async (req, res) => {
    const { criancaId, taskId, feita, dataTask } = req.body;
    console.log(`Recebendo dados para inserir tarefa:`, req.body); // Depuração

    try {
        // Adiciona log para depurar os dados antes de executar a query
        console.log(`Inserindo dados no banco para a criança ID: ${criancaId}, task ID: ${taskId}, feita: ${feita}, dataTask: ${dataTask}`);

        const [result] = await pool.query(
            'INSERT INTO historicoTask (CriancaT, Task, feita, dataTask) VALUES (?, ?, ?, ?)',
            [criancaId, taskId, feita, dataTask]
        );
        
        console.log(`Tarefa inserida com sucesso. ID inserido: ${result.insertId}`); // Depuração

        // Responde com os dados inseridos e o ID gerado
        res.json({ id: result.insertId, criancaId, taskId, feita, dataTask });
    } catch (error) {
        console.error('Erro ao inserir tarefa no histórico:', error); // Depuração
        res.status(500).json({ message: 'Erro ao inserir tarefa', error });
    }
};

module.exports = { getChildrenTask, createInsert };
