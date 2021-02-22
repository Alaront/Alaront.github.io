window.onload = function(event){
    

    let preloader = document.getElementById('preloader')
    
    setTimeout(()=>{
        preloader.classList.add('preloader_end')
    }, 500)

    setTimeout(()=>{
        preloader.style.display = 'none'
    }, 900)
}