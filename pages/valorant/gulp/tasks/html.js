import pug from 'gulp-pug';

export const html = () => {
    return app.gulp.src(app.path.src.pug)
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}