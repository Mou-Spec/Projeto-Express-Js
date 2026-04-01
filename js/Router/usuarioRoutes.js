const express = require('express');
const router = express.Router();
const Usuario = require('../Model/Usuario'); 

router.get('/', async (req, res) => {
    try {
        const lista = await Usuario.getAll(); 
        res.json(lista); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao procurar usuarios" });
    }
});


router.post('/', async (req, res) => {
    const { nome, email, senha, telefone, endereco } = req.body; 

    try {
        await Usuario.create(nome, email, senha, telefone, endereco); 
        res.status(201).json({ mensagem: "Usuario registrado!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao cadastrar o usuario." });
    }


});

router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Pega o ID que vem na URL

    try {
        await Usuario.delete(id);
        res.status(200).json({ mensagem: "Usuário removido com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao remover o usuário." });
    }
});

module.exports = router;