const express = require('express');
const AuthController = require("../backend/controllers/AuthController");
const AdminController = require("../backend/controllers/AdminController");
const authenticateMiddleware = require("../backend/config/middleware");

const app = express();

app.use(express.json());

app.use("/auth", AuthController);
app.use("/admin", authenticateMiddleware, AdminController);

app.listen(3000, () => {
    console.log('Server rodando na porta 3000')
})