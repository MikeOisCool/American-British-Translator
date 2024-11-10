'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body
      const translation = translator.translation(text, locale)
      // console.log('mmjh', locale)
       console.log(translation)
      //  if ( translation.translation ==  text ) {
      //  return res.json({ text, translation: "Everything looks good to me!"})
      //  }
        res.json(translation)
      
    });
};
