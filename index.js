// Codigo do banco de dados... Sinceramente? não sei nem por onde começar. Arthur do futuro, deu tudo certo?
const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "pages");

const mysql = require("mysql2");
const exp = require("constants");



const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gotask",
  port: 3306
});

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
