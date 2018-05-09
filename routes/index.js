const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz');
const playController = require('../controllers/play');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

// Author page.
router.get('/author', (req, res, next) => {
    res.render('author');
});

//Rutas para la función random play
router.get('/quizzes/randomplay', playController.loadQuestion);
router.get('/quizzes/randomcheck/:id(\\d+)', playController.comprobar)


// Autoload for routes using :quizId
router.param('quizId', quizController.load);


// Routes for the resource /quizzes
router.get('/quizzes',                     quizController.index);
router.get('/quizzes/:quizId(\\d+)',       quizController.show);
router.get('/quizzes/new',                 quizController.new);
router.post('/quizzes',                    quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',  quizController.edit);
router.put('/quizzes/:quizId(\\d+)',       quizController.update);
router.delete('/quizzes/:quizId(\\d+)',    quizController.destroy);

router.get('/quizzes/:quizId(\\d+)/play',  quizController.play);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);


module.exports = router;