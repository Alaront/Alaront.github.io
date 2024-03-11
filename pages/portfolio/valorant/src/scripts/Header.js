import Swiper from '../../node_modules/swiper/swiper-bundle.js';
//import VanillaTilt from "../../node_modules/vanilla-tilt/dist/vanilla-tilt";

export default class Header {
    constructor() {
        this.swiper = null;

        this.classMain = {
            agentItem: '.js-header__agent-item',
            headerAgents: '.js-header-agents',
            headerSkills: '.js-header-skills',
            headerTitle: '.js-header-title'
        }

        this.allAgentsItems = document.querySelectorAll(this.classMain.agentItem);
        this.agentSkills = document.querySelector(this.classMain.headerSkills);
        this.headerTitle = document.querySelector(this.classMain.headerTitle);

        window.addEventListener('resize', this.eventsResize.bind(this));
        this.allAgentsItems.forEach(item => item.addEventListener('mouseover', e => this.agentItemOver(e)));

        this.skillsInfo = {
            phoenix: {
                one: {
                    title: 'Twisted feed',
                    text: 'When exploded, the orb blinds all players who were looking at it at the time of the explosion.'
                },
                two: {
                    title: 'Hot hands',
                    text: 'Fireball that explodes after a delay or when it hits the ground.'
                },
                three: {
                    title: 'Return',
                    text: 'If the skill expires, or if Phoenix dies while it is active.'
                },
                four: {
                    title: 'Inferno',
                    text: 'It obscures vision and deals damage to players passing through it.'
                }
            },
            jett: {
                one: {
                    title: 'Vortex',
                    text: 'Instantly launches a projectile that transforms into a cloud that briefly obscures vision on impact with the ground.'
                },
                two: {
                    title: 'Climb',
                    text: 'Jett instantly takes off into the air.'
                },
                three: {
                    title: 'Favourable wind',
                    text: 'Jett instantly makes a quick dash in the direction of travel.'
                },
                four: {
                    title: 'Blade Storm',
                    text: 'Armed with a set of precision throwing daggers, which are reloaded after the elimination of the enemy.'
                }
            },
            sova: {
                one: {
                    title: 'Shock Bolt',
                    text: 'EQUIP a bow with shock bolt. FIRE to send the explosive bolt forward, detonating upon collision and damaging players nearby.'
                },
                two: {
                    title: 'Owl Drone',
                    text: 'EQUIP an owl drone. FIRE to deploy and take control of movement of the drone.'
                },
                three: {
                    title: 'Recon Bolt',
                    text: 'FIRE to send the recon bolt forward, activating upon collision, enemies caught in the line of sight of the bolt.'
                },
                four: {
                    title: 'Hunter’s Fury',
                    text: 'EQUIP a bow with three long-range, wall-piercing energy blasts.'
                }
            },
            sage: {
                one: {
                    title: 'Slow Orb',
                    text: 'EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, slows players caught inside of it.'
                },
                two: {
                    title: 'Barrier Orb',
                    text: 'EQUIP a barrier orb. FIRE places a wall that fortifies after a few seconds. ALT FIRE rotates the targeter.'
                },
                three: {
                    title: 'Resurrection',
                    text: 'EQUIP a resurrection ability. FIRE with your crosshairs placed over a dead ally to begin resurrecting them.'
                },
                four: {
                    title: 'Healing Orb',
                    text: 'EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them.'
                }
            }
        }
        this.titleAgents = 'GENTS'

        this.init();
    }

    init() {
        if (window.innerWidth < 1280) this.swiperInit();

        window.onload = () => {
            this.titleInit();
        }
    }

    eventsResize() {
        if(this.swiper && window.innerWidth >= 1280) this.swiperEventDestroy();
        if(!this.swiper && window.innerWidth < 1280) {
             this.swiperInit()
        }
    }

    agentItemOver({target}) {
        const itemCurrent = target.closest(this.classMain.agentItem);

        if(itemCurrent) {
            this.changeDataAgents(itemCurrent);
        }
    }

    changeDataAgents(itemCurrent) {
        this.allAgentsItems.forEach(item => {
            item.classList.remove('header__agent-item--active');
            this.agentSkills.classList.remove(`header__skills--${item.dataset.agentName}`)


            if(item === itemCurrent) {
                item.classList.add('header__agent-item--active')
                this.agentSkills.classList.add(`header__skills--${item.dataset.agentName}`)

                this.agentSkills.querySelectorAll('.header__skill-item').forEach((itemSkillBlock, iter) => {
                    switch (iter) {
                        case 0:
                            itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = this.skillsInfo[item.dataset.agentName]['one'].title;
                            itemSkillBlock.querySelector('.header__skill-item-text').innerText = this.skillsInfo[item.dataset.agentName]['one'].text;
                            break;

                        case 1:
                            itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = this.skillsInfo[item.dataset.agentName]['two'].title;
                            itemSkillBlock.querySelector('.header__skill-item-text').innerText = this.skillsInfo[item.dataset.agentName]['two'].text;
                            break;

                        case 2:
                            itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = this.skillsInfo[item.dataset.agentName]['three'].title;
                            itemSkillBlock.querySelector('.header__skill-item-text').innerText = this.skillsInfo[item.dataset.agentName]['three'].text;
                            break;

                        case 3:
                            itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = this.skillsInfo[item.dataset.agentName]['four'].title;
                            itemSkillBlock.querySelector('.header__skill-item-text').innerText = this.skillsInfo[item.dataset.agentName]['four'].text;
                            break;

                        default :
                            break;
                    }
                })
            }
        })
    }

    swiperInit() {
        this.swiper = new Swiper(this.classMain.headerAgents, {
            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 20
                },
                440: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                550: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                650: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 30
                },
                950: {
                    slidesPerView: 2.7,
                    spaceBetween: 30
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },

            on: {
                activeIndexChange: () => {
                    this.changeDataAgents(this.allAgentsItems[this.swiper.activeIndex])
                }
            }
        });
    }

    swiperEventDestroy() {
        this.swiper.destroy()
        this.swiper = null;
    }

    titleInit() {
        let sum = 1;
        for (let char of this.titleAgents) {
            this.symbolSealTitle(char, sum);
            sum++;
        }
    }

    symbolSealTitle(char, sum){
        setTimeout(() => {
            this.headerTitle.innerText += char;
        }, 100 * sum)
    }


}