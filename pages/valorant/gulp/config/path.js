import *as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './production';
const srcFolder = './src';

export const path = {
    build: {
        files: `${buildFolder}/files/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/style/`,
        script: `${buildFolder}/scripts/`,
        tScript: `${buildFolder}/scripts/`,
        img: `${buildFolder}/img`,
        imgStyle: `${buildFolder}/style/img/`,
    },
    src: {
        files: `${srcFolder}/files/*.*`,
        pug: `${srcFolder}/*.pug`,
        style: `${srcFolder}/style/style.sass`,
        script: `${srcFolder}/scripts/main.js`,
        tScript: `${srcFolder}/tScript/main.ts`,
        img: `${srcFolder}/assets/img/*.*`,
        imgStyle: `${srcFolder}/style/img/*.{jpg,svg,png}`,
    },
    watch: {
        files: `${srcFolder}/files/*.*`,
        html: `${srcFolder}/**/*.pug`,
        style: `${srcFolder}/style/*.sass`,
        script: `${srcFolder}/scripts/*.js`,
        tScript: `${srcFolder}/tScript/*.ts`,
        img: `${srcFolder}/assets/img/*.*`,
        imgStyle: `${srcFolder}/style/img/*.{jpg,svg,png}`,
    },
    clean: buildFolder,
    srcFolder,
    rootFolder
}
