const mysql = require('mysql2/promise');

// Conexão com o banco
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
});

// Função para buscar o histórico de benefícios filtrado por criança
const getHistoricoBeneficio = async (req, res) => {
    const { idCrianca } = req.query; // Obtém o ID da criança da query string

    try {
        console.log("Buscando histórico de benefícios para a criança:", idCrianca);

        const [rows] = await pool.query(`
            SELECT 
                hb.idHistoricoBeneficio, 
                hb.dataBeneficio, 
                hb.valor, 
                b.Nome_ben AS Beneficio
            FROM historicoBeneficio hb
            JOIN beneficio b ON hb.Beneficio = b.idBeneficio
            WHERE hb.CriancaB = ?
            ORDER BY hb.dataBeneficio DESC
        `, [idCrianca]);

        console.log("Histórico encontrado:", rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar o histórico de benefícios:", error);
        res.status(500).json({ error: 'Erro ao buscar o histórico de benefícios' });
    }
};

// Função para registrar o resgate de benefício
const createInsertBenef = async (req, res) => {
    const { CriancaB, Beneficio, dataBeneficio, valor } = req.body;

    console.log("Recebendo dados para registrar o benefício:", req.body);

    try {
        // Verifica se a criança existe e tem pontos suficientes
        const [childRows] = await pool.query('SELECT * FROM crianca WHERE idCrianca = ?', [CriancaB]);
        
        if (childRows.length === 0) {
            return res.status(404).json({ error: 'Criança não encontrada' });
        }

        const child = childRows[0];
        if (child.pontos < valor) {
            return res.status(400).json({ error: 'Pontos insuficientes para resgatar o benefício' });
        }

        // Registra o benefício no histórico
        await pool.query(
            'INSERT INTO historicoBeneficio (CriancaB, Beneficio, dataBeneficio, valor) VALUES (?, ?, ?, ?)',
            [CriancaB, Beneficio, dataBeneficio, valor]
        );

        // Atualiza os pontos da criança
        await pool.query(
            'UPDATE crianca SET pontos = pontos - ? WHERE idCrianca = ?',
            [valor, CriancaB]
        );

        res.status(201).json({ message: 'Benefício resgatado com sucesso!' });
    } catch (error) {
        console.error("Erro ao registrar o benefício:", error);
        res.status(500).json({ error: 'Erro ao registrar o benefício' });
    }
};

module.exports = { getHistoricoBeneficio, createInsertBenef };
