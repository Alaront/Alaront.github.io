import gulp from "gulp"

import {path} from "./gulp/config/path.js";
import {plugins} from "./gulp/config/plugins.js";
import {reset} from "./gulp/tasks/del.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {style} from "./gulp/tasks/style.js";
import {script} from "./gulp/tasks/script.js";
import {tScript} from "./gulp/tasks/tScript.js";
import {copyImages, copyImagesStyle} from "./gulp/tasks/images.js";


global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path,
    gulp,
    plugins
}

function watcher() {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.style, style)
    gulp.watch(path.watch.script, script)
    gulp.watch(path.watch.tScript, tScript)
    gulp.watch(path.watch.img, {ignoreInitial: false}, copyImages)
    gulp.watch(path.watch.imgStyle, {ignoreInitial: false}, copyImagesStyle)
}

const mainTask = gulp.parallel(html, style, script, tScript, copyImages, copyImagesStyle);

const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);

export { dev };
export { build };

gulp.task('default', dev)