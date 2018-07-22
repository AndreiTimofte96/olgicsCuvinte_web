module.exports = (() => {
    'use strict';

    const words = require('./words');

    const solve = (letters, length) => {
        
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

                        if (solution.find((w)=>{return (w === words[index])}) === undefined){

                            solution.push(words[index]);
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
     