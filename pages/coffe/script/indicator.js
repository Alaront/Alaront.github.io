document.getElementById('indicator_urban').onclick = (event) =>{
    let elem = document.getElementById('indicator_urban')
    
    if(elem.checked){
        document.getElementsByClassName('pop-up__piece_photo_product2')[0].style.display = 'block'
    }else{
        document.getElementsByClassName('pop-up__piece_photo_product2')[0].style.display = 'none'
    }
}

document.getElementById('indicator_scandinavian').onclick = (event) =>{
    let elem = document.getElementById('indicator_scandinavian')
    
    if(elem.checked){
        document.getElementsByClassName('pop-up__piece_photo_product1')[0].style.display = 'block'
    }else{
        document.getElementsByClassName('pop-up__piece_photo_product1')[0].style.display = 'none'
    }
}

document.getElementById('indicator_american').onclick = (event) =>{
    let elem = document.getElementById('indicator_american')
    
    if(elem.checked){
        document.getElementsByClassName('pop-up__piece_photo_product3')[0].style.display = 'block'
    }else{
        document.getElementsByClassName('pop-up__piece_photo_product3')[0].style.display = 'none'
    }
}