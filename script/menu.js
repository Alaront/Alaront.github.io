let open_menu = () =>{
    let block = document.getElementsByClassName('block__circle')[0];


    if(block.classList.contains('open')){
        block.classList.remove('open');
        block.classList.add('close');
    }else if(block.classList.contains('close')){
        block.classList.remove('close');
        block.classList.add('open');
    }

}

document.getElementsByClassName('block__circle_ful')[0].onclick = function (){
    open_menu();
}