module.exports = (() => {
    'use strict';

    let words = [];

    const solve = (letters, length, language) => {
        
        switch (language){
            case 'romanian': { words = require('./wordsRomanian'); break; }
            case 'english': { words = require('./wordsEnglish'); break; }
            default: words = require('./wordsRomanian');
        }

        let used = [];
        let usedWords = [];
        let sum = 0;
        let solution = [];

        console.log(length);

        for (let index = 0; index < words.length; index++){


            if (letters.indexOf(words[index][0]) !== -1 ){ // eficientizare
                
                if (words[index].length == length || length == undefined){ //pt lungime variabila primita
                    sum = 0;
                    for (let kindex = 0; kindex < words[index].length; kindex++){
                        usedWords[kindex] = 0;
                    }

                    for (let jindex = 0; jindex < letters.length; jindex++){

                        for (let kindex = 0; kindex < words[index].length; kindex++){
                            if (letters[jindex] === words[index][kindex] && usedWords[kindex] === 0){
                                usedWords[kindex] = 1;
                                break;
                            }
                        } 
                    }

                    for (let kindex = 0; kindex < words[index].length; kindex++){
                        sum += usedWords[kindex];
                    }

                    if (words[index].length === sum){

                        let foundWord = words[index];
                        let lengthOfWord = foundWord.length;

                        let wordExists = undefined;

                        if (solution[lengthOfWord] !== undefined){
                            wordExists = solution[lengthOfWord].words.find((w)=>{
                                            return (w === words[index])
                                        });
                        }    
                        else{
                            solution[lengthOfWord] = { "words": [] };
                        }

                        if (wordExists === undefined){ 
                            solution[lengthOfWord]["words"].push(foundWord);
                         }
                    }
                }
            }
        }

        return solution;
    }

    return {
        solve
    };
})();
     