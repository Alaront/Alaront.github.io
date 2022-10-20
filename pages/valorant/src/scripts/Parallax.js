export default class Parallax {
    constructor(options) {
        this.mainSelector = options.mainSelector || '';
        this.mainPhotoSelector = options.mainPhotoSelector || '';
        this.selectorDecor = options.selectorDecor || [];
        this.type = options.type || 'all';

        this.initDelegation();
    }

    initDelegation() {

        if(this.eventError()) return

        if(this.type === 'horizon') this.initHorizonParallax();
        if(this.type === 'horizonScroll') this.initScrollParallax();

    }

    initHorizonParallax() {
        this.mainElement = document.querySelector(this.mainSelector);

        this.mainElement.addEventListener('mousemove', e => {
            let x = e.clientX / window.innerWidth;
            document.querySelector(this.mainPhotoSelector).style.transform = 'translate(-' + x * 50 + 'px)';

            this.selectorDecor.forEach(item => {

                document.querySelector(item.selector).style.transform = 'translate(+' + x * 50 + 'px)' + item.transformDefault;
            })
        })
    }

    initScrollParallax() {
        this.mainElement = document.querySelector(this.mainSelector);

        document.addEventListener('scroll', e => {
            const mainRect = this.mainElement.getBoundingClientRect();

            const percentRect = (mainRect.top * 100) / window.innerHeight / 2;

            this.selectorDecor.forEach(item => {

                document.querySelector(item.selector).style.top = `${percentRect}%`;
            })

        });
    }

    eventError() {

        if(!this.mainSelector.length){
            console.error('you didn\'t pass mainSelector')
            return true
        }
    }
}