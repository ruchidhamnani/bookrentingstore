let express = require('express');
let router = express.Router();
let utils = require('../controllers/api')



//get totalcount of books
router.get('/totalcount', (req, res) => {
    utils.Totalbookcount().then(result => {
        res.json({ status: 200, totalcount: result, error: null });
    });


});



//get all the books of a given author
router.get('/findbyauthor/:authorname', (req, res) => {
    let authorname = req.params.authorname
    utils.FindByAuthor(authorname).then(result => {
        res.json({ status: 200, result: result, error: null });
    });


});


//find by pattern 
router.get('/findbypattern/:pattern', (req, res) => {
    let pattern = req.params.pattern
    utils.FindByPattern(pattern).then(result => {
        res.send({ 'result': result });

    });
});




//get all books of a given genre
router.get('/findbygenre/:genre', (req, res) => {
    let genre = req.params.genre
    utils.FindByGenre(genre).then(result => {
        res.send({ 'result': result });

    });
});



//get all the rented books
router.get('/rentedcount', (req, res) => {
    utils.TotalRentedBooks().then(result => {
        res.send({ 'result': result });

    });
});






module.exports = router;
