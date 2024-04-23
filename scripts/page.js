import  'fullpage.js/dist/fullpage.css'
import 'fullpage.js/vendors/easings.min.js'
import fullpage from 'fullpage.js/dist/fullpage.js'

export default class Page {
    constructor() {
    }

    init() {
        this.menuItems = [...document.querySelectorAll('.header__menu li')]
        this.projectsItems = [...document.querySelectorAll('.portfolio__items li')]
        this.projectsItemsLinks = [...document.querySelectorAll('.slide__text a')]
        this.themeBtn = document.querySelector('.js-theme-btn')

        if(this.checkSystem) {
            this.fullpageInit();
            this.eventInit();
            this.metrikaClickLinks();
        }
    }

    eventInit() {
        this.menuInit();
        this.projectsBtn();
        this.changeTheme()
    }

    menuInit() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.pageInit.moveTo(item.dataset.type, 0)
            })
        })
    }

    changeTheme() {
        this.themeBtn.addEventListener('click', () => document.body.classList.toggle('dark-theme'))
    }

    projectsBtn() {
        this.projectsItems.forEach(item => {
            item.addEventListener('click', () => {
                this.metrikaClickBtn(item.dataset.index)
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

    metrikaClickLinks()  {
        this.projectsItemsLinks.forEach(item => {
            item.addEventListener('click', e => {
                const index = e.target.dataset.id;
                switch (index) {
                    case 0:
                        ym(96345008,'reachGoal','link-silkway2022')
                    case 1:
                        ym(96345008,'reachGoal','link-PernShop')
                    case 2:
                        ym(96345008,'reachGoal','link-PernShop-Code')
                    case 3:
                        ym(96345008,'reachGoal','link-x.travelask')
                    case 4:
                        ym(96345008,'reachGoal','link-Valorant')
                    case 5:
                        ym(96345008,'reachGoal','link-Valorant-Code')

                    default:
                        break
                }
            })
        })
    }

    metrikaClickBtn(index) {
        if(!index) return

        console.log(index)
        switch (index) {
            case 0:
                ym(96345008,'reachGoal','btn-silkway')
                break
            case 1:
                ym(96345008,'reachGoal','PERN-shop')
                break
            case 2:
                ym(96345008,'reachGoal','x.travelask')
                break
            case 3:
                ym(96345008,'reachGoal','valorant')
                break
            default:
                break
        }
    }

    get checkSystem() {
        return window.innerHeight > 560
    }
}

