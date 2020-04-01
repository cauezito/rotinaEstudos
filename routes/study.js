const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Study');
const Study = mongoose.model('study');


router.get('/', (req, res) => {
    res.render('study/details');
});

router.get('/readMore/:id', (req, res) => {
    Study.findOne({_id: req.params.id}).lean().then((study) => {
        res.render('study/read', {study: study})
    }).catch((err) => {
        req.flash('error', 'O tópico de estudo não foi encontrado!')
        res.redirect('/')
    })   
});

router.get('/delete/:id', (req, res) => {
    Study.remove({_id: req.params.id}).then(() => {
        req.flash('success', 'O tópico de estudo foi apagado!');
        res.redirect('/');
    }).catch((err) => {
        req.flash('error', 'Não foi possível apagar o tópico de estudo.');
        res.redirect('/');
    })
});

function validate(study){
    var errors = [];

    if(!study.title || typeof study.title == undefined || study.title == null){
        errors.push({text: "Você precisa definir um título!"});
    } else if(study.title.length < 8){
        errors.push({text: "Escreva um título mais detalhado. Você consegue!"})
    }

    if(study.description){
        if(study.description.length < 10){
            errors.push({text: "Capriche na descrição! Ela está muito curta."});
        }        
    } 

    if(!study.category || typeof study.category == undefined ||
        study.category == null){
        errors.push({text: "Você precisa definir uma categoria!"});
    } else if(study.category.length < 2){
        errors.push({text: "Escreva uma categoria mais detalhada. Você consegue!"})
    }

    if(!study.content || typeof study.content == undefined ||
        study.content == null){
        errors.push({text: "Você precisa definir um conteúdo!"});
    } else if(study.content.length < 20){
        errors.push({text: "Escreva um conteúdo mais detalhado. Você consegue!"})
    }

    return errors;
}

router.post('/save', (req, res) => {
    const newStudy = {
        title: req.body.title,
        desc: req.body.description,
        content: req.body.content,
        category: req.body.category,
    }
    const errors = validate(newStudy);
    if(errors.length > 0){
        res.render('study/details', {errors: errors})
    } else {
        new Study(newStudy).save().then(() => {
            req.flash('success', 'O tópico de estudo foi criado!');
            res.redirect('/');
        }).catch((err) => {
            req.flash('error', 'O tópico de estudo não pôde ser criado.');
            res.redirect('/');
        });
    }
});

router.get('/edit/:id', (req, res) => {
    Study.findOne({_id: req.params.id}).lean().then((study) => {
        res.render('study/edit', {study: study})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição")
        res.redirect("/")
    })
});

router.post('/edit', (req, res) => {
    Study.findOne({_id: req.body.id}).then((study) => {
        let id = req.body.id;
        study.title = req.body.title;
        study.desc = req.body.description;
        study.category = req.body.category;
        study.content = req.body.content;

        study.save().then(() => {
            req.flash('success', 'Tópico atualizado!');
            res.redirect('/')
            //res.redirect('/readMore/' + id)
        }).catch((err) => {
            req.flash('error', 'Não foi possível atualizar o tópico.')
            res.redirect('/')
        })
    })
});

module.exports = router;