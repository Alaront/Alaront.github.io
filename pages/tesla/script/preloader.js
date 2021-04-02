window.onload = function(){
    let preloader = document.getElementById('preloader')

    preloader.classList.add('preloader_end')

    setTimeout(()=>{
        preloader.style.display = 'none'
    }, 500)
}