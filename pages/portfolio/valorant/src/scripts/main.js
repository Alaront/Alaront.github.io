import Header from "./Header.js";
import Parallax from "./Parallax.js";
import Popup from "./Popup.js";
import {ShowTitle} from "./showTitle.js";

class Main {
    constructor() {
    }

    init(){
        this.menuEvent();
        this.headerInit();
        this.parallaxInit();
        this.popupInit();
        this.titlesInit();
    }

    menuEvent() {
        this.menuOpenClose();

        this.scrollBlock();
    }

    menuOpenClose() {
        const menuBtn = document.querySelector('.js-nav-btn');
        const menuLinks = document.querySelector('.js-nav-links');

        menuBtn.addEventListener('click', () => {
            menuLinks.classList[menuLinks.classList.contains('open-links') ? 'remove' : 'add']('open-links');
        })
    }

    scrollBlock() {
        const anchors = document.querySelectorAll('a[href*="#"]')

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()

                const blockID = anchor.getAttribute('href').substr(1)

                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        })
    }

    headerInit() {
        const header= new Header();
    }

    parallaxInit() {
        const parallax = new Parallax({
            mainSelector: '.js-parallax-container',
            mainPhotoSelector: '.js-main__photo',
            selectorDecor: [{
                selector: '.js-one-main-decor',
                transformDefault: 'rotate(90deg)'
            }, {
                selector: '.js-two-main-decor',
                transformDefault: 'rotate(-90deg)'
            }],
            type: 'horizon'
        });

        const parallaxTwo = new Parallax({
            mainSelector: '.js-parallax-container-agents',
            mainPhotoSelector: '.js-main__photo-agents',
            selectorDecor: [{
                selector: '.js-one-main-decor-agents',
                transformDefault: 'rotate(90deg)  translateY(calc(-50% - 527px))'
            }],
            type: 'horizon'
        });

        const parallaxThree = new Parallax({
            mainSelector: '.js-section-maps',
            selectorDecor: [{
                selector: '.js-section-maps-birds',
                transformDefault: ''
            }],
            type: 'horizonScroll'
        });
    }

    popupInit = async () => {
        const popup = new Popup({
            popupSelector: '.js-about-video-popup',
            callSelector: '.js-section-about-video-play',
        })
    }

    titlesInit() {
        const titles = new ShowTitle(['.js-title-about-animation', '.js-title-agents-animation', '.js-title-guns-animation', '.js-title-maps-animation'])
    }
}

const main = new Main();
main.init();