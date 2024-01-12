import './style/index.sass'
import Page from './scripts/page'
import Slider from "./scripts/slider.js";

(function () {
    const page = new Page();
    page.init();

    const slider = new Slider();
    slider.init();
}());
