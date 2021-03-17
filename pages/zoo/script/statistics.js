let statistics = () =>{
    let days, species, individuals, visitor;
    days = 1204;
    species = 2;
    individuals = 2970;
    visitor = 1204;

    let statistics__items = document.querySelectorAll(".statistics .statistics__text ul li");

    let statistics_interval = setInterval(() => {
        if(days == 1232) clearInterval(statistics_interval);

        days += 2;
        species += 2;
        individuals += 2;
        visitor += 2;        
        
        statistics__items[0].innerHTML = `${days}<span>дней</span>`;
        statistics__items[1].innerHTML = `${species}<span>видов</span>`;
        statistics__items[2].innerHTML = `${individuals}<span>особей</span>`;
        statistics__items[3].innerHTML = `${visitor}<span>поситителя</span>`;

    }, 66,6);
}

const animaItems = document.querySelectorAll('.statistics .statistics__text');
if(animaItems.length > 0){
    window.addEventListener("scroll", animForScrol);

    function offset(el) {
        let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        //for menu
        if(scrollTop > 100){
            let elem = document.getElementsByClassName('menu')[0];
            if(!elem.classList.contains("menu_active")){
                elem.classList.add("menu_active");
            }
        }else if(scrollTop < 100){
            let elem = document.getElementsByClassName('menu')[0];
            if(elem.classList.contains("menu_active")){
                elem.classList.remove("menu_active");
            }
        }

        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    function animForScrol(){
        for (let i = 0; i < animaItems.length; i++) {
            const animItem = animaItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if(!(pageYOffset > animItemOffset - animItemPoint) && !pageYOffset <(animItemOffset + animItemHeight)){
                statistics();
            }

        }

    }
    animForScrol();
}