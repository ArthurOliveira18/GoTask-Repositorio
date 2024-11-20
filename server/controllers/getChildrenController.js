const mysql = require('mysql2/promise');

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

    console.log(`Recebendo solicitação para buscar tarefas para o responsável com ID: ${idResp}`);

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
        ht.dataTask
      FROM crianca c
      LEFT JOIN historicoTask ht ON c.idCrianca = ht.CriancaT
      LEFT JOIN task t ON ht.Task = t.idTask
      WHERE c.responsavel = ?;
    `;

    try {
        const [results] = await pool.query(query, [idResp]);

        if (results.length === 0) {
            return res.status(404).json({ message: "Nenhuma criança ou tarefa encontrada." });
        }

        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar tarefas e crianças:", error);
        res.status(500).json({ error: "Erro ao buscar os dados." });
    }
};

// Função para inserir dados no histórico
const createInsert = async (req, res) => {
    const { criancaId, taskId, feita, dataTask } = req.body;

    if (!criancaId || !taskId || typeof feita !== 'number' || !dataTask) {
        return res.status(400).json({ message: "Dados inválidos." });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO historicoTask (CriancaT, Task, feita, dataTask) VALUES (?, ?, ?, ?)',
            [criancaId, taskId, feita, dataTask]
        );

        res.status(201).json({ id: result.insertId, criancaId, taskId, feita, dataTask });
    } catch (error) {
        console.error("Erro ao inserir tarefa no histórico:", error);
        res.status(500).json({ message: "Erro ao inserir tarefa", error });
    }
};

const updatePoints = async (req, res) => {
    const { criancaId, totalPoints } = req.body;

    if (!criancaId || totalPoints === undefined) {
        return res.status(400).json({ message: "Dados inválidos." });
    }

    try {
        // Atualizando os pontos da criança
        const [result] = await pool.query(
            'UPDATE crianca SET pontos = ? WHERE idCrianca = ?',
            [totalPoints, criancaId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Criança não encontrada." });
        }

        res.status(200).json({ message: "Pontuação atualizada com sucesso!", criancaId, totalPoints });
    } catch (error) {
        console.error("Erro ao atualizar pontos:", error);
        res.status(500).json({ message: "Erro ao atualizar pontos", error });
    }
};



module.exports = { getChildrenTask, createInsert, updatePoints };
