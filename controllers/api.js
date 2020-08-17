let booksSchema = require('../models/schema/book')
let ordersModel = require('../models/schema/order')




const utils = {
    Totalbookcount: async function () {
        console.log(booksSchema);
        var finalresult;
        await booksSchema.aggregate([{
            $group: {
                _id: 0,
                total: {
                    $sum: "$totalQuantity"
                }
            }
        },
        {
            $project: {
                _id: 0,
                total: 1
            }
        }], function (err, result) {
            console.log(result);
            finalresult = result;
            if (err) return handleError(err);
        });
        return finalresult[0]['total'];
        
    },

    FindByAuthor: async function (authorname) {
        var finalresult;
        await booksSchema.find({ author: authorname }, 'bookname', function (err, result) {
            finalresult = result;
            console.log(result);

            if (err) return handleError(err);
        })
        return finalresult;
    },

    FindByPattern: async function (pattern) {
        var finalresult
        await booksSchema.find({ author: { "$regex": pattern, "$options": "i" } }, 'bookname', function (err, result) {
            finalresult = result;
            if (err) return handleError(err);
        })
        return finalresult;
    },

    FindByGenre: async function (genre) {
        var finalresult
        await booksSchema.find({ genre: genre }, 'bookname').exec(function (err, result) {
            finalresult = result;
            if (err) return handleError(err);
        })
        return finalresult;
    },

    TotalRentedBooks: async function () {
        var finalresult
        await booksSchema.aggregate([
            {
                $group: {
                    _id: null,
                    rentedCopies: { $sum: { $subtract: ['$totalQuantity', '$availableCopies'] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    rentedCopies: 1
                }
            }
        ], function (err, result) {
            finalresult = result;
            if (err) return handleError(err);
        });
        return finalresult;
    },


    AvailabilityCheck: async function (nameofbook) {
        var finalresult
        await booksSchema.find({ $and: [{ bookname: nameofbook }, { availableCopies: { $gte: 1 } }] }, async function (err, result) {

            if (result.length > 0) {
                finalresult = 0;
            }
            else {
                var multipleCopies = mongoose.model('orderinformation', ordersSchema);
                await multipleCopies.find({ bookname: nameofbook }, 'doi', { sort: { date: -1 } }, async function (err, result) {
                    var doi = (JSON.stringify(result[0]['doi']));
                    var doi_ = doi.slice(1, 11);
                    var _doi = new Date(doi_);
                    var currD = (JSON.stringify(new Date()));
                    var currD_ = currD.slice(1, 11);
                    var _currD = new Date(currD_);
                    var diff = 14 - ((_currD - _doi) / 86400000);
                    finalresult = await diff;

                })
            }
            if (err) return handleError(err);
        })
        return finalresult;
    },


    BooksRentedByaCustomer: async function (customerIdentifier) {
        var finalresult
        var rentedbooks = mongoose.model('orderinformation', ordersSchema);
        var currD = ((new Date()));
        currD.setDate(currD.getDate() - 14);
        var s = JSON.stringify(currD);
        var currD_ = s.slice(1, 11);
        var _currD = new Date(currD_);
        await rentedbooks.find({ $and: [{ customerId: customerIdentifier }, { doi: { $gte: currD_ } }] }, 'bookname doi', function (err, result) {
            console.log(result);
            finalresult = result;
            if (err) return handleError(err);
        })

        return finalresult;


    },
    //two async functions
    MoneySpentByUser: async function (customerIdentifier) {
        var finalresult
        var currD = ((new Date()));
        currD.setDate(currD.getDate() - 100);
        var s = JSON.stringify(currD);
        var currD_ = s.slice(1, 11);
        const result = await ordersModel.find({ $and: [{ customerId: customerIdentifier }, { doi: { $gte: currD_ } }] }).populate('bookId')
        return result;
    },


    UpdatePrice: async function (newprice, bookname) {
        
        await booksSchema.update({ 'bookname': bookname }, { $set: { 'price': newprice } }, function (err, b) {
            if (err) finalresult = "error";
            else {
                finalresult = "Successfully Updated price";
            }
        })
        return finalresult;
    },

    UpdateGenre: async function (newgenre, bookname){

        await booksSchema.update({'bookname' : bookname}, {$set : {'genre' : newgenre}}, function(err,b){
           if(err) finalresult ="error";
           else{
            finalresult ="Successfully Updated genre";
           }
       })
       return finalresult;
   },

   RemoveBook : async function(bookname){
    await booksSchema.findOneAndRemove({'bookname' : bookname}, {}, function(err,b){
        if(err) finalresult ="error";
        else{
            finalresult ="removed the book";
        }
    })
    return finalresult;
   }

}

  



module.exports = utils;
