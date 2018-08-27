module.exports = (() => {
    'use strict';

    const {solve} = require('./solver');
  
    const algorithmRoutes = (req, res)=>{

        const {letters, length} =  req.query;

        const solution = solve(letters, length);

        solution.map( sol =>{sol.words.sort(function(a, b){
                return a.localeCompare(b);
            });
        });
        res.json({solution});
    };
    
    return {
        algorithmRoutes
    };
})();
  