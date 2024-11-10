


const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};


const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

module.exports = { getUsers, createUser };
