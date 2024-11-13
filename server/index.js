
const express = require("express");
const app = express();
const cors = require("cors"); // Importação do CORS
const usersRoutes = require('./routes/usuariosRoutes')
const TasksRoutes = require('./routes/TasksRoutes')
const childrenRoutes = require('./routes/childrenRoutes')
const historicoTask = require('./routes/historicoTaskRoutes')
const path = require("path");
const basePath = path.join(__dirname, "pages");


const port = 3000
// Middleware para interpretar JSON e habilitar CORS
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));  // Permite requisições do front-end
// comment para commit


const exp = require("constants");

app.use("/", usersRoutes)
app.use("/", TasksRoutes)
app.use("/", childrenRoutes)
app.use("/", historicoTask)



app.get("/", (req, res) => {
  res.send("Conectado")
})


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});