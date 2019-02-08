var counter = 0;
var findPrism = setInterval(function(){
    counter +=1;
    if (Prism !== undefined && $('.token.operator').length){
        $('.language-swift').html($('.language-swift').html().replace('=</span> name','=</span> <span class="token string">name</span>'));
        clearInterval(findPrism);
    }else{
        console.log('Undefined');
        if (counter === 20){
            clearInterval(findPrism);
        }
    }
},250);