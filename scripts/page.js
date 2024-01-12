import  'fullpage.js/dist/fullpage.css'
import 'fullpage.js/vendors/easings.min.js'
import fullpage from 'fullpage.js/dist/fullpage.js'

export default class Page {
    constructor() {
    }

    init() {
        this.menuItems = [...document.querySelectorAll('.header__menu li')]
        this.projectsItems = [...document.querySelectorAll('.portfolio__items li')]

        if(this.checkSystem) {
            console.log(this.checkSystem)
            this.fullpageInit();
            this.eventInit();
        }
    }

    eventInit() {
        this.menuInit();
        this.projectsBtn();
    }

    menuInit() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.pageInit.moveTo(item.dataset.type, 0)
            })
        })
    }

    projectsBtn() {
        this.projectsItems.forEach(item => {
            item.addEventListener('click', () => {
                this.pageInit.moveTo('portfolioSlider', item.dataset.index)
            })
        })
    }

    fullpageInit() {
        const $this = this;

        this.pageInit = new fullpage('#fullpage', {
            anchors: ['about', 'skills', 'portfolio', 'portfolioSlider', 'footer'],

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

                    if((item.dataset.type === destination.anchor) || (item.dataset.type === 'portfolio' && destination.anchor === 'portfolioSlider')) item.classList.add('active')
                })
            }
        });
    }

    get checkSystem() {
        return window.innerHeight > 560
    }
}

