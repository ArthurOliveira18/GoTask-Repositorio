const mysql = require('mysql2/promise');

// Conexão com o banco
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

// Função para buscar os registros do histórico de benefícios
const getHistoricoBeneficio = async (req, res) => {
    try {
        console.log("Buscando histórico de benefícios..."); // Log para depuração
        const [rows] = await pool.query('SELECT * FROM historicoBeneficio');
        console.log("Histórico de benefícios encontrado:", rows); // Log para mostrar os resultados
        res.status(200).json(rows); // Retorna todos os registros do histórico
    } catch (error) {
        console.error("Erro ao buscar o histórico de benefícios:", error);
        res.status(500).json({ error: 'Erro ao buscar o histórico de benefícios' });
    }
};

// Função para inserir dados no histórico de benefícios e atualizar os pontos da criança
const createInsertBenef = async (req, res) => {
    const { CriancaB, Beneficio, dataBeneficio, valor } = req.body;

    console.log("Recebendo dados para registrar o benefício:", req.body); // Log dos dados recebidos

    try {
        // Verifica se a criança existe e se tem pontos suficientes
        console.log("Verificando se a criança existe e tem pontos suficientes...");
        const [childRows] = await pool.query('SELECT * FROM crianca WHERE idCrianca = ?', [CriancaB]);
        console.log("Resultado da consulta de criança:", childRows); // Log para mostrar o resultado da consulta
        
        if (childRows.length === 0) {
            console.log("Criança não encontrada:", CriancaB); // Log caso a criança não seja encontrada
            return res.status(404).json({ error: 'Criança não encontrada' });
        }

        const child = childRows[0];
        if (child.pontos < valor) {
            console.log("Pontos insuficientes para resgatar o benefício. Pontos da criança:", child.pontos, "Valor necessário:", valor); // Log para depurar pontos insuficientes
            return res.status(400).json({ error: 'Pontos insuficientes para resgatar o benefício' });
        }

        // Insere o benefício no histórico
        console.log("Registrando benefício no histórico...");
        await pool.query(
            'INSERT INTO historicoBeneficio (CriancaB, Beneficio, dataBeneficio, valor) VALUES (?, ?, ?, ?)',
            [CriancaB, Beneficio, dataBeneficio, valor]
        );

        // Atualiza os pontos da criança
        console.log("Atualizando os pontos da criança...");
        await pool.query(
            'UPDATE crianca SET pontos = pontos - ? WHERE idCrianca = ?',
            [valor, CriancaB]
        );

        console.log("Benefício resgatado com sucesso!");
        res.status(201).json({ message: 'Benefício resgatado com sucesso!' });
    } catch (error) {
        console.error("Erro ao registrar o benefício:", error);
        res.status(500).json({ error: 'Erro ao registrar o benefício' });
    }
};

module.exports = { getHistoricoBeneficio, createInsertBenef };
