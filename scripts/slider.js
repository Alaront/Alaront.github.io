import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import lightGallery from "lightgallery";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import 'lightgallery/css/lightgallery.css';

export default class Slider {
    init() {
        this.preparingUrl();
        this.portfolioSliderInit();
    }

    portfolioSliderInit() {
        const $this = this;
        this.portfolioSlider = new Swiper('.js-portfolio-slider', {
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: '.swiper-portfolio-button-next',
                prevEl: '.swiper-portfolio-button-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
            },
            on: {

            }
        });

        this.portfolioSlider.forEach(item => {
            this.galleryInit(item)
        })
    }

    galleryInit(swiper) {
        const $lgSwiper = swiper.el.querySelector('.js-portfolio-gallery')
        const lg = lightGallery($lgSwiper, {
            speed: 400,
            addClass: 'portfolio-gallery',
            download: false
        });
        $lgSwiper.addEventListener("lgBeforeClose", () => {
            swiper.slideTo(lg.index, 0);
        });
    }

    preparingUrl() {
        const allPhoto = [...document.querySelectorAll('.js-portfolio-gallery .slide__photo-item')]

        allPhoto.forEach(item => {
            item.dataset.src = item.querySelector('img').src
        })
    }
}
