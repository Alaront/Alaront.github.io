window.onload = function(event){
    

    let preloader = document.getElementById('preloader')
    
    setTimeout(()=>{
        preloader.classList.add('preloader_end')
    }, 2000)

    setTimeout(()=>{
        preloader.style.display = 'none'
    }, 2500)
}