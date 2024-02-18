// controllers/postController.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const postModel = require('../models/postModel');

const router = express.Router();

router.get('/', (req, res) => {
    postModel.getAllPosts((err, result) => {
        if (err) throw err;
        res.render('posts/posts', { posts: result });
    });
});

router.get('/cadastro', (req, res) => {
    res.render('posts/cadastro');
});

router.post('/', [
    body('titulo').isLength({ min: 1 }).trim().escape(),
    body('conteudo').isLength({ min: 1 }).trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let post = { titulo: req.body.titulo, conteudo: req.body.conteudo };
    postModel.createPost(post, (err, result) => {
        if (err) throw err;
        res.redirect('/posts');
    });
});

router.get('/editar/:id', (req, res) => {
    postModel.getAllPostById(req.params.id, (err, result) => {
        if (err) throw err;
        res.render('posts/editar', { post: result[0] });
    });
});

router.put('/editar/:id', [
    body('titulo').isLength({ min: 1 }).trim().escape(),
    body('conteudo').isLength({ min: 1 }).trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let post = { titulo: req.body.titulo, conteudo: req.body.conteudo };
    postModel.updatePost(req.params.id, post, (err, result) => {
        if (err) throw err;
        res.redirect('/posts');
    });
});

router.delete('/del/:id', (req, res) => {
    postModel.deletePost(req.params.id, (err, result) => {
        if (err) throw err;
        res.redirect('/posts');
    });
});

module.exports = router;
