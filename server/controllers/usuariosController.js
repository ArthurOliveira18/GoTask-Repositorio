const mysql = require('mysql2');

// Configuração da conexão do banco de dados
const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
}).promise();

pool.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Conectado com sucesso");
    }
});

const getUsers = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM responsavel');
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

const createUser = async (req, res) => {
    const { Nome_Resp, Email, Senha } = req.body;
    console.log('Dados recebidos:', { Nome_Resp, Email, Senha });

    try {
        const [result] = await pool.query(
            'INSERT INTO responsavel (Email, Senha, Nome_Resp) VALUES (?, ?, ?)',
            [Email, Senha, Nome_Resp]
        );
        res.json({ id: result.insertId, Email, Senha, Nome_Resp });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

const deleteUser = async (req, res) => {
  const { idResponsavel } = req.params;
  console.log(`Iniciando exclusão do responsável com ID: ${idResponsavel}`);

  try {
      // 1. Excluir todos os históricos de tarefas relacionados às crianças
      console.log('Excluindo históricos de tarefas...');
      const deleteChildrenTasksQuery = `
          DELETE FROM historicotask WHERE CriancaT IN (SELECT idCrianca FROM crianca WHERE responsavel = ?)
      `;
      await pool.query(deleteChildrenTasksQuery, [idResponsavel]);

      // 2. Excluir todos os históricos de benefícios
      console.log('Excluindo históricos de benefícios...');
      const deleteBenefitsQuery = `
          DELETE FROM beneficio WHERE RespB = ?
      `;
      await pool.query(deleteBenefitsQuery, [idResponsavel]);

      // 3. Excluir todas as tarefas associadas ao responsável
      console.log('Excluindo tarefas associadas ao responsável...');
      const deleteTasksQuery = `
          DELETE FROM task WHERE RespT = ?
      `;
      await pool.query(deleteTasksQuery, [idResponsavel]);

      // 4. Excluir todos os históricos de benefícios associados às crianças
      console.log('Excluindo históricos de benefícios das crianças...');
      const deleteChildrenBenefitsQuery = `
          DELETE FROM historicobeneficio WHERE CriancaB IN (SELECT idCrianca FROM crianca WHERE responsavel = ?)
      `;
      await pool.query(deleteChildrenBenefitsQuery, [idResponsavel]);

      // 5. Excluir todas as crianças associadas ao responsável
      console.log('Excluindo crianças associadas ao responsável...');
      const deleteChildrenQuery = `
          DELETE FROM crianca WHERE responsavel = ?
      `;
      await pool.query(deleteChildrenQuery, [idResponsavel]);

      // 6. Excluir o próprio responsável
      console.log('Excluindo responsável...');
      const deleteUserQuery = 'DELETE FROM responsavel WHERE idResp = ?';
      const [result] = await pool.query(deleteUserQuery, [idResponsavel]);

      if (result.affectedRows === 0) {
          console.log('Responsável não encontrado.');
          return res.status(404).json({ message: "Responsável não encontrado." });
      }

      console.log('Responsável excluído com sucesso.');
      res.json({ message: "Responsável excluído com sucesso." });
  } catch (error) {
      console.error("Erro ao excluir responsável:", error);
      res.status(500).json({ message: "Erro ao excluir responsável.", error });
  }
};


module.exports = { getUsers, createUser, deleteUser };
