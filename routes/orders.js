let express = require('express');
let router = express.Router();
let utils = require('../controllers/api')

//Get the number of days after which if a book is rented, it can be rented by another customer
//check availableCopies filed in booksinformations collection, if that is zero then proceed else return answer 0
//sort by date the documents in orderinformation collection havving this bookname and pick the date which is oldest doi.
//todays date - doi > 14 => response 0, otherwise 14 - (today's date -doi)

router.get('/availabilitycheck/:bookname', (req, res) => {
    let nameofbook = req.params.bookname
    utils.AvailabilityCheck(nameofbook).then(result => {
        res.send({'result' : result});
    });


});


//by customerNumber find all orders placed 
//today's date - doi check if less than 14 show in result the details and increse cnt by one



router.get('/booksrentedbyacustomer/:customerNumber', (req, res) => {
    let customerIdentifier = req.params.customerNumber
    utils.BooksRentedByaCustomer(customerIdentifier).then(result => {
        res.send({'noOfBooks': result.length,'result': result});
    });


});

//by customerNumber get orders of user in last 100 days
//for each bookname in this result search for price in 1st collection


router.get('/moneyspentbyauser/:customerNumber', (req,res) => {
    let customerIdentifier = req.params.customerNumber
    utils.MoneySpentByUser(customerIdentifier).then(result => {
        res.send({'result': result});
    });

});

module.exports = router;
