const pool = require('../index');

const getUsers = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM Pai');
      res.status(200).json(rows);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  };

// const getUsers = async (req, res) => {
//     let query = 'SELECT * FROM Pai;'
//     conn.query(query, (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json(results);
//     });
// };


const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = conn.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

module.exports = { getUsers, createUser };
