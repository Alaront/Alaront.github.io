let price = () =>{
    if(document.getElementsByClassName('pop-up__piece')[0].style.display == 'none'){
        document.getElementsByClassName('pop-up__piece')[0].style.display = 'flex'
    }else{
        document.getElementsByClassName('pop-up__piece')[0].style.display = 'none'
        document.getElementsByClassName('pop-up__attention')[0].style.display = 'none'
        document.getElementsByClassName('pop-up__attention')[1].style.display = 'none'
    }
}

let wholesale = () =>{
    if(document.getElementsByClassName('pop-up__wholesale')[0].style.display == 'none'){
        document.getElementsByClassName('pop-up__wholesale')[0].style.display = 'flex'
    }else{
        document.getElementsByClassName('pop-up__wholesale')[0].style.display = 'none'
        document.getElementsByClassName('pop-up__attention')[0].style.display = 'none'
        document.getElementsByClassName('pop-up__attention')[1].style.display = 'none'
    }
}

let attention = (i) => {
    if(document.getElementsByClassName('pop-up__attention')[i].style.display == 'none'){
        document.getElementsByClassName('pop-up__attention')[i].style.display = 'flex'
    }else{
        document.getElementsByClassName('pop-up__attention')[i].style.display = 'none'
    }
}

document.getElementById('price_1').onclick = () =>{
    price()
}

document.getElementsByClassName('pop-up__piece_text_cancel')[0].onclick = () =>{
    price()
}

document.getElementById('price_2').onclick = () =>{
    wholesale()
}

document.getElementsByClassName('pop-up__wholesale_text_cancel')[0].onclick = () =>{
    wholesale()
}

for(let i = 0; i < 2; i++){
    document.getElementsByClassName('pop-up__text_confirm')[i].onclick = () =>{
        attention(i)
    }
    
    document.getElementsByClassName('pop-up__attention_button')[i].onclick = () =>{
        attention(i)
    }
}