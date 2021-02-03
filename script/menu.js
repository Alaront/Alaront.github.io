let change = (i) =>{
    let button = document.getElementsByClassName('content__chose__button');
    let informs = document.getElementsByClassName('content__elems__soups');
    for(let i  = 0; i < button.length; i++){
        button[i].classList.remove("active");
    }
    button[i].classList.add("active")

    for(let i  = 0; i < informs.length; i++){
        informs[i].classList.add("no_active");
        informs[i].classList.remove("active")
    }
    informs[i].classList.remove("no_active")
    informs[i].classList.add("active")

}

let button = document.getElementsByClassName('content__chose__button');
for(let i  = 0; i < button.length; i++){
    button[i].addEventListener('click', () => change(i), false);
}

