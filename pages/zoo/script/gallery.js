let show_itms = (start, end, index) =>{
    let gallery = document.getElementsByClassName("gallery__photo")[0];
    gallery.innerHTML = "";

    let gallery_index = document.querySelectorAll(".gallery .gallery__menu ul li");
    gallery_index.forEach((elem, index)=>{
        if(elem.classList.contains("active")){
            elem.classList.remove("active");
        }
    })

    gallery_index[index].classList.add("active");

    for(let i = start; i <= end; i++){
        gallery.innerHTML += `<div class="gallery__photo_item"><img src="img/gallery/${i}.jpg" alt="photo"></div>`;
    }
}

let gallery_menu = document.querySelectorAll(".gallery .gallery__menu ul li");

gallery_menu[0].addEventListener("click", () => show_itms(1, 12, 0));
gallery_menu[1].addEventListener("click", () => show_itms(1, 3, 1));
gallery_menu[2].addEventListener("click", () => show_itms(4, 6, 2));
gallery_menu[3].addEventListener("click", () => show_itms(7, 9, 3));
gallery_menu[4].addEventListener("click", () => show_itms(10, 12, 4));