const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
}).promise(); // Utilizando a versão promise do mysql2

// Função para buscar histórico de tarefas
const getHistoricoTasks = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM crianca c JOIN historicoTask ht ON c.idCrianca = ht.CriancaT;');
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Função para buscar tarefas separadas por dias da semana
const getTasksByDay = async (req, res) => {
    const { criancaId } = req.params; // ID da criança vindo da URL

    // Verifica se criancaId foi fornecido e é um número válido
    if (!criancaId || isNaN(criancaId)) {
        return res.status(400).json({ success: false, message: 'ID da criança inválido.' });
    }

    try {
        const query = `
        SELECT
            c.nomeCrianca,  -- Nome da criança
            dia,
            GROUP_CONCAT(t.Nome_task) AS tarefas
        FROM historicoTask ht
        JOIN task t ON ht.Task = t.idTask
        JOIN crianca c ON ht.CriancaT = c.idCrianca  -- Join com a tabela 'crianca' para obter o nome
        WHERE ht.CriancaT = ? 
        GROUP BY c.nomeCrianca, dia  -- Agrupa pelo nome da criança e pelo dia
        ORDER BY FIELD(dia, 'seg', 'ter', 'qua', 'qui', 'sex', 'fds');
    `;

        // Passa o criancaId para a consulta
        const [rows] = await pool.execute(query, [criancaId]);

        // Formatar os resultados em um objeto organizado por dia
        const tasksByDay = rows.reduce((acc, row) => {
            acc[row.dia] = row.tarefas.split(',');
            return acc;
        }, { seg: [], ter: [], qua: [], qui: [], sex: [], fds: [] });

        return res.status(200).json({ success: true, tasksByDay });
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        return res.status(500).json({ success: false, message: 'Erro ao buscar tarefas.' });
    }
};


module.exports = { getTasksByDay, getHistoricoTasks };
