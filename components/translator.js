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
      console.log('hallo')

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
      // console.log(text)
      if (locale === 'american-to-british') {
        //const americanToBritishOnly = this.invertObject(britishOnly)
         wordsAll = Object.assign({}, americanOnly, americanToBritishSpelling, americanToBritishTitles);
      } else if (locale === 'british-to-american') {
        // const britshToAmericanOnly = this.invertObject(americanOnly)
         const britishToAmericanSpelling = this.invertObject(americanToBritishSpelling);
         const britishToAmericanTitles = this.invertObject(americanToBritishTitles);

         wordsAll = Object.assign({}, britishToAmericanSpelling, britishOnly, britishToAmericanTitles)
      }
      const result = this.replaceWords(text, wordsAll, locale);
 // Britisch zu Amerikanisch
//  if (locale === 'british-to-american') {
//    // const britishToAmericanTitles = this.invertObject(americanToBritishTitles);
//       result.text = result.text.replace(/\b(dr|mr|mrs|ms|mx|prof)\b/gi, (match) => {
//          result.replaced = true;
//           return `<span class="highlight">${match.charAt(0).toUpperCase() + match.slice(1) }</span>`;
//       });
//   }
  console.log(result.text,'<-----------')



      return result.replaced ? { text, translation: result.text } : message

   }
   translateTitle(text, locale) {
      let newString = text;
      let replaced = false;
      
      // Übersetzung der Titel: Entfernen des Punktes bei amerikanischen Titeln, falls nötig
      if (locale === 'american-to-british') {
         Object.entries(americanToBritishTitles).forEach(([key, value]) => {
            const regex = new RegExp(`${key.replace('.', '\\.')}`, "gi");
            console.log(`Regex für ${key}: ${regex}`);
            newString = newString.replace(regex, (match) => {
               const correctedValue = match.charAt(0).toUpperCase() + value.slice(1);
         console.log(`Ersetzung gefunden und durchgeführt für: ${match} -> ${correctedValue}`);
         return `<span class="highlight">${correctedValue}</span>`;
            })
         });
      } else if (locale === 'british-to-american') {
         // Wenn wir von Britisch nach Amerikanisch übersetzen, fügen wir den Punkt wieder hinzu
         Object.keys(americanToBritishTitles).forEach((key) => {
            const regex = new RegExp(`\\b${key}\\b(?!\\.)`, "gi");
            newString = newString.replace(regex, `${key}.`);  // Punkt hinzufügen bei Titeln wie "Dr"
         });
      }
      if (newString !== text) {
         replaced = true; // Nur wenn Änderungen vorgenommen wurden
      }
      return { text: newString, replaced };
   }

   replaceWords(text, mapping, locale) {
      let replaced = false;
      console.log("Beginn der allgemeinen Wörter-Ersetzung:", text);

      for (let [key, value] of Object.entries(mapping)) {
         const highlightedValue = `<span class="highlight">${value}</span>`;
         const regexPattern = locale === "american-to-british"
            ? `\\b${key.replace(' ',' ')}\\b`
            : `\\b${key.replace('', '')}\\b`;
   
         const regex = new RegExp(regexPattern, 'gi');
         if (regex.test(text)) {
            text = text.replace(regex, `${highlightedValue}`);
            replaced = true;
            console.log(`Ersetzung gefunden und durchgeführt für: ${key} -> ${value}`);
         }
      }
      console.log(text,'vorher')
      // Titel-Ersetzung: Übersetze Titel, indem du den Punkt entfernst oder hinzufügst
      const titleResult = this.translateTitle(text, locale);
      text = titleResult.text;
      replaced = replaced || titleResult.replaced
      console.log(text,'nacher')
      // Uhrzeit-Konvertierung
      const timePattern = locale === 'american-to-british' ? /(\d{1,2}):(\d{2})/g : /(\d{1,2})\.(\d{2})/g;
      const punctChar = locale === 'american-to-british' ? '.' : ':';
   
      text = text.replace(timePattern, (match, p1, p2) => {
         const formattedTime = `<span class="highlight">${p1}${punctChar}${p2}</span>`;
         replaced = true;
         return formattedTime;
      });
   
      console.log(text, replaced, 'text und replaced');
      return { text, replaced };
   }
}



module.exports = Translator;