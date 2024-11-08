// Codigo do banco de dados... Sinceramente? não sei nem por onde começar. Arthur do futuro, deu tudo certo?
const express = require("express");
const app = express();
// const mysql = require('mysql2');
// const conn = require('./db/db')
const usersRoutes = require('./routes/usuariosRoutes')
const historyTaskRoutes = require('./routes/historyTaskRoutes')
const childrenRoutes = require('./routes/childrenRoutes')

const path = require("path");
const basePath = path.join(__dirname, "pages");

const port = 5000

// const mysql = require("mysql2");
const exp = require("constants");

app.use("/", usersRoutes)
app.use("/", historyTaskRoutes)
app.use("/", childrenRoutes)



app.get("/", (req, res) => {
  res.send("Conectado")
})


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});