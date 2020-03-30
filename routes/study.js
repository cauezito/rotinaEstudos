const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Study');
const Study = mongoose.model('study');

router.post("/", (req, res) => {
    var errors = [];

    if(!req.body.title || typeof req.body.title == undefined || req.body.title == null){
        errors.push({text: "Você precisa definir um título!"});
    } else if(req.body.title.length < 8){
        errors.push({text: "Escreva um título mais detalhado. Você consegue!"})
    }

    if(errors.length > 0){
        res.render('index', {errors: errors})
    } else {
        res.render('/')
    }
});

router.get("/", (req, res) => {

});

module.exports = router;