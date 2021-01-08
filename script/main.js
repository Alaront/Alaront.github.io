function writeTextByJS(id, text, speed){

    let ele = document.getElementById(id);
    let txt = text.join("").split("");

    setTimeout(() => {
        let interval = setInterval(function(){

            if(!txt[0]){
                return clearInterval(interval);
            }
      
            ele.innerHTML += txt.shift();
         }, speed);
    }, 1300);

}

writeTextByJS('text_info', ["OADSTER"], 150)