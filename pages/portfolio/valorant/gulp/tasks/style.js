import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import autoprefixer from 'gulp-autoprefixer'
import source from "vinyl-source-stream";

const sass = gulpSass(dartSass);

export const style = () => {
    return app.gulp.src(app.path.src.style)
        .pipe(
            app.plugins.ifPlugin(
                app.isDev,
                sourcemaps.init()
            )
        )
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            add: true
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write())
        .pipe(app.plugins.browsersync.stream())
        .pipe(app.gulp.dest(app.path.build.css));
};