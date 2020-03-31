const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Study');
const Study = mongoose.model('study');


router.get('/', (req, res) => {
    res.render('study/details');
});

router.get('/readMore/:id', (req, res) => {
    Study.findOne({_id: req.params.id}).then((study) => {
        res.render('study/read', {study: study})
    }).catch((err) => {
        req.flash('error', 'O tópico de estudo não foi encontrado!')
        res.redirect('/')
    })   
});

router.post('/validate', (req, res) => {
    var errors = [];

    if(!req.body.title || typeof req.body.title == undefined || req.body.title == null){
        errors.push({text: "Você precisa definir um título!"});
    } else if(req.body.title.length < 8){
        errors.push({text: "Escreva um título mais detalhado. Você consegue!"})
    }

    if(req.body.description){
        if(req.body.description.length < 10){
            errors.push({text: "Capriche na descrição! Ela está muito curta."});
        }        
    } 

    if(!req.body.category || typeof req.body.category == undefined ||
        req.body.category == null){
        errors.push({text: "Você precisa definir uma categoria!"});
    } else if(req.body.category.length < 2){
        errors.push({text: "Escreva uma categoria mais detalhada. Você consegue!"})
    }

    if(!req.body.content || typeof req.body.content == undefined ||
        req.body.content == null){
        errors.push({text: "Você precisa definir um conteúdo!"});
    } else if(req.body.content.length < 100){
        errors.push({text: "Escreva um conteúdo mais detalhado. Você consegue!"})
    }
    
    if(errors.length > 0){
        res.render('study/details', {errors: errors})
    } else {
        const newStudy = {
            title: req.body.title,
            desc: req.body.description,
            content: req.body.content,
            category: req.body.category,
        }

        new Study(newStudy).save().then(() => {
            req.flash('success', 'O tópico de estudo foi criado!');
            res.redirect('/');
        }).catch((err) => {
            req.flash('error', 'O tópico de estudo não pôde ser criado.');
            res.redirect('/');
        });
    }
});

module.exports = router;