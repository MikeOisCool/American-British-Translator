const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    test('1. Translate Mangoes are my favorite fruit. to British English', () => {
        const translator = new Translator();
        const result = translator.translation('Mangoes are my favorite fruit.', 'american-to-british')
        assert.equal(result.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
    })

    test('2. Translate I ate yogurt for breakfast. to British English', () => {
        const translator = new Translator();
        const result = translator.translation('I ate yogurt for breakfast.', 'american-to-british')
        assert.equal(result.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
    })

    test("3. Translate We had a party at my friend's condo. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("We had a party at my friend's condo.", 'american-to-british')
        assert.equal(reslut.translation, `We had a party at my friend's <span class="highlight">flat</span>.`)


    })

    test("4. Translate Can you toss this in the trashcan for me? to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Can you toss this in the trashcan for me?", 'american-to-british')
        assert.equal(reslut.translation, `Can you toss this in the <span class="highlight">bin</span> for me?`)
    })

    test("5. Translate The parking lot was full. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("The parking lot was full.", 'american-to-british')
        assert.equal(reslut.translation, `The <span class="highlight">car park</span> was full.`)
    })

    test("6. Translate Like a high tech Rube Goldberg machine. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation('Like a high tech Rube Goldberg machine.', 'american-to-british')

        assert.equal(reslut.translation, `Like a high tech <span class="highlight">Heath Robinson device</span>.`)
    })

    test("7. Translate To play hooky means to skip class or work. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("To play hooky means to skip class or work.", 'american-to-british')
        assert.equal(reslut.translation, `To <span class="highlight">bunk off</span> means to skip class or work.`)
    })

    test("8. Translate No Mr. Bond, I expect you to die. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("No Mr. Bond, I expect you to die.", 'american-to-british')
        assert.equal(reslut.translation, `No <span class="highlight">Mr</span> Bond, I expect you to die.`)
    })

    test("9. Translate Dr. Grosh will see you now. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Dr. Grosh will see you now.", 'american-to-british')
        assert.equal(reslut.translation, `<span class="highlight">Dr</span> Grosh will see you now.`)
    })

    test("10. Translate Lunch is at 12:15 today. to British English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Lunch is at 12:15 today.", 'american-to-british')
        assert.equal(reslut.translation, `Lunch is at <span class="highlight">12.15</span> today.`)
    })

    test("11. Translate We watched the footie match for a while. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("We watched the footie match for a while.", 'british-to-american')
        assert.equal(reslut.translation, `We watched the <span class="highlight">soccer</span> match for a while.`)
    })

    test("12. Translate Paracetamol takes up to an hour to work. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Paracetamol takes up to an hour to work.", 'british-to-american')
        assert.equal(reslut.translation, `<span class="highlight">Tylenol</span> takes up to an hour to work.`)
    })

    test("13. Translate First, caramelise the onions. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("First, caramelise the onions.", 'british-to-american')
        assert.equal(reslut.translation, `First, <span class="highlight">caramelize</span> the onions.`)
    })

    test("14. Translate I spent the bank holiday at the funfair. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("I spent the bank holiday at the funfair.", 'british-to-american')
        assert.equal(reslut.translation, `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`)
    })

    test("15. Translate I had a bicky then went to the chippy. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("I had a bicky then went to the chippy.", 'british-to-american')
        assert.equal(reslut.translation, `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.`)
    })
    
    test("16. Translate I've just got bits and bobs in my bum bag. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("I've just got bits and bobs in my bum bag.", 'british-to-american')
        assert.equal(reslut.translation, `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`)
    })
 
    test("17. Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("The car boot sale at Boxted Airfield was called off.", 'british-to-american')
        assert.equal(reslut.translation, `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`)
    })

    test("18. Translate Have you met Mrs Kalyani? to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Have you met Mrs Kalyani?", 'british-to-american')
        assert.equal(reslut.translation, `Have you met <span class="highlight">mrs.</span> Kalyani?`)
    })

    test("19. Translate Prof Joyner of King's College, London. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Prof Joyner of King's College, London.", 'british-to-american')
        assert.equal(reslut.translation, `<span class="highlight">prof.</span> Joyner of King's College, London.`)
    })

    test("20. Translate Tea time is usually around 4 or 4.30. to American English", () => {
        const translator = new Translator();
        const reslut = translator.translation("Tea time is usually around 4 or 4.30.", 'british-to-american')
        assert.equal(reslut.translation, `Tea time is usually around 4 or <span class="highlight">4:30</span>.`)
    })

    test("21. Highlight translation in Mangoes are my favorite fruit.", () => {
        const translator = new Translator();
        const reslut = translator.translation("Mangoes are my favorite fruit.", 'american-to-british')
        assert.equal(reslut.translation, `Mangoes are my <span class="highlight">favourite</span> fruit.`)
    })

    test("22. Highlight translation in I ate yogurt for breakfast.", () => {
        const translator = new Translator();
        const reslut = translator.translation("I ate yogurt for breakfast.", 'american-to-british')
        assert.equal(reslut.translation, `I ate <span class="highlight">yoghurt</span> for breakfast.`)
    })

    test("23. Highlight translation in We watched the footie match for a while.", () => {
        const translator = new Translator();
        const reslut = translator.translation("We watched the footie match for a while.", 'british-to-american')
        assert.equal(reslut.translation, `We watched the <span class="highlight">soccer</span> match for a while.`)
    })

    test("24. Highlight translation in Paracetamol takes up to an hour to work.", () => {
        const translator = new Translator();
        const reslut = translator.translation("Paracetamol takes up to an hour to work.", 'british-to-american')
        assert.equal(reslut.translation, `<span class="highlight">Tylenol</span> takes up to an hour to work.`)
    })

});
