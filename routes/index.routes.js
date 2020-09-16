const bcrypt = require('bcryptjs');
const saltRounds = 10;
const express = require('express');
const router = express.Router();

// Importar model de usuario
const User = require('../models/User.model');

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

// Servir o formulario de cadastro de usuario
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// Receber os dados do formulario de cadastro de usuario
router.post('/signup', async (req, res) => {
  console.log(req.body);

  // Extrair informacoes recebidas da requisicao http que veio do navegador
  const { username, email, password } = req.body;

  try {
    // Gerar o salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Gerar o hash utilizando o salt criado anteriormente e o que o usuario escreveu no campo senha no navegador
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed password => ', hashedPassword);

    // Cria o usuario no banco, passando a senha criptografada
    const result = await User.create({ username, email, passwordHash: hashedPassword });

    // Redireciona para o formulario novamente
    res.redirect('/signup');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
