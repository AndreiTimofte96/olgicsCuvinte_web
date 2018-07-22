module.exports = (() => {
    'use strict';

    const {solve} = require('./solver');
  
    const algorithmRoutes = (req, res)=>{

        const {letters, length} =  req.query;

        const words = solve(letters, length);

        words.sort(function(a, b){
            return a.length - b.length;
        });

      

        res.json({words});
    };
  
    return {
        algorithmRoutes
    };
})();
  