
let express = require('express');
let router = express.Router();
let utils = require('../controllers/api')

//Update the price of a book
router.get('/price',(req,res)=>{
    let newprice = req.query.newprice;
    let bookname = req.query.bookname;
    utils.UpdatePrice(newprice,bookname).then(result => {
        res.send({'result': result});
    });
    
})

//Update genre

router.get('/genre',(req,res)=>{
    let newgenre = req.query.newgenre;
    let bookname = req.query.bookname;
    utils.UpdateGenre(newgenre,bookname).then(result => {
        res.send({'result': result});
    });
    
})

//Remove a book

router.get('/removebook',(req,res)=>{
    let bookname = req.query.bookname;
    utils.RemoveBook(bookname).then(result => {
        res.send({'result': result});
    });

})


module.exports = router;