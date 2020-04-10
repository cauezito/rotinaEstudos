const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Study');
const Study = mongoose.model('study');
require('../models/Category');
const Category = mongoose.model('categories');
const valida = require('../util/validators');

router.get('/', (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('study/details', {categories: categories})
    }).catch((err) => {
        req.flash('error' , 'Houve um erro ao listar as categorias');
        res.redirect('/study/config');
    })    
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

    const errors = valida.newStudy(newStudy);
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
        req.flash('error', 'Houve um erro ao carregar o formulário de edição')
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

router.get('/config', (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('study/config', {categories: categories})
    }).catch((err) => {
        req.flash('error' , 'Houve um erro ao listar as categorias');
        res.redirect("/study/config");
    })    
});

router.post('/config/newCategory', (req, res) => {
    const newCategory = {
        name: req.body.name
    }
    const errors = valida.newCategory(newCategory);
    if(errors.length > 0){
        res.render('study/config', {errors: errors})
    } else {
        new Category(newCategory).save().then(() => {
            req.flash('success', 'A categoria de estudo foi criada!');
            res.redirect('/study/config');
        }).catch((err) => {
            req.flash('error', 'A categoria de estudo não pôde ser criada.');
            res.redirect('/study/config');
        });
    }
});

router.get('/config/remove/:id', (req, res) => {
    Category.remove({_id: req.params.id}).then(() => {
        req.flash('success' , 'A categoria foi deletada!')
        res.redirect('/study/config')
    }).catch((err) => {
        req.flash('error', 'A categoria não pôde ser excluída!')
        res.redirect('/study/config')
    })
});

router.get('/showCategory/:id/:catName', (req, res) => {
    Study.find({category: req.params.id}).lean().then((studies) => {  
        Category.find().lean().then((categories) => { 
            res.render('index', {studies: studies, categories: categories, 
                CategoryName: req.params.catName})
        });
    })
})

module.exports = router;