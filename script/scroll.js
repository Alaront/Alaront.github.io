
const anchors = document.querySelectorAll('a[href^="#"]');

// Цикл по всем ссылкам
for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';

    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}