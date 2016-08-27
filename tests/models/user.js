var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;

var User = require('../../models/user');

describe('User', () => {
    before( (done) => {
        mongoose.connect('mongodb://localhost:27017/test', done);
    });

    it('Testing creation of an user', (done) => {
        User.create('testUsername','testPassword', (err) => {
            expect(err).to.not.exist;
            done()
        })
    });

    after(function(done) {
        var dropColectionsAndDb = new Promise( (resolve, reject) => {
            mongoose.connection.db.dropDatabase(resolve);
        });

        dropColectionsAndDb.then( () => {
            mongoose.connection.close(done);
        });
    })
})
