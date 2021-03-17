let showMenu = () =>{
    let links = document.getElementsByClassName("menu__link")[0];

    if(links.classList.contains("active")){
        links.classList.remove("active");
        links.classList.add("noActive");
    }else{
        links.classList.remove("noActive");
        links.classList.add("active");
    }
}

document.getElementsByClassName("menu__logo__img")[0].addEventListener("click", showMenu);