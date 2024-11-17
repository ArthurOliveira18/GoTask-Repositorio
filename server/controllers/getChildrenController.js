const mysql = require('mysql2');

// Conexão com o banco
const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

pool.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Conectado com sucesso");
    }
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
        // Use pool.query ou pool.promise().execute dependendo do método escolhido
        pool.query(query, [idResp], (error, results) => {
            if (error) {
                console.error("Erro ao buscar tarefas e crianças:", error);
                return res.status(500).json({ error: "Erro ao buscar os dados." });
            }

            res.json(results);
        });
    } catch (error) {
        console.error("Erro ao buscar tarefas e crianças:", error);
        res.status(500).json({ error: "Erro ao buscar os dados." });
    }
};

module.exports = { getChildrenTask };
