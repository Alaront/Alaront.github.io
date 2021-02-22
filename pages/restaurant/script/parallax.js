let bg = document.querySelector('.parallax__photo img');
document.getElementById('section6').addEventListener('mousemove', function(even) {
    let x = even.clientX / window.innerWidth;
    let y = even.clientY / window.innerHeight;  
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});