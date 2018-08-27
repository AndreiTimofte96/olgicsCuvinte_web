$(document).ready(function(){

    require('../less/index.less');

    // const hostName = 'apiolgicscuvinte.localtunnel.me';
    const hostName ='0.0.0.0:2225';

    $("span.warning").hide();
    $(".words").hide();
    $(".pre-loader").hide();

    function apiWordsGet(letters, lengthInput, callback) {

        let apiURL= `http://${hostName}/getWords`;

        if (lengthInput.length > 0){
            apiURL+=`?letters=${letters}&length=${lengthInput}`;
            
        }else{
            apiURL+=`?letters=${letters}`;
        }

        $(".pre-loader").show();
		$.get(apiURL)
		.done(function (response) {
            $(".pre-loader").hide();
            console.log(response);
            callback(response);

        });      	
	};


    function getWords(letters, lengthInput){
        
        $(".words .length").remove();
        apiWordsGet(letters, lengthInput, function(response){

            $(".words").show();
            let toAppend = "";

            if (response.words.length === 0){
                toAppend+= '<div class="length">';
                toAppend+=`Nothing found!`;
                toAppend+=`</div>`;
            }else{
                for (let index = 0; index < response.words.length;){

                    let length = response.words[index].length;
                    toAppend+= '<div class="length">';
                    toAppend+=`Length ${length}`;
                    toAppend+=`<ul>`
                    while (index < response.words.length && response.words[index].length === length){
                        
                        toAppend+=`<li>${response.words[index]}</li>`
                        index++;
                    }
                    toAppend+=`</ul> </div>`
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