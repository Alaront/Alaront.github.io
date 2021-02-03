$(document).ready(function() {
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        sectionsColor: [],
        scrollingSpeed: 700,
        navigation: {
            'position': 'right',
               'tooltips': ['Главная', 'Знакомство', 'Самое главное', 'Меню', 'Заказать столик', 'Отзывы', 'Контакты']
           },
           afterRender: function(){
            $('video').get(0).play();
        }
    });
});
