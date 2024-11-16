// const pool = require('../index');
const mysql = require('mysql2');

//Conexão com o banco
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
        LEFT JOIN task t ON ht.Task = t.idTask;
    `;

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados:", err);
            return res.status(500).send("Erro ao buscar dados");
        }
        res.json(results);
    });

};



module.exports = { getChildrenTask };
