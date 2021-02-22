let menu_event = () =>{
    let menu = document.getElementById("menu");

    if(menu.classList.contains("open")){
        menu.classList.remove("open");
        menu.classList.add("close");
    }else{
        menu.classList.remove("close");
        menu.classList.add("open");
    }
}

document.getElementsByClassName("button")[0].addEventListener('click', menu_event);