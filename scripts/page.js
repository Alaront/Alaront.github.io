import  'fullpage.js/dist/fullpage.css'
import 'fullpage.js/vendors/easings.min.js'
import fullpage from 'fullpage.js/dist/fullpage.js'

export default class Page {
    constructor() {
    }

    init() {
        this.menuItems = [...document.querySelectorAll('.header__menu li')]

        this.fullpageInit();
        this.eventInit();
    }

    eventInit() {
        this.menuInit();
    }

    menuInit() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.pageInit.moveTo(item.dataset.type, 0)
            })
        })
    }

    fullpageInit() {
        const $this = this;

        this.pageInit = new fullpage('#fullpage', {
            anchors: ['about', 'skills', 'portfolio', 'footer'],

            scrollingSpeed: 800,
            sectionSelector: 'section',
            scrollOverflow: true,
            licenseKey: '',
            touchSensitivity: 5,
            scrollOverflowOptions: {
                resizeScrollbars: true
            },
            onLeave: function onLeave(origin, destination, direction) {
                document.querySelectorAll("section").forEach(item => item.classList.add('special-bg'))

            },
            afterLoad: function afterLoad(origin, destination, direction) {
                document.querySelectorAll("section").forEach(item => item.classList.remove('special-bg'))
                console.log($this.menuItems)
                $this.menuItems.forEach(item => {
                    item.classList.remove('active')

                    if(item.dataset.type === destination.anchor) item.classList.add('active')
                })
            }
        });
    }
}

