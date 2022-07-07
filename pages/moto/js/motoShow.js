let current = 0;
let sliderStep = setInterval(() => sliderDo(0, false), 8000);

function sliderDo(state, step) {
    if(step) {
        clearInterval(sliderStep);
        sliderStep = setInterval(() => sliderDo(0, false), 8000);
    }

    if(state === 1) {
        current--;
    }else{
        current++;
    }

    if(current === 3)current = 0;
    if(current === -1)current = 2;

    let sliderCounts = document.getElementsByClassName("sliderNumber");
    let sliderItems = document.getElementsByClassName("header__slider__item");
    for(let i = 0; i < 3; i++){
        if(sliderCounts[i].classList.contains("active")){
            sliderCounts[i].classList.remove("active");
            sliderCounts[i].classList.add("noActive");
        }

        if(sliderItems[i].classList.contains("active")){
            sliderItems[i].classList.remove("active");
            sliderItems[i].classList.add("noActive");
        }
    }

    sliderCounts[current].classList.remove("noActive");
    sliderCounts[current].classList.add("active");

    sliderItems[current].classList.remove("noActive");
    sliderItems[current].classList.add("active");
}

document.getElementsByClassName('header__count-arrow')[0].addEventListener('click', () => sliderDo(1, true));
document.getElementsByClassName('header__count-arrow')[1].addEventListener('click', () => sliderDo(0, true));
