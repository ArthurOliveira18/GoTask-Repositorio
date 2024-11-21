// Alterado para usar mysql2/promise
const mysql = require('mysql2/promise');

// Criação do pool de conexões com Promises
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

// Conexão com o banco (não é mais necessário usar `connect` manualmente)
pool.getConnection()
    .then(() => console.log("Conectado com sucesso"))
    .catch(erro => console.log(erro));

// Função para buscar todas as crianças
const getChildren = async (req, res) => {
    const query = 'SELECT * FROM crianca;';
    
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Função para criar uma criança com o ID do responsável
const createChildren = async (req, res) => {
    console.log(req.body); // Verificar o conteúdo de req.body

    const { nomeCrianca, dtNasc, responsavelId } = req.body;

    if (!responsavelId) {
        return res.status(400).json({ message: "Responsável não encontrado" });
    }

    const query = 'INSERT INTO crianca (nomeCrianca, dtNasc, pontos, responsavel) VALUES (?, ?, ?, ?)';
    const values = [nomeCrianca, dtNasc, 0, responsavelId]; // Aqui estamos passando o ID do responsável

    try {
        const [result] = await pool.query(query, values);
        res.status(201).json({ message: 'Criança cadastrada com sucesso', idCrianca: result.insertId });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro ao cadastrar criança', error });
    }
};

// Função para atualizar uma criança
const updateChild = async (req, res) => {
    const { idCrianca } = req.params; // ID da criança a ser atualizada
    const { nomeCrianca, dtNasc } = req.body; // Dados recebidos

    if (!nomeCrianca || !dtNasc) {
        return res.status(400).json({ message: "Dados inválidos." });
    }

    try {
        const query = `
            UPDATE crianca 
            SET nomeCrianca = ?, dtNasc = ?
            WHERE idCrianca = ?;
        `;
        const [result] = await pool.query(query, [nomeCrianca, dtNasc, idCrianca]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Criança não encontrada." });
        }

        res.json({ message: "Criança atualizada com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar criança:", error);
        res.status(500).json({ message: "Erro ao atualizar criança." });
    }
};

// Função para buscar uma criança pelo ID
const getChildById = async (req, res) => {
    const { idCrianca } = req.params;  // O ID da criança vem pela URL
    const query = 'SELECT * FROM crianca WHERE idCrianca = ?';  // Consulta para buscar a criança pelo ID

    try {
        const [results] = await pool.query(query, [idCrianca]);

        // Verifica se encontrou algum resultado
        if (results.length === 0) {
            return res.status(404).json({ message: 'Criança não encontrada' });
        }

        // Retorna os dados da criança
        const child = results[0];  // Pega o primeiro resultado, pois esperamos apenas um
        res.json({
            idCrianca: child.idCrianca,
            nomeCrianca: child.nomeCrianca,
            dtNasc: child.dtNasc,
            tasks: child.tasks || []  // Certifique-se de que 'tasks' seja um array, caso contrário, use [] como padrão
        });
    } catch (err) {
        return res.status(500).send({ message: "Erro ao acessar o banco de dados", error: err });
    }
};

const deleteChild = async (req, res) => {
    const { idCrianca } = req.params;

    try {
        // Excluir registros relacionados na tabela 'historicotask'
        const deleteTaskHistoryQuery = 'DELETE FROM historicotask WHERE CriancaT = ?';
        await pool.query(deleteTaskHistoryQuery, [idCrianca]);

        // Excluir registros relacionados na tabela 'historicobeneficio'
        const deleteBenefitHistoryQuery = 'DELETE FROM historicobeneficio WHERE CriancaB = ?';
        await pool.query(deleteBenefitHistoryQuery, [idCrianca]);

        // Excluir a criança
        const deleteChildQuery = 'DELETE FROM crianca WHERE idCrianca = ?';
        const [result] = await pool.query(deleteChildQuery, [idCrianca]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Criança não encontrada." });
        }

        res.json({ message: "Criança excluída com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir criança:", error);
        res.status(500).json({ message: "Erro ao excluir criança.", error });
    }
};



module.exports = { getChildren, createChildren, updateChild,getChildById, deleteChild 
};

