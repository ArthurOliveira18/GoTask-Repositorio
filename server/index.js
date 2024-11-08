// Codigo do banco de dados... Sinceramente? não sei nem por onde começar. Arthur do futuro, deu tudo certo?
const express = require("express");
const app = express();
// const conn = require('./db/db')
const usersRoutes = require('./routes/usuariosRoutes')
const historyTaskRoutes = require('./routes/historyTaskRoutes')

const path = require("path");
const basePath = path.join(__dirname, "pages");

const port = 5000

// const mysql = require("mysql2");
const exp = require("constants");

app.use("/users", usersRoutes)
app.use("/", historyTaskRoutes)

const mysql = require('mysql2');


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gotask",
    port: 3306
  });

app.get("/", (req, res) => {
  res.send("Conectado")
})

conn.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
});
