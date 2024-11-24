const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
}).promise(); // Utilizando a versão promise do mysql2

// Função para buscar tarefas separadas por dias da semana
const getTasksByDay = async (req, res) => {
    try {
        const { idCrianca, dia } = req.params; // ID da criança recebido na requisição

        if (!idCrianca) {
            return res.status(400).json({ error: 'ID da criança não foi fornecido.' });
        }

        // Consulta ao banco para agrupar tarefas por dia
        const [rows] = await pool.query(`
            SELECT
            dia,
            GROUP_CONCAT(t.Nome_task) AS tarefas
            FROM historicoTask ht
            JOIN task t ON ht.Task = t.idTask
            WHERE ht.CriancaT = ? and FIND_IN_SET( ? , dia)
            GROUP BY dia
            ORDER BY FIELD(dia, 'seg', 'ter', 'qua', 'qui', 'sex', 'fds');
        `, [idCrianca, dia]);

        // Verifica se a consulta retornou resultados
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada para esta criança.' });
        }

        // Estrutura a resposta para separar dias e tarefas
        const tarefasPorDia = rows.reduce((acc, current) => {
            acc[current.dia] = current.tarefas ? current.tarefas.split(',') : [];
            return acc;
        }, {});

        // Envia as tarefas agrupadas por dia
        res.status(200).json(tarefasPorDia);
    } catch (error) {
        console.error('Erro ao buscar tarefas por dia:', error);
        res.status(500).json({ error: 'Erro ao buscar as tarefas.' });
    }
};

module.exports = { getTasksByDay };
