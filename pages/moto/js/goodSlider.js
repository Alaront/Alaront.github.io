let hideElement = document.getElementsByClassName('goodsSlider__item')[3];

let moveRight = () =>{
    let elemens = document.getElementsByClassName('goodsSlider__item');
    let tempElement = elemens[2];

    elemens[0].before(hideElement);

    hideElement = tempElement;

}

let moveLeft = () =>{
    let elemens = document.getElementsByClassName('goodsSlider__item');
    let tempElement = elemens[0];

    hideElement = tempElement;
    
    elemens[3].after(hideElement);


}

document.getElementsByClassName('goods__menu-right')[0].addEventListener('click', moveRight);
document.getElementsByClassName('goods__menu-left')[0].addEventListener('click', moveLeft);