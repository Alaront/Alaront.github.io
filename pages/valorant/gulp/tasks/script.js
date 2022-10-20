import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from "gulp-sourcemaps";

export const script = () => {
    return browserify(app.path.src.script, {debug: true})
            .transform('babelify', {presets: ['@babel/preset-env']})
            .bundle()
            .on('error', error => {
                console.log(error)
                this.emit('end')
            })
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: app.isDev}))
            .pipe(sourcemaps.write())
            .pipe(app.gulp.dest(app.path.build.script))
            .pipe(app.plugins.browsersync.stream())
}