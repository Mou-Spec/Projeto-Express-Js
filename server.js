const express = require('express');
const app = express();
const usuarioRoutes = require('./js/Router/usuarioRoutes'); 
const path = require('path');



app.use(express.json()); 
app.use(express.static(__dirname)); 


app.use('/usuarios', usuarioRoutes);

app.listen(3000, () => {
    console.log("rodando em http://localhost:3000");
});