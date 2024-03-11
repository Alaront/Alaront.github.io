export class ShowTitle {
    constructor(selectors) {
        this.allSelectors = selectors || [];

        this.init();
    }

    init() {
        if(this.allSelectors.length === 0) {
            console.warn('Not found selectors for titles animation')
            return
        }

       document.addEventListener('scroll', () => this.searchTitle());
    }

    searchTitle() {
        this.allSelectors.forEach(item => {
            const titleElement = document.querySelector(item);
            const titleElementTop = titleElement.getBoundingClientRect().top;

            if(titleElementTop <= window.innerHeight - 30) {
                titleElement.classList.remove('title-close')
            }

        })
    }
}