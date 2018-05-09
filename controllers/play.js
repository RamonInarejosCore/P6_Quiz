const Sequelize = require("sequelize");
const {models} = require("../models");

/*let score = 0;
let cuestionarios = [];*/

exports.loadQuestion = (req, res, next) => {

    //guardo la puntuación en una variable local
    let score = req.session.score;

    if (req.session.cuestionarios === undefined) {

        //reinicio la puntuación
        req.session.score = 0;
        let score = req.session.score;

        //query a la base de datos para sacar todas las preguntas
        models.quiz.findAll()
            .then(quizzes => {

            //guardamos los quizzes y el índice de la pregunta actual en session de req
            req.session.cuestionarios = quizzes;
        req.session.index = Math.floor(Math.random()*quizzes.length)
        let index = req.session.index;

        //paso la pregunta y la puntuación actual a la vista correspondiente
        res.render('random_play', {
            quiz: quizzes[index],
            score: score
        });
    })
    .catch(error => next(error));


    } else {
        req.session.index = Math.floor(Math.random()*req.session.cuestionarios.length)
        let index = req.session.index;

        //paso la pregunta y la puntuación actual a la vista correspondiente jijicd
        res.render('random_play', {
            quiz: req.session.cuestionarios[index],
            score: score
        });
    }

};

exports.comprobar = (req, res, next) => {

    //guardo el id de la pregunta y la respuesta introducida en varibles locales
    let id = req.params.id;
    let respuesta = req.query.answer;

    //guardo los datos de la session en varibles locales
    let index = req.session.index;
    let quiz = req.session.cuestionarios[index];

    //resultado de si la respuesta introducida coincide con la correcta
    let resultado = false;

    //comparo la respuesta
    if (respuesta.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        === quiz.answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
        req.session.score++;
        resultado = true;
        req.session.cuestionarios.splice(index, 1);
        if(req.session.cuestionarios.length === 0){
            req.session.cuestionarios = undefined;
            res.render('random_nomore', {
                score: req.session.score
            });
        } else {
            res.render('random_result', {
                score: req.session.score,
                result: resultado,
                answer: respuesta
            });
        }

    } else {

        req.session.cuestionarios = undefined;
        let ultimoScore = req.session.score;
        req.session.score = 0;
        res.render('random_result', {
            score: ultimoScore,
            result: resultado,
            answer: respuesta
        });
    }
};