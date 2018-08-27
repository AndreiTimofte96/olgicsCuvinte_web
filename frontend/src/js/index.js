$(document).ready(function(){

    require('../less/index.less');

    // const hostName = 'apiolgicscuvinte.localtunnel.me';
    const hostName ='0.0.0.0:4000';

    $("span.warning").hide();
    $(".words").hide();
    $(".pre-loader").hide();

    let language = 'romanian';

    function apiWordsGet(letters, lengthInput, callback) {

        let apiURL= `http://${hostName}/getWords`;

        if (lengthInput.length > 0){
            apiURL+=`?letters=${letters}&length=${lengthInput}&language=${language}`;
            
        }else{
            apiURL+=`?letters=${letters}`;
        }

        $(".pre-loader").show();
		$.get(apiURL)
		.done(function (response) {
            $(".pre-loader").hide();
            callback(response);

        });      	
	};


    function getWords(letters, lengthInput){
        
        $(".words .length").remove();
        apiWordsGet(letters, lengthInput, function(response){

            $(".words").show();
            let toAppend = "";


            console.log(response);
            if (response.solution.length === 0){
                toAppend+= '<div class="length">';
                toAppend+=`Nothing found!`;
                toAppend+=`</div>`;
            }else{
                for (let index = 0; index < response.solution.length; index++){

                    console.log(response.solution[index]);

                    if (response.solution[index] !== null){
                    
                        let numberOf = response.solution[index].words.length;
                        toAppend+= '<div class="length">';
                        toAppend+=`Length: <span>${index}</span>. Number of words: <span>${numberOf}</span>.`;
                        toAppend+=`<ul>`
                        
                            for (let jindex = 0; jindex < numberOf; jindex++){
                                toAppend+=`<li>${response.solution[index].words[jindex]}</li>`
                            }

                        toAppend+=`</ul> </div>`
                    }
                }
            }
             $(".words").append(toAppend);
        });
    }
    

    $(".insert .button").on("click", function(){
        const letters = $(".insert #letters_input").val().toLowerCase().replace(/ /g,'');
        const lengthInput = $(".insert #length_input").val();
        const regex = /^[a-zA-Z]+$/;
        const regex2 = /^\d+$/;

        if (regex.test(letters) === false || regex2.test(lengthInput) === false){
            
            if (lengthInput.length !== 0 || regex.test(letters) === false ){
                $("span.warning").show();
            }else{
                getWords(letters, lengthInput);
            }
        }
        else{
            getWords(letters, lengthInput);
        }
    });

    $(".insert input").on("input", function(){
        $("span.warning").hide();
        $(".words .length").remove();
        $(".words").hide();
    });


    $(".insert #length_input").on("input", function(){
        $("span.warning").hide();
        $(".words .length").remove();
        $(".words").hide();
    });

    $(".flag").on("click", function(){
        language = $(this).attr("id");

        if (language === 'romanian'){
            $(`.flag#english`).removeClass('active');
            $(`.flag#romanian`).addClass('active');
        }
        else{
            $(`.flag#romanian`).removeClass('active');
            $(`.flag#english`).addClass('active');
        }
    })
    $('html').bind('keypress', function(e){
        if(e.keyCode == 13){
            const letters = $(".insert #letters_input").val().toLowerCase().replace(/ /g,'');
            const lengthInput = $(".insert #length_input").val();
            const regex = /^[a-zA-Z]+$/;
            const regex2 = /^\d+$/;

            if (regex.test(letters) === false || regex2.test(lengthInput) === false){
                
                if (lengthInput.length !== 0 || regex.test(letters) === false ){
                    $("span.warning").show();
                }else{
                    getWords(letters, lengthInput);
                }
            }
            else{
                getWords(letters, lengthInput);
            }
        }
   });



});