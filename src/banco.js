// Codigo do banco de dados... Sinceramente? não sei nem por onde começar. Arthur do futuro, deu tudo certo?
const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "pages");

const mysql = require("mysql");
const exp = require("constants");

//ROTAS PARA CADASTRO DE RESPONSÁVEL
app.get("/register", (req, res) => {
    res.sendFile(`${basePath}/cadastrarbebe.html`);
  });
  
  app.post("/bebe/insert", (req, res) => {
    const nome_bebe = req.body.nome;
    const sexo_bebe = req.body.sexo;
    const nome_mae = req.body.nomeMae;
  
    const sql = `INSERT INTO bebe (nome_bebe, sexo, nome_mae) VALUES ('${nome_bebe}','${sexo_bebe}','${nome_mae}')`;
  
    conn.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        res.redirect("/");
      }
    });
  });

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "GoTask",
  });