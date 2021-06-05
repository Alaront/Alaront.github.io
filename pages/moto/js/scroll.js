const anchors = document.querySelectorAll('a[href*="#"]')

anchors.forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    let menu = document.getElementsByClassName('nav')[0]
    if(menu.classList.contains('MenuHide')){
        menu.classList.remove('MenuHide');
        menu.classList.add("MenuShow");
    }else{
        menu.classList.remove("MenuShow");
        menu.classList.add('MenuHide');
    }
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})