const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Study');
const Study = mongoose.model('study');
const valida = require('../util/validators');

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


router.post('/save', (req, res) => {
    const newStudy = {
        title: req.body.title,
        desc: req.body.description,
        content: req.body.content,
        category: req.body.category,
    }
    const errors = valida(newStudy);
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