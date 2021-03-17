let bg1 = document.getElementsByClassName('parallax__elems_photo2')[0];
let bg2 = document.getElementsByClassName('parallax__elems_photo1')[0];
let bg3 = document.getElementsByClassName('parallax__elems_photo1')[1];
document.getElementsByClassName('header')[0].addEventListener('mousemove', function(even) {
    let x = even.clientX / window.innerWidth;
    let y = even.clientY / window.innerHeight;  

    bg1.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';  
    bg2.style.transform = 'translate(+' + x * 30 + 'px, +' + y * 30 + 'px)';  
    bg3.style.transform = 'translate(+' + x * 30 + 'px, +' + y * 30 + 'px)';
}); 