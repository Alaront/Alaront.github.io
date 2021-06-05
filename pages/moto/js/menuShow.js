let temp = 0;

let showMenu = (state) =>{
    let osY = window.pageYOffset;
    let menu = document.getElementsByClassName('nav')[0]

    if(screen.width < 650 && !state){
        return
    }

    if(state){
        if(menu.classList.contains('MenuHide')){
            menu.classList.remove('MenuHide');
            menu.classList.add("MenuShow");
        }else{
            menu.classList.remove("MenuShow");
            menu.classList.add('MenuHide');
        }

        return
    }

    if(temp > osY + 5){
        if(menu.classList.contains('MenuHide'))menu.classList.remove('MenuHide');
        if(!menu.classList.contains('MenuShow'))menu.classList.add("MenuShow");
        
    }

    if(temp < osY || temp < 100){
        if(menu.classList.contains('MenuShow'))menu.classList.remove("MenuShow");
        if(!menu.classList.contains('MenuHide'))menu.classList.add('MenuHide');
    }

    temp = osY;
}

document.addEventListener("scroll", () => showMenu(false))
document.getElementsByClassName('MenuLogo')[0].addEventListener('click', () => showMenu(true))