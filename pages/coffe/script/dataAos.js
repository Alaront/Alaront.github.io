(function dateAos() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementsByClassName('product___block_urban')[0].setAttribute('data-aos', 'fade-up')
        document.getElementsByClassName('product___block_american')[0].setAttribute('data-aos', 'fade-up')
    }
}())