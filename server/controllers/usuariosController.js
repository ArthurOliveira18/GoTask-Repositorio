
const mysql = require('mysql2');

const getUsers = async (req, res) => {
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

    let query = 'SELECT * FROM Pai;'
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};



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
