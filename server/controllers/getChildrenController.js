const mysql = require('mysql2/promise');  // Alterado para 'mysql2/promise'

// Conexão com o banco
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

const getChildrenTask = async (req, res) => {
    const { idResp } = req.params;

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
        console.error("Erro ao buscar tarefas e crianças:", error);
        res.status(500).json({ error: "Erro ao buscar os dados." });
    }
};

const createInsert = async (req, res) => {
    const { criancaId, taskId, dia, feita, dataTask } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO historicoTask (CriancaT, Task, dia, feita, dataTask) VALUES (?, ?, ?, ?, ?)',
            [criancaId, taskId, dia, feita, dataTask]
        );
        res.json({ id: result.insertId, criancaId, taskId, dia, feita, dataTask });
    } catch (error) {
        console.error('Erro ao inserir tarefa no histórico:', error);
        res.status(500).json({ message: 'Erro ao inserir tarefa', error });
    }
};

module.exports = { getChildrenTask, createInsert };
