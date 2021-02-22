(function () {
    let arr = document.getElementsByClassName('main_h__link')
    for (let i = 0; i < arr.length; i++) {
        arr[i].onclick = (event) => {
            event.preventDefault()
            let id = arr[i].getAttribute('href')
            let offset = 70
            let target = document.getElementsByClassName(id)[0].offsetTop - offset
            window.scrollTo(0, target)
        }
    }

}())