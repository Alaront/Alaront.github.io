// import ts from "gulp-typescript"
// import sourcemaps from "gulp-sourcemaps";
//
// export const tScript = () => {
//     return app.gulp.src(app.path.src.tScript)
//         .pipe(sourcemaps.init())
//         .pipe(ts({
//             noImplicitAny: true,
//             outFile: 'mainOther.js'
//         }))
//         .pipe(sourcemaps.write())
//         .pipe(app.gulp.dest(app.path.build.tScript));
// }


import ts from "gulp-typescript"
import sourcemaps from "gulp-sourcemaps";
import browserify from "browserify";
import tsify from "tsify";
import source from "vinyl-source-stream";
import buffer from 'vinyl-buffer';

export const tScript = () => {
    return browserify ({
            debug: true,
            entries: [app.path.src.tScript],
            cache: {},
            packageCache: {},
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('mainOther.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(app.gulp.dest(app.path.build.tScript))
        .pipe(app.plugins.browsersync.stream())
}