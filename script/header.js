window.onscroll = function () {
    if ((window.scrollY) > 100) {
        document.getElementsByClassName('main_h')[0].classList.add('sticky')
    } else {
        document.getElementsByClassName('main_h')[0].classList.remove('sticky')
    }
}


document.getElementsByClassName('mobile-toggle')[0].onclick = function () {
    if (document.getElementsByClassName('main_h')[0].classList.contains('open-nav')) {
        document.getElementsByClassName('main_h')[0].classList.remove('open-nav')
    } else {
        document.getElementsByClassName('main_h')[0].classList.add('open-nav')
    }
}

let link_func = () => {
    for(let i =0; i < 4; i++){
        document.getElementsByClassName('main_h__link')[i].onclick = function(){
            if (document.getElementsByClassName('main_h')[0].classList.contains('open-nav')) {
                document.getElementsByClassName('navigation')[0].classList.remove('open-nav')
                document.getElementsByClassName('main_h')[0].classList.remove('open-nav')
            }
        }
    }
}

link_func()