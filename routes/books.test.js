const axios = require('axios');
const request = require('supertest');
const app = require('../app');

// request(app).get



test('totalbooks', async()=>{

    var x = await request(app).get('/books/totalcount');
    expect(x.text).toEqual('9');

    // return expect(x).toEqual(11);
})

test('booksofauthor', async()=>{

    var x = await request(app).get('/books/findbyauthor/jk_g');
    expect(x.text).toEqual('har');

})

// test('rentedbooks', async()=>{

//     var x = await request(app).get('/books/rentedcount');
//     expect(x.text).toEqual('9');

// })  
test('availabilitycheck', async()=>{

    var x = await request(app).get('/orders/availabilitycheck/5f2baa5a3884bd5e7dfcd99f');
    expect(x.text).toBe('0');

})  
