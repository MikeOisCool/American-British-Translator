const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {


    test('1. Translation with text and locale fields: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Hello, how are you rv?',
                locale: 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.property(res.body, 'translation', 'Response should have a translation field');
                assert.equal(
                    res.body.translation,
                    'Hello, how are you <span class="highlight">caravan</span>?',
                    'Expected translation result'
                );
                done();
            })
    })

    test('2. Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Hello',
                locale: 'wrong'
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Antwort Status sollte 200 sein');
                assert.property(res.body, 'error', 'Antwort sollte ein error-Feld enthalten');
                assert.equal(res.body.error, 'Invalid value for locale field' );
                done()

            })
    })

    test('3. Translation with missing text field: POST request to /api/translate', (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            
            locale: 'american-to-british'
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error');
            assert.equal(res.body.error, 'Required field(s) missing');
            done()
        })
    })

    test('4. Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'hello',
                
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Antwort Status sollte 200 sein');
                assert.property(res.body, 'error', 'Antwort sollte ein error-Feld enthalten');
                assert.equal(res.body.error, 'Required field(s) missing' );
                done()

            })
    })

    test('5. Translation with empty text: POST request to /api/translate', (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: '',
            locale: 'american-to-british'
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error');
            assert.equal(res.body.error, 'No text to translate');
            done()
        })
    })

    test('6. Translation with text that needs no translation: POST request to /api/translate', (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: 'Hello',
            locale: 'american-to-british'
        })
        .end((err, res) => {
            assert.property(res.body, 'translation', 'Response should have a translation field');
            assert.equal(
                res.body.translation,
                'Everything looks good to me!',
                'Wenn keine Übersetzung nötig'
            );
            done()
        })
    })

});
