const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')



class Translator {

   invertObject(obj) {
      return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
   }
   


   translation(text, locale) {
      console.log(text, locale)
      

      if (text == null || locale == null) {
         return { error: 'Required field(s) missing' };
      }
      if (text.trim().length === 0) return { error: 'No text to translate' };
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
         return { error: 'Invalid value for locale field' };
      }


      // console.log( Object.entries(americanOnly) , 'warum undefind')
      //   console.log(text.split(' ')[1])
      // if (Object.entries(text).length !== 0) { 
      //    for (let a=0; a < text.split(' ').length + 1; a++){
      //       let wort = [text.split(' ')[a]]
      //       console.log(wort)
      //    for (let i=0; i < Object.keys(americanOnly).length; i++){
      //       if(Object.keys(americanOnly)[i] === text.split(' ')[a]) {
      //          console.log('gefunden')
      //          const keys = Object.keys(americanOnly)[i]
      //          console.log([a])
      //          return { translation: `<span class="highlight">${Object.values(americanOnly)[i]}</span>`}
      //       }}
      // }
      const message = { text, translation: 'Everything looks good to me!' }
      let wordsAll = {};

      if (locale === 'american-to-british') {
        // const americanToBritishOnly = this.invertObject(britishOnly)
         wordsAll = Object.assign({}, americanOnly, americanToBritishSpelling, americanToBritishTitles);
      } else if (locale === 'british-to-american') {
        // const britshToAmericanOnly = this.invertObject(americanOnly)
         const britishToAmericanSpelling = this.invertObject(americanToBritishSpelling);
         const britishToAmericanTitles = this.invertObject(americanToBritishTitles);

         wordsAll = Object.assign({}, britishToAmericanSpelling, britishToAmericanTitles, britishOnly)
      }
      const result = this.replaceWords(text, wordsAll, locale);
      return result.replaced ? { text, translation: result.text } : message

   }

   replaceWords(text, mapping, locale) {
      // const punctMap = {
      //    'american-to-british' : { ':': '.'},
      //    'british-to-american' : { '.': ':'}
      // }

      let replaced = false;

      // Reguläre Ausdrücke für Titel (mit und ohne Punkt)
    const regexPatternForTitles = locale === "american-to-british"
    ? /\b(dr)\b(?!\.)|\b(mrs)\b(?!\.)|\b(mr)\b(?!\.)|\b(ms)\b(?!\.)|\b(mx)\b(?!\.)|\b(prof)\b(?!\.)/gi
    : /\b(dr\.)\b|\b(mrs\.)\b|\b(mr\.)\b|\b(ms\.)\b|\b(mx\.)\b|\b(prof\.)\b/gi;

    text = text.replace(regexPatternForTitles, (match, title) => {
      let correctedTitle = title;
      if (locale === "american-to-british" && !title.includes('.')) {
        correctedTitle += '.';  // Punkt hinzufügen
      } else if (locale === "british-to-american" && title.includes('.')) {
        correctedTitle = title.replace('.', '');  // Punkt entfernen
      }
      replaced = true;
      return `<span class="highlight">${correctedTitle}</span>`;
    });

      console.log("Beginn der Ersetzung:", text);

      for (let [key, value] of Object.entries(mapping)) {
         const highlightedValue = `<span class="highlight">${value}</span>`

         const regexPattern = locale === "american-to-british"
         ? `\\b${key.replace('.', '\\.?')}\\b`  // Erlaubt sowohl mit als auch ohne Punkt
         : `\\b${key.replace('.', '\\.')}\\b`;

         const regex = new RegExp(regexPattern, 'gi')

         if (regex.test(text)) {
            text = text.replace(regex, (match, space) => `${highlightedValue}`)

            replaced = true;
            console.log(`Ersetzung gefunden und durchgeführt für: ${key} -> ${value}`);
         }
      }

      



      const timePattern = locale === 'american-to-british' ? /(\d{1,2}):(\d{2})/g : /(\d{1,2})\.(\d{2})/g;
      const punctChar = locale === 'american-to-british' ? '.' : ':';

      text = text.replace(timePattern, (match, p1, p2) => {

         const formattedTime = `<span class="highlight">${p1}${punctChar}${p2}</span>`;
         replaced = true;
         console.log(formattedTime, 'formattedTime')
         return formattedTime
      });

      // if (!replaced) {
      //    return { text, translation: 'Everything looks good to me!' };
      // }
      console.log(text, replaced, 'text und replaced')
      return { text, replaced }
   }   // if (!highlightedValue) { return message}
   // return replaced ? text : null
}



module.exports = Translator;