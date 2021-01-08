function constructor(i){
    let arr_color = document.getElementsByClassName('constructor__choice_color');
    let arr_photo = document.getElementsByClassName('constructor__choice_photo');

    for (const iterator of arr_color) {
        if(iterator.classList.contains("color_active")){
            iterator.classList.remove("color_active");
        }
    }
    arr_color[i].classList.add("color_active");
    

    for (const iterator of arr_photo) {
        iterator.style = "display: none";
    }
    document.getElementsByClassName('constructor__choice_photo')[i].style = "display: block";

}

for(let i = 0; i < 4; i++){
    document.getElementsByClassName('constructor__choice_color')[i].onclick = function(){
        constructor(i);
    }
}